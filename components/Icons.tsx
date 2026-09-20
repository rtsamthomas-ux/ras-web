// Small inline SVG icons (no icon library needed).
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", width: 24, height: 24 };

export const IconArrow = ({ className }: P) => (<svg {...base} className={className} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const IconExternal = ({ className }: P) => (<svg {...base} className={className} width={14} height={14} aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>);
export const IconSun = ({ className }: P) => (<svg {...base} className={className} width={18} height={18}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>);
export const IconMoon = ({ className }: P) => (<svg {...base} className={className} width={18} height={18}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>);
export const IconMenu = ({ className }: P) => (<svg {...base} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const IconClose = ({ className }: P) => (<svg {...base} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconMail = ({ className }: P) => (<svg {...base} className={className} width={18} height={18}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const IconSpark = ({ className }: P) => (<svg {...base} className={className} width={18} height={18}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>);

export const WorkIcon = ({ id, className }: { id: string } & P) => {
  if (id === "hw") return (<svg {...base} className={className} width={40} height={40}><rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" /><circle cx="12" cy="12" r="1.5" /></svg>);
  if (id === "sw") return (<svg {...base} className={className} width={40} height={40}><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M9 9l-2 2 2 2M15 9l2 2-2 2M13 8l-2 6" /></svg>);
  if (id === "ai") return (<svg {...base} className={className} width={40} height={40}><circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="12" r="2.5" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M7.5 7.5l2.8 2.8M16.5 7.5l-2.8 2.8M7.5 16.5l2.8-2.8M16.5 16.5l-2.8-2.8" /></svg>);
  return (<svg {...base} className={className} width={40} height={40}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14.5 14.3c.8-.2 1.6-.3 2.5-.3 2.5 0 4 1.8 4 4.5" /></svg>);
};
