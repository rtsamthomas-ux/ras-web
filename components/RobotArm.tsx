"use client";
// Interactive 4-DOF robot arm (Three.js) driven by analytic inverse kinematics.
// Move the pointer over the table → the arm reaches there. Click → pick up / place a part.
// Blocks obey simple physics: they fall with gravity, bounce, stack, and tip off edges.
import { useEffect, useRef } from "react";
import * as THREE from "three";

const L1 = 2.5; // upper arm
const L2 = 2.1; // forearm
const SHOULDER_H = 1.15; // shoulder height above the table
const GRIP = 0.95; // wrist → fingertip length
const PART = 0.42; // part cube size

type Hud = { j1: HTMLElement | null; j2: HTMLElement | null; j3: HTMLElement | null; j4: HTMLElement | null; xyz: HTMLElement | null; grip: HTMLElement | null; mode: HTMLElement | null };

export default function RobotArm({ dark }: { dark: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef(dark);
  darkRef.current = dark;

  useEffect(() => {
    const el = mount.current!;
    const q = (k: string) => hudRef.current?.querySelector<HTMLElement>(`[data-k="${k}"]`) ?? null;
    const hud: Hud = { j1: q("j1"), j2: q("j2"), j3: q("j3"), j4: q("j4"), xyz: q("xyz"), grip: q("grip"), mode: q("mode") };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(6.3, 5.4, 8.0);
    const lookAt = new THREE.Vector3(0.3, 1.3, 0.4);
    camera.lookAt(lookAt);

    // ---- lights ----
    const hemi = new THREE.HemisphereLight(0xffffff, 0xb8b2a4, 1.6);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(5, 10, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30 });
    sun.shadow.radius = 4;
    scene.add(sun);
    const rim = new THREE.PointLight(0xff5a1f, 18, 14);
    rim.position.set(-4, 4, -3);
    scene.add(rim);

    // ---- materials ----
    const inkMat = new THREE.MeshStandardMaterial({ color: 0x1d2742, roughness: 0.45, metalness: 0.35 });
    const shellMat = new THREE.MeshStandardMaterial({ color: 0xeceae3, roughness: 0.38, metalness: 0.1 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0xff5a1f, roughness: 0.35, metalness: 0.2, emissive: 0xff5a1f, emissiveIntensity: 0.15 });
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x1d2742, transparent: true, opacity: 0.55 });

    const withEdges = (mesh: THREE.Mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 25), edgeMat);
      mesh.add(e);
      return mesh;
    };

    // ---- table / ground ----
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.16 }));
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);
    const reachRing = new THREE.Mesh(
      new THREE.RingGeometry(L1 + L2 - 0.35, L1 + L2 - 0.3, 128),
      new THREE.MeshBasicMaterial({ color: 0x1d2742, transparent: true, opacity: 0.25, side: THREE.DoubleSide }),
    );
    reachRing.rotation.x = -Math.PI / 2;
    reachRing.position.y = 0.005;
    scene.add(reachRing);
    const innerRing = new THREE.Mesh(
      new THREE.RingGeometry(1.35, 1.38, 96),
      new THREE.MeshBasicMaterial({ color: 0x1d2742, transparent: true, opacity: 0.2, side: THREE.DoubleSide }),
    );
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.005;
    scene.add(innerRing);

    // target reticle on the table
    const reticle = new THREE.Group();
    const retMat = new THREE.MeshBasicMaterial({ color: 0xff5a1f, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
    const ret1 = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.32, 48), retMat);
    const ret2 = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.52, 48), retMat.clone());
    (ret2.material as THREE.MeshBasicMaterial).opacity = 0.35;
    [ret1, ret2].forEach((r) => { r.rotation.x = -Math.PI / 2; reticle.add(r); });
    reticle.position.y = 0.01;
    scene.add(reticle);

    // ---- the arm ----
    const base = withEdges(new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.2, 0.34, 48), inkMat));
    base.position.y = 0.17;
    scene.add(base);

    const yaw = new THREE.Group(); // J1
    yaw.position.y = 0.34;
    scene.add(yaw);
    const turret = withEdges(new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, 0.62, 40), shellMat));
    turret.position.y = 0.31;
    yaw.add(turret);

    const shoulder = new THREE.Group(); // J2 (pitch about X)
    shoulder.position.y = SHOULDER_H - 0.34;
    yaw.add(shoulder);
    const shoulderJoint = withEdges(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.9, 32), jointMat));
    shoulderJoint.rotation.z = Math.PI / 2;
    shoulder.add(shoulderJoint);
    const upper = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.46, L1, 0.46), shellMat));
    upper.position.y = L1 / 2;
    shoulder.add(upper);
    const upperStripe = new THREE.Mesh(new THREE.BoxGeometry(0.48, L1 * 0.55, 0.12), inkMat);
    upperStripe.position.set(0, L1 / 2, 0.2);
    shoulder.add(upperStripe);

    const elbow = new THREE.Group(); // J3
    elbow.position.y = L1;
    shoulder.add(elbow);
    const elbowJoint = withEdges(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.74, 32), jointMat));
    elbowJoint.rotation.z = Math.PI / 2;
    elbow.add(elbowJoint);
    const fore = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.36, L2, 0.36), shellMat));
    fore.position.y = L2 / 2;
    elbow.add(fore);

    const wrist = new THREE.Group(); // J4
    wrist.position.y = L2;
    elbow.add(wrist);
    const wristJoint = withEdges(new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.56, 28), jointMat));
    wristJoint.rotation.z = Math.PI / 2;
    wrist.add(wristJoint);
    const palm = withEdges(new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.3, 0.32), inkMat));
    palm.position.y = 0.32;
    wrist.add(palm);
    const fingerGeo = new THREE.BoxGeometry(0.1, 0.55, 0.26);
    const fingerL = withEdges(new THREE.Mesh(fingerGeo, shellMat));
    const fingerR = withEdges(new THREE.Mesh(fingerGeo, shellMat));
    fingerL.position.set(-0.26, 0.7, 0);
    fingerR.position.set(0.26, 0.7, 0);
    wrist.add(fingerL, fingerR);
    const holdPoint = new THREE.Object3D();
    holdPoint.position.y = GRIP - PART / 2 - 0.02;
    wrist.add(holdPoint);

    // ---- parts to pick and place ----
    const partColors = [0xff5a1f, 0x2f6bff, 0x1d2742];
    const parts = partColors.map((c, i) => {
      const m = withEdges(new THREE.Mesh(new THREE.BoxGeometry(PART, PART, PART), new THREE.MeshStandardMaterial({ color: c, roughness: 0.4, metalness: 0.15 })));
      const a = -0.5 + i * 0.9;
      m.position.set(Math.cos(a) * 3.2, PART / 2, Math.sin(a) * 3.2);
      m.userData.vy = 0;
      scene.add(m);
      return m;
    });
    // small inspection hook (used by automated UI tests): screen position of each part
    (window as unknown as { __rasArm?: unknown }).__rasArm = {
      partScreen: (i: number) => {
        const v = parts[i].getWorldPosition(new THREE.Vector3()).project(camera);
        const r = renderer.domElement.getBoundingClientRect();
        return { x: r.left + (v.x * 0.5 + 0.5) * r.width, y: r.top + (-v.y * 0.5 + 0.5) * r.height };
      },
      holding: () => !!held,
      heights: () => parts.map((q) => +q.position.y.toFixed(3)),
    };
    let held: THREE.Mesh | null = null;

    // ---- tiny physics: gravity, bounce, stacking, tipping off edges ----
    const free = () => parts.filter((q) => q !== held);
    // highest block top under (x, z), ignoring `self`, only counting blocks below `belowY`
    const surfaceAt = (x: number, z: number, self: THREE.Mesh | null, belowY = Infinity) => {
      let top = 0, sup: THREE.Mesh | null = null;
      for (const q of free()) {
        if (q === self || q.position.y >= belowY - 0.01) continue;
        if (Math.abs(q.position.x - x) < PART * 0.98 && Math.abs(q.position.z - z) < PART * 0.98) {
          const qt = q.position.y + PART / 2;
          if (qt > top) { top = qt; sup = q; }
        }
      }
      return { top, sup };
    };
    const stepPhysics = (dt: number) => {
      // settle lowest blocks first so stacks resolve bottom-up
      for (const p of [...free()].sort((a, b) => a.position.y - b.position.y)) {
        const { top, sup } = surfaceAt(p.position.x, p.position.z, p, p.position.y);
        // resting on another block but hanging too far over its edge → slide/tip off
        if (sup) {
          const dx = p.position.x - sup.position.x, dz = p.position.z - sup.position.z;
          if (Math.max(Math.abs(dx), Math.abs(dz)) > PART * 0.5) {
            const len = Math.hypot(dx, dz) || 1;
            p.position.x += (dx / len) * 2.2 * dt;
            p.position.z += (dz / len) * 2.2 * dt;
            p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, -Math.sign(dx) * 0.5, 0.2);
            p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, Math.sign(dz) * 0.5, 0.2);
            continue;
          }
        }
        p.rotation.x *= 0.8; p.rotation.z *= 0.8; // straighten up once supported
        const rest = top + PART / 2;
        let vy = (p.userData.vy as number) || 0;
        if (p.position.y > rest + 0.001 || vy !== 0) {
          vy -= 18 * dt;
          p.position.y += vy * dt;
          if (p.position.y <= rest) {
            p.position.y = rest;
            vy = Math.abs(vy) > 1.2 ? -vy * 0.28 : 0; // small bounce, then settle
          }
        } else if (p.position.y < rest) p.position.y = rest;
        p.userData.vy = vy;
      }
    };
    let gripAmt = 0; // 0 open → 1 closed
    let gripTarget = 0;

    // ---- input ----
    const raycaster = new THREE.Raycaster();
    const tablePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const pointerTarget = new THREE.Vector3(2.6, 0, 1.6);
    let lastPointer = -1e9;
    let visible = true;
    const toTable = (clientX: number, clientY: number) => {
      const r = renderer.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      // pointing at a block → aim at that block (so you can stack precisely)
      const blocks = raycaster.intersectObjects(parts.filter((q) => q !== held), false);
      if (blocks.length) {
        const b = blocks[0].object as THREE.Mesh;
        return new THREE.Vector3(b.position.x, 0, b.position.z);
      }
      const hit = new THREE.Vector3();
      return raycaster.ray.intersectPlane(tablePlane, hit) ? hit : null;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // on touch devices the arm runs its demo path
      const hit = toTable(e.clientX, e.clientY);
      if (hit) { pointerTarget.copy(hit); lastPointer = performance.now(); }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        const hit = toTable(e.clientX, e.clientY);
        if (hit) { pointerTarget.copy(hit); lastPointer = performance.now(); }
      }
      clicked = true;
    };
    let clicked = false;
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);

    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0 });
    io.observe(el);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // pull back on narrow screens so the whole arm fits
      const dist = w / h < 0.9 ? 1.3 : 1;
      camera.position.set(6.3 * dist, 5.4 * dist, 8.0 * dist);
      camera.lookAt(lookAt);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // ---- IK ----
    const target = new THREE.Vector3().copy(pointerTarget); // smoothed
    const ang = { j1: 0, j2: 0, j3: 0, j4: 0 };
    const deg = (r: number) => ((r * 180) / Math.PI).toFixed(1).padStart(6, " ");

    function solveIK(t: THREE.Vector3) {
      // clamp to the reachable annulus
      let r = Math.hypot(t.x, t.z);
      const rMax = L1 + L2 - 0.45, rMin = 1.5;
      const scale = r > rMax ? rMax / r : r < rMin ? rMin / Math.max(r, 1e-3) : 1;
      t.x *= scale; t.z *= scale; r *= scale;
      const j1 = Math.atan2(t.x, t.z);
      // wrist centre sits GRIP above the fingertip (gripper points straight down)
      const wy = t.y + GRIP - SHOULDER_H;
      const d = Math.min(Math.hypot(r, wy), L1 + L2 - 0.01);
      const phi1 = Math.atan2(wy, r) + Math.acos((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)); // elbow-up
      const interior = Math.acos((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2));
      const j2 = Math.PI / 2 - phi1;
      const j3 = Math.PI - interior;
      const j4 = Math.PI - (j2 + j3); // keep the gripper vertical
      return { j1, j2, j3, j4 };
    }

    let raf = 0, frame = 0, lastT = performance.now();
    const t0 = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const now = performance.now();
      const t = (now - t0) / 1000;
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      const ease = (perFrame: number) => 1 - Math.pow(1 - perFrame, dt * 60); // same feel at any frame rate
      frame++;

      // idle demo path when the pointer hasn't moved recently (and always on touch)
      const idle = now - lastPointer > 4000;
      const goal = idle
        ? new THREE.Vector3(Math.cos(t * 0.45) * 3.1, 0, Math.sin(t * 0.45) * 2.3 + Math.sin(t * 0.9) * 0.5)
        : pointerTarget.clone();
      const aimC = solveClampPreview(goal);
      const under = surfaceAt(aimC.x, aimC.z, held).top;
      goal.y = held ? under + PART + 0.08 : under + 0.08;
      target.lerp(goal, reduced ? 1 : ease(0.1));

      // click: grab the nearest part / release the held one
      if (clicked) {
        clicked = false;
        if (held) {
          const world = new THREE.Vector3();
          held.getWorldPosition(world);
          scene.attach(held);
          held.position.copy(world);
          // aiming at a block? line the dropped block up on top of it
          const aimDrop = solveClampPreview(idle ? target : pointerTarget);
          const onto = surfaceAt(aimDrop.x, aimDrop.z, held);
          if (onto.sup && Math.hypot(onto.sup.position.x - aimDrop.x, onto.sup.position.z - aimDrop.z) < PART * 0.6) {
            held.position.x = onto.sup.position.x;
            held.position.z = onto.sup.position.z;
            held.position.y = Math.max(held.position.y, onto.top + PART / 2 + 0.05);
          }
          held.rotation.set(0, held.rotation.y, 0);
          held.userData.vy = 0;
          held = null;
          gripTarget = 0;
        } else {
          // use the aim point (not the lagging arm) so a click grabs what the reticle is on
          const aim = solveClampPreview(idle ? target : pointerTarget);
          const tip = new THREE.Vector3(aim.x, 0, aim.z);
          let best: THREE.Mesh | null = null, bestScore = -Infinity;
          for (const p of parts) {
            const dd = Math.hypot(p.position.x - tip.x, p.position.z - tip.z);
            if (dd > 1.0) continue;
            const score = p.position.y * 10 - dd; // prefer the top of a stack
            if (score > bestScore) { bestScore = score; best = p; }
          }
          gripTarget = 1;
          if (best) {
            target.set(best.position.x, target.y, best.position.z);
            held = best;
            holdPoint.attach(held);
            held.position.set(0, 0, 0);
            held.rotation.set(0, 0, 0);
            held.userData.vy = 0;
          } else setTimeout(() => { if (!held) gripTarget = 0; }, 450); // empty grab: snap and reopen
        }
      }

      stepPhysics(Math.min(dt, 0.033));

      const s = solveIK(target.clone());
      const k = reduced ? 1 : ease(0.2);
      ang.j1 += (s.j1 - ang.j1) * k;
      ang.j2 += (s.j2 - ang.j2) * k;
      ang.j3 += (s.j3 - ang.j3) * k;
      ang.j4 += (s.j4 - ang.j4) * k;
      yaw.rotation.y = ang.j1;
      shoulder.rotation.x = ang.j2;
      elbow.rotation.x = ang.j3;
      wrist.rotation.x = ang.j4;

      gripAmt += (gripTarget - gripAmt) * ease(0.25);
      const open = 0.34 - gripAmt * (held ? 0.1 : 0.2);
      fingerL.position.x = -open;
      fingerR.position.x = open;

      // reticle follows the (clamped) target
      const c = solveClampPreview(target);
      reticle.position.x = c.x;
      reticle.position.z = c.z;
      const pulse = 1 + Math.sin(t * 4) * 0.08;
      ret2.scale.setScalar(pulse);
      retMat.color.set(held ? 0x2f6bff : 0xff5a1f);

      // theme-aware tint
      const dk = darkRef.current;
      edgeMat.color.set(dk ? 0x9fb1ff : 0x1d2742);
      (reachRing.material as THREE.MeshBasicMaterial).color.set(dk ? 0x9fb1ff : 0x1d2742);
      (innerRing.material as THREE.MeshBasicMaterial).color.set(dk ? 0x9fb1ff : 0x1d2742);
      (shadowPlane.material as THREE.ShadowMaterial).opacity = dk ? 0.35 : 0.16;

      // live telemetry HUD (every 4th frame)
      if (frame % 4 === 0) {
        if (hud.j1) hud.j1.textContent = `${deg(ang.j1)}°`;
        if (hud.j2) hud.j2.textContent = `${deg(ang.j2)}°`;
        if (hud.j3) hud.j3.textContent = `${deg(ang.j3)}°`;
        if (hud.j4) hud.j4.textContent = `${deg(ang.j4)}°`;
        if (hud.xyz) hud.xyz.textContent = `${c.x.toFixed(2)}, ${Math.max(0, target.y - 0.08).toFixed(2)}, ${c.z.toFixed(2)}`;
        if (hud.grip) hud.grip.textContent = held ? "HOLDING" : gripTarget ? "CLOSED" : "OPEN";
        if (hud.mode) hud.mode.textContent = idle ? "AUTO" : "MANUAL";
      }
      renderer.render(scene, camera);
    };
    function solveClampPreview(v: THREE.Vector3) {
      const r = Math.hypot(v.x, v.z), rMax = L1 + L2 - 0.45, rMin = 1.5;
      const sc = r > rMax ? rMax / r : r < rMin ? rMin / Math.max(r, 1e-3) : 1;
      return { x: v.x * sc, z: v.z * sc };
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      renderer.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="arm">
      <div ref={mount} className="arm__canvas" aria-label="Interactive robot arm: move your pointer over the table, click to pick up and place parts" role="img" />
      <div ref={hudRef} className="arm__hud" aria-hidden="true">
        <div className="arm__hud-title">RAS-ARM · 4-DOF · IK</div>
        <dl>
          <div><dt>J1 base</dt><dd data-k="j1">0.0°</dd></div>
          <div><dt>J2 shoulder</dt><dd data-k="j2">0.0°</dd></div>
          <div><dt>J3 elbow</dt><dd data-k="j3">0.0°</dd></div>
          <div><dt>J4 wrist</dt><dd data-k="j4">0.0°</dd></div>
          <div><dt>Target</dt><dd data-k="xyz">0, 0, 0</dd></div>
          <div><dt>Gripper</dt><dd data-k="grip">OPEN</dd></div>
          <div><dt>Mode</dt><dd data-k="mode">AUTO</dd></div>
        </dl>
      </div>
      <p className="arm__hint"><span>Move</span> to aim · <span>Click</span> to pick &amp; place</p>
    </div>
  );
}
