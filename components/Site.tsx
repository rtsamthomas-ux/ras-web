"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  AWARDS, CHAPTERS, CONF_CALENDAR, CONFERENCES, EDUCATION, FAQ, LEADERSHIP, LEADERSHIP_LINK, MEMBERSHIP, MISSION, MORE_CONFERENCES, NAV,
  PILLARS, PUBLICATIONS, RAL, RAL_LINK, SITE, SOURCES, STANDARDS, STANDARDS_LINK, STATS, TC_BLUE, TC_CLUSTERS, TC_GOLD, TC_LINK, TIMELINE,
} from "@/lib/content";
import { useCountdown, useCountUp, useReveal } from "./hooks";
import { IconArrow, IconClose, IconMenu, IconMoon, IconSpark, IconSun } from "./Icons";

const RobotArm = dynamic(() => import("./RobotArm"), { ssr: false, loading: () => <div className="arm arm--loading" /> });

/* ------------------------------------------------------------------ */
function Nav({ dark, onTheme }: { dark: boolean; onTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ids = NAV.map((n) => n.href.slice(1));
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav__inner container">
        <a href="#top" className="brand" onClick={() => setOpen(false)} aria-label="IEEE RAS, home">
          <span className="brand__mark" aria-hidden="true"><i /><i /><i /></span>
          <span className="brand__text"><b>IEEE RAS</b><small>Robotics &amp; Automation</small></span>
        </a>
        <nav className="nav__links" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className={active === n.href.slice(1) ? "is-active" : ""} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
        </nav>
        <div className="nav__actions">
          <button className="icon-btn" onClick={onTheme} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>{dark ? <IconSun /> : <IconMoon />}</button>
          <a className="btn btn--sm btn--ink hide-sm" href={SITE.join} target="_blank" rel="noreferrer">Join RAS</a>
          <button className="icon-btn nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>{open ? <IconClose /> : <IconMenu />}</button>
        </div>
      </div>
      <div className="nav__sheet" aria-hidden={!open}>
        {NAV.map((n, i) => (
          <a key={n.href} href={n.href} style={{ transitionDelay: `${0.04 * i}s` }} onClick={() => setOpen(false)}>
            <span>0{i + 1}</span>{n.label}
          </a>
        ))}
        <a href={SITE.join} target="_blank" rel="noreferrer" className="btn btn--accent" onClick={() => setOpen(false)}>Join RAS <IconArrow /></a>
      </div>
    </header>
  );
}


/* ------------------------------------------------------------------ */
function Hero({ dark }: { dark: boolean }) {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow rise" style={{ animationDelay: "0.05s" }}><span className="dot" /> IEEE Robotics &amp; Automation Society · since 1987</p>
          <h1 className="hero__title rise" style={{ animationDelay: "0.12s" }}>
            Advancing machines<br />that <em>sense</em>, <em>think</em><br />&amp; <em>move</em>.
          </h1>
          <p className="hero__lede rise" style={{ animationDelay: "0.2s" }}>
            The global professional society for robotics and automation: 19,000+ engineers and researchers, ten journals and magazines, world-class conferences and 220+ chapters worldwide.
          </p>
          <div className="hero__ctas rise" style={{ animationDelay: "0.28s" }}>
            <a className="btn btn--accent" href="#about">Explore the society <IconArrow /></a>
            <a className="btn btn--ghost" href="#conferences">ICRA 2027 · Seoul</a>
          </div>
          <dl className="hero__meta rise" style={{ animationDelay: "0.36s" }}>
            <div><dt>Founded</dt><dd>1984 council · 1987 society</dd></div>
            <div><dt>Technical committees</dt><dd>47</dd></div>
            <div><dt>Next ICRA</dt><dd><span className="live" /> Seoul · May 2027</dd></div>
          </dl>
        </div>
        <div className="hero__visual rise" style={{ animationDelay: "0.25s" }}>
          <span className="dim dim--top" aria-hidden="true">⟵ 4.60 m reach ⟶</span>
          <RobotArm dark={dark} />
        </div>
      </div>
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>Humanoids <i>✦</i> Soft Robotics <i>✦</i> Haptics <i>✦</i> Aerial Robots <i>✦</i> Multi-Robot Systems <i>✦</i> Robot Learning <i>✦</i> Medical Robotics <i>✦</i> Field Robotics <i>✦</i> Automation <i>✦</i> Robot Vision <i>✦</i>&nbsp;</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Stat({ s, i }: { s: (typeof STATS)[number]; i: number }) {
  const { ref, val } = useCountUp(s.value, s.plain ? 1200 : 1800);
  return (
    <div className="stat" data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
      <span className="stat__num"><span ref={ref}>{s.plain ? val : val.toLocaleString("en-IN")}</span>{s.suffix}</span>
      <span className="stat__label">{s.label}</span>
    </div>
  );
}

function SectionHead({ n, kicker, title, lede }: { n: string; kicker: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="shead" data-reveal>
      <p className="shead__kicker"><span>§ {n}</span>{kicker}</p>
      <h2 className="shead__title">{title}</h2>
      {lede && <p className="shead__lede">{lede}</p>}
    </div>
  );
}


/* ------------------------------------------------------------------ */
function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="stats">{STATS.map((s, i) => <Stat key={s.label} s={s} i={i} />)}</div>
        <div className="about">
          <SectionHead n="01" kicker="Mission & vision" title={<>Knowledge that <em>moves</em> the world.</>} />
          <div className="about__body" data-reveal>
            <p className="about__lead">&ldquo;{MISSION.mission}&rdquo;</p>
            <p><b>Vision:</b> {MISSION.vision}</p>
          </div>
        </div>
        <div className="foi" data-reveal>
          <div className="foi__col">
            <span className="foi__tag">Field of interest · Robotics</span>
            <p>{MISSION.robotics}</p>
          </div>
          <div className="foi__col">
            <span className="foi__tag">Field of interest · Automation</span>
            <p>{MISSION.automation}</p>
          </div>
        </div>
        <ul className="pillars pillars--six">
          {PILLARS.map((p, i) => (
            <li key={p.k} data-reveal style={{ transitionDelay: `${i * 0.06}s` }}>
              <a href={p.href} className="pillars__link">
                <span className="pillars__n">0{i + 1}</span>
                <b>{p.k}</b>
                <span>{p.v}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function History() {
  return (
    <section className="section section--alt" id="history">
      <div className="container">
        <SectionHead n="02" kicker="Four decades of robotics" title={<>From a council to a <em>global</em> society.</>} lede="How IEEE RAS and its publications grew alongside the field itself." />
        <ol className="timeline timeline--8">
          {TIMELINE.map((t, i) => (
            <li key={t.year} data-reveal style={{ transitionDelay: `${(i % 4) * 0.07}s` }}>
              <a className="timeline__link" href={t.href} target="_blank" rel="noreferrer">
                <span className="timeline__year">{t.year}</span>
                <span className="timeline__node" aria-hidden="true" />
                <b>{t.title}</b>
                <p>{t.text}</p>
              </a>
            </li>
          ))}
        </ol>
        <div className="leaders" data-reveal>
          <p className="mini-label">Leadership · Executive Committee</p>
          <div className="leaders__grid">
            {LEADERSHIP.map((l) => (
              <a key={l.role} className="leader linkcard" href={LEADERSHIP_LINK} target="_blank" rel="noreferrer">
                <span className="leader__role">{l.role}</span>
                <b>{l.name}</b>
                <span>{l.org}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Publications() {
  return (
    <section className="section" id="publications">
      <div className="container">
        <div className="rascade__grid pubs-wrap">
          <div>
            <SectionHead n="03" kicker="Publications" title={<>Ten journals.<br /><em>One</em> field.</>} lede="Society journals and magazines, plus co-sponsored titles, spanning theory, practice and everything in between. Click any journal to open it." />
            <div className="pubs" data-reveal>
              {PUBLICATIONS.map((p) => (
                <a key={p.code} className="pub linkcard" href={p.href} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
                  <span className="pub__code">{p.code}<small>{p.kind}</small></span>
                  <b className="pub__name">{p.name}</b>
                  <span className="pub__text">{p.text}</span>
                  <span className="open-btn">Open</span>
                </a>
              ))}
            </div>
          </div>
          <div className="rascade__panel card" data-reveal>
            <div className="rascade__clock" aria-hidden="true">
              <span>RA-L</span><small>ROBOTICS &amp;<br />AUTOMATION LETTERS</small>
            </div>
            <p className="panel__text">A journal built for speed: short papers, quick decisions, and the option to present accepted work at the Society&apos;s flagship conferences.</p>
            <dl className="facts">
              {RAL.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
            </dl>
            <a className="open-btn open-btn--solid panel__cta" href={RAL_LINK} target="_blank" rel="noreferrer">Open RA-L</a>
            <p className="mini-label">Standards from the RAS Standards Committee</p>
            <ul className="stds">
              {STANDARDS.map((s) => <li key={s.code}><a href={STANDARDS_LINK} target="_blank" rel="noreferrer"><b>{s.code}</b><span>{s.name}</span></a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Countdown({ to }: { to: string }) {
  const c = useCountdown(to);
  const cells: [string, number | undefined][] = [["days", c?.d], ["hrs", c?.h], ["min", c?.m], ["sec", c?.s]];
  return (
    <div className="countdown" aria-label="Countdown to ICRA 2027">
      {cells.map(([k, v]) => (
        <div key={k}><span>{v === undefined ? "--" : String(v).padStart(2, "0")}</span><small>{k}</small></div>
      ))}
    </div>
  );
}

function Conferences() {
  return (
    <section className="section section--alt" id="conferences">
      <div className="container">
        <SectionHead n="04" kicker="Where robotics meets" title={<>The flagship <em>conferences</em>.</>} />
        <div className="confs">
          {CONFERENCES.map((c, i) => (
            <a key={c.code} href={c.href} target="_blank" rel="noreferrer" className={`card conf linkcard ${c.countdownTo ? "conf--feature" : ""}`} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="conf__code">{c.code}</span>
              <h3>{c.name}</h3>
              <p>{c.text}</p>
              {c.countdownTo && <Countdown to={c.countdownTo} />}
              <p className="conf__next"><span>Next</span>{c.next}</p>
              <span className="card__corner" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="more-confs" data-reveal>
          <div className="row-head">
            <p className="mini-label">More fully sponsored RAS conferences</p>
            <a className="link" href={CONF_CALENDAR} target="_blank" rel="noreferrer">Full list</a>
          </div>
          <div className="more-confs__grid">
            {MORE_CONFERENCES.map((c) => <a key={c.code} href={c.href} target="_blank" rel="noreferrer"><b>{c.code}</b><span>{c.name}</span></a>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Community() {
  return (
    <section className="section" id="community">
      <div className="container">
        <SectionHead n="05" kicker="Community & learning" title={<>A society of <em>communities</em>.</>} lede="Technical committees, local chapters and education programmes bring members together around what they work on." />
        <div className="society__grid">
          <div data-reveal>
            <div className="row-head"><h3 className="h3">47 technical committees</h3><a className="link" href={TC_LINK} target="_blank" rel="noreferrer">Browse all</a></div>
            <p className="muted">Organised into five clusters:</p>
            <ul className="clusters">{TC_CLUSTERS.map((c, i) => <li key={c}><span>{String(i + 1).padStart(2, "0")}</span>{c}</li>)}</ul>
            <p className="mini-label">Gold ribbon committees</p>
            <div className="tags tags--gold">{TC_GOLD.map((t) => <a key={t} href={TC_LINK} target="_blank" rel="noreferrer">{t}</a>)}</div>
            <p className="mini-label">Blue ribbon committees</p>
            <div className="tags tags--blue">{TC_BLUE.map((t) => <a key={t} href={TC_LINK} target="_blank" rel="noreferrer">{t}</a>)}</div>
          </div>
          <div data-reveal>
            <div className="row-head"><h3 className="h3">220+ chapters worldwide</h3><a className="link" href={CHAPTERS.href} target="_blank" rel="noreferrer">Find a chapter</a></div>
            <p className="muted chapters__text">{CHAPTERS.text}</p>
            <dl className="grants">
              {CHAPTERS.grants.map((g) => <div key={g.k}><dd>{g.v}</dd><dt>{g.k}</dt></div>)}
            </dl>
            <p className="chapter-example">
              Example: <a href={SITE.chapterExample.href} target="_blank" rel="noreferrer" className="link">{SITE.chapterExample.name}</a>
            </p>
          </div>
        </div>
        <div className="edu" >
          {EDUCATION.map((e, i) => (
            <a key={e.title} href={e.href} target="_blank" rel="noreferrer" className="card edu__card linkcard" data-reveal style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className="edu__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Awards() {
  return (
    <section className="section section--alt" id="awards">
      <div className="container">
        <SectionHead n="06" kicker="Recognition" title={<>Celebrating the people who <em>build</em> the field.</>} />
        <ol className="awards">
          {AWARDS.map((a, i) => (
            <li key={a.name} data-reveal style={{ transitionDelay: `${(i % 3) * 0.06}s` }}>
              <a href={a.href} target="_blank" rel="noreferrer">
                <span className="awards__n">{String(i + 1).padStart(2, "0")}</span>
                <b>{a.name}</b>
                <span>{a.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Join() {
  return (
    <section className="section join" id="join">
      <div className="container">
        <div className="join__box" data-reveal>
          <div className="join__head">
            <p className="eyebrow eyebrow--light"><span className="dot" /> Membership</p>
            <h2 className="join__title">Build the <em>future</em><br />of robotics.</h2>
            <p className="join__lede">Join a global community of 19,000+ members, and get the journals, conferences and people that move the field forward.</p>
            <div className="hero__ctas">
              <a className="btn btn--accent" href={SITE.join} target="_blank" rel="noreferrer">Join RAS <IconArrow /></a>
              {SITE.agentUrl && <a className="btn btn--ghost-light" href={SITE.agentUrl} target="_blank" rel="noreferrer"><IconSpark /> Ask our AI agent</a>}
            </div>
          </div>
          <ol className="steps">
            {MEMBERSHIP.map((m, i) => (
              <li key={m}><span>{String(i + 1).padStart(2, "0")}</span><p className="steps__single">{m}</p></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Faq() {
  return (
    <section className="section section--alt" id="faq">
      <div className="container faq">
        <SectionHead n="07" kicker="Questions" title={<>Good to <em>know</em>.</>} />
        <div className="faq__list" data-reveal>
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary><span>{String(i + 1).padStart(2, "0")}</span>{f.q}<i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__big">Let&apos;s build<br /><em>what&apos;s next.</em></p>
            <a className="footer__mail" href={SITE.official} target="_blank" rel="noreferrer">Official site: ieee-ras.org</a>
          </div>
          <div className="footer__cols">
            <div>
              <p className="mini-label">Explore</p>
              {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            </div>
            <div>
              <p className="mini-label">Official links</p>
              <a href="https://www.ieee-ras.org/about-ras" target="_blank" rel="noreferrer">About RAS</a>
              <a href="https://www.ieee-ras.org/publications" target="_blank" rel="noreferrer">Publications</a>
              <a href="https://www.ieee-ras.org/conferences-workshops/fully-sponsored" target="_blank" rel="noreferrer">Conferences</a>
              <a href="https://www.ieee-ras.org/technical-committees" target="_blank" rel="noreferrer">Technical committees</a>
              <a href={SITE.membership} target="_blank" rel="noreferrer">Membership</a>
            </div>
          </div>
        </div>
        <details className="sources">
          <summary>Sources: every fact on this site comes from public information</summary>
          <ul>{SOURCES.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
        </details>
        <div className="footer__bottom">
          <span>Unofficial concept site, built as a Web Development recruitment project for IEEE RAS VIT Chennai using publicly available information.</span>
          <span>Not affiliated with or endorsed by IEEE. For official information visit ieee-ras.org.</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
export default function Site() {
  const [dark, setDark] = useState(false);
  useReveal();
  useEffect(() => {
    let initial = false;
    try {
      const saved = localStorage.getItem("ras-theme");
      initial = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { /* storage blocked */ }
    setDark(initial);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  const toggle = () => setDark((d) => {
    try { localStorage.setItem("ras-theme", d ? "light" : "dark"); } catch { /* ignore */ }
    return !d;
  });

  return (
    <>
      <a href="#about" className="skip">Skip to content</a>
      <Nav dark={dark} onTheme={toggle} />
      <main>
        <Hero dark={dark} />
        <About />
        <History />
        <Publications />
        <Conferences />
        <Community />
        <Awards />
        <Join />
        <Faq />
      </main>
      <Footer />
      {SITE.agentUrl && (
        <a className="agent-fab" href={SITE.agentUrl} target="_blank" rel="noreferrer" aria-label="Ask the RAS CORE AI agent">
          <IconSpark /> <span>Ask RAS CORE</span>
        </a>
      )}
    </>
  );
}
