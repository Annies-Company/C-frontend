import React, { useState, useMemo } from "react";
import { tokens, img } from "./theme.js";
import { RECIPES, RECIPE_CATEGORIES, FOUNDER, BRAND } from "./data.js";
import { Photo, Stars } from "./shop.jsx";
import { Search, Clock, X, ArrowRight, ArrowUpRight, Sparkles } from "./icons.jsx";

/* The kitchen notes deliberately look different from the shop: warm paper
 * instead of pink, wider measure, serif body copy. It should feel like a
 * recipe journal that happens to live next to a bakery, not a product grid. */
const PAPER = "#FFFCF6";
const INK = "#2E2A24";
const INK_SOFT = "#7C7365";
const RULE = "#E7DECC";

const findRecipe = (id) => RECIPES.find((r) => r.id === id);

const tagColour = (tag) => (tag === "Recipe" ? tokens.pinkDeep : tag === "Tutorial" ? tokens.goldDeep : "#7A6A3F");

function Masthead({ query, setQuery }) {
  return (
    <header style={{ background: PAPER, borderBottom: `1px solid ${RULE}`, padding: "58px 24px 44px", textAlign: "center" }}>
      <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 2.6, color: tokens.goldDeep, margin: "0 0 16px", textTransform: "uppercase" }}>
        {BRAND.name} · Kitchen Notes
      </p>
      <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(34px, 5vw, 58px)", color: INK, margin: "0 0 16px", lineHeight: 1.08 }}>
        Learn to bake the <span style={{ fontStyle: "italic", color: tokens.pinkDeep }}>perfect cake</span>
      </h1>
      <p style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(15px, 1.6vw, 18px)", color: INK_SOFT, margin: "0 auto 30px", maxWidth: 560, lineHeight: 1.65 }}>
        Every recipe we sell is a recipe we will teach you. Tips, techniques and the
        troubleshooting that stops a batch going wrong twice.
      </p>
      <div style={{ maxWidth: 460, margin: "0 auto", display: "flex", alignItems: "center", gap: 10, background: "#FFFFFF", border: `1px solid ${RULE}`, borderRadius: 999, padding: "13px 20px" }}>
        <Search size={16} color={INK_SOFT} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a recipe…"
          aria-label="Find a recipe"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "Fraunces, serif", fontSize: 15, color: INK }}
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear" style={{ border: "none", background: "none", cursor: "pointer", color: INK_SOFT, display: "flex", padding: 0 }}>
            <X size={15} />
          </button>
        )}
      </div>
    </header>
  );
}

function RecipeCard({ r, big = false }) {
  return (
    <a href={`#/recipes/${r.id}`} style={{ textDecoration: "none", display: "block" }}>
      <Photo src={img(r.photo, big ? 1000 : 640, big ? 620 : 460)} alt={r.title} ratio={big ? "16/10" : "7/5"} radius={14} zoom />
      <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: 1.3, color: tagColour(r.tag), margin: "16px 0 7px", textTransform: "uppercase" }}>
        {r.tag} · {r.category}
      </p>
      <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: big ? 30 : 20, color: INK, margin: "0 0 9px", lineHeight: 1.22 }}>{r.title}</h3>
      <p style={{ fontFamily: "Fraunces, serif", fontSize: big ? 16 : 14, color: INK_SOFT, lineHeight: 1.6, margin: "0 0 12px", maxWidth: big ? 560 : "none" }}>{r.desc}</p>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Karla, sans-serif", fontSize: 12, color: INK_SOFT }}>
        <Clock size={13} /> {r.time} · {r.level}
      </span>
    </a>
  );
}

export function RecipesHub() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (cat !== "All" && r.category !== cat) return false;
      if (!term) return true;
      return (
        r.title.toLowerCase().includes(term) ||
        r.desc.toLowerCase().includes(term) ||
        r.category.toLowerCase().includes(term) ||
        r.ingredients.some((g) => g.items.some((i) => i.toLowerCase().includes(term)))
      );
    });
  }, [query, cat]);

  const searching = query.trim() || cat !== "All";
  const featured = results.find((r) => r.featured) || results[0];
  const rest = results.filter((r) => r !== featured);

  return (
    <div style={{ background: PAPER }}>
      <Masthead query={query} setQuery={setQuery} />

      {/* category rail */}
      <div className="snack-scroll" style={{ maxWidth: 1120, margin: "0 auto", padding: "26px 24px 10px", display: "flex", gap: 10, overflowX: "auto", justifyContent: "center" }}>
        {["All", ...RECIPE_CATEGORIES].map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              style={{ flexShrink: 0, cursor: "pointer", fontFamily: "Karla, sans-serif", fontWeight: on ? 700 : 500, fontSize: 13, color: on ? "#FFFFFF" : INK, background: on ? tokens.pinkDeep : "transparent", border: `1px solid ${on ? tokens.pinkDeep : RULE}`, borderRadius: 999, padding: "9px 17px" }}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "30px 24px 80px" }}>
        {results.length === 0 ? (
          <div style={{ textAlign: "center", padding: "70px 20px" }}>
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 26, color: INK, margin: "0 0 10px" }}>No recipe for that yet</h2>
            <p style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, color: INK_SOFT, margin: "0 0 22px" }}>Try “chin chin”, “buttercream” or “zobo”.</p>
            <button type="button" onClick={() => { setQuery(""); setCat("All"); }} style={{ border: "none", cursor: "pointer", background: tokens.pinkDeep, color: "#fff", fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "13px 26px", borderRadius: 999 }}>
              Show everything
            </button>
          </div>
        ) : (
          <>
            {searching && (
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: INK_SOFT, margin: "0 0 22px", textAlign: "center" }}>
                {results.length} {results.length === 1 ? "recipe" : "recipes"}
                {cat !== "All" && ` in ${cat}`}
                {query.trim() && ` matching “${query.trim()}”`}
              </p>
            )}

            {!searching && featured && (
              <div style={{ marginBottom: 54, paddingBottom: 44, borderBottom: `1px solid ${RULE}` }}>
                <RecipeCard r={featured} big />
              </div>
            )}

            <div className="tut-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "44px 28px" }}>
              {(searching ? results : rest).map((r) => (
                <RecipeCard key={r.id} r={r} />
              ))}
            </div>
          </>
        )}

        {/* start here — the Liv-for-Cake "new to baking?" block */}
        <section style={{ marginTop: 70, background: "#FFFFFF", border: `1px solid ${RULE}`, borderRadius: 18, padding: "38px 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Sparkles size={17} color={tokens.goldDeep} />
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 26, color: INK, margin: 0 }}>New to baking and don't know where to start?</h2>
          </div>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, color: INK_SOFT, lineHeight: 1.7, margin: "0 0 22px", maxWidth: 620 }}>
            We have all been there. Start with these four, in this order — they teach
            the techniques everything else here depends on.
          </p>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="dietary-grid">
            {FOUNDER.startHere.map((id, n) => {
              const r = findRecipe(id);
              if (!r) return null;
              return (
                <li key={id}>
                  <a href={`#/recipes/${id}`} style={{ display: "flex", alignItems: "center", gap: 13, textDecoration: "none", padding: "11px 14px", borderRadius: 12, background: PAPER, border: `1px solid ${RULE}` }}>
                    <span style={{ fontFamily: "Fraunces, serif", fontSize: 19, color: tokens.gold, width: 20, flexShrink: 0 }}>{n + 1}</span>
                    <span style={{ flex: 1, fontFamily: "Karla, sans-serif", fontSize: 14, fontWeight: 600, color: INK }}>{r.title}</span>
                    <ArrowUpRight size={15} color={INK_SOFT} />
                  </a>
                </li>
              );
            })}
          </ol>
        </section>

        {/* subscribe */}
        <section style={{ marginTop: 30, background: tokens.dark, borderRadius: 18, padding: "40px 36px", textAlign: "center" }}>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: 2, color: tokens.gold, margin: "0 0 12px", textTransform: "uppercase" }}>Want more?</p>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 28, color: tokens.onDark, margin: "0 0 20px" }}>One new recipe, every Friday.</h2>
          {signed ? (
            <p style={{ fontFamily: "Fraunces, serif", fontSize: 16, color: tokens.onDarkSoft, margin: 0 }}>You're on the list. See you Friday.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSigned(true); }}
              style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
                style={{ flex: "1 1 220px", border: "none", outline: "none", borderRadius: 999, padding: "14px 20px", fontFamily: "Karla, sans-serif", fontSize: 14 }}
              />
              <button type="submit" style={{ border: "none", cursor: "pointer", background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "14px 26px", borderRadius: 999 }}>
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export function RecipePage({ id }) {
  const r = findRecipe(id);
  const [ticked, setTicked] = useState(() => new Set());

  if (!r) {
    return (
      <div style={{ background: PAPER, padding: "110px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 32, color: INK, margin: "0 0 12px" }}>That recipe isn't here</h1>
        <a href="#/recipes" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.pinkDeep, color: "#fff", fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "13px 26px", borderRadius: 999, textDecoration: "none" }}>
          All recipes <ArrowRight size={15} />
        </a>
      </div>
    );
  }

  const toggle = (k) =>
    setTicked((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const more = RECIPES.filter((x) => x.id !== r.id && x.category === r.category).slice(0, 3);
  const alt = more.length ? more : RECIPES.filter((x) => x.id !== r.id).slice(0, 3);

  return (
    <div style={{ background: PAPER }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "26px 24px 0", fontFamily: "Karla, sans-serif", fontSize: 12.5, color: INK_SOFT }}>
        <a href="#/recipes" style={{ color: INK_SOFT, textDecoration: "none" }}>Kitchen Notes</a>
        <span style={{ margin: "0 7px" }}>/</span>
        <span style={{ color: INK }}>{r.category}</span>
      </div>

      <article style={{ maxWidth: 900, margin: "0 auto", padding: "18px 24px 80px" }}>
        <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1.5, color: tagColour(r.tag), margin: "0 0 12px", textTransform: "uppercase" }}>{r.tag}</p>
        <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(30px, 4.4vw, 48px)", color: INK, margin: "0 0 16px", lineHeight: 1.1 }}>{r.title}</h1>
        <p style={{ fontFamily: "Fraunces, serif", fontSize: 17.5, color: INK_SOFT, lineHeight: 1.65, margin: "0 0 22px" }}>{r.desc}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", paddingBottom: 22, borderBottom: `1px solid ${RULE}`, marginBottom: 26 }}>
          <Stars rating={5} size={14} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Karla, sans-serif", fontSize: 13, color: INK_SOFT }}>
            <Clock size={14} /> {r.time}
          </span>
          <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: INK_SOFT }}>{r.level}</span>
          <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: INK_SOFT }}>{r.yields}</span>
        </div>

        <Photo src={img(r.photo, 1100, 700)} alt={r.title} ratio="16/10" radius={16} />

        <div className="pdp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 44, marginTop: 40, alignItems: "start" }}>
          {/* ingredients */}
          <section style={{ background: "#FFFFFF", border: `1px solid ${RULE}`, borderRadius: 16, padding: "24px 24px 20px", position: "sticky", top: 88 }} className="pdp-media">
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 23, color: INK, margin: "0 0 6px" }}>Ingredients</h2>
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12, color: INK_SOFT, margin: "0 0 18px" }}>Tap to tick them off as you go.</p>
            {r.ingredients.map((g) => (
              <div key={g.group} style={{ marginBottom: 18 }}>
                <h3 style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11.5, letterSpacing: 1.2, color: tokens.goldDeep, margin: "0 0 10px", textTransform: "uppercase" }}>{g.group}</h3>
                {g.items.map((item) => {
                  const k = g.group + item;
                  const on = ticked.has(k);
                  return (
                    <label key={k} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", padding: "5px 0" }}>
                      <input type="checkbox" checked={on} onChange={() => toggle(k)} style={{ accentColor: tokens.pink, width: 15, height: 15, marginTop: 2, flexShrink: 0, cursor: "pointer" }} />
                      <span style={{ fontFamily: "Fraunces, serif", fontSize: 14.5, lineHeight: 1.5, color: on ? INK_SOFT : INK, textDecoration: on ? "line-through" : "none" }}>{item}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </section>

          {/* method */}
          <section>
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 26, color: INK, margin: "0 0 20px" }}>Method</h2>
            <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {r.steps.map((s, i) => (
                <li key={i} style={{ display: "flex", gap: 16, paddingBottom: 22, marginBottom: 22, borderBottom: i === r.steps.length - 1 ? "none" : `1px solid ${RULE}` }}>
                  <span style={{ fontFamily: "Fraunces, serif", fontSize: 26, color: tokens.gold, lineHeight: 1, flexShrink: 0, width: 30 }}>{i + 1}</span>
                  <p style={{ fontFamily: "Fraunces, serif", fontSize: 16.5, lineHeight: 1.7, color: INK, margin: 0 }}>{s}</p>
                </li>
              ))}
            </ol>

            {r.tips?.length > 0 && (
              <div style={{ marginTop: 12, background: tokens.goldLight, borderRadius: 14, padding: "24px 26px" }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 20, color: INK, margin: "0 0 12px" }}>What usually goes wrong</h3>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {r.tips.map((t) => (
                    <li key={t} style={{ fontFamily: "Fraunces, serif", fontSize: 15.5, lineHeight: 1.65, color: INK, marginBottom: 9 }}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* author card */}
            <a href="#/about" style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 26, background: "#FFFFFF", border: `1px solid ${RULE}`, borderRadius: 16, padding: 18, textDecoration: "none" }}>
              <img src={img(FOUNDER.photo, 200, 200)} alt="" style={{ width: 58, height: 58, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11, letterSpacing: 1.2, color: tokens.goldDeep, fontWeight: 700, textTransform: "uppercase" }}>Written by</span>
                <span style={{ display: "block", fontFamily: "Fraunces, serif", fontSize: 18, color: INK, margin: "3px 0 2px" }}>{FOUNDER.name}</span>
                <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 12.5, color: INK_SOFT }}>{FOUNDER.role} · Read her story</span>
              </span>
              <ArrowUpRight size={17} color={INK_SOFT} />
            </a>
          </section>
        </div>

        <section style={{ marginTop: 66, paddingTop: 40, borderTop: `1px solid ${RULE}` }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 25, color: INK, margin: "0 0 24px" }}>More from the kitchen</h2>
          <div className="tut-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26 }}>
            {alt.map((x) => (
              <RecipeCard key={x.id} r={x} />
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
