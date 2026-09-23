import React, { useState, useEffect } from "react";
import { Clock, Leaf, Sparkles, MessageCircle, ArrowRight, ArrowUpRight, Phone, Star, ChefHat, MapPin, Flame, Heart, Truck } from "./icons.jsx";
import { tokens, img, naira, DISPLAY } from "./theme.js";
import { PH, PRODUCTS, byCategory, BAKERS, DIETARY_NOTES, RECIPES, FACTS, OCCASIONS, REVIEWS, PULL_QUOTE, REVIEWS_ARE_REAL, SHOP, RATING, FOUNDER, WHATSAPP, PHONE_DISPLAY, PHONE_HREF, BRAND, fmtHour, HOURS } from "./data.js";
import { Photo, AddButton, SectionHeading, Stars, PillLink } from "./shop.jsx";
import { GalleryStrip } from "./gallery.jsx";
import Weddings from "./weddings.jsx";
import { FeedbackInvite } from "./feedback.jsx";

const CAKES = byCategory("Cakes");
const SNACKS = [...byCategory("Small Chops"), ...byCategory("Snacks")];
const DRINKS = byCategory("Drinks");
const MEALS = byCategory("Meals");

/* ------------------------------------------------------------------ *
 * Hero — full-bleed. The photo sits on the right and melts into a wine
 * to raspberry wash on the left, so the big shout always has a calm
 * ground to sit on whatever picture ends up behind it.
 * ------------------------------------------------------------------ */
// Swap these for your own gallery shots — portrait or landscape both work,
// the frame crops to fit.
const heroSlides = [
  { photo: PH.butterflyCakeWhitePink, tag: "Birthday Cakes" },
  { photo: PH.weddingGoldMonogram, tag: "Wedding Cakes" },
  { photo: PH.smallChopsFoilTray, tag: "Small Chops & Trays" },
];

const WINE = "#5E1233";

/* Hero colourways. `wash` fades the photo into the background on desktop;
 * `washMobile` sits over the full-width photo on phones so text stays
 * readable. Blush was chosen to match the flyer; the others are kept so
 * the look can be changed with one word in HERO_THEME. */
const HERO_THEMES = {
  // the flyer: soft blush pink, dark ink type, raspberry accent
  blush: {
    bg: "linear-gradient(160deg, #FEF3F7 0%, #FADFE9 55%, #F4C9D8 100%)",
    wash: "linear-gradient(90deg, rgba(254,243,247,0.95) 0%, rgba(254,243,247,0.55) 38%, rgba(254,243,247,0) 62%)",
    washMobile: "linear-gradient(180deg, rgba(254,243,247,0.9) 0%, rgba(250,223,233,0.88) 100%)",
    text: tokens.ink,
    heading: tokens.ink,
    accent: tokens.pink,
    star: tokens.gold,
    outline: tokens.ink,
    dark: false,
  },
  // bright raspberry, white type
  raspberry: {
    bg: `linear-gradient(160deg, #D93A73 0%, ${tokens.pink} 45%, #EE93B3 100%)`,
    wash: "linear-gradient(90deg, rgba(194,37,92,0.75) 0%, rgba(194,37,92,0.3) 40%, rgba(194,37,92,0) 65%)",
    washMobile: "linear-gradient(180deg, rgba(194,37,92,0.82) 0%, rgba(176,30,82,0.88) 100%)",
    text: "#FFFFFF",
    heading: "#FFFFFF",
    accent: tokens.goldLight,
    star: tokens.goldLight,
    outline: "#FFFFFF",
    dark: true,
    inverseButton: true,
  },
  // warm cream into blush, raspberry type, gold accent
  cream: {
    bg: `linear-gradient(160deg, #FFF9F3 0%, #FBEEDC 50%, ${tokens.pinkLight} 100%)`,
    wash: "linear-gradient(90deg, rgba(255,249,243,0.95) 0%, rgba(255,249,243,0.55) 38%, rgba(255,249,243,0) 62%)",
    washMobile: "linear-gradient(180deg, rgba(255,249,243,0.9) 0%, rgba(251,238,220,0.88) 100%)",
    text: tokens.ink,
    heading: tokens.pinkDeep,
    accent: tokens.goldDeep,
    star: tokens.gold,
    outline: tokens.pinkDeep,
    dark: false,
  },
  // the original deep wine
  wine: {
    bg: `linear-gradient(165deg, #3E0B22 0%, ${WINE} 30%, ${tokens.pinkDeep} 62%, #E59AB4 100%)`,
    wash: "linear-gradient(90deg, rgba(62,11,34,0.55) 0%, rgba(62,11,34,0.2) 45%, rgba(62,11,34,0) 70%)",
    washMobile: "linear-gradient(180deg, rgba(62,11,34,0.72) 0%, rgba(94,18,51,0.8) 60%, rgba(62,11,34,0.9) 100%)",
    text: tokens.onDark,
    heading: tokens.onDark,
    accent: tokens.onDark,
    star: tokens.onDark,
    outline: tokens.onDark,
    dark: true,
  },
};
const HERO_THEME = "blush";


function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);
  const t = HERO_THEMES[HERO_THEME];

  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", background: t.bg, "--hero-wash-mobile": t.washMobile }}>
      {/* the photo, right-hand side */}
      <div className="hero-photo" style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "62%", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 38%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 38%)" }}>
        {heroSlides.map((s, idx) => (
          <img
            key={s.photo}
            src={img(s.photo, 1600, 1100)}
            alt={idx === i ? s.tag : ""}
            draggable="false"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: s.position || "50% 50%", opacity: idx === i ? 1 : 0, transform: idx === i ? "scale(1)" : "scale(1.04)", transition: "opacity 1.1s ease, transform 1.8s ease" }}
          />
        ))}
      </div>
      <div className="hero-wash" style={{ position: "absolute", inset: 0, background: t.wash }} />

      <div style={{ position: "relative", maxWidth: 1220, margin: "0 auto", padding: "clamp(64px, 10vw, 118px) 24px clamp(64px, 9vw, 104px)" }}>
        <div style={{ maxWidth: 640 }}>
          {PULL_QUOTE && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontFamily: "Karla, sans-serif", fontSize: 14.5, color: t.text, marginBottom: 22 }}>
              {/* the stars belong to the quote beside them, so they show its score */}
              <span style={{ display: "inline-flex", gap: 3, color: t.star }} aria-label={`${PULL_QUOTE.rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={16} fill={n <= PULL_QUOTE.rating ? t.star : "none"} strokeWidth={n <= PULL_QUOTE.rating ? 0 : 1.5} />
                ))}
              </span>
              <span>
                “{PULL_QUOTE.text}” <span style={{ opacity: 0.75 }}>– {PULL_QUOTE.name}</span>
              </span>
            </div>
          )}

          <h1 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(38px, 6vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.01em", textTransform: "uppercase", color: t.heading, margin: 0 }}>
            Cakes &amp; chops for <span style={{ color: t.accent }}>every party</span>
          </h1>

          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55, color: t.text, margin: "24px 0 0", maxWidth: 520 }}>
            Birthday cakes, small chops, party jollof and cold zobo, made fresh in our Ayobo kitchen and delivered across Lagos.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <PillLink href="#/shop" inverse={t.inverseButton}>Shop now</PillLink>
            <PillLink href={WHATSAPP} variant="outline" outlineColor={t.outline} external>
              <MessageCircle size={17} /> Order on WhatsApp
            </PillLink>
          </div>

          <div style={{ display: "flex", gap: "12px 28px", marginTop: 30, flexWrap: "wrap" }}>
            {[
              { Icon: Heart, text: "Made fresh the day you get it" },
              { Icon: Truck, text: "Same-day delivery across Lagos" },
            ].map(({ Icon, text }) => (
              <span key={text} style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 14, color: t.text }}>
                <Icon size={19} color={t.dark ? t.text : tokens.pink} /> {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span className="hero-tag" style={{ position: "absolute", right: 24, bottom: 22, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: 1.4, textTransform: "uppercase", color: tokens.onDark, background: "rgba(43,20,32,0.45)", backdropFilter: "blur(6px)", padding: "7px 13px", borderRadius: 999 }}>
        {heroSlides[i].tag}
      </span>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Promise strip — four small reasons, straight under the hero.
 * ------------------------------------------------------------------ */
function PromiseStrip() {
  const items = [
    { Icon: ChefHat, text: "Baked and cooked to order, never frozen" },
    { Icon: Flame, text: "Small chops fried fresh, still warm on arrival" },
    { Icon: Sparkles, text: "Custom cakes, sketched with you first" },
    { Icon: Truck, text: "Same-day delivery anywhere in Lagos" },
  ];
  return (
    <section style={{ background: tokens.paper, padding: "30px 24px", borderBottom: `1px solid ${tokens.line}` }}>
      <div className="grid-4" style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
        {items.map(({ Icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ flexShrink: 0, width: 54, height: 54, borderRadius: "50%", background: tokens.pinkLight, color: tokens.pinkDeep, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={23} strokeWidth={1.6} />
            </span>
            <span style={{ fontFamily: "Karla, sans-serif", fontSize: 15, lineHeight: 1.35, color: tokens.ink }}>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Hard to pick just one — the five things we sell, each on its own
 * tinted card so the row reads as a spread rather than a grid.
 * ------------------------------------------------------------------ */
const PICKS = [
  { category: "Cakes", photo: PH.chocolateVanillaDripCake, tint: ["#FADCE6", "#F2B3C7"] },
  { category: "Small Chops", photo: PH.smallChopsBox, tint: ["#F8E7C9", "#EDC586"] },
  { category: "Snacks", photo: PH.chinChinJars, tint: ["#F6E0D2", "#E6B593"] },
  { category: "Meals", photo: PH.ricePacksChickenDodo, tint: ["#FBDCCB", "#F0A47E"] },
  { category: "Drinks", photo: PH.hibiscus, tint: ["#F8D0D6", "#E4899A"] },
];

function DisplayHeading({ children, sub, light = false }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 44 }}>
      <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(28px, 4.6vw, 56px)", lineHeight: 1.05, textTransform: "uppercase", color: light ? tokens.onDark : WINE, margin: 0 }}>{children}</h2>
      {sub && <p style={{ fontFamily: "Karla, sans-serif", fontSize: 16, color: light ? tokens.onDarkSoft : tokens.ink, margin: "14px auto 0", maxWidth: 640, lineHeight: 1.55 }}>{sub}</p>}
    </div>
  );
}

function PickOne() {
  return (
    <section id="menu" style={{ background: "#FBF3F5", padding: "88px 24px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <DisplayHeading sub="Cakes for the big day, chops for the crowd, and something cold to wash it down.">Hard to pick just one</DisplayHeading>
        <div className="pick-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18 }}>
          {PICKS.map((p) => {
            const count = byCategory(p.category).length;
            return (
              <a
                key={p.category}
                href={`#/shop?category=${encodeURIComponent(p.category)}`}
                className="pick-card"
                style={{ display: "flex", flexDirection: "column", textDecoration: "none", borderRadius: 24, padding: 14, background: `linear-gradient(165deg, ${p.tint[0]} 0%, ${p.tint[1]} 100%)` }}
              >
                <div style={{ borderRadius: 18, overflow: "hidden", boxShadow: "0 16px 30px rgba(94,18,51,0.18)" }}>
                  <Photo src={img(p.photo, 500, 560)} alt="" ratio="9/10" zoom />
                </div>
                <div style={{ padding: "16px 6px 6px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 16.5, textTransform: "uppercase", color: WINE, lineHeight: 1.15 }}>{p.category}</div>
                    <div style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: WINE, opacity: 0.75, marginTop: 4 }}>
                      {count} {count === 1 ? "item" : "items"}
                    </div>
                  </div>
                  <span style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.7)", color: WINE, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Your tray, your rules — the party-tray pitch over a photo, with a
 * ribbon of text swooping behind the card.
 * ------------------------------------------------------------------ */
function TrayBand() {
  const ribbon = "Puff puff ✦ Samosa ✦ Spring rolls ✦ Meat pie ✦ Sausage rolls ✦ ".repeat(8);
  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "clamp(90px, 12vw, 150px) 24px", background: tokens.pinkLight }}>
      <img src={img(PH.smallChopsFoilTray, 1800, 900)} alt="" aria-hidden="true" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(246,217,227,0.38)" }} />

      <svg aria-hidden="true" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <path id="tray-ribbon" d="M-80,470 C 160,330 420,250 650,330 C 880,410 880,640 1150,580 C 1290,550 1380,470 1500,430" fill="none" stroke={tokens.pinkLight} strokeWidth="66" strokeLinecap="round" />
        <text style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, textTransform: "uppercase", letterSpacing: 1 }} fill={WINE} dominantBaseline="central">
          <textPath href="#tray-ribbon">{ribbon}</textPath>
        </text>
      </svg>

      <div style={{ position: "relative", maxWidth: 980, margin: "0 auto", background: tokens.paper, borderRadius: 26, padding: "clamp(30px, 5vw, 48px) clamp(22px, 5vw, 56px)", textAlign: "center", boxShadow: "0 30px 60px rgba(94,18,51,0.18)" }}>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(26px, 4.4vw, 50px)", lineHeight: 1.05, textTransform: "uppercase", color: WINE, margin: 0 }}>Your tray. Your rules.</h2>
        <p style={{ fontFamily: "Karla, sans-serif", fontSize: 16, lineHeight: 1.6, color: tokens.ink, margin: "16px auto 26px", maxWidth: 600 }}>
          Mix puff puff, samosa, spring rolls, meat pie and sausage rolls however you like. Tell us how many guests are coming and we'll portion the tray, fry it that morning, and get it to you warm.
        </p>
        <PillLink href="#/p/platter">Build your tray</PillLink>
      </div>
    </section>
  );
}

function StatBand() {
  const stats = [
    { n: "1,200+", l: "Cakes Baked" },
    { n: "300+", l: "Recipes Shared" },
    { n: `${new Date().getFullYear() - FOUNDER.since}`, l: "Years Baking" },
    RATING && { n: RATING.score, l: "Average Rating" },
  ].filter(Boolean);
  return (
    <section style={{ background: `linear-gradient(100deg, ${tokens.pinkDeep}, ${tokens.dark})`, padding: "40px 24px" }}>
      <div className="grid-4" style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 24 }}>
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
 * Meals — the Nigerian kitchen. One big party-tray card on the left,
 * everything else laid out like the menu board on the wall, so it reads
 * as "what's cooking today" rather than another row of product cards.
 * ------------------------------------------------------------------ */
function Meals() {
  const tray = MEALS.find((m) => m.featured) || MEALS[0];
  const plates = MEALS.filter((m) => m.id !== tray.id);
  return (
    <section id="meals" style={{ background: tokens.base, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <SectionHeading eyebrow="Nigerian Kitchen" title="Jollof, soups & swallow, *cooked fresh* daily" />
          <div style={{ marginBottom: 40 }}>
            <ViewAll href="#/shop?category=Meals">All {MEALS.length} meals</ViewAll>
          </div>
        </div>

        <div className="meals-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 36, alignItems: "start" }}>
          {/* the party cooler */}
          <article className="meals-feature" style={{ position: "sticky", top: 96, borderRadius: 22, overflow: "hidden", boxShadow: "0 26px 56px rgba(43,20,32,0.18)" }}>
            <Photo src={img(tray.photo, 900, 1100)} alt={tray.title} ratio="9/11" zoom>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(43,20,32,0) 35%, rgba(43,20,32,0.88) 100%)" }} />
              <span style={{ position: "absolute", top: 16, left: 16, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: tokens.dark, background: tokens.gold, padding: "6px 11px", borderRadius: 999 }}>
                For the party
              </span>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "24px 24px 22px" }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(24px, 2.6vw, 30px)", color: tokens.onDark, margin: "0 0 8px" }}>{tray.title}</h3>
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14, color: tokens.onDarkSoft, lineHeight: 1.6, margin: "0 0 12px", maxWidth: 400 }}>{tray.desc}</p>
                <p style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.gold, margin: "0 0 16px" }}>
                  <Clock size={14} /> Order by the evening before
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 16, color: tokens.onDark }}>
                    {naira(tray.price)} <span style={{ fontWeight: 400, fontSize: 12.5, color: tokens.onDarkSoft }}>{tray.unit}</span>
                  </span>
                  <a href={`#/p/${tray.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 13.5, color: tokens.dark, background: tokens.onDark, padding: "10px 18px", borderRadius: 999, textDecoration: "none" }}>
                    Order packs <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </Photo>
          </article>

          {/* the menu board */}
          <div style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 22, padding: "8px 22px" }}>
            {plates.map((m, idx) => (
              <div key={m.id} className="meal-row" style={{ display: "grid", gridTemplateColumns: "76px 1fr auto", gap: 16, alignItems: "center", padding: "14px 0", borderTop: idx ? `1px dashed ${tokens.line}` : "none" }}>
                <a href={`#/p/${m.id}`} aria-label={m.title} style={{ display: "block", borderRadius: 12, overflow: "hidden" }}>
                  <Photo src={img(m.photo, 200, 200)} alt={m.title} ratio="1/1" />
                </a>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <a href={`#/p/${m.id}`} style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 17, color: tokens.ink, textDecoration: "none" }}>{m.title}</a>
                    <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.pinkDeep, whiteSpace: "nowrap" }}>
                      {naira(m.price)} <span style={{ fontWeight: 400, fontSize: 11.5, color: tokens.inkSoft }}>{m.unit}</span>
                    </span>
                  </div>
                  <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.inkSoft, lineHeight: 1.55, margin: "4px 0 0" }}>{m.desc}</p>
                </div>
                <div className="meal-add">
                  <AddButton product={m} label="Add" />
                </div>
              </div>
            ))}
          </div>
        </div>
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
                {(d.tags || [])[0] && (
                  <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: 1, textTransform: "uppercase", color: tokens.dark, background: tokens.gold, padding: "6px 11px", borderRadius: 999 }}>
                    {d.tags[0]}
                  </span>
                )}
              </Photo>
              <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 22, color: tokens.ink, margin: "0 0 8px" }}>{d.title}</h3>
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14, color: tokens.inkSoft, lineHeight: 1.65, margin: "0 0 18px", flex: 1 }}>{d.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 14, color: tokens.pinkDeep }}>
                    {naira(d.price)}
                    {d.unit && <span style={{ fontWeight: 400, fontSize: 12, color: tokens.inkSoft }}> {d.unit}</span>}
                  </span>
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
  const featured = RECIPES.find((t) => t.featured);
  const rest = RECIPES.filter((t) => !t.featured).slice(0, 3);
  const tagColor = (tag) => (tag === "Recipe" ? tokens.pinkDeep : tag === "Tutorial" ? tokens.goldDeep : tokens.pink);

  return (
    <section id="recipes" style={{ background: tokens.base, padding: "96px 24px 100px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <SectionHeading eyebrow="Recipes & Tips" title="Learn to *bake it* yourself" />
          <div style={{ marginBottom: 40 }}>
            <ViewAll href="#/recipes">All {RECIPES.length} recipes</ViewAll>
          </div>
        </div>

        <a href={`#/recipes/${featured.id}`} className="tut-featured" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 0, background: tokens.paper, borderRadius: 20, overflow: "hidden", border: `1px solid ${tokens.line}`, marginBottom: 26, textDecoration: "none" }}>
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
            <a key={t.id} href={`#/recipes/${t.id}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: tokens.paper, borderRadius: 16, overflow: "hidden", border: `1px solid ${tokens.line}` }}>
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

/* ------------------------------------------------------------------ *
 * Occasions — nobody wakes up wanting "a tiered cake". They want their
 * mother's 60th, on Saturday. This is the door most people come in by.
 * ------------------------------------------------------------------ */
function Occasions() {
  return (
    <section id="occasions" style={{ background: tokens.paper, padding: "92px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <SectionHeading eyebrow="Shop by occasion" title="What are we *baking for*?" />
        <div className="occasion-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {OCCASIONS.map((o) => (
            <a key={o.id} href={`#/shop?occasion=${o.id}`} style={{ textDecoration: "none", position: "relative", borderRadius: 16, overflow: "hidden", display: "block" }}>
              <Photo src={img(o.photo, 560, 420)} alt="" ratio="4/3" zoom />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(43,20,32,0.05) 40%, rgba(43,20,32,0.86) 100%)" }} />
              <div style={{ position: "absolute", left: 20, right: 20, bottom: 18 }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 23, color: tokens.onDark, margin: "0 0 5px" }}>{o.label}</h3>
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.onDarkSoft, lineHeight: 1.5, margin: 0 }}>{o.blurb}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Visit — the part that makes it a place rather than a catalogue.
 * ------------------------------------------------------------------ */

function useOpenNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const hour = now.getHours() + now.getMinutes() / 60;
  return hour >= SHOP.openHour && hour < SHOP.closeHour;
}

/* A map built from plain raster tiles rather than OpenStreetMap's embed —
 * the embed needs WebGL and shows an apology bar on any device without it.
 * Tiles are ordinary <img>, so the worst case is the branded panel behind
 * them. Swap for a keyed provider if this ever gets real traffic. */
function StaticMap({ lat, lon, zoom = 16, cols = 6, rows = 3, height = 320 }) {
  const n = 2 ** zoom;
  const px = ((lon + 180) / 360) * n * 256;
  const py = ((1 - Math.asinh(Math.tan((lat * Math.PI) / 180)) / Math.PI) / 2) * n * 256;
  const x0 = Math.floor(px / 256) - Math.floor(cols / 2);
  const y0 = Math.floor(py / 256) - Math.floor(rows / 2);
  const offsetX = px - x0 * 256;
  const offsetY = py - y0 * 256;

  return (
    <div style={{ position: "relative", height, overflow: "hidden", background: tokens.pinkLight }}>
      <div style={{ position: "absolute", width: cols * 256, height: rows * 256, left: `calc(50% - ${offsetX}px)`, top: `calc(50% - ${offsetY}px)`, filter: "saturate(0.75) contrast(0.96)" }}>
        {Array.from({ length: rows }).map((_, j) =>
          Array.from({ length: cols }).map((_, i) => (
            <img
              key={`${i}-${j}`}
              src={`https://tile.openstreetmap.org/${zoom}/${x0 + i}/${y0 + j}.png`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              style={{ position: "absolute", left: i * 256, top: j * 256, width: 256, height: 256, display: "block" }}
            />
          ))
        )}
      </div>

      {/* the pin sits exactly where the shop is */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -100%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12, padding: "8px 14px", borderRadius: 999, whiteSpace: "nowrap", boxShadow: "0 8px 20px rgba(43,20,32,0.35)" }}>
          {BRAND.name}
        </span>
        <span style={{ width: 2, height: 14, background: tokens.pink }} />
      </div>

      <a
        href={SHOP.directions}
        target="_blank"
        rel="noreferrer"
        style={{ position: "absolute", right: 18, bottom: 18, display: "inline-flex", alignItems: "center", gap: 8, background: tokens.paper, color: tokens.ink, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 13, padding: "11px 18px", borderRadius: 999, textDecoration: "none", boxShadow: "0 8px 22px rgba(43,20,32,0.22)" }}
      >
        <MapPin size={14} color={tokens.pinkDeep} /> Open in Maps
      </a>

      <span style={{ position: "absolute", left: 10, bottom: 8, fontFamily: "Karla, sans-serif", fontSize: 10.5, color: tokens.ink, background: "rgba(255,255,255,0.75)", padding: "3px 7px", borderRadius: 4 }}>
        © OpenStreetMap contributors
      </span>
    </div>
  );
}

function Visit() {
  const open = useOpenNow();

  return (
    <section id="visit" style={{ background: tokens.base, padding: "92px 0 0" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeading eyebrow="Visit us" title="The shop is *right here*" />

        <div className="visit-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 30, alignItems: "start" }}>
          <div style={{ display: "grid", gridTemplateRows: "1.35fr 1fr", gap: 16 }}>
            <Photo src={img(PH.storefront, 900, 620)} alt="The front of the shop" ratio="3/2" radius={16} zoom />
            <Photo src={img(PH.counter, 900, 460)} alt="The counter, mid-morning" ratio="2/1" radius={16} zoom />
          </div>

          <div style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 18, padding: "30px 30px 26px", display: "flex", flexDirection: "column" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                background: open ? "#E7F3EA" : tokens.pinkPale,
                color: open ? "#2F6B42" : tokens.pinkDeep,
                fontFamily: "Karla, sans-serif",
                fontWeight: 700,
                fontSize: 12.5,
                padding: "7px 13px",
                borderRadius: 999,
                marginBottom: 18,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: open ? "#3B9E5B" : tokens.pink }} />
              {open ? `Open now · closes ${fmtHour(SHOP.closeHour)}` : `Closed · opens ${fmtHour(SHOP.openHour)}`}
            </span>

            <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 25, color: tokens.ink, margin: "0 0 10px", lineHeight: 1.25 }}>{SHOP.address}</h3>
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14.5, color: tokens.inkSoft, lineHeight: 1.7, margin: "0 0 22px" }}>{SHOP.landmark}</p>

            <div style={{ borderTop: `1px solid ${tokens.line}`, paddingTop: 18, marginBottom: 22 }}>
              {[
                { k: "Monday – Friday", v: HOURS },
                { k: "Saturday", v: HOURS },
                { k: "Sunday", v: HOURS },
                { k: "Collection orders", v: "From 7am, by arrangement" },
              ].map((row) => (
                <div key={row.k} style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "7px 0", fontFamily: "Karla, sans-serif", fontSize: 13.5 }}>
                  <span style={{ color: tokens.inkSoft }}>{row.k}</span>
                  <span style={{ color: tokens.ink, fontWeight: 600 }}>{row.v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={SHOP.directions} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "13px 22px", borderRadius: 999, textDecoration: "none" }}>
                <MapPin size={15} /> Get directions
              </a>
              <a href={PHONE_HREF} style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${tokens.line}`, color: tokens.ink, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "13px 22px", borderRadius: 999, textDecoration: "none" }}>
                <Phone size={15} /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "34px 24px 92px" }}>
        <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${tokens.line}` }}>
          {/* 8 columns is enough that the tiles always reach both edges of
              the card, whatever the sub-tile offset of the pin happens to be */}
          <StaticMap lat={SHOP.lat} lon={SHOP.lon} cols={8} height={340} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Reviews — a shop feels alive because other people are visibly in it.
 * ------------------------------------------------------------------ */
function Reviews() {
  // No invented reviews on a live shop: until real feedback is published
  // from #/admin/feedback, this section is only the invitation to leave some.
  if (!REVIEWS_ARE_REAL) {
    return (
      <section id="reviews" style={{ background: tokens.pinkPale, padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SectionHeading eyebrow="From our customers" title="Tell us how the *party* went" />
          </div>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: 17, color: tokens.ink, margin: "0 auto 26px", maxWidth: 560, lineHeight: 1.6 }}>
            We would rather this wall were full of your words than ours. If we have baked for you, tell us how it went.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FeedbackInvite />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="reviews" style={{ background: tokens.pinkPale, padding: "92px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <SectionHeading eyebrow="From our customers" title="What people say *after* the party" />
          <div style={{ marginBottom: 40, textAlign: "right" }}>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 42, color: tokens.ink, lineHeight: 1 }}>{RATING.score}</div>
            <Stars rating={5} size={14} />
            <div style={{ fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.inkSoft, marginTop: 4 }}>{RATING.count} {RATING.basis}</div>
          </div>
        </div>

        <div className="review-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {REVIEWS.map((r) => (
            <figure key={r.name} style={{ margin: 0, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {r.photo && <Photo src={img(r.photo, 560, 380)} alt={`A cake we made for ${r.name}`} ratio="3/2" zoom />}
              <blockquote style={{ margin: 0, padding: "20px 22px 0", flex: 1 }}>
                <Stars rating={r.rating} size={13} />
                <p style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, lineHeight: 1.65, color: tokens.ink, margin: "12px 0 0" }}>{r.text}</p>
              </blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 11, padding: "18px 22px 20px" }}>
                <span style={{ width: 34, height: 34, borderRadius: "50%", background: tokens.pinkLight, color: tokens.pinkDeep, display: "grid", placeItems: "center", fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                  {r.name.charAt(0)}
                </span>
                <span>
                  <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.ink }}>{r.name}</span>
                  <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 12, color: tokens.inkSoft, marginTop: 1 }}>
                    {r.area} · {r.when}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "space-between", marginTop: 34, paddingTop: 28, borderTop: `1px solid ${tokens.line}` }}>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: 17, color: tokens.ink, margin: 0, maxWidth: 560, lineHeight: 1.6 }}>
            Every one of these was left by someone who ordered. If that was you, the party is over and the plates are washed — tell us how it went.
          </p>
          <FeedbackInvite />
        </div>
      </div>
    </section>
  );
}

/* A short bridge into the founder's story, so About isn't orphaned. */
function FounderStrip() {
  return (
    <section style={{ background: tokens.paper, padding: "70px 24px" }}>
      <a href="#/about" className="founder-strip" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 26, textDecoration: "none", background: tokens.base, border: `1px solid ${tokens.line}`, borderRadius: 20, padding: "26px 30px" }}>
        <img src={img(FOUNDER.photo, 240, 240)} alt="" style={{ width: 82, height: 82, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1.6, color: tokens.goldDeep, margin: "0 0 7px", textTransform: "uppercase" }}>
            {FOUNDER.role}
          </p>
          <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 23, color: tokens.ink, margin: "0 0 6px" }}>
            “{FOUNDER.intro.split(". ")[1] || FOUNDER.intro}”
          </h3>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.inkSoft, margin: 0 }}>Read {FOUNDER.name}'s story</p>
        </div>
        <ArrowUpRight size={22} color={tokens.pinkDeep} />
      </a>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div style={{ background: tokens.base }}>
      <Hero />
      <PromiseStrip />
      <PickOne />
      <Weddings />
      <Occasions />
      <Cakes />
      <Snacks />
      <TrayBand />
      <Meals />
      <GalleryStrip />
      <Bakers />
      <DoYouKnow />
      <Healthy />
      <StatBand />
      <Reviews />
      <Tutorials />
      <FounderStrip />
      <Visit />
      <ClosingCTA />
    </div>
  );
}
