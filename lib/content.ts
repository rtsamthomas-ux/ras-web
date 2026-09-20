// All site content in one place. Every fact comes from a public source (listed in SOURCES).
// Edit this file to update the website — no need to touch the components.

const RAS = "https://www.ieee-ras.org";
const XPLORE = (n: string) => `https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=${n}`;

export const SITE = {
  name: "IEEE RAS",
  full: "IEEE Robotics and Automation Society",
  official: "https://www.ieee-ras.org/",
  membership: "https://www.ieee-ras.org/membership",
  // Official "Join the Robotics and Automation Society" link (from ieee-ras.org/membership)
  join: "https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMRA024",
  chapterExample: { name: "IEEE RAS Student Chapter, VIT Chennai", href: "https://www.ieeerasvitc.tech/" },
  // Optional: link to your deployed RAS CORE agent (set NEXT_PUBLIC_AGENT_URL in Vercel, or edit here)
  agentUrl: process.env.NEXT_PUBLIC_AGENT_URL || "",
};

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#history", label: "History" },
  { href: "#publications", label: "Publications" },
  { href: "#conferences", label: "Conferences" },
  { href: "#community", label: "Community" },
  { href: "#awards", label: "Awards" },
  { href: "#faq", label: "FAQ" },
];

export const STATS = [
  { value: 19000, suffix: "+", label: "members around the world" },
  { value: 220, suffix: "+", label: "local & student chapters" },
  { value: 47, suffix: "", label: "technical committees" },
  { value: 1987, suffix: "", label: "year it became an IEEE Society", plain: true },
];

export const MISSION = {
  mission:
    "Foster the development and facilitate the exchange of scientific and technological knowledge in Robotics and Automation that benefits members, the profession and humanity.",
  vision: "Be the most recognized and respected global organization in Robotics and Automation.",
  robotics:
    "Robotic systems with sensors and actuators that operate autonomously or semi-autonomously, often in cooperation with humans, with an emphasis on intelligence and the ability to adapt to their environment.",
  automation:
    "The efficiency, productivity, quality and reliability of autonomous systems, particularly those working in structured environments such as factories.",
};

export const PILLARS = [
  { href: "#publications", k: "Publish", v: "Ten journals and magazines, from T-RO and RA-L to the new Transactions on Soft Robotics." },
  { href: "#conferences", k: "Convene", v: "ICRA, IROS, CASE and a family of specialist conferences worldwide." },
  { href: "#community", k: "Connect", v: "47 technical committees and 220+ chapters across the globe." },
  { href: "#community", k: "Educate", v: "Distinguished lecturers, summer schools, competitions and video libraries." },
  { href: "#awards", k: "Recognize", v: "Awards for pioneers, early-career researchers, products and chapters." },
  { href: "#publications", k: "Standardize", v: "IEEE standards for robot ontologies, maps and ethical design." },
];

export const TIMELINE = [
  { year: "1984", href: `${RAS}/about-ras`, title: "Robotics & Automation Council", text: "Eight IEEE societies, including the Control Systems and Computer Societies, form a council led by George Saridis." },
  { year: "1985", href: "https://en.wikipedia.org/wiki/IEEE_Transactions_on_Robotics", title: "A journal is born", text: "The IEEE Journal of Robotics and Automation begins publishing." },
  { year: "1987", href: `${RAS}/about-ras`, title: "A full IEEE Society", text: "The council becomes the IEEE Robotics and Automation Society." },
  { year: "1988", href: "https://en.wikipedia.org/wiki/International_Conference_on_Intelligent_Robots_and_Systems", title: "First IROS", text: "The first IEEE/RSJ IROS is held at the Tokyo University of Science, Japan." },
  { year: "1989", href: "https://en.wikipedia.org/wiki/IEEE_Transactions_on_Robotics", title: "Transactions", text: "The journal becomes IEEE Transactions on Robotics and Automation." },
  { year: "2004", href: `${RAS}/publications/t-ro/`, title: "Robotics & automation split", text: "The journal splits: robotics continues as IEEE Transactions on Robotics (T-RO)." },
  { year: "2015", href: `${RAS}/publications/ra-l/`, title: "RA-L launches", text: "IEEE Robotics and Automation Letters launches on June 1 for rapid publication." },
  { year: "2027", href: "https://2027.ieee-icra.org/", title: "ICRA in Seoul", text: "After ICRA 2026 in Vienna, the flagship heads to Seoul, May 24–28." },
];

export const PUBLICATIONS = [
  { code: "T-RO", name: "Transactions on Robotics", text: "Major advances in all areas of robotics.", kind: "Sponsored", href: `${RAS}/publications/t-ro/`, xplore: XPLORE("8860") },
  { code: "RA-L", name: "Robotics and Automation Letters", text: "Rapid dissemination of new results.", kind: "Sponsored", href: `${RAS}/publications/ra-l/`, xplore: XPLORE("7083369") },
  { code: "T-ASE", name: "Trans. on Automation Science & Eng.", text: "Automation science and engineering.", kind: "Sponsored", href: `${RAS}/publications/t-ase/`, xplore: XPLORE("8856") },
  { code: "RA-M", name: "Robotics & Automation Magazine", text: "Quarterly; research, reviews and columns.", kind: "Sponsored", href: "https://ramagazine.ieee.org/", xplore: XPLORE("100") },
  { code: "RA-P", name: "Robotics & Automation Practice", text: "Applied work from real-world deployments.", kind: "Sponsored", href: `${RAS}/publications/ra-p/`, xplore: XPLORE("10347232") },
  { code: "T-FR", name: "Transactions on Field Robotics", text: "Robots working out in the field. Open access.", kind: "Sponsored", href: `${RAS}/publications/t-fr/`, xplore: XPLORE("10495159") },
  { code: "T-SRO", name: "Transactions on Soft Robotics", text: "Fundamental advances in soft robotics.", kind: "New", href: `${RAS}/publications/t-sro/`, xplore: "" },
  { code: "T-RL", name: "Transactions on Robot Learning", text: "AI methods for robotic and automation systems.", kind: "Co-sponsored", href: `${RAS}/publications/t-rl/`, xplore: "" },
  { code: "ToH", name: "Transactions on Haptics", text: "Haptic systems and touch feedback.", kind: "Co-sponsored", href: `${RAS}/publications/toh`, xplore: XPLORE("4543165") },
  { code: "T-MRB", name: "Trans. on Medical Robotics & Bionics", text: "Medical robotics and bionics research.", kind: "Co-sponsored", href: `${RAS}/publications/t-mrb`, xplore: XPLORE("8253409") },
];

export const RAL_LINK = `${RAS}/publications/ra-l/`;
export const RAL = [
  { k: "Launched", v: "June 1, 2015" },
  { k: "Format", v: "6 pages (+2 paid)" },
  { k: "Decisions", v: "Most within 6 months" },
  { k: "Present at", v: "ICRA · IROS · CASE" },
];

export const CONFERENCES = [
  {
    code: "ICRA",
    name: "International Conference on Robotics and Automation",
    text: "The Society's flagship, fully sponsored conference: papers, workshops, tutorials and exhibits.",
    next: "Seoul, Republic of Korea · May 24–28, 2027",
    countdownTo: "2027-05-24T09:00:00+09:00",
    href: "https://2027.ieee-icra.org/",
  },
  {
    code: "IROS",
    name: "Intelligent Robots and Systems",
    text: "The IEEE/RSJ conference ranked alongside ICRA as a premier venue, held every year since 1988.",
    next: "2026 Pittsburgh, USA · 2027 Florence, Italy",
    href: "https://2026.ieee-iros.org/",
  },
  {
    code: "CASE",
    name: "Automation Science and Engineering",
    text: "The fully sponsored flagship conference for automation.",
    next: "CASE 2026 · Shenyang, China (August)",
    href: "https://2026.ieeecase.org/",
  },
];

const FULLY = `${RAS}/conferences-workshops/fully-sponsored/`;
export const CONF_CALENDAR = FULLY;
export const MORE_CONFERENCES = [
  { code: "Humanoids", name: "Humanoid Robots · 2026", href: "https://2026.ieee-humanoids.org/" },
  { code: "RoboSoft", name: "Soft Robotics · 2026 Kanazawa", href: "https://www.robosoft2026.org/" },
  { code: "HAPTICS", name: "Haptics Symposium", href: FULLY },
  { code: "WHC", name: "World Haptics Conference", href: FULLY },
  { code: "SSRR", name: "Safety, Security & Rescue Robotics", href: FULLY },
  { code: "ICAR", name: "Advanced Robotics", href: FULLY },
  { code: "ARSO", name: "Advanced Robotics & its Social Impacts", href: FULLY },
  { code: "MRS", name: "Multi-Robot & Multi-Agent Systems", href: FULLY },
  { code: "CBS", name: "Cyborg and Bionic Systems", href: FULLY },
  { code: "ERAS", name: "Engineering Reliable Autonomous Systems", href: FULLY },
];

export const TC_LINK = `${RAS}/technical-committees`;
export const TC_CLUSTERS = [
  "Robotics Foundation",
  "Automation",
  "Human-Centered & Lifelike Robotics",
  "Field Robotics",
  "Health & Medical Robotics",
];
export const TC_GOLD = ["Haptics", "Humanoid Robotics", "Multi-Robot Systems", "Soft Robotics"];
export const TC_BLUE = ["Aerial Robotics & UAVs", "Agricultural Robotics & Automation", "Computer & Robot Vision", "Optimization for Robotics", "Robot Control"];

export const CHAPTERS = {
  href: `${RAS}/membership/chapters`,
  text: "More than 220 local and student branch chapters across IEEE's regions sponsor mini-symposia, student competitions and continuing-education workshops, so engineers anywhere can find a robotics community nearby.",
  grants: [
    { k: "Chapter start-up grant", v: "$500" },
    { k: "Chapter initiative grant", v: "up to $2,000" },
    { k: "Distinguished Lecturer travel support", v: "up to $5,000" },
  ],
};

export const EDUCATION = [
  { href: `${RAS}/educational-activities/distinguished-lecturer-program`, title: "Distinguished Lecturer Program", text: "Chapters and student branches can host renowned robotics experts. Lecturers are nominated by technical committees and serve three-year terms." },
  { href: `${RAS}/educational-activities`, title: "Summer Schools", text: "Intensive schools that bring students and researchers together around focused robotics topics." },
  { href: `${RAS}/educational-activities`, title: "Competitions", text: "Student and professional competitions, from conference challenges to chapter events." },
  { href: `${RAS}/educational-activities`, title: "Resource Center", text: "Conference videos and expert lectures, available online to members." },
  { href: `${RAS}/educational-activities`, title: "Pre-college resources", text: "Materials and programmes that bring robotics to students before university." },
];

export const STANDARDS_LINK = "https://sagroups.ieee.org/ras-sc/standards/";
export const STANDARDS = [
  { code: "IEEE 1872-2015", name: "Ontologies for Robotics and Automation" },
  { code: "IEEE 1873-2015", name: "Robot Map Data Representation for Navigation" },
  { code: "IEEE 1872.2-2021", name: "Autonomous Robotics (AuR) Ontology" },
  { code: "IEEE 7007-2021", name: "Ontological Standard for Ethically Driven Robotics and Automation Systems" },
];

export const AWARDS = [
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/pioneer-in-robotics-and-automation-award/", name: "Pioneer in Robotics and Automation Award", text: "Pioneering contributions to the field." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-ras-george-saridis-leadership-award-in-robotics-and-automation/", name: "George Saridis Leadership Award", text: "Exceptional leadership in robotics and automation." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/early-academic-career-award-in-robotics-and-automation/", name: "Early Academic Career Award", text: "Early-career academics advancing the field." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/early-government-or-industry-career-award-in-robotics-and-automation/", name: "Early Government or Industry Career Award", text: "Early-career professionals in government or industry." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-ras-distinguished-service-award/", name: "Distinguished Service Award", text: "Significant service to IEEE RAS." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-ras-distinguished-student-leadership-award/", name: "Distinguished Student Leadership Award", text: "Outstanding student leadership." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-international-conference-on-robotics-and-automation-most-influential-paper-award/", name: "ICRA Most Influential Paper Award", text: "ICRA papers with exceptional lasting impact." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-inaba-technical-award-for-innovation-leading-to-production/", name: "Inaba Technical Award", text: "Innovation that led to production." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-robotics-and-automation-award-for-product-innovation/", name: "Award for Product Innovation", text: "Innovative robotics and automation products." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-ifr-innovation-and-entrepreneurship-award-iera/", name: "IEEE/IFR Innovation & Entrepreneurship Award", text: "Innovation and entrepreneurship in robotics." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ras-most-active-technical-committee-award/", name: "Most Active Technical Committee", text: "The most active technical committee." },
  { href: "https://www.ieee-ras.org/awards-recognition/society-awards/ieee-robotics-and-automation-society-student-branch-chapter-of-the-year-award/", name: "Chapter of the Year", text: "Outstanding section and student branch chapters." },
];

export const LEADERSHIP_LINK = `${RAS}/about-ras/governance/executive-committee/`;
export const LEADERSHIP = [
  { role: "President", name: "Nancy Amato", org: "University of Illinois Urbana" },
  { role: "President-Elect", name: "Kyu-Jin Cho", org: "Seoul National University" },
  { role: "Junior Past President", name: "Aude Billard", org: "EPFL" },
  { role: "Senior Past President", name: "Frank Park", org: "Seoul National University" },
];

export const MEMBERSHIP = [
  "Online access to T-RO, T-ASE, RA-L and IEEE Robotics & Automation Magazine",
  "IEEE Xplore and the RAS Digital Conference Library",
  "The RAS Resource Center: conference videos and expert lectures",
  "Local chapters in 40+ countries",
  "Membership in 40+ technical committees",
  "Discounts and a conference calendar covering ICRA, CASE and IROS",
];

export const FAQ = [
  { q: "What is IEEE RAS?", a: "The IEEE Robotics and Automation Society is IEEE's professional society for robotics and automation. It began as a council in 1984, became a full society in 1987, and today has 19,000+ members, 220+ chapters and 47 technical committees." },
  { q: "What's the difference between ICRA, IROS and CASE?", a: "ICRA is the Society's fully sponsored flagship robotics conference. IROS is the IEEE/RSJ conference on intelligent robots and systems, co-sponsored by RAS and held annually since 1988. CASE is the fully sponsored flagship conference for automation science and engineering." },
  { q: "Where should I publish my robotics research?", a: "T-RO publishes original research in robotics theory and applications. RA-L offers rapid 6-page papers, with most decisions within 6 months, and accepted papers can be presented at ICRA, IROS or CASE. T-ASE covers automation, and RA-M reaches practitioners." },
  { q: "What do technical committees do?", a: "Technical committees are research communities that track developments in specific areas, such as humanoids, soft robotics or robot vision, and encourage innovation. There are 47, grouped into five clusters, and joining them is a membership benefit." },
  { q: "How can students get involved?", a: "Join IEEE and RAS, then find or start a student branch chapter at your university. Chapters can host Distinguished Lecturers, apply for start-up and initiative grants, run competitions, and take part in student activities at RAS conferences." },
  { q: "Does IEEE RAS publish standards?", a: "Yes. Its standards committee has produced IEEE 1872-2015 (ontologies for robotics and automation), IEEE 1873-2015 (robot map data), IEEE 1872.2-2021 (autonomous robotics ontology) and IEEE 7007-2021 (ethically driven robotics)." },
];

export const SOURCES = [
  { label: "IEEE RAS — About", href: "https://www.ieee-ras.org/about-ras" },
  { label: "IEEE RAS — Membership", href: "https://www.ieee-ras.org/membership" },
  { label: "IEEE RAS — Chapters", href: "https://www.ieee-ras.org/membership/chapters" },
  { label: "IEEE RAS — Executive Committee", href: "https://www.ieee-ras.org/about-ras/governance/executive-committee/" },
  { label: "IEEE RAS — Publications", href: "https://www.ieee-ras.org/publications" },
  { label: "IEEE RAS — RA-L", href: "https://www.ieee-ras.org/publications/ra-l" },
  { label: "IEEE RAS — Fully sponsored conferences", href: "https://www.ieee-ras.org/conferences-workshops/fully-sponsored" },
  { label: "IEEE RAS — Technical Committees", href: "https://www.ieee-ras.org/technical-committees" },
  { label: "IEEE RAS — Society Awards", href: "https://www.ieee-ras.org/awards-recognition/society-awards" },
  { label: "IEEE RAS — Educational Activities", href: "https://www.ieee-ras.org/educational-activities" },
  { label: "IEEE RAS — Distinguished Lecturer Program", href: "https://www.ieee-ras.org/educational-activities/distinguished-lecturer-program" },
  { label: "IEEE RAS Standards Committee", href: "https://sagroups.ieee.org/ras-sc/standards/" },
  { label: "ICRA 2026", href: "https://2026.ieee-icra.org/attend/" },
  { label: "ICRA 2027", href: "https://2027.ieee-icra.org/" },
  { label: "IEEE Transactions on Robotics (Wikipedia)", href: "https://en.wikipedia.org/wiki/IEEE_Transactions_on_Robotics" },
  { label: "IROS (Wikipedia)", href: "https://en.wikipedia.org/wiki/International_Conference_on_Intelligent_Robots_and_Systems" },
];
