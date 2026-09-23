import React, { useState, useMemo, useEffect } from "react";
import { tokens, img, naira } from "./theme.js";
import { PRODUCTS, CATEGORIES, TYPES, DIETARY, OCCASIONS, RATING, PH } from "./data.js";
import { Photo, AddButton, Badge } from "./shop.jsx";
import { X, Search, Star, ArrowRight } from "./icons.jsx";

const PRICES = PRODUCTS.map((p) => p.price);
const FLOOR = Math.min(...PRICES);
const CEIL = Math.max(...PRICES);

const CHIPS = [
  { label: "Everything", category: null, photo: PH.bakeryCase },
  { label: "Cakes", category: "Cakes", photo: PH.tieredCake },
  { label: "Small Chops", category: "Small Chops", photo: PH.smallChops },
  { label: "Snacks", category: "Snacks", photo: PH.chinChin },
  { label: "Meals", category: "Meals", photo: PH.jollofChicken },
  { label: "Drinks", category: "Drinks", photo: PH.hibiscus },
];

const SORTS = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Name: A – Z" },
];

const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: `1px solid ${tokens.line}`, padding: "16px 0" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", border: "none", background: "none", cursor: "pointer", padding: 0, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 14, color: tokens.ink }}
      >
        {title}
        <span style={{ fontSize: 18, color: tokens.inkSoft, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && <div style={{ marginTop: 14 }}>{children}</div>}
    </div>
  );
}

function Checks({ options, selected, onToggle, counts }) {
  return (
    <div>
      {options.map((o) => (
        <label key={o} className="filter-check">
          <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(o)} />
          <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.ink, flex: 1 }}>{o}</span>
          {counts && <span style={{ fontFamily: "Karla, sans-serif", fontSize: 12, color: tokens.inkSoft }}>{counts[o] || 0}</span>}
        </label>
      ))}
    </div>
  );
}

export default function Catalog({ initialQuery = "", initialOccasion = "", initialCategory = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [occs, setOccs] = useState(initialOccasion ? [initialOccasion] : []);
  const [min, setMin] = useState(FLOOR);
  const [max, setMax] = useState(CEIL);
  const [cats, setCats] = useState(CATEGORIES.includes(initialCategory) ? [initialCategory] : []);
  const [types, setTypes] = useState([]);
  const [diets, setDiets] = useState([]);
  const [sameDay, setSameDay] = useState(false);
  const [personalisable, setPersonalisable] = useState(false);
  const [sort, setSort] = useState("recommended");

  useEffect(() => setQuery(initialQuery), [initialQuery]);
  useEffect(() => setOccs(initialOccasion ? [initialOccasion] : []), [initialOccasion]);
  useEffect(() => setCats(CATEGORIES.includes(initialCategory) ? [initialCategory] : []), [initialCategory]);

  const counts = useMemo(() => {
    const c = {};
    PRODUCTS.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
      (p.tags || []).forEach((t) => (c[t] = (c[t] || 0) + 1));
      (p.occasions || []).forEach((o) => (c[o] = (c[o] || 0) + 1));
    });
    return c;
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    let out = PRODUCTS.filter((p) => {
      if (p.price < min || p.price > max) return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (types.length && !types.some((t) => (p.tags || []).includes(t))) return false;
      if (diets.length && !diets.every((d) => (p.tags || []).includes(d))) return false;
      if (occs.length && !occs.some((o) => (p.occasions || []).includes(o))) return false;
      if (sameDay && !p.sameDay) return false;
      if (personalisable && !p.personalisable) return false;
      if (term && !(p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term) || p.category.toLowerCase().includes(term) || (p.tags || []).some((t) => t.toLowerCase().includes(term)))) return false;
      return true;
    });

    if (sort === "price-asc") out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out = [...out].sort((a, b) => b.price - a.price);
    else if (sort === "name") out = [...out].sort((a, b) => a.title.localeCompare(b.title));
    else out = [...out].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return out;
  }, [query, min, max, cats, types, diets, occs, sameDay, personalisable, sort]);

  const activeCount =
    cats.length + types.length + diets.length + occs.length + (sameDay ? 1 : 0) + (personalisable ? 1 : 0) + (min > FLOOR || max < CEIL ? 1 : 0) + (query.trim() ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setMin(FLOOR);
    setMax(CEIL);
    setCats([]);
    setTypes([]);
    setDiets([]);
    setOccs([]);
    setSameDay(false);
    setPersonalisable(false);
  };

  const pct = (v) => ((v - FLOOR) / (CEIL - FLOOR)) * 100;

  return (
    <div style={{ background: tokens.base, minHeight: "100vh" }}>
      {/* breadcrumb */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "18px 24px 0", fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.inkSoft }}>
        <a href="#/" style={{ color: tokens.inkSoft, textDecoration: "none" }}>
          Home
        </a>
        <span style={{ margin: "0 7px" }}>/</span>
        <span style={{ color: tokens.ink }}>The Full Menu</span>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "20px 24px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(26px, 3.2vw, 36px)", color: tokens.ink, margin: 0 }}>The Full Menu</h1>
          <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.inkSoft }}>
            {results.length} of {PRODUCTS.length} items
          </span>
          <span style={{ width: 1, height: 16, background: tokens.line }} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 999, padding: "5px 11px", fontFamily: "Karla, sans-serif", fontSize: 12.5, fontWeight: 700, color: tokens.ink }}>
            <Star size={12} fill={tokens.gold} strokeWidth={0} /> {RATING.score}
          </span>
        </div>

        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.inkSoft }}>
          Sort by:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.ink, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 8, padding: "9px 12px", cursor: "pointer" }}
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* category chips */}
      <div className="snack-scroll" style={{ maxWidth: 1320, margin: "0 auto", padding: "8px 24px 22px", display: "flex", gap: 14, overflowX: "auto" }}>
        {CHIPS.map((c) => {
          const active = c.category === null ? cats.length === 0 : cats.length === 1 && cats[0] === c.category;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setCats(c.category === null ? [] : [c.category])}
              className="chip"
              style={{ border: `2px solid ${active ? tokens.pink : "transparent"}`, background: "none", cursor: "pointer", padding: 4, borderRadius: 14, textAlign: "center", flexShrink: 0 }}
            >
              <img src={img(c.photo, 160, 160)} alt="" style={{ width: 76, height: 76, borderRadius: 10, objectFit: "cover", display: "block" }} />
              <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 12.5, fontWeight: active ? 700 : 500, color: active ? tokens.pinkDeep : tokens.ink, marginTop: 7 }}>{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="catalog-shell" style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px 90px", display: "grid", gridTemplateColumns: "270px 1fr", gap: 30, alignItems: "start" }}>
        {/* ---- filter rail ---- */}
        <aside className="filter-rail" style={{ position: "sticky", top: 88, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, padding: "20px 20px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 21, color: tokens.ink, margin: 0 }}>Filter</h2>
            {activeCount > 0 && (
              <button type="button" onClick={clearAll} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "Karla, sans-serif", fontSize: 12.5, fontWeight: 700, color: tokens.pinkDeep }}>
                Clear all ({activeCount})
              </button>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, background: tokens.base, border: `1px solid ${tokens.line}`, borderRadius: 999, padding: "9px 14px", marginBottom: 4 }}>
            <Search size={14} color={tokens.inkSoft} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search this menu"
              aria-label="Search products"
              style={{ border: "none", outline: "none", background: "transparent", fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.ink, width: "100%" }}
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear" style={{ border: "none", background: "none", cursor: "pointer", color: tokens.inkSoft, display: "flex", padding: 0 }}>
                <X size={13} />
              </button>
            )}
          </div>

          <FilterGroup title="Price">
            <div className="range-stack">
              <div style={{ position: "absolute", left: 0, right: 0, top: 14, height: 4, borderRadius: 2, background: tokens.line }} />
              <div style={{ position: "absolute", top: 14, height: 4, borderRadius: 2, background: tokens.gold, left: `${pct(min)}%`, right: `${100 - pct(max)}%` }} />
              <input type="range" min={FLOOR} max={CEIL} step={100} value={min} onChange={(e) => setMin(Math.min(+e.target.value, max - 100))} aria-label="Minimum price" />
              <input type="range" min={FLOOR} max={CEIL} step={100} value={max} onChange={(e) => setMax(Math.max(+e.target.value, min + 100))} aria-label="Maximum price" />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {[
                { label: "Minimum", value: min, set: (v) => setMin(Math.max(FLOOR, Math.min(v, max - 100))) },
                { label: "Maximum", value: max, set: (v) => setMax(Math.min(CEIL, Math.max(v, min + 100))) },
              ].map((f) => (
                <label key={f.label} style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, marginBottom: 5, textAlign: "center" }}>{f.label}</span>
                  <input
                    type="number"
                    value={f.value}
                    onChange={(e) => f.set(+e.target.value || FLOOR)}
                    style={{ width: "100%", fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.ink, border: `1px solid ${tokens.line}`, borderRadius: 8, padding: "8px 10px", outline: "none" }}
                  />
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Category">
            <Checks options={CATEGORIES} selected={cats} onToggle={(v) => setCats(toggle(cats, v))} counts={counts} />
          </FilterGroup>

          <FilterGroup title="Occasion">
            <div>
              {OCCASIONS.map((o) => (
                <label key={o.id} className="filter-check">
                  <input type="checkbox" checked={occs.includes(o.id)} onChange={() => setOccs(toggle(occs, o.id))} />
                  <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.ink, flex: 1 }}>{o.label}</span>
                  <span style={{ fontFamily: "Karla, sans-serif", fontSize: 12, color: tokens.inkSoft }}>{counts[o.id] || 0}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Type" defaultOpen={false}>
            <Checks options={TYPES} selected={types} onToggle={(v) => setTypes(toggle(types, v))} counts={counts} />
          </FilterGroup>

          <FilterGroup title="Dietary" defaultOpen={false}>
            <Checks options={DIETARY} selected={diets} onToggle={(v) => setDiets(toggle(diets, v))} counts={counts} />
          </FilterGroup>

          <FilterGroup title="Options">
            <label className="filter-check">
              <input type="checkbox" checked={sameDay} onChange={() => setSameDay(!sameDay)} />
              <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.ink }}>Same-day delivery</span>
            </label>
            <label className="filter-check">
              <input type="checkbox" checked={personalisable} onChange={() => setPersonalisable(!personalisable)} />
              <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.ink }}>Personalisable</span>
            </label>
          </FilterGroup>
        </aside>

        {/* ---- results ---- */}
        <div>
          {activeCount > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {query.trim() && <Pill label={`“${query.trim()}”`} onClear={() => setQuery("")} />}
              {(min > FLOOR || max < CEIL) && <Pill label={`${naira(min)} – ${naira(max)}`} onClear={() => { setMin(FLOOR); setMax(CEIL); }} />}
              {cats.map((c) => (
                <Pill key={c} label={c} onClear={() => setCats(toggle(cats, c))} />
              ))}
              {occs.map((o) => (
                <Pill key={o} label={OCCASIONS.find((x) => x.id === o)?.label || o} onClear={() => setOccs(toggle(occs, o))} />
              ))}
              {types.map((t) => (
                <Pill key={t} label={t} onClear={() => setTypes(toggle(types, t))} />
              ))}
              {diets.map((d) => (
                <Pill key={d} label={d} onClear={() => setDiets(toggle(diets, d))} />
              ))}
              {sameDay && <Pill label="Same-day delivery" onClear={() => setSameDay(false)} />}
              {personalisable && <Pill label="Personalisable" onClear={() => setPersonalisable(false)} />}
            </div>
          )}

          {results.length === 0 ? (
            <div style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, padding: "70px 30px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 24, color: tokens.ink, margin: "0 0 10px" }}>Nothing matches that yet</h3>
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14.5, color: tokens.inkSoft, margin: "0 0 22px", lineHeight: 1.6 }}>
                Loosen a filter, or tell us what you had in mind and we will quote it.
              </p>
              <button
                type="button"
                onClick={clearAll}
                style={{ border: "none", cursor: "pointer", background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "13px 26px", borderRadius: 999 }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          <div style={{ marginTop: 40, background: `linear-gradient(100deg, ${tokens.pinkDeep}, ${tokens.dark})`, borderRadius: 18, padding: "34px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 24, color: tokens.onDark, margin: "0 0 6px" }}>Not seeing it?</h3>
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14, color: tokens.onDarkSoft, margin: 0 }}>
                Send a photo or a flavour and we will quote a custom bake.
              </p>
            </div>
            <a
              href="#/"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.gold, color: tokens.dark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "14px 26px", borderRadius: 999, textDecoration: "none" }}
            >
              Back to the kitchen <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ label, onClear }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: tokens.pinkPale, border: `1px solid ${tokens.pinkLight}`, borderRadius: 999, padding: "6px 12px", fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.pinkDeep, fontWeight: 600 }}>
      {label}
      <button type="button" onClick={onClear} aria-label={`Remove ${label} filter`} style={{ border: "none", background: "none", cursor: "pointer", color: tokens.pinkDeep, display: "flex", padding: 0 }}>
        <X size={12} />
      </button>
    </span>
  );
}

function ProductCard({ product: p }) {
  const off = p.compareAt ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100) : 0;
  return (
    <article style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <a href={`#/p/${p.id}`} style={{ display: "block", textDecoration: "none" }}>
      <Photo src={img(p.photo, 600, 600)} alt={p.title} ratio="1/1" zoom>
        {p.personalisable && (
          <span style={{ position: "absolute", top: 12, left: 12, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: 0.8, textTransform: "uppercase", color: tokens.dark, background: tokens.gold, padding: "5px 10px", borderRadius: 999 }}>
            Personalisable
          </span>
        )}
      </Photo>
      </a>
      <div style={{ padding: "15px 16px 17px", display: "flex", flexDirection: "column", flex: 1 }}>
        <a href={`#/p/${p.id}`} style={{ textDecoration: "none" }}>
          <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 17.5, color: tokens.ink, margin: "0 0 7px", lineHeight: 1.25 }}>{p.title}</h3>
        </a>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 9 }}>
          {p.sameDay && <Badge>Same Day Delivery</Badge>}
          {(p.tags || []).slice(0, 1).map((t) => (
            <Badge key={t} tone="pink">
              {t}
            </Badge>
          ))}
        </div>
        <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.inkSoft, lineHeight: 1.55, margin: "0 0 14px", flex: 1 }}>{p.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 14.5, color: tokens.ink }}>{naira(p.price)}</span>
            {p.compareAt && (
              <>
                <s style={{ fontFamily: "Karla, sans-serif", fontSize: 12, color: tokens.inkSoft }}>{naira(p.compareAt)}</s>
                <span style={{ fontFamily: "Karla, sans-serif", fontSize: 11.5, fontWeight: 700, color: "#2F6B42" }}>{off}% OFF</span>
              </>
            )}
            {p.unit && <span style={{ fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft }}>{p.unit}</span>}
          </span>
          <AddButton product={p} label="Add" />
        </div>
      </div>
    </article>
  );
}
