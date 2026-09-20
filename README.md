# IEEE RAS — Website

A modern, responsive website for the **IEEE Robotics and Automation Society (RAS)**, the global society, built entirely from publicly available information. It is an unofficial concept site made for the IEEE RAS VIT Chennai Web Development recruitment task.

**Highlights**

- **Interactive 3D robot arm** (Three.js): a 4-DOF arm solved with analytic **inverse kinematics** follows your cursor across the table. **Click to pick up and place blocks**, which fall with gravity, stack into towers and tip off edges. A live telemetry panel shows the joint angles (J1–J4), the target coordinates and the gripper state. On phones it runs an automatic demo path.
- **Engineering-blueprint design**: paper and grid background, serif + grotesk type pairing, signal-orange accents, and a full **light/dark theme** (follows the system setting and remembers your choice, with no flash on load).
- **Sections**: Mission, vision and field of interest · History timeline (1984 → 2027) and leadership · all ten journals and magazines (each linking to its official page and IEEE Xplore), an RA-L spotlight and IEEE robotics standards · ICRA / IROS / CASE with a **live ICRA 2027 countdown**, plus 10 more fully sponsored conferences · Technical committees, 220+ chapters, grants and education programmes · the 12 Society awards · Membership benefits · FAQ.
- **Responsive** from 360 px phones to wide desktops, with a full-screen mobile menu.
- **Accessible**: semantic HTML, a skip link, keyboard-friendly accordions, visible focus states and `prefers-reduced-motion` support.
- **Fast**: a static export (plain HTML/CSS/JS), self-hosted fonts, the 3D scene lazy-loaded and paused when off-screen, and scroll-reveal animations using IntersectionObserver.
- **Everything is clickable**: 90+ verified links. Click any journal, conference, award, standard, programme or timeline card and it opens that official page in a new tab. Publications have an **Open** button.
- **Honest content**: every fact lives in `lib/content.ts` with its public source, and all sources are listed in the footer.

## Tech

Next.js 16 (App Router, static export) · React 19 · TypeScript · Three.js · hand-written CSS (no UI framework) · Fontsource (Instrument Serif, Inter Tight, JetBrains Mono).

## Project structure

| Path | What it is |
|---|---|
| `lib/content.ts` | **All the text and data on the site.** Edit this to update content |
| `components/Site.tsx` | Page sections (nav, hero, about, history, publications, conferences, community, awards, membership, FAQ, footer) |
| `components/RobotArm.tsx` | The Three.js robot arm with inverse kinematics and pick-and-place |
| `components/hooks.ts` | Scroll reveal, count-up numbers, countdown timer |
| `app/globals.css` | Design system: tokens, light/dark themes, layout, responsive rules |

## Run locally

Requires **Node.js 20+**.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site generated in /out
```

## Link to the RAS CORE AI agent (optional)

To show an **“Ask RAS CORE”** button, set this environment variable, both locally in `.env.local` and on Vercel:

```
NEXT_PUBLIC_AGENT_URL=https://your-ras-core.vercel.app
```

## Deploy on Vercel (free)

1. Push this folder to its own GitHub repository.
2. Go to vercel.com → **Add New → Project** → import the repository. Next.js is detected automatically.
3. (Optional) Add `NEXT_PUBLIC_AGENT_URL` under Environment Variables.
4. Click **Deploy**. Every push to `main` redeploys.

The build output is fully static (`/out`), so it can also be hosted on Netlify or GitHub Pages.

## Sources

ieee-ras.org (about, membership, chapters, executive committee, publications, RA-L, conferences, technical committees, awards, educational activities, Distinguished Lecturer Program) · sagroups.ieee.org/ras-sc (standards) · 2026.ieee-icra.org · 2027.ieee-icra.org · Wikipedia (IEEE Transactions on Robotics, IROS).

*Unofficial concept site, not affiliated with or endorsed by IEEE. For official information visit ieee-ras.org.*
