import React from "react";
import { tokens, img } from "./theme.js";
import { FOUNDER, RECIPES, SHOP, WHATSAPP } from "./data.js";
import { Photo, SOCIALS } from "./shop.jsx";
import { ArrowUpRight, ArrowRight, MapPin, ChefHat } from "./icons.jsx";

// Shares the Kitchen Notes palette, because this is where you arrive from.
const PAPER = "#FFFCF6";
const INK = "#2E2A24";
const INK_SOFT = "#7C7365";
const RULE = "#E7DECC";

const findRecipe = (id) => RECIPES.find((r) => r.id === id);

export default function About() {
  return (
    <div style={{ background: PAPER }}>
      {/* ---- who ---- */}
      <header style={{ borderBottom: `1px solid ${RULE}` }}>
        <div className="bakers-grid" style={{ maxWidth: 1080, margin: "0 auto", padding: "62px 24px 56px", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 54, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "-14px -14px auto auto", width: 110, height: 110, borderRadius: "50%", background: tokens.goldLight, zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: 20, overflow: "hidden", boxShadow: "0 26px 54px rgba(46,42,36,0.2)" }}>
              <Photo src={img(FOUNDER.photo, 700, 840)} alt={FOUNDER.name} ratio="5/6" />
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: 2.4, color: tokens.goldDeep, margin: "0 0 16px", textTransform: "uppercase" }}>
              {FOUNDER.role} · Since {FOUNDER.since}
            </p>
            <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(32px, 4.6vw, 52px)", color: INK, margin: "0 0 20px", lineHeight: 1.08 }}>
              I'm <span style={{ fontStyle: "italic", color: tokens.pinkDeep }}>{FOUNDER.name}</span>, and I bake for a living.
            </h1>
            <p style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(16px, 1.7vw, 19px)", color: INK_SOFT, lineHeight: 1.7, margin: 0 }}>{FOUNDER.intro}</p>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "58px 24px 0" }}>
        {/* ---- story ---- */}
        <section>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 30, color: INK, margin: "0 0 22px" }}>How this started</h2>
          {FOUNDER.story.map((para, i) => (
            <p key={i} style={{ fontFamily: "Fraunces, serif", fontSize: 17.5, lineHeight: 1.8, color: INK, margin: "0 0 20px" }}>
              {para}
            </p>
          ))}
        </section>

        {/* ---- start here ---- */}
        <section style={{ marginTop: 44, background: "#FFFFFF", border: `1px solid ${RULE}`, borderRadius: 18, padding: "34px 34px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <ChefHat size={19} color={tokens.pinkDeep} />
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 25, color: INK, margin: 0 }}>New to baking? Start here.</h2>
          </div>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: 16, color: INK_SOFT, lineHeight: 1.7, margin: "0 0 20px" }}>
            When I started there was nobody to ask but my aunty, and half of what
            I know came from getting it wrong first. If you are at that stage,
            these four are where I would send you — in order.
          </p>
          <div style={{ display: "grid", gap: 10 }}>
            {FOUNDER.startHere.map((id, n) => {
              const r = findRecipe(id);
              if (!r) return null;
              return (
                <a key={id} href={`#/recipes/${id}`} style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", padding: "12px 15px", borderRadius: 12, background: PAPER, border: `1px solid ${RULE}` }}>
                  <span style={{ fontFamily: "Fraunces, serif", fontSize: 20, color: tokens.gold, width: 22, flexShrink: 0 }}>{n + 1}</span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 14.5, fontWeight: 600, color: INK }}>{r.title}</span>
                    <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 12, color: INK_SOFT, marginTop: 2 }}>{r.time} · {r.level}</span>
                  </span>
                  <ArrowUpRight size={16} color={INK_SOFT} />
                </a>
              );
            })}
          </div>
        </section>

        {/* ---- favourites ---- */}
        <section style={{ marginTop: 54 }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 30, color: INK, margin: "0 0 8px" }}>My favourites</h2>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: 16.5, color: INK_SOFT, lineHeight: 1.7, margin: "0 0 26px" }}>
            I get asked this constantly and the answer changes, but these three have never left the list.
          </p>
          <div className="tut-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {FOUNDER.favourites.map((f) => {
              const r = findRecipe(f.id);
              if (!r) return null;
              return (
                <a key={f.id} href={`#/recipes/${f.id}`} style={{ textDecoration: "none", display: "block" }}>
                  <Photo src={img(r.photo, 500, 400)} alt={r.title} ratio="5/4" radius={13} zoom />
                  <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 18, color: INK, margin: "13px 0 6px", lineHeight: 1.25 }}>{r.title}</h3>
                  <p style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: 14.5, color: INK_SOFT, lineHeight: 1.55, margin: 0 }}>“{f.why}”</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* ---- facts ---- */}
        <section style={{ marginTop: 56, paddingTop: 40, borderTop: `1px solid ${RULE}` }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 30, color: INK, margin: "0 0 22px" }}>A few things about me</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 2 }}>
            {FOUNDER.facts.map((f, i) => (
              <li key={f} style={{ display: "flex", gap: 15, padding: "12px 0", borderBottom: i === FOUNDER.facts.length - 1 ? "none" : `1px solid ${RULE}` }}>
                <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12, color: tokens.gold, width: 20, flexShrink: 0, paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: "Fraunces, serif", fontSize: 16.5, lineHeight: 1.65, color: INK }}>{f}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* ---- come and say hello ---- */}
      <section style={{ marginTop: 66, background: tokens.dark, padding: "60px 24px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(26px, 3.4vw, 36px)", color: tokens.onDark, margin: "0 0 14px" }}>Come and say hello</h2>
          <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontSize: 14.5, color: tokens.onDarkSoft, margin: "0 0 26px" }}>
            <MapPin size={15} color={tokens.gold} /> {SHOP.address}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
            <a href="#visit" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, padding: "14px 28px", borderRadius: 999, textDecoration: "none" }}>
              Find the shop <ArrowRight size={15} />
            </a>
            <a href="#/recipes" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(251,239,243,0.4)", color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, padding: "14px 28px", borderRadius: 999, textDecoration: "none" }}>
              Read the recipes
            </a>
          </div>
          <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap" }}>
            {SOCIALS.map(({ label, handle, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, textDecoration: "none" }}>
                <Icon size={15} /> {handle}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
