import React, { useState, useEffect } from "react";
import { Clock, Leaf, Sparkles, MessageCircle, ArrowRight, ArrowUpRight, Phone, Star, ChefHat } from "./icons.jsx";
import { tokens, img, naira } from "./theme.js";
import { PH, PRODUCTS, byCategory, BAKERS, DIETARY_NOTES, TUTORIALS, FACTS, WHATSAPP, PHONE_DISPLAY, PHONE_HREF } from "./data.js";
import { Photo, AddButton, SectionHeading } from "./shop.jsx";

const CAKES = byCategory("Cakes");
const SNACKS = byCategory("Snacks");
const DRINKS = byCategory("Drinks");

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */
// Deliberately opens on a shot that appears nowhere else on the page, so
// the hero never sits directly above an identical product card.
const heroSlides = [
  { photo: PH.handsCake, tag: "Baked This Morning" },
  { photo: PH.smallChops, tag: "Small Chops & Trays" },
  { photo: PH.tieredCake, tag: "Celebration Cakes" },
];

function HeroCollage() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* soft ornament, a nod to the flyer's hanging baubles */}
      <div style={{ position: "absolute", top: -30, right: -18, width: 92, height: 92, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, #FFFFFF, ${tokens.goldLight})`, boxShadow: "0 16px 30px rgba(185,130,42,0.26)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, borderRadius: 24, overflow: "hidden", boxShadow: "0 34px 70px rgba(43,20,32,0.3)", transform: "rotate(-1.2deg)" }}>
        <div style={{ position: "relative", aspectRatio: "4/5" }}>
          {heroSlides.map((s, idx) => (
            <img
              key={s.photo}
              src={img(s.photo, 1000, 1250)}
              alt={s.tag}
              draggable="false"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: idx === i ? 1 : 0, transform: idx === i ? "scale(1)" : "scale(1.05)", transition: "opacity 1s ease, transform 1.6s ease" }}
            />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(43,20,32,0.62) 100%)" }} />
          <span
            style={{
              // sits on the right so the baker inset (bottom-left) never covers it
              position: "absolute",
              right: 20,
              bottom: 20,
              fontFamily: "Karla, sans-serif",
              fontWeight: 700,
              fontSize: 11.5,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: tokens.onDark,
              background: "rgba(43,20,32,0.5)",
              backdropFilter: "blur(6px)",
              padding: "7px 13px",
              borderRadius: 999,
            }}
          >
            {heroSlides[i].tag}
          </span>
        </div>
      </div>

      {/* the baker, tucked under the main frame */}
      <div className="hero-inset" style={{ position: "absolute", left: -34, bottom: -34, width: 176, zIndex: 2, borderRadius: 18, overflow: "hidden", border: `5px solid ${tokens.paper}`, boxShadow: "0 20px 44px rgba(43,20,32,0.26)", transform: "rotate(3deg)" }}>
        <Photo src={img(PH.headBaker, 420, 480)} alt="Our head baker plating an order" ratio="7/8" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" style={{ background: `linear-gradient(180deg, ${tokens.pinkPale} 0%, ${tokens.base} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 440, height: 440, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.pinkLight}, transparent 70%)` }} />
      <div className="hero-grid" style={{ maxWidth: 1220, margin: "0 auto", padding: "72px 24px 76px", position: "relative", display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 64, alignItems: "center" }}>
        <HeroCollage />
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", color: tokens.goldDeep, fontWeight: 700, fontSize: 12.5, letterSpacing: 2, marginBottom: 18 }}>YABA, LAGOS · SINCE 2019</p>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(38px, 5.6vw, 62px)", lineHeight: 1.05, color: tokens.ink, margin: 0 }}>
            Cakes that
            <br />
            celebrate, snacks
            <br />
            that <span style={{ fontStyle: "italic", color: tokens.pinkDeep }}>disappear</span>.
          </h1>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 16, lineHeight: 1.7, color: tokens.inkSoft, marginTop: 22, maxWidth: 430 }}>
            Everything is baked to order by a team of six in our Yaba kitchen, then delivered the same day, anywhere in Lagos.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <a href="#/shop" style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, color: tokens.onDark, background: tokens.pink, padding: "15px 28px", textDecoration: "none", borderRadius: 999, whiteSpace: "nowrap" }}>
              Shop all {PRODUCTS.length} items
            </a>
            <a href="#recipes" style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, color: tokens.ink, padding: "15px 8px", textDecoration: "none", borderBottom: `2px solid ${tokens.gold}`, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              Learn to bake <ArrowRight size={15} />
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 30, fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft }}>
            <span style={{ display: "inline-flex", gap: 2, color: tokens.gold }}>
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} size={13} fill={tokens.gold} strokeWidth={0} />
              ))}
            </span>
            4.9 from 380+ Lagos orders
          </div>
        </div>
      </div>

      {/* scrolling tag strip, built from what we actually sell */}
      <div style={{ background: tokens.dark, padding: "18px 0", overflow: "hidden" }}>
        <div className="ticker-track" style={{ display: "flex", gap: 40, width: "max-content" }}>
          {Array(2)
            .fill(["Wedding Cakes", "Chin Chin", "Puff Puff", "Custom Cakes", "Small Chops", "Meat Pie", "Cupcakes", "Doughnuts", "Zobo", "Tigernut Milk"])
            .flat()
            .map((t, i) => (
              <span key={i} style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: 0.5, color: tokens.onDarkSoft, whiteSpace: "nowrap" }}>
                {t} <span style={{ color: tokens.gold, margin: "0 6px" }}>✦</span>
              </span>
            ))}
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
      <div className="grid-4" style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
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

function ViewAll({ href, children }) {
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, color: tokens.pinkDeep, textDecoration: "none", borderBottom: `2px solid ${tokens.gold}`, paddingBottom: 3, whiteSpace: "nowrap" }}>
      {children} <ArrowUpRight size={15} />
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Cakes — deliberately un-gridded. CSS columns let each card keep its
 * own photo proportion, so the tiles stagger instead of marching in
 * lockstep. That raggedness is the point; don't "fix" it to a grid.
 * ------------------------------------------------------------------ */
function Cakes() {
  const shown = CAKES.slice(0, 7);
  return (
    <section id="cakes" style={{ background: tokens.base, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <SectionHeading eyebrow="Cakes" title="A cake for *every kind* of occasion" />
          <div style={{ marginBottom: 40 }}>
            <ViewAll href="#/shop">All {CAKES.length} cakes</ViewAll>
          </div>
        </div>

        <div className="mosaic">
          {shown.map((c) => (
            <article key={c.id} style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, overflow: "hidden" }}>
              <Photo src={img(c.photo, 700, 700)} alt={c.title} ratio={c.ratio} zoom>
                {c.featured && (
                  <span style={{ position: "absolute", top: 12, left: 12, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", color: tokens.dark, background: tokens.gold, padding: "5px 10px", borderRadius: 999 }}>
                    Featured
                  </span>
                )}
              </Photo>
              <div style={{ padding: "16px 18px 18px" }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 18.5, color: tokens.ink, margin: "0 0 7px" }}>{c.title}</h3>
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft, lineHeight: 1.6, margin: "0 0 14px" }}>{c.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.pinkDeep }}>From {naira(c.price)}</span>
                  <AddButton product={c} label="Add" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Snacks — a photo rail you can push sideways.
 * ------------------------------------------------------------------ */
function Snacks() {
  return (
    <section id="snacks" style={{ background: tokens.pinkLight, padding: "96px 0" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <SectionHeading eyebrow="Snacks & Small Chops" title="The tray *everyone* fights over" />
        <div style={{ marginBottom: 40 }}>
          <ViewAll href="#/shop">All {SNACKS.length} snacks</ViewAll>
        </div>
      </div>
      <div className="snack-scroll" style={{ display: "flex", gap: 20, overflowX: "auto", padding: "4px 24px 24px", scrollSnapType: "x mandatory" }}>
        {SNACKS.map((s) => (
          <article key={s.id} style={{ flex: "0 0 278px", scrollSnapAlign: "start", background: tokens.paper, borderRadius: 16, overflow: "hidden" }}>
            <Photo src={img(s.photo, 560, 480)} alt={s.title} ratio="7/6" zoom />
            <div style={{ padding: "16px 18px 18px" }}>
              <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 19, color: tokens.ink, margin: "0 0 6px" }}>{s.title}</h3>
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft, lineHeight: 1.6, margin: "0 0 14px", minHeight: 40 }}>{s.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.pinkDeep }}>
                  {naira(s.price)} <span style={{ fontWeight: 400, color: tokens.inkSoft, fontSize: 12 }}>{s.unit}</span>
                </span>
                <AddButton product={s} label="Add" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * The bakers — editorial collage, text on the left, four frames right.
 * ------------------------------------------------------------------ */
function Bakers() {
  return (
    <section id="bakers" style={{ background: tokens.paper, padding: "96px 24px" }}>
      <div className="bakers-grid" style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 60, alignItems: "center" }}>
        <div>
          <SectionHeading eyebrow="Our Bakers" title="The hands behind *every tray*" />
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15.5, lineHeight: 1.75, color: tokens.inkSoft, margin: "0 0 18px", maxWidth: 400 }}>
            Six people, one kitchen, and a 6am start. Nothing here is outsourced and nothing is baked the day before — the tray that reaches your table was mixed by someone standing in this room.
          </p>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15.5, lineHeight: 1.75, color: tokens.inkSoft, margin: "0 0 28px", maxWidth: 400 }}>
            If you want it done a particular way, ask for it. We would rather adjust the recipe than hand you something you did not order.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: tokens.base, borderRadius: 14, border: `1px solid ${tokens.line}`, maxWidth: 400 }}>
            <ChefHat size={24} color={tokens.pinkDeep} />
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.ink, margin: 0, lineHeight: 1.55 }}>Every baker on the team holds a food-handler certificate, renewed yearly.</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {BAKERS.map((b) => (
            <figure key={b.role} style={{ margin: 0, position: "relative", borderRadius: 16, overflow: "hidden" }}>
              <Photo src={img(b.photo, 640, 800)} alt={`${b.role} — ${b.note}`} ratio="4/5" zoom />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(43,20,32,0.75) 100%)" }} />
              <figcaption style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
                <span style={{ display: "block", fontFamily: "Fraunces, serif", fontSize: 17, color: tokens.onDark }}>{b.role}</span>
                <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11.5, letterSpacing: 0.6, color: tokens.gold, marginTop: 3 }}>{b.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function DoYouKnow() {
  const line = FACTS.concat(FACTS);
  return (
    <section id="know" style={{ background: tokens.dark, padding: "56px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px 30px" }}>
        <p style={{ fontFamily: "Karla, sans-serif", color: tokens.gold, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, margin: 0, textTransform: "uppercase" }}>Do You Know</p>
      </div>
      <div className="ticker-track" style={{ display: "flex", gap: 56, width: "max-content" }}>
        {line.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Sparkles size={16} color={tokens.gold} style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 400, fontSize: 21, color: tokens.onDark, whiteSpace: "nowrap" }}>{f}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Healthy — the three drinks get real estate, dietary options sit
 * underneath as supporting detail.
 * ------------------------------------------------------------------ */
function Healthy() {
  const featured = DRINKS.filter((d) => d.featured);
  return (
    <section id="healthy" style={{ background: tokens.goldLight, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <SectionHeading eyebrow="Better-for-you" title="Cold-pressed, cultured, *properly chilled*" accent="gold" />
          <div style={{ marginBottom: 40 }}>
            <ViewAll href="#/shop">All {DRINKS.length} drinks</ViewAll>
          </div>
        </div>

        <div className="drinks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {featured.map((d) => (
            <article key={d.id} style={{ background: tokens.paper, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Photo src={img(d.photo, 700, 780)} alt={d.title} ratio="7/8" zoom>
                <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: tokens.dark, background: tokens.gold, padding: "6px 11px", borderRadius: 999 }}>
                  {(d.tags || [])[0]}
                </span>
              </Photo>
              <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 22, color: tokens.ink, margin: "0 0 8px" }}>{d.title}</h3>
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14, color: tokens.inkSoft, lineHeight: 1.65, margin: "0 0 18px", flex: 1 }}>{d.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 14, color: tokens.pinkDeep }}>{naira(d.price)}</span>
                  <AddButton product={d} label="Add" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="dietary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48, paddingTop: 40, borderTop: `1px solid ${tokens.gold}40` }}>
          {DIETARY_NOTES.map((it) => (
            <div key={it.title}>
              <Leaf size={20} color={tokens.goldDeep} />
              <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 18.5, color: tokens.ink, margin: "12px 0 8px" }}>{it.title}</h3>
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14, lineHeight: 1.6, color: tokens.inkSoft, margin: 0 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Recipes & tutorials — every entry carries the photo of what you are
 * actually being taught to make.
 * ------------------------------------------------------------------ */
function Tutorials() {
  const featured = TUTORIALS.find((t) => t.featured);
  const rest = TUTORIALS.filter((t) => !t.featured);
  const tagColor = (tag) => (tag === "Recipe" ? tokens.pinkDeep : tag === "Tutorial" ? tokens.goldDeep : tokens.pink);

  return (
    <section id="recipes" style={{ background: tokens.base, padding: "96px 24px 100px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <SectionHeading eyebrow="Recipes & Tips" title="Learn to *bake it* yourself" />

        <a href="#recipes" className="tut-featured" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 0, background: tokens.paper, borderRadius: 20, overflow: "hidden", border: `1px solid ${tokens.line}`, marginBottom: 26, textDecoration: "none" }}>
          <Photo src={img(featured.photo, 900, 620)} alt={featured.title} ratio="3/2" zoom />
          <div style={{ padding: "36px 38px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: tagColor(featured.tag) }}>{featured.tag.toUpperCase()}</span>
            <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(23px, 2.4vw, 30px)", color: tokens.ink, margin: "10px 0 12px", lineHeight: 1.2 }}>{featured.title}</h3>
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15, color: tokens.inkSoft, lineHeight: 1.65, margin: "0 0 20px" }}>{featured.desc}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Clock size={14} /> {featured.time}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: tokens.pinkDeep, fontWeight: 600 }}>
                Read it <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </a>

        <div className="tut-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {rest.map((t) => (
            <a key={t.id} href="#recipes" style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: tokens.paper, borderRadius: 16, overflow: "hidden", border: `1px solid ${tokens.line}` }}>
              <Photo src={img(t.photo, 720, 450)} alt={t.title} ratio="16/10" zoom />
              <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: 1.2, color: tagColor(t.tag) }}>{t.tag.toUpperCase()}</span>
                <h4 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 18, color: tokens.ink, margin: "8px 0 8px", lineHeight: 1.3 }}>{t.title}</h4>
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft, lineHeight: 1.6, margin: "0 0 14px", flex: 1 }}>{t.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: tokens.inkSoft, fontFamily: "Karla, sans-serif", fontSize: 12 }}>
                  <Clock size={12} /> {t.time}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "96px 24px", textAlign: "center" }}>
      <img src={img(PH.bakeryCase, 1600, 700)} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, ${tokens.dark}F0, ${tokens.pinkDeep}D9)` }} />
      <div style={{ position: "relative" }}>
        <p style={{ fontFamily: "Karla, sans-serif", color: tokens.gold, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, marginBottom: 16, textTransform: "uppercase" }}>Ready when you are</p>
        <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(30px, 5vw, 50px)", color: tokens.onDark, margin: "0 0 32px", lineHeight: 1.12 }}>
          Let's bake something
          <br />
          worth celebrating.
        </h2>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15, color: tokens.onDark, background: tokens.pink, padding: "16px 30px", borderRadius: 999, textDecoration: "none" }}>
            <MessageCircle size={17} /> Order on WhatsApp
          </a>
          <a href={PHONE_HREF} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15, color: tokens.onDark, border: "1px solid rgba(251,239,243,0.4)", padding: "16px 30px", borderRadius: 999, textDecoration: "none" }}>
            <Phone size={16} /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div style={{ background: tokens.base }}>
      <Hero />
      <StatBand />
      <Cakes />
      <Snacks />
      <Bakers />
      <DoYouKnow />
      <Healthy />
      <Tutorials />
      <ClosingCTA />
    </div>
  );
}
