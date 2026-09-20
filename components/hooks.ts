"use client";
import { useEffect, useRef, useState } from "react";

/** Adds `is-in` to elements with [data-reveal] when they scroll into view. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/** Counts up from 0 to `to` the first time the element is visible. */
export function useCountUp(to: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = () => {
        const p = Math.min(1, (performance.now() - t0) / duration);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      tick();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return { ref, val };
}

/** Live countdown to an ISO date. */
export function useCountdown(iso: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date(iso).getTime();
    const f = () => setLeft(Math.max(0, target - Date.now()));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, [iso]);
  if (left === null) return null;
  const s = Math.floor(left / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}
