import React, { useState, useEffect } from "react";
import {
  Clock,
  Leaf,
  Sparkles,
  Instagram,
  MessageCircle,
  ArrowRight,
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Karla:wght@400;500;600;700&display=swap');`;

// Primary: deep pink (raspberry, not baby pink). Secondary: warm gold.
const tokens = {
  base: "#FDF6F8",
  paper: "#FFFFFF",
  pink: "#C2255C",
  pinkDeep: "#93173F",
  pinkLight: "#F6D9E3",
  pinkPale: "#FCEEF2",
  gold: "#D9A544",
  goldDeep: "#B9822A",
  goldLight: "#F6ECD4",
  ink: "#3A2530",
  inkSoft: "#8C6E7A",
  line: "#EDD9E0",
  dark: "#2B1420",
  darkAlt: "#391A2B",
  onDark: "#FBEFF3",
  onDarkSoft: "#D6AFC0",
};

// Nav: lightened to sit flush with the flyer-style hero below it.
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#cakes", label: "Cakes" },
    { href: "#snacks", label: "Snacks" },
    { href: "#know", label: "Do You Know" },
    { href: "#healthy", label: "Healthy" },
    { href: "#recipes", label: "Recipes & Tips" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: tokens.pinkPale }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 500, fontSize: 22, color: tokens.pinkDeep }}>
          Adùn House
        </div>
        <nav style={{ display: "flex", gap: 26, alignItems: "center" }} className="desktop-nav">
          {links.map((l) => (
            <a key={l.href} href={l.href} style={{ fontFamily: "Karla, sans-serif", fontSize: 14, color: tokens.ink, textDecoration: "none", fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            style={{
              fontFamily: "Karla, sans-serif",
              fontWeight: 600,
              fontSize: 13.5,
              color: tokens.onDark,
              background: tokens.pink,
              padding: "10px 20px",
              borderRadius: 999,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Order Now
          </a>
        </nav>
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: tokens.ink }}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu" style={{ borderTop: `1px solid ${tokens.line}`, padding: "8px 24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: "Karla, sans-serif", color: tokens.ink, textDecoration: "none", fontSize: 15 }}>
              {l.label}
            </a>
          ))}
          <a href="#order" onClick={() => setOpen(false)} style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, color: tokens.pinkDeep, textDecoration: "none" }}>
            Order Now →
          </a>
        </div>
      )}
    </header>
  );
}

// Hero modeled on the "Annie Cakes & Chops" flyer: soft blush background,
// a gold flourish line up top, the brand name split pink-quote / solid ink,
// a white info card, and pill-shaped contact buttons.
function Hero() {
  return (
    <section style={{ background: `linear-gradient(160deg, ${tokens.pinkPale} 0%, ${tokens.pinkLight} 100%)`, position: "relative", overflow: "hidden" }}>
      {/* hanging ornaments, top right */}
      <div style={{ position: "absolute", top: 0, right: "8%", display: "flex", gap: 22 }} className="hero-ornaments">
        {[{ s: 74, h: 40 }, { s: 100, h: 64 }, { s: 60, h: 20 }].map((o, i) => (
          <div key={i} style={{ position: "relative", width: o.s }}>
            <div style={{ width: 1, height: o.h, background: tokens.gold, margin: "0 auto", opacity: 0.6 }} />
            <div
              style={{
                width: o.s,
                height: o.s,
                borderRadius: "50%",
                background: `radial-gradient(circle at 32% 28%, #FFFFFF, ${tokens.pinkLight} 70%)`,
                border: `1px solid ${tokens.gold}55`,
                boxShadow: "0 12px 24px rgba(147,23,63,0.10)",
              }}
            />
          </div>
        ))}
      </div>
      {/* cake illustration, bleeding off the bottom-left edge */}
      <div style={{ position: "absolute", left: -40, bottom: -30, width: 260, opacity: 0.95 }} className="hero-cake">
        <svg viewBox="0 0 300 340" style={{ width: "100%" }} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="150" cy="300" rx="120" ry="18" fill={tokens.pinkDeep} opacity="0.15" />
          <rect x="55" y="230" width="190" height="65" rx="8" fill={tokens.pink} opacity="0.85" />
          <rect x="80" y="165" width="140" height="65" rx="8" fill={tokens.pinkLight} />
          <rect x="105" y="105" width="90" height="60" rx="8" fill={tokens.pink} opacity="0.85" />
          <circle cx="150" cy="90" r="6" fill={tokens.gold} />
          <rect x="148" y="55" width="4" height="35" fill={tokens.gold} />
          {[...Array(5)].map((_, i) => (
            <circle key={i} cx={95 + i * 27} cy={195} r="4" fill={tokens.gold} opacity="0.9" />
          ))}
        </svg>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "84px 24px 56px", position: "relative", textAlign: "center" }}>
        <p style={{ fontFamily: "Karla, sans-serif", color: tokens.pinkDeep, fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 10 }}>
          WELCOME TO
        </p>
        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontWeight: 600,
            fontSize: "clamp(44px, 9vw, 76px)",
            color: tokens.gold,
            lineHeight: 1,
            textShadow: "0 2px 0 rgba(185,130,42,0.25)",
          }}
        >
          Est. 2019
        </div>
        <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 30px)", color: tokens.ink, margin: "18px 0 6px", letterSpacing: 0.5 }}>
          FRESHLY BAKED, DAILY
        </h1>
        <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15, color: tokens.inkSoft, margin: "0 0 18px" }}>from our kitchen to your table, in</p>
        <div style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 600, fontSize: "clamp(38px, 6vw, 58px)", color: tokens.pink, lineHeight: 1 }}>
          &ldquo;Adùn&rdquo;
        </div>
        <div style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "clamp(26px, 4vw, 38px)", color: tokens.ink, marginTop: 2 }}>
          House
        </div>

        <div
          style={{
            background: tokens.paper,
            borderRadius: 16,
            padding: "26px 30px",
            marginTop: 36,
            boxShadow: "0 20px 40px rgba(147,23,63,0.10)",
          }}
        >
          <p style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 500, fontSize: 15.5, color: tokens.pinkDeep, margin: "0 0 4px" }}>
            Adùn House
          </p>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14.5, color: tokens.ink, lineHeight: 1.6, margin: 0 }}>
            Cakes, snacks and small chops, baked fresh and delivered
            same-day across Lagos.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 999, padding: "9px 16px", textDecoration: "none", fontFamily: "Karla, sans-serif", fontSize: 13.5, fontWeight: 600, color: tokens.ink }}>
            <Instagram size={15} color={tokens.pinkDeep} /> adunhouse
          </a>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 999, padding: "9px 16px", textDecoration: "none", fontFamily: "Karla, sans-serif", fontSize: 13.5, fontWeight: 600, color: tokens.ink }}>
            <MapPin size={15} color={tokens.pinkDeep} /> Yaba, Lagos
          </a>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 999, padding: "9px 16px", textDecoration: "none", fontFamily: "Karla, sans-serif", fontSize: 13.5, fontWeight: 600, color: tokens.ink }}>
            <Phone size={15} color={tokens.pinkDeep} /> 0906 497 6053
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
          <a href="#cakes" style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, color: tokens.onDark, background: tokens.pink, padding: "15px 28px", textDecoration: "none", borderRadius: 999, whiteSpace: "nowrap" }}>
            Browse Cakes
          </a>
          <a href="#recipes" style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, color: tokens.ink, padding: "15px 8px", textDecoration: "none", borderBottom: `2px solid ${tokens.gold}`, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            Learn to Bake <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

function StatBand() {
  const stats = [
    { n: "1,200+", l: "Cakes Baked" },
    { n: "300+", l: "Recipes Shared" },
    { n: "6", l: "Years in Yaba" },
    { n: "4.9", l: "Average Rating" },
  ];
  return (
    <section style={{ background: `linear-gradient(100deg, ${tokens.pinkDeep}, ${tokens.dark})`, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="grid-4">
        {stats.map((s) => (
          <div key={s.l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(28px, 4vw, 40px)", color: tokens.onDark }}>{s.n}</div>
            <div style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.onDarkSoft, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, accent }) {
  const accentColor = accent === "gold" ? tokens.goldDeep : tokens.pinkDeep;
  return (
    <div style={{ marginBottom: 40, maxWidth: 640 }}>
      <p style={{ fontFamily: "Karla, sans-serif", color: tokens.goldDeep, fontWeight: 700, fontSize: 13.5, letterSpacing: 1.2, marginBottom: 12 }}>
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(28px, 3.4vw, 40px)", color: tokens.ink, margin: 0, lineHeight: 1.12 }}>
        {title.split("*").map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} style={{ fontStyle: "italic", color: accentColor }}>
              {part}
            </span>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          )
        )}
      </h2>
    </div>
  );
}

function Cakes() {
  const featured = { title: "Wedding Cakes", desc: "Tiered, floral, or minimalist — tastings run two weeks ahead of your date, so nothing is a surprise on the day.", price: "₦180,000", tone: `linear-gradient(150deg, ${tokens.pinkLight}, ${tokens.goldLight})` };
  const rest = [
    { title: "Custom Cakes", desc: "Bring a theme or a flavour craving. We sketch it, then bake it.", price: "₦35,000" },
    { title: "Birthday Cakes", desc: "Cartoon cakes for kids, drip cakes for the grown-ups.", price: "₦25,000" },
    { title: "Tiered & Celebration", desc: "2 to 5 tiers, for engagements and graduations.", price: "₦95,000" },
    { title: "Cupcakes & Bento", desc: "Individually boxed, personalised toppers.", price: "₦12,500" },
    { title: "Naked & Semi-Naked", desc: "Minimal buttercream, our most-requested style.", price: "₦40,000" },
  ];
  return (
    <section id="cakes" style={{ background: tokens.base, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <SectionHeading eyebrow="Cakes" title="A cake for *every kind* of occasion" accent="pink" />
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 4 }} className="cakes-split">
          <div style={{ background: featured.tone, padding: "40px", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 420 }}>
            <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1, color: tokens.pinkDeep }}>FEATURED</span>
            <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 34, color: tokens.ink, margin: "10px 0 12px" }}>{featured.title}</h3>
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15, color: tokens.inkSoft, lineHeight: 1.65, maxWidth: 340, margin: 0 }}>{featured.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 26 }}>
              <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 15, color: tokens.ink }}>From {featured.price}</span>
              <a href="#order" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, color: tokens.ink, textDecoration: "none" }}>
                Order <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {rest.map((c) => (
              <div key={c.title} style={{ flex: 1, padding: "22px 28px", borderBottom: `1px solid ${tokens.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, background: tokens.paper }}>
                <div>
                  <h4 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 18, color: tokens.ink, margin: "0 0 4px" }}>{c.title}</h4>
                  <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft, margin: 0 }}>{c.desc}</p>
                </div>
                <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.pinkDeep, whiteSpace: "nowrap" }}>{c.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Snacks() {
  const snacks = [
    { title: "Chin Chin", desc: "Crunchy, lightly sweet, sold by the tin or party tray.", price: "₦3,500 / tin" },
    { title: "Puff Puff", desc: "Golden and airy, fried fresh to order.", price: "₦2,500 / dozen" },
    { title: "Meat Pie", desc: "Flaky pastry, peppered beef and potato.", price: "₦1,200 each" },
    { title: "Sausage Rolls", desc: "House-made sausage in buttery pastry.", price: "₦1,000 each" },
    { title: "Small Chops Platter", desc: "Spring rolls, samosas, puff puff, sausage rolls.", price: "₦18,000 / tray" },
    { title: "Doughnuts", desc: "Soft and glazed, filled on request.", price: "₦800 each" },
  ];
  return (
    <section id="snacks" style={{ background: tokens.pinkLight, padding: "96px 0" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeading eyebrow="Snacks" title="The tray *everyone* fights over" accent="pink" />
      </div>
      <div style={{ display: "flex", gap: 20, overflowX: "auto", padding: "4px 24px 20px", scrollSnapType: "x mandatory" }} className="snack-scroll">
        {snacks.map((s) => (
          <div key={s.title} style={{ flex: "0 0 260px", scrollSnapAlign: "start", background: tokens.paper, padding: "26px 22px", borderRadius: 4 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, ${tokens.gold}, ${tokens.pink})`, marginBottom: 16, opacity: 0.9 }} />
            <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 19, color: tokens.ink, margin: "0 0 8px" }}>{s.title}</h3>
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.inkSoft, lineHeight: 1.6, margin: "0 0 16px" }}>{s.desc}</p>
            <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.pinkDeep }}>{s.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function DoYouKnow() {
  const facts = [
    "Chin chin has roots in Chinese-Portuguese fried dough, adapted into Nigerian kitchens over a century ago.",
    "A pinch of salt in cake batter doesn't make it salty — it makes the sweetness taste stronger.",
    "Puff puff goes by other names across West Africa: bofrot in Ghana, mikate in Congo.",
    "Red velvet's original red came from cocoa reacting with buttermilk and vinegar, not food colouring.",
    "Resting cake batter for 10 minutes before baking lets the flour hydrate fully, for an evener crumb.",
    "Nigerian meat pie traces back to British colonial-era pastry, reshaped with local pepper and seasoning.",
  ];
  const line = facts.concat(facts);
  return (
    <section id="know" style={{ background: tokens.dark, padding: "56px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px 32px" }}>
        <p style={{ fontFamily: "Karla, sans-serif", color: tokens.gold, fontWeight: 700, fontSize: 13.5, letterSpacing: 1.2, margin: 0 }}>
          Do You Know
        </p>
      </div>
      <div className="ticker-track" style={{ display: "flex", gap: 56, width: "max-content" }}>
        {line.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Sparkles size={16} color={tokens.gold} style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 400, fontSize: 21, color: tokens.onDark, whiteSpace: "nowrap" }}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Healthy() {
  const items = [
    { title: "Sugar-Free Cakes", desc: "Sweetened with dates and monk fruit, no compromise on the crumb." },
    { title: "Gluten-Free Snacks", desc: "Chin chin and doughnuts made with rice and almond flour blends." },
    { title: "Vegan Bakes", desc: "Plant-based butter and egg replacers, taste-tested against the originals." },
    { title: "Fresh Juice Pairings", desc: "Cold-pressed zobo, tiger nut and pineapple-ginger with any order." },
  ];
  return (
    <section id="healthy" style={{ background: tokens.goldLight, clipPath: "polygon(0 5%, 100% 0, 100% 95%, 0 100%)", padding: "110px 24px", marginTop: -40 }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <SectionHeading eyebrow="Better-for-you" title="Indulgence, *lightened* a little" accent="gold" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="grid-4">
          {items.map((it) => (
            <div key={it.title}>
              <Leaf size={20} color={tokens.goldDeep} style={{ marginBottom: 14 }} />
              <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 18.5, color: tokens.ink, margin: "0 0 8px" }}>{it.title}</h3>
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14, lineHeight: 1.6, color: tokens.inkSoft, margin: 0 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Recipes() {
  const featured = { tag: "Tutorial", title: "Levelling and Stacking a Tiered Cake", desc: "Dowels, cake boards and the exact order everything goes on. The one post every home baker asks for.", time: "15 min read" };
  const rest = [
    { tag: "Recipe", title: "Classic Vanilla Bean Layer Cake", time: "45 min bake" },
    { tag: "Tutorial", title: "Smooth Buttercream, No Air Bubbles", time: "12 min read" },
    { tag: "Recipe", title: "Crisp Chin Chin, Every Batch", time: "1 hr, incl. resting" },
    { tag: "Tip", title: "Why Your Puff Puff Isn't Rising", time: "5 min read" },
    { tag: "Recipe", title: "Baked (Not Fried) Meat Pie", time: "1 hr 20 min" },
  ];
  return (
    <section id="recipes" style={{ background: tokens.base, padding: "96px 24px 100px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <SectionHeading eyebrow="Recipes & Tips" title="Learn to *bake it* yourself" accent="pink" />
        <div style={{ background: `linear-gradient(120deg, ${tokens.pinkLight}, ${tokens.goldLight})`, padding: "40px", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "end", marginBottom: 24 }} className="recipe-featured">
          <div>
            <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: 0.8, color: tokens.pinkDeep }}>
              {featured.tag.toUpperCase()}
            </span>
            <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 28, color: tokens.ink, margin: "8px 0 10px" }}>{featured.title}</h3>
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15, color: tokens.inkSoft, lineHeight: 1.65, maxWidth: 480, margin: 0 }}>{featured.desc}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: tokens.inkSoft, fontFamily: "Karla, sans-serif", fontSize: 13, whiteSpace: "nowrap" }}>
            <Clock size={14} /> {featured.time}
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8 }} className="recipe-scroll">
          {rest.map((p) => (
            <div key={p.title} style={{ flex: "0 0 240px", border: `1px solid ${tokens.line}`, padding: "20px" }}>
              <span
                style={{
                  fontFamily: "Karla, sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: 0.8,
                  color: p.tag === "Recipe" ? tokens.pinkDeep : p.tag === "Tutorial" ? tokens.goldDeep : tokens.gold,
                }}
              >
                {p.tag.toUpperCase()}
              </span>
              <h4 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 16.5, color: tokens.ink, margin: "8px 0 10px", lineHeight: 1.3 }}>{p.title}</h4>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: tokens.inkSoft, fontFamily: "Karla, sans-serif", fontSize: 12 }}>
                <Clock size={12} /> {p.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section style={{ background: tokens.darkAlt, padding: "88px 24px", textAlign: "center" }}>
      <p style={{ fontFamily: "Karla, sans-serif", color: tokens.gold, fontWeight: 700, fontSize: 13.5, letterSpacing: 1.2, marginBottom: 16 }}>
        Ready when you are
      </p>
      <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(30px, 5vw, 50px)", color: tokens.onDark, margin: "0 0 32px" }}>
        Let's bake something worth celebrating.
      </h2>
      <a
        href="#order"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "Karla, sans-serif",
          fontWeight: 600,
          fontSize: 15,
          color: tokens.onDark,
          background: tokens.pink,
          padding: "16px 30px",
          borderRadius: 999,
          textDecoration: "none",
        }}
      >
        <MessageCircle size={17} /> Order on WhatsApp
      </a>
    </section>
  );
}

function Footer() {
  return (
    <footer id="order" style={{ background: tokens.dark, padding: "48px 24px 28px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 40, paddingBottom: 32, borderBottom: "1px solid #4A2438" }} className="footer-grid">
        <div>
          <div style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 500, fontSize: 20, color: tokens.onDark, marginBottom: 12 }}>
            Adùn House
          </div>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
            Cakes and snacks baked fresh in Yaba, delivered across Lagos.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.6, color: tokens.gold, marginBottom: 14 }}>EXPLORE</p>
          {["Cakes", "Snacks", "Do You Know", "Healthy", "Recipes & Tips"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().split(" ")[0]}`} style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, textDecoration: "none", marginBottom: 8 }}>
              {l}
            </a>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.6, color: tokens.gold, marginBottom: 14 }}>VISIT</p>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, lineHeight: 1.8, margin: 0 }}>
            12 Herbert Macaulay Way, Yaba, Lagos
            <br />
            Open daily, 8am – 9pm
          </p>
          <a href="#" style={{ color: tokens.onDarkSoft, display: "inline-flex", marginTop: 12 }}>
            <Instagram size={17} />
          </a>
        </div>
      </div>
      <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12, color: "#8C647A", textAlign: "center", marginTop: 24 }}>
        © Adùn House. A concept design, not a live storefront.
      </p>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      ${FONT_IMPORT}
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; }
      .snack-scroll::-webkit-scrollbar, .recipe-scroll::-webkit-scrollbar { height: 6px; }
      .snack-scroll::-webkit-scrollbar-thumb, .recipe-scroll::-webkit-scrollbar-thumb { background: ${tokens.line}; border-radius: 3px; }
      .ticker-track { animation: ticker 34s linear infinite; }
      @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      @media (max-width: 860px) {
        .desktop-nav { display: none !important; }
        .mobile-toggle { display: block !important; }
        .hero-ornaments { display: none !important; }
        .hero-cake { opacity: 0.5 !important; width: 160px !important; }
        .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        .cakes-split { grid-template-columns: 1fr !important; }
        .recipe-featured { grid-template-columns: 1fr !important; }
        .footer-grid { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ background: tokens.base, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <StatBand />
      <Cakes />
      <Snacks />
      <DoYouKnow />
      <Healthy />
      <Recipes />
      <ClosingCTA />
      <Footer />
    </div>
  );
}