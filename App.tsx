import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, Mail, MapPin, Linkedin,
  Building2, BarChart3, ClipboardList, Plus, Minus,
} from "lucide-react";

type Page =
  | "home"
  | "about"
  | "asset-management"
  | "venue-advisory"
  | "facility-assessment"
  | "contact";

// ── Brand tokens ──────────────────────────────────────────────────────
const NAVY   = "#00245D";
const RED    = "#CE0E2C";
const BLUE   = "#038DCE";
const GRAY_D = "#5F6061";
const GRAY_M = "#888888";
const GRAY_L = "#C6C6C6";
const OFFWHT = "#F2F2F2";
const BTINT  = "#EBF3FA";
const F      = "Arial, system-ui, sans-serif";

// ── Hero image rotation ───────────────────────────────────────────────
const HERO_IMAGES = [
  { src: "https://images.unsplash.com/photo-1515868769-ad822a0c67e9?w=1400&h=900&fit=crop&auto=format", alt: "City skyline aerial" },
  { src: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=1400&h=900&fit=crop&auto=format", alt: "Baseball stadium venue" },
  { src: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=1400&h=900&fit=crop&auto=format", alt: "Hockey arena venue" },
  { src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1400&h=900&fit=crop&auto=format", alt: "Basketball arena venue" },
];

// ── Logo ──────────────────────────────────────────────────────────────
function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  const wordColor = light ? "#fff" : NAVY;
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 focus:outline-none"
      aria-label="Ardent Advisory home"
      style={{ background: "none", border: "none", cursor: onClick ? "pointer" : "default", padding: 0 }}
    >
      <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden="true">
        <rect x="0" y="0"  width="34" height="12" fill={light ? "#fff" : NAVY} />
        <rect x="0" y="14" width="34" height="5"  fill={RED} />
        <rect x="0" y="21" width="22" height="4"  fill={light ? "rgba(255,255,255,0.45)" : NAVY} opacity="0.6" />
      </svg>
      <div>
        <span style={{ fontFamily: F, fontSize: 16, fontWeight: 700, letterSpacing: "0.09em", color: wordColor, textTransform: "uppercase", display: "block", lineHeight: 1 }}>
          Ardent Advisory
        </span>
      </div>
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ margin: "24px 0" }}>
      <div style={{ height: 4, background: NAVY }} />
      <div style={{ height: 2, background: RED, marginTop: 2 }} />
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.07em", paddingBottom: 10, borderBottom: `4px solid ${RED}`, display: "inline-block", margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

// ── Sub heading ───────────────────────────────────────────────────────
function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: BLUE, marginBottom: 12, lineHeight: 1.3 }}>
      {children}
    </h3>
  );
}

// ── Body text ─────────────────────────────────────────────────────────
function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", maxWidth: 720, margin: "0 0 14px", ...style }}>
      {children}
    </p>
  );
}

// ── Bullet list ───────────────────────────────────────────────────────
function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul style={{ paddingLeft: 20, marginTop: 10, marginBottom: 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", marginBottom: 6 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Primary button ────────────────────────────────────────────────────
function BtnPrimary({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ fontFamily: F, fontSize: 15, fontWeight: 700, padding: "12px 24px", borderRadius: 4, border: "none", cursor: "pointer", background: hov ? "#001840" : NAVY, color: "#fff", transition: "background 200ms", letterSpacing: "0.03em", ...style }}
    >
      {children}
    </button>
  );
}

// ── Secondary button ──────────────────────────────────────────────────
function BtnSecondary({ children, onClick, light = false }: { children: React.ReactNode; onClick?: () => void; light?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ fontFamily: F, fontSize: 15, fontWeight: 700, padding: "12px 24px", borderRadius: 4, border: `1px solid ${light ? "#fff" : NAVY}`, cursor: "pointer", background: hov ? (light ? "#fff" : NAVY) : "transparent", color: hov ? (light ? NAVY : "#fff") : (light ? "#fff" : NAVY), transition: "all 200ms", letterSpacing: "0.03em" }}
    >
      {children}
    </button>
  );
}

// ── Independence callout ───────────────────────────────────────────────
function IndependenceCallout() {
  return (
    <div style={{ borderLeft: `4px solid ${NAVY}`, background: BTINT, padding: "24px 32px" }}>
      <p style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: NAVY, margin: "0 0 12px" }}>
        No design contract. No management agreement. No operator relationship to protect.
      </p>
      <p style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", margin: "0 0 12px", maxWidth: 720 }}>
        Every engagement is structured entirely around the owner's interest. The analysis reflects what is actually there. The recommendations reflect what you actually need. The advice does not change based on who else is in the room.
      </p>
      <p style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: NAVY, margin: 0 }}>
        That independence is not a marketing position. It is how we work.
      </p>
    </div>
  );
}

// ── Client type grid ──────────────────────────────────────────────────
function ClientTypeGrid() {
  const cols = [
    {
      heading: "Asset Owners & Investors",
      items: ["Commercial real estate ownership groups", "Institutional investors and family offices", "Private equity with asset-level operations", "REIT and portfolio owners", "Mixed-use development"],
    },
    {
      heading: "Public Sector",
      items: ["Municipal governments and public agencies", "Convention and visitors bureaus", "Public assembly authorities", "University systems and higher education", "Stadium and arena authorities"],
    },
    {
      heading: "Sports & Entertainment",
      items: ["Professional sports franchise ownership", "Arena and stadium operators", "Convention center owners", "Performing arts authorities", "Minor and independent league facilities"],
    },
  ];
  return (
    <div>
      <SectionHeading>Who We Serve</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: GRAY_L }}>
        {cols.map((col) => (
          <div key={col.heading} style={{ background: "#fff" }}>
            <div style={{ background: NAVY, padding: "12px 20px" }}>
              <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {col.heading}
              </span>
            </div>
            <ul style={{ padding: "16px 20px 16px 36px", margin: 0, listStyle: "disc" }}>
              {col.items.map((item, i) => (
                <li key={i} style={{ fontFamily: F, fontSize: 15, lineHeight: 1.6, color: "#000", marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CTA banner ────────────────────────────────────────────────────────
function CTABanner({ headline, subtext, btnLabel, onBtn }: { headline: string; subtext: string; btnLabel: string; onBtn?: () => void }) {
  return (
    <div style={{ background: NAVY, padding: "56px 32px", textAlign: "center" }}>
      <h2 style={{ fontFamily: F, fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 16px", letterSpacing: "0.01em" }}>
        {headline}
      </h2>
      <p style={{ fontFamily: F, fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 auto 28px", maxWidth: 560 }}>
        {subtext}
      </p>
      <BtnPrimary onClick={onBtn} style={{ background: RED, fontSize: 16 }}>
        {btnLabel}
      </BtnPrimary>
    </div>
  );
}

// ── FAQ accordion ─────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What makes Ardent Advisory different from other facility consultants?",
    a: "Independence. We carry no design contract, no management agreement, and no operator relationship that shapes our analysis. When we assess your facility or advise on a project, the only interest we serve is yours. Most advisory in this sector comes with an agenda attached. Ours does not.",
  },
  {
    q: "What types of facilities do you work with?",
    a: "Sports stadiums and arenas, convention centers, performing arts venues, Class A commercial office properties, mixed-use developments, university and higher education facilities, and public assembly venues of all types. Our methodology applies across every complex facility type because the operational challenges are fundamentally similar regardless of what happens inside the building.",
  },
  {
    q: "What is a Facility Condition Assessment?",
    a: "An FCA is a comprehensive, system-by-system evaluation of your facility's physical condition: structural, mechanical, electrical, plumbing, life safety, technology, and building envelope. The result is an accurate baseline document that identifies deficiencies, prioritizes remediation, and gives you the data you need for capital planning, bond financing, lease negotiations, or management contract discussions. Our FCAs go further than most because we bring operational experience inside these buildings, not just engineering analysis from outside.",
  },
  {
    q: "How is a Long-Term Capital Needs Assessment different from an FCA?",
    a: "The FCA tells you what your building needs today. The LTCNA tells you what it will need over the next 10, 15, or 20 years, modeling the cost and timing of system replacements, major repairs, and capital upgrades across the full facility lifecycle. Together, they give you both the snapshot and the strategy.",
  },
  {
    q: "Do you work with public agencies and municipal governments?",
    a: "Yes. Municipal governments, public assembly authorities, convention and visitors bureaus, university systems, and stadium and arena authorities are core clients. We understand public procurement, public accountability, and the specific requirements of advising on publicly funded or publicly owned facilities.",
  },
  {
    q: "At what stage of a project should we engage Ardent Advisory?",
    a: "As early as possible, ideally before architects or design teams are selected. The programming and pre-design decisions made in the first six months of a project determine facility performance for the next 30 years. Engaging an independent owner's advisor before the design team is in the room is the single highest-value decision a facility owner can make. That said, we also work with owners on existing facilities. Operational reviews, FCAs, capital planning, and management contract advisory are equally core to our practice.",
  },
  {
    q: "Do you provide ongoing advisory, or only project-based engagements?",
    a: "Both. We work on a project basis for specific engagements like FCAs, programming, and pre-opening advisory. We also provide ongoing operational advisory and asset management support through retainer arrangements, particularly for owners managing large or complex facility portfolios who benefit from consistent, independent counsel.",
  },
  {
    q: "How do I get started?",
    a: "Contact us through the form on this site or reach us directly by email. We keep introductory conversations simple. Tell us about your facility, what you are facing, and what you need to know. We will tell you honestly whether we can help and how. No pitch. No proposal until you are ready.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      {FAQS.map((faq, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${GRAY_L}` }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: "100%", textAlign: "left", padding: "18px 0", fontFamily: F, fontSize: 16, fontWeight: 700, color: open === i ? BLUE : "#000", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, transition: "color 200ms" }}
          >
            {faq.q}
            <span style={{ flexShrink: 0, color: open === i ? BLUE : GRAY_D }}>
              {open === i ? <Minus size={16} /> : <Plus size={16} />}
            </span>
          </button>
          {open === i && (
            <p style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", paddingBottom: 18, maxWidth: 720, margin: 0 }}>
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Service block ─────────────────────────────────────────────────────
function ServiceBlock({ title, paras, bullets }: { title: string; paras: (string | React.ReactNode)[]; bullets: string[] }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <SubHeading>{title}</SubHeading>
      {paras.map((p, i) => (
        typeof p === "string"
          ? <Body key={i}>{p}</Body>
          : <div key={i}>{p}</div>
      ))}
      <Bullets items={bullets} />
    </div>
  );
}

// ── Page header band ──────────────────────────────────────────────────
function PageHeader({ h1, sub, img }: { h1: string; sub?: string; img?: string }) {
  return (
    <div style={{ background: NAVY, position: "relative", overflow: "hidden" }}>
      {img && (
        <>
          <img src={img} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.2 }} />
          <div style={{ position: "absolute", inset: 0, background: `${NAVY}cc` }} />
        </>
      )}
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "60px 32px" }}>
        <h1 style={{ fontFamily: F, fontSize: 36, fontWeight: 700, color: "#fff", margin: sub ? "0 0 14px" : 0, letterSpacing: "0.01em" }}>
          {h1}
        </h1>
        {sub && (
          <p style={{ fontFamily: F, fontSize: 18, color: "rgba(255,255,255,0.82)", maxWidth: 680, lineHeight: 1.5, margin: 0 }}>
            {sub}
          </p>
        )}
      </div>
      <div style={{ height: 4, background: RED }} />
    </div>
  );
}

// ── Max-width container ───────────────────────────────────────────────
function Wrap({ children, py = 64 }: { children: React.ReactNode; py?: number }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: `${py}px 32px` }}>
      {children}
    </div>
  );
}

// ── Global nav ────────────────────────────────────────────────────────
function GlobalNav({ page, go }: { page: Page; go: (p: Page) => void }) {
  const [mobile, setMobile]     = useState(false);
  const [svcsOpen, setSvcsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const svcPages: Page[] = ["asset-management", "venue-advisory", "facility-assessment"];

  function nav(p: Page) { go(p); setMobile(false); setSvcsOpen(false); }

  function openSvcs() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSvcsOpen(true);
  }
  function closeSvcs() {
    closeTimer.current = setTimeout(() => setSvcsOpen(false), 180);
  }

  return (
    // Nav is always navy — no transparency
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: NAVY, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo light onClick={() => nav("home")} />

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ gap: 32 }}>
          {(["home", "about"] as Page[]).map((p) => (
            <NLink key={p} label={p === "home" ? "Home" : "About"} active={page === p} onClick={() => nav(p)} />
          ))}

          {/* Services dropdown */}
          <div style={{ position: "relative" }} onMouseEnter={openSvcs} onMouseLeave={closeSvcs}>
            <button style={{ fontFamily: F, fontSize: 14, color: "#fff", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "4px 0", borderBottom: `2px solid ${svcPages.includes(page) ? RED : "transparent"}`, transition: "border-color 200ms" }}>
              Services <ChevronDown size={13} />
            </button>
            {svcsOpen && (
              <div
                onMouseEnter={openSvcs}
                onMouseLeave={closeSvcs}
                style={{ position: "absolute", top: "100%", left: 0, paddingTop: 8, zIndex: 200, minWidth: 270 }}
              >
                <div style={{ background: "#fff", border: `1px solid ${GRAY_L}`, boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
                  {[
                    { label: "Asset & Property Management", p: "asset-management" as Page },
                    { label: "Venue & Facility Advisory",   p: "venue-advisory"   as Page },
                    { label: "Facility Condition Assessment",p: "facility-assessment" as Page },
                  ].map(({ label, p }) => (
                    <button key={p} onClick={() => nav(p)}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 20px", fontFamily: F, fontSize: 14, color: page === p ? BLUE : "#000", background: page === p ? OFFWHT : "#fff", border: "none", borderLeft: `3px solid ${page === p ? RED : "transparent"}`, cursor: "pointer", transition: "all 180ms" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = OFFWHT; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = page === p ? OFFWHT : "#fff"; }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NLink label="Contact" active={page === "contact"} onClick={() => nav("contact")} />

          <a href="mailto:info@ardentadvisory.co" style={{ fontFamily: F, fontSize: 13, color: "rgba(255,255,255,0.75)", textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
            <Mail size={13} /> info@ardentadvisory.co
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobile(!mobile)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }} aria-label="Toggle menu">
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div style={{ background: NAVY, borderTop: "1px solid rgba(255,255,255,0.12)", padding: "12px 32px 20px" }}>
          {([
            { label: "Home",                          p: "home"                },
            { label: "About",                         p: "about"               },
            { label: "Asset & Property Management",   p: "asset-management"    },
            { label: "Venue & Facility Advisory",     p: "venue-advisory"      },
            { label: "Facility Condition Assessment", p: "facility-assessment" },
            { label: "Contact",                       p: "contact"             },
          ] as { label: string; p: Page }[]).map(({ label, p }) => (
            <button key={p} onClick={() => nav(p)} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 0", fontFamily: F, fontSize: 16, color: page === p ? RED : "#fff", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function NLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: F, fontSize: 14, color: "#fff", background: "none", border: "none", cursor: "pointer", padding: "4px 0", borderBottom: `2px solid ${active || hov ? RED : "transparent"}`, transition: "border-color 200ms" }}>
      {label}
    </button>
  );
}

// ── Global footer ─────────────────────────────────────────────────────
function GlobalFooter({ go }: { go: (p: Page) => void }) {
  return (
    <footer style={{ background: NAVY, padding: "48px 0 20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 48 }}>
          {/* Col 1 */}
          <div>
            <Logo light onClick={() => go("home")} />
            <p style={{ fontFamily: F, fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 12, lineHeight: 1.6 }}>
              Independent Advisory for Facility Owners
            </p>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.55)", textDecoration: "none", fontFamily: F, fontSize: 13 }}>
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
          {/* Col 2 */}
          <div>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Navigation</p>
            {([
              { label: "Home",                          p: "home"                },
              { label: "About",                         p: "about"               },
              { label: "Asset & Property Management",   p: "asset-management"    },
              { label: "Venue & Facility Advisory",     p: "venue-advisory"      },
              { label: "Facility Condition Assessment", p: "facility-assessment" },
              { label: "Contact",                       p: "contact"             },
            ] as { label: string; p: Page }[]).map(({ label, p }) => (
              <button key={label} onClick={() => go(p)} style={{ display: "block", fontFamily: F, fontSize: 14, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", padding: "3px 0", textAlign: "left", transition: "color 200ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
              >
                {label}
              </button>
            ))}
          </div>
          {/* Col 3 */}
          <div>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="mailto:info@ardentadvisory.co" style={{ fontFamily: F, fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <Mail size={14} /> info@ardentadvisory.co
              </a>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <MapPin size={14} style={{ color: "rgba(255,255,255,0.55)", flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontFamily: F, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>National &amp; International Practice</span><br />
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>English &amp; Spanish</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: 40, paddingTop: 18 }}>
          <p style={{ fontFamily: F, fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            © 2026 Ardent Advisory LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────
function HomePage({ go }: { go: (p: Page) => void }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setImgIdx(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: NAVY }}>
          {HERO_IMAGES.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === imgIdx ? 0.32 : 0, transition: "opacity 1200ms ease" }}
            />
          ))}
          <div style={{ position: "absolute", inset: 0, background: `${NAVY}99` }} />
        </div>
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px 80px", width: "100%" }}>
          <div style={{ maxWidth: 700 }}>
            <h1 style={{ fontFamily: F, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "#fff", lineHeight: 1.08, margin: "0 0 22px", letterSpacing: "0.01em" }}>
              Independent Advisory for Facility Owners
            </h1>
            <p style={{ fontFamily: F, fontSize: 20, color: "rgba(255,255,255,0.85)", lineHeight: 1.55, margin: "0 0 36px", maxWidth: 580 }}>
              Owner-side advisory across the full lifecycle of your facility. No design contract. No management agreement. No conflicts.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <BtnPrimary onClick={() => go("asset-management")} style={{ background: RED, fontSize: 16, padding: "14px 28px" }}>
                Explore Our Services
              </BtnPrimary>
              <BtnSecondary onClick={() => go("contact")} light>
                Start a Conversation
              </BtnSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* Stat bar */}
      <section style={{ background: NAVY, borderTop: `4px solid ${RED}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <dl className="grid grid-cols-2 md:grid-cols-4" style={{ margin: 0 }}>
            {[
              { val: "DECADES",  label: "of Facility Leadership"    },
              { val: "DOZENS",   label: "of Major Venue Projects"    },
              { val: "BILLIONS", label: "in Construction Value"      },
              { val: "HUNDREDS", label: "of Venues Supported"        },
            ].map((s, i) => (
              <div key={s.val} style={{ padding: "32px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                <dd style={{ fontFamily: F, fontSize: 26, fontWeight: 700, color: "#fff", margin: "0 0 6px", letterSpacing: "0.05em" }}>{s.val}</dd>
                <dt style={{ fontFamily: F, fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Practice area cards */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <Wrap py={80}>
          <SectionHeading>What We Do</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24, marginTop: 8 }}>
            {[
              { Icon: BarChart3,    title: "Asset & Property Management Advisory", desc: "Institutional-grade advisory for commercial, municipal, and mixed-use assets. From operational benchmarking to capital planning, the owner's perspective on every decision.", cta: "Explore Asset Management",    p: "asset-management"    as Page },
              { Icon: Building2,    title: "Venue & Facility Advisory",             desc: "Programming. Design review. Pre-opening. Operations. The decisions made before the first shovel hits the ground determine how your venue performs for the next 30 years.",          cta: "Explore Venue Advisory",      p: "venue-advisory"      as Page },
              { Icon: ClipboardList,title: "Facility Condition Assessment",         desc: "An honest picture of what your building actually needs. Not what minimizes the findings. Independent assessment backed by decades inside these facilities.",                        cta: "Explore Facility Assessment",p: "facility-assessment" as Page },
            ].map((card) => <PracticeCard key={card.title} card={card} go={go} />)}
          </div>
        </Wrap>
      </section>

      {/* Independence callout */}
      <section style={{ background: "#fff", paddingBottom: 80 }}>
        <Wrap py={0}><IndependenceCallout /></Wrap>
      </section>

      {/* Who we serve */}
      <section style={{ padding: "80px 0", background: OFFWHT }}>
        <Wrap py={80}><ClientTypeGrid /></Wrap>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 0", background: "#fff" }}>
        <Wrap py={80}><FAQAccordion /></Wrap>
      </section>

      <CTABanner
        headline="Ready to talk about your facility?"
        subtext="No pitch. No proposal until you are ready. Just a conversation between people who understand these buildings."
        btnLabel="Start a Conversation"
        onBtn={() => go("contact")}
      />
    </>
  );
}

function PracticeCard({ card, go }: { card: { Icon: React.ElementType; title: string; desc: string; cta: string; p: Page }; go: (p: Page) => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ border: `1px solid ${GRAY_L}`, borderRadius: 8, padding: "32px 28px", background: "#fff", boxShadow: hov ? "0 4px 20px rgba(0,0,0,0.1)" : "0 1px 3px rgba(0,0,0,0.07)", transition: "box-shadow 200ms", display: "flex", flexDirection: "column" }}>
      <card.Icon size={32} strokeWidth={1.5} color={NAVY} style={{ marginBottom: 16 }} />
      <h4 style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: NAVY, margin: "0 0 12px", lineHeight: 1.3 }}>{card.title}</h4>
      <p style={{ fontFamily: F, fontSize: 15, color: "#000", lineHeight: 1.6, flex: 1, margin: "0 0 20px" }}>{card.desc}</p>
      <button onClick={() => go(card.p)} style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: BLUE, background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", textDecoration: hov ? "underline" : "none" }}>
        {card.cta} →
      </button>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────
function AboutPage({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHeader
        h1="About Ardent Advisory"
        sub="Independent advisory for the people who build, own, and operate complex facilities."
        img="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=600&fit=crop&auto=format"
      />
      <section>
        <Wrap py={64}>
          {/* Why We Exist */}
          <SectionHeading>Why We Exist</SectionHeading>
          <div style={{ maxWidth: 720, marginBottom: 52 }}>
            <Body style={{ fontWeight: 700 }}>Facility owners deserve an advisor who works for them.</Body>
            <Body>Not for the design team. Not for the management company. Not for the operator who wants the next contract. That kind of independence is rare in this industry. Most advisory comes with an agenda attached.</Body>
            <Body>Ardent Advisory was founded to fill that gap: independent, owner-side advisory for the people who build, own, and operate complex facilities — commercial real estate, municipal, sports venues, convention centers, arenas, performing arts centers, and public assembly facilities.</Body>
            <Body>We bring the operational perspective that pure design firms, engineering consultants, and management companies cannot provide. Because we have spent our careers inside these buildings. Not outside them looking in.</Body>
          </div>

          <Divider />

          {/* What We Bring */}
          <SectionHeading>What We Bring</SectionHeading>
          <div style={{ maxWidth: 720, marginBottom: 52 }}>
            <Body>Ardent Advisory brings decades of hands-on experience across the full lifecycle of complex facilities. That experience spans:</Body>
            <Bullets items={[
              "Major sports stadiums, arenas, and entertainment venues, including NFL, MLB, NBA, and NHL facilities",
              "Convention centers and public assembly facilities, including programming, operations, and asset management",
              "Class A commercial office properties, including institutional property management and capital planning",
              "Multi-site venue portfolios, including operational standardization, best practices, and performance benchmarking across large facility networks",
              "National and international scope, including facility advisory across multiple countries and continents",
            ]} />
            <div style={{ marginTop: 24 }}>
              <Body>That range of experience, both the breadth of facility types and the depth within each, is what allows Ardent Advisory to see things other advisors miss.</Body>
              <Body style={{ fontWeight: 700, marginBottom: 0 }}>A design firm sees the drawing. A management company sees the contract. We see the asset.</Body>
            </div>
          </div>

          <Divider />

          {/* Our Approach */}
          <SectionHeading>Our Approach</SectionHeading>
          <div style={{ maxWidth: 720, marginBottom: 52 }}>
            <Body>Every engagement starts from the same place: what does the owner need to know to make a sound decision?</Body>
            <Body>Not what the architect wants to build. Not what the contractor wants to bid. Not what the operator wants to manage. What the owner needs.</Body>
            <ul style={{ paddingLeft: 20, marginTop: 4, marginBottom: 16 }}>
              <li style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", marginBottom: 10 }}>Our Facility Condition Assessments provides actionable reporting of what the actual conditions are at the time of inspection.</li>
              <li style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", marginBottom: 10 }}>Our FCAs differ from those prepared by architectural, engineering or general contractor firms not only due to our hands on experience managing and operating facilities but by our identification of opportunities to extend useful life.</li>
              <li style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", marginBottom: 10 }}>Our programming advisory reflects what the market will support in line with operating proforma objectives.</li>
              <li style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", marginBottom: 10 }}>Our operations advisory informs owners and operators what their building requires to achieve business goals.</li>
            </ul>
            <Body style={{ fontWeight: 700, marginBottom: 0 }}>We built this practice on the belief that honest, experienced, independent advisory is the most valuable thing a facility owner can buy.</Body>
          </div>

          <Divider />

          {/* Independence callout */}
          <div style={{ marginBottom: 52 }}>
            <IndependenceCallout />
          </div>

          <Divider />

          {/* Proven across */}
          <SectionHeading>Proven Across Every Facility Type</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20, marginBottom: 56 }}>
            {[
              { label: "Experience Depth",    copy: "Decades of leadership across the most complex facility environments in North America and internationally." },
              { label: "Project Scale",       copy: "Advisory on dozens of major venue development and renovation projects with a combined construction value in the billions." },
              { label: "Operational Breadth", copy: "Best practices support to hundreds of venues spanning stadiums, arenas, convention centers, performing arts facilities, and commercial properties." },
              { label: "Safety & Security",   copy: "Supported hundreds of venues with Threat Assessments, Red Team Audits, Training, and Program Authorship." },
            ].map((proof) => (
              <div key={proof.label} style={{ padding: 24, border: `1px solid ${GRAY_L}`, borderLeft: `4px solid ${NAVY}` }}>
                <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>{proof.label}</p>
                <p style={{ fontFamily: F, fontSize: 15, lineHeight: 1.6, color: "#000", margin: 0 }}>{proof.copy}</p>
              </div>
            ))}
          </div>

          <ClientTypeGrid />
        </Wrap>
      </section>
      <CTABanner
        headline="Ready to talk about your facility?"
        subtext="No pitch. No proposal until you are ready. Just a conversation between people who understand these buildings."
        btnLabel="Start a Conversation"
        onBtn={() => go("contact")}
      />
    </>
  );
}

// ── ASSET MANAGEMENT PAGE ─────────────────────────────────────────────
function AssetManagementPage({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHeader
        h1="Asset & Property Management Advisory"
        sub="Institutional-grade advisory for owners and investors managing complex property portfolios. The operational insight your assets require."
        img="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=600&fit=crop&auto=format"
      />
      <section>
        <Wrap py={64}>
          <ServiceBlock
            title="Commercial Real Estate Asset Management"
            paras={[
              "Owner-side advisory for commercial real estate assets: Class A office, mixed-use, and institutional properties.",
              "Ardent Advisory brings institutional property management discipline to owners evaluating operational performance, capital planning, and asset value strategy. Our experience managing large-scale commercial portfolios gives us the operational lens that pure financial advisors lack, and the financial fluency that pure property managers often miss.",
            ]}
            bullets={[
              "Operating budget development and administration",
              "Third-party vendor contract development and oversight",
              "Tenant improvement project management",
              "Operating expense reduction and efficiency analysis",
              "Post-casualty restoration management",
              "Business strategy planning for ownership groups and investors",
            ]}
          />
          <Divider />
          <ServiceBlock
            title="Capital & Investment Advisory"
            paras={[
              "Advisory support for ownership groups and investors navigating asset acquisition, repositioning, disposition, or recapitalization.",
              "Our experience contributing to significant private equity transactions in the venue management sector provides direct insight into what institutional investors require from asset-level due diligence and operational reporting. We understand both the numbers and the building.",
            ]}
            bullets={[
              "Operational due diligence for asset acquisition",
              "Capital needs identification and investment sequencing",
              "KPI and metrics-based performance reporting for ownership and C-suite",
              "Management contract evaluation and restructuring",
              "Profitability enhancement strategy",
            ]}
          />
          <Divider />
          <ServiceBlock
            title="Operational Excellence & Best Practices"
            paras={[
              "Systematic evaluation and improvement of operational performance across complex, multi-site asset portfolios.",
              "Ardent Advisory has developed and deployed proven operational frameworks across large facility networks, covering hundreds of best practices documents, multi-site standardization programs, and national vendor contract strategies that have delivered millions in documented annual savings. That methodology translates directly to any complex asset environment.",
            ]}
            bullets={[
              "Multi-site operational consistency and standardization",
              "Financial reporting and contract management systems",
              "Utilities and energy management programs",
              "National vendor contract pricing and master service agreements",
              "Technology platform assessment and implementation advisory",
              "Staff development and training program design",
            ]}
          />
          <Divider />
          <ClientTypeGrid />
        </Wrap>
      </section>
      <CTABanner
        headline="Your assets deserve independent advice."
        subtext="No pitch. No proposal until you are ready. Just a conversation between people who understand these buildings."
        btnLabel="Discuss Your Portfolio"
        onBtn={() => go("contact")}
      />
    </>
  );
}

// ── VENUE ADVISORY PAGE ───────────────────────────────────────────────
function VenueAdvisoryPage({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHeader
        h1="Venue & Facility Advisory"
        sub="The decisions made before the first shovel determine how your venue performs for the next 30 years. We make sure those decisions are right."
        img="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400&h=600&fit=crop&auto=format"
      />
      <section>
        <Wrap py={64}>
          <ServiceBlock
            title="Venue Programming & Pre-Design Advisory"
            paras={[
              "Owner-side advisory at the most consequential moment in a venue project, before the architects are selected and while the fundamental decisions about size, scope, program, and investment are still being formed.",
              "The programming decisions made in the first six months determine operational performance for the next three decades. Ardent Advisory has been inside this moment across dozens of major venue projects. We know what happens when programming is done well, and what it costs when it is not.",
            ]}
            bullets={[
              "Facility programming and space planning",
              "Market and demand analysis",
              "Design brief development for owner",
              "RFP preparation for design services",
              "Architect and consultant selection advisory",
              "FF&E programming and procurement advisory",
            ]}
          />
          <Divider />
          <ServiceBlock
            title="Design Review & Owner's Representation"
            paras={[
              "Independent review of design documents at each phase: schematic, design development, and construction documents, from the owner's operational perspective.",
              "We identify design decisions that serve the architect's vision but create operational inefficiencies, maintenance challenges, or lifecycle cost overruns for the owner. Your design team builds what wins awards. We make sure it also works on day one and for the next 30 years.",
            ]}
            bullets={[
              "Operational review of design at each phase",
              "Guest experience and circulation analysis",
              "Maintenance access and long-term maintainability review",
              "Technology and systems integration advisory",
              "Owner representation in design team meetings",
            ]}
          />
          <Divider />
          <ServiceBlock
            title="Pre-Opening & Operational Readiness"
            paras={[
              "The period between substantial completion and opening day is where venue projects succeed or fail operationally.",
              "Ardent Advisory has managed pre-opening programs across dozens of venues, from NFL stadiums to international convention centers. The operational knowledge embedded in every building we have advised on reflects what actually works on opening day. Not what looks good in a planning document.",
            ]}
            bullets={[
              "Organizational structure development",
              "Operations manual authorship and implementation",
              "Safety, security, and emergency management program development",
              "Event management protocol development",
              "Vendor and contractor transition management",
            ]}
          />
          <Divider />
          <ClientTypeGrid />
        </Wrap>
      </section>
      <CTABanner
        headline="Your venue is a 30-year decision. Get it right."
        subtext="No pitch. No proposal until you are ready. Just a conversation between people who understand these buildings."
        btnLabel="Discuss Your Project"
        onBtn={() => go("contact")}
      />
    </>
  );
}

// ── FACILITY ASSESSMENT PAGE ──────────────────────────────────────────
function FacilityAssessmentPage({ go }: { go: (p: Page) => void }) {
  return (
    <>
      <PageHeader
        h1="Facility Condition Assessment & Capital Planning"
        sub="An honest, independent assessment of what your building actually needs. Not what minimizes the findings. Not what protects the operator."
        img="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&h=600&fit=crop&auto=format"
      />
      <section>
        <Wrap py={64}>
          <ServiceBlock
            title="Facility Condition Assessments"
            paras={[
              "A comprehensive, systematic evaluation of your facility's physical condition across all building systems: structural, mechanical, electrical, plumbing, life safety, technology, and building envelope.",
              "The FCA establishes an accurate, documented baseline of your facility's current state, identifies deficiencies, and prioritizes remediation. Delivered as a clear, actionable report you can take directly into capital planning, bond financing, lease negotiations, or management contract discussions.",
              "What makes our assessments different: we bring direct operational knowledge that pure engineering or architectural firms cannot replicate. Decades of experience inside these buildings means deficiencies are identified not just as physical conditions, but as operational risks, liability exposures, and capital planning priorities.",
            ]}
            bullets={[
              "System-by-system assessment across all major building components",
              "Photographic documentation of conditions and deficiencies",
              "Prioritized remediation recommendations with cost estimates",
              "Executive summary for board and stakeholder presentation",
              "Digital deliverable formatted for capital planning integration",
            ]}
          />
          <Divider />
          <ServiceBlock
            title="Long-Term Capital Needs Assessment"
            paras={[
              "A forward-looking analysis of your facility's capital investment requirements over a 10, 15, or 20-year horizon.",
              "Built on the FCA baseline, the LTCNA models the cost and timing of system replacements, major repairs, and capital upgrades across the full facility lifecycle. It gives you the financial planning tool you need to budget responsibly, avoid deferred maintenance crises, and present credible capital needs to governing boards, public finance bodies, and bond rating agencies.",
              "The LTCNA is the document that turns an FCA from a snapshot into a strategy.",
            ]}
            bullets={[]}
          />
          <Divider />
          <ServiceBlock
            title="Strategic Capital Planning Advisory"
            paras={[
              "Beyond the assessment, Ardent Advisory works with you to translate findings into executable capital investment strategy.",
              "We prioritize investments by operational impact and risk, structure capital programs for public financing or bond issuance, and develop the owner's position for management contract or lease negotiations where capital responsibilities are a central issue.",
            ]}
            bullets={[]}
          />
          <Divider />
          <ClientTypeGrid />
        </Wrap>
      </section>
      <CTABanner
        headline="Know what your building actually needs."
        subtext="No pitch. No proposal until you are ready. Just a conversation between people who understand these buildings."
        btnLabel="Request an Assessment"
        onBtn={() => go("contact")}
      />
    </>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", interest: "", message: "" });
  const [errs, setErrs] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  function validate() {
    const e: Record<string, boolean> = {};
    if (!form.name.trim())    e.name     = true;
    if (!form.org.trim())     e.org      = true;
    if (!form.email.trim())   e.email    = true;
    if (!form.interest)       e.interest = true;
    if (!form.message.trim()) e.message  = true;
    return e;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setDone(true);
  }

  const inp = (field: string): React.CSSProperties => ({
    width: "100%", padding: "10px 14px", fontFamily: F, fontSize: 15,
    border: `1px solid ${errs[field] ? RED : GRAY_L}`, borderRadius: 8,
    outline: "none", boxSizing: "border-box", color: "#000", background: "#fff",
  });

  const lbl: React.CSSProperties = { fontFamily: F, fontSize: 14, fontWeight: 700, color: NAVY, display: "block", marginBottom: 6 };

  return (
    <>
      <PageHeader h1="Start a Conversation" sub="Tell us about your facility. We will tell you honestly whether we can help." />
      <section>
        <Wrap py={64}>
          <div className="grid grid-cols-1 md:grid-cols-contact-layout" style={{ gap: 56, alignItems: "start" }}>
            {/* Left: form */}
            <div style={{ minWidth: 0 }}>
              {done ? (
                <div style={{ borderLeft: `4px solid ${NAVY}`, background: BTINT, padding: "36px 32px" }}>
                  <h3 style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: NAVY, margin: "0 0 14px" }}>
                    Thank you. We will be in touch within one business day.
                  </h3>
                  <p style={{ fontFamily: F, fontSize: 16, lineHeight: 1.625, color: "#000", margin: 0 }}>
                    Your message has been received. A real person will review it and respond directly. No automated sequences, no sales funnel. If your matter is urgent, please email us at info@ardentadvisory.co.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20, marginBottom: 20 }}>
                    <div>
                      <label style={lbl}>Your Name <span style={{ color: RED }}>*</span></label>
                      <input type="text" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrs({ ...errs, name: false }); }} style={inp("name")} placeholder="Full name" />
                      {errs.name && <p style={{ fontFamily: F, fontSize: 12, color: RED, margin: "4px 0 0" }}>Required</p>}
                    </div>
                    <div>
                      <label style={lbl}>Organization <span style={{ color: RED }}>*</span></label>
                      <input type="text" value={form.org} onChange={e => { setForm({ ...form, org: e.target.value }); setErrs({ ...errs, org: false }); }} style={inp("org")} placeholder="Organization name" />
                      {errs.org && <p style={{ fontFamily: F, fontSize: 12, color: RED, margin: "4px 0 0" }}>Required</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20, marginBottom: 20 }}>
                    <div>
                      <label style={lbl}>Email Address <span style={{ color: RED }}>*</span></label>
                      <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrs({ ...errs, email: false }); }} style={inp("email")} placeholder="email@organization.com" />
                      {errs.email && <p style={{ fontFamily: F, fontSize: 12, color: RED, margin: "4px 0 0" }}>Required</p>}
                    </div>
                    <div>
                      <label style={lbl}>Phone Number <span style={{ color: GRAY_M, fontWeight: 400 }}>Optional</span></label>
                      <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp("phone")} placeholder="(555) 555-5555" />
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={lbl}>What can we help with? <span style={{ color: RED }}>*</span></label>
                    <select value={form.interest} onChange={e => { setForm({ ...form, interest: e.target.value }); setErrs({ ...errs, interest: false }); }} style={{ ...inp("interest"), appearance: "auto" as React.CSSProperties["appearance"] }}>
                      <option value="">Select a service area...</option>
                      <option value="asset-management">Asset &amp; Property Management Advisory</option>
                      <option value="venue-advisory">Venue &amp; Facility Advisory</option>
                      <option value="facility-assessment">Facility Condition Assessment</option>
                      <option value="other">Other</option>
                    </select>
                    {errs.interest && <p style={{ fontFamily: F, fontSize: 12, color: RED, margin: "4px 0 0" }}>Required</p>}
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label style={lbl}>Tell us about your facility and what you are facing. <span style={{ color: RED }}>*</span></label>
                    <textarea value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrs({ ...errs, message: false }); }} rows={6} style={{ ...inp("message"), resize: "vertical" }} placeholder="Describe your facility, the challenges you are facing, and what you need..." />
                    {errs.message && <p style={{ fontFamily: F, fontSize: 12, color: RED, margin: "4px 0 0" }}>Required</p>}
                  </div>
                  <BtnPrimary style={{ fontSize: 16, padding: "14px 0", width: "100%" }}>
                    Send Message
                  </BtnPrimary>
                  <p style={{ fontFamily: F, fontSize: 13, color: GRAY_D, marginTop: 12, lineHeight: 1.55 }}>
                    We respond within one business day. No automated follow-up sequences. A real person reads every message.
                  </p>
                </form>
              )}
            </div>

            {/* Right: contact info */}
            <div style={{ background: OFFWHT, padding: "32px 28px", borderTop: `4px solid ${NAVY}`, minWidth: 280 }}>
              <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: GRAY_M, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 20px" }}>Contact Information</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Mail size={18} style={{ color: NAVY, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ fontFamily: F, fontSize: 11, color: GRAY_M, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>Email</p>
                    <a href="mailto:info@ardentadvisory.co" style={{ fontFamily: F, fontSize: 15, color: NAVY, textDecoration: "none", fontWeight: 600 }}>info@ardentadvisory.co</a>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <MapPin size={18} style={{ color: NAVY, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ fontFamily: F, fontSize: 11, color: GRAY_M, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 3px" }}>Practice Scope</p>
                    <p style={{ fontFamily: F, fontSize: 15, color: NAVY, fontWeight: 600, margin: 0 }}>National &amp; International Practice</p>
                    <p style={{ fontFamily: F, fontSize: 13, color: GRAY_D, margin: "4px 0 0" }}>English &amp; Spanish</p>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${GRAY_L}`, marginTop: 28, paddingTop: 22 }}>
                <p style={{ fontFamily: F, fontSize: 14, color: GRAY_D, lineHeight: 1.6, margin: 0 }}>
                  No pitch. No proposal until you are ready. Just a conversation between people who understand these buildings.
                </p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  );
}

// ── APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  function go(p: Page) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh" }}>
      <GlobalNav page={page} go={go} />
      <main style={{ paddingTop: 72 }}>
        {page === "home"                && <HomePage               go={go} />}
        {page === "about"               && <AboutPage              go={go} />}
        {page === "asset-management"    && <AssetManagementPage    go={go} />}
        {page === "venue-advisory"      && <VenueAdvisoryPage      go={go} />}
        {page === "facility-assessment" && <FacilityAssessmentPage go={go} />}
        {page === "contact"             && <ContactPage />}
      </main>
      <GlobalFooter go={go} />
    </div>
  );
}
