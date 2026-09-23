import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from "react";
import {
  Clock,
  Instagram,
  MessageCircle,
  Menu,
  X,
  MapPin,
  Phone,
  Search,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Star,
  Gift,
  TikTok,
} from "./icons.jsx";
import { tokens, FONT_IMPORT, img, naira } from "./theme.js";
import { PRODUCTS, RECIPES, NAV_LINKS, FOOTER_LINKS, REVIEWS_ARE_REAL, PHOTO_CREDITS, WHATSAPP, WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_HREF, BRAND, INSTAGRAM, TIKTOK, SHOP, HOURS, ANNOUNCEMENT } from "./data.js";
import { createOrder } from "./api.js";

export const SOCIALS = [
  { label: "Instagram", handle: INSTAGRAM.handle, href: INSTAGRAM.href, Icon: Instagram },
  { label: "TikTok", handle: TIKTOK.handle, href: TIKTOK.href, Icon: TikTok },
  { label: "WhatsApp", handle: "Order on WhatsApp", href: WHATSAPP, Icon: MessageCircle },
];

/* ------------------------------------------------------------------ *
 * Shop state — cart lives at the top so the header, the product cards
 * on either page and the drawer all read from one place.
 * ------------------------------------------------------------------ */
const ShopContext = createContext(null);
export const useShop = () => useContext(ShopContext);

export function ShopProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // A 6" vanilla and a 10" red velvet are different lines even though they
  // are the same product, so the cart is keyed on the chosen options too.
  const add = (product, config = {}) => {
    const { options = null, price = product.price, qty = 1 } = config;
    const key = options ? `${product.id}::${Object.values(options).filter(Boolean).join("|")}` : product.id;
    setItems((prev) => {
      const found = prev.find((p) => p.key === key);
      if (found) return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { key, id: product.id, title: product.title, price, photo: product.photo, qty, options }];
    });
    setCartOpen(true);
  };
  const step = (key, delta) =>
    setItems((prev) => prev.flatMap((p) => (p.key === key ? (p.qty + delta <= 0 ? [] : [{ ...p, qty: p.qty + delta }]) : [p])));
  const remove = (key) => setItems((prev) => prev.filter((p) => p.key !== key));
  const clear = () => setItems([]);

  const count = items.reduce((n, p) => n + p.qty, 0);
  const total = items.reduce((n, p) => n + p.qty * p.price, 0);

  return (
    <ShopContext.Provider value={{ items, add, step, remove, clear, count, total, cartOpen, setCartOpen }}>
      {children}
    </ShopContext.Provider>
  );
}

const SEARCH_INDEX = [
  ...PRODUCTS.map((p) => ({ id: p.id, title: p.title, desc: p.desc, photo: p.photo, kind: p.category, price: p.price })),
  ...RECIPES.map((t) => ({ id: t.id, title: t.title, desc: t.desc, photo: t.photo, kind: t.tag, price: null, recipe: true })),
];

/* ------------------------------------------------------------------ *
 * Building blocks
 * ------------------------------------------------------------------ */

// Every photo sits on a pink/gold gradient that shows through until the
// file decodes, so a slow connection degrades into the palette rather
// than into a grey hole.
export function Photo({ src, alt, ratio = "4/3", radius = 0, zoom = false, style, children }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={zoom ? "photo photo-zoom" : "photo"}
      style={{
        position: "relative",
        aspectRatio: ratio,
        overflow: "hidden",
        borderRadius: radius,
        background: `linear-gradient(135deg, ${tokens.pinkLight}, ${tokens.goldLight})`,
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable="false"
        onLoad={() => setLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity .55s ease, transform .6s ease",
        }}
      />
      {children}
    </div>
  );
}

// The big uppercase pill buttons from the hero, reused on gallery pages.
export function PillLink({ href, children, variant = "solid", external, outlineColor = tokens.onDark, inverse = false }) {
  const solid = variant === "solid";
  // on a pink background the pink button vanishes, so it flips to white
  const fill = inverse ? "#FFFFFF" : tokens.pink;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="pill-link"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: "Karla, sans-serif",
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: 1.1,
        textTransform: "uppercase",
        textDecoration: "none",
        whiteSpace: "nowrap",
        padding: "17px 32px",
        borderRadius: 999,
        color: solid ? (inverse ? tokens.pink : tokens.onDark) : outlineColor,
        background: solid ? fill : "transparent",
        border: `2px solid ${solid ? fill : outlineColor}`,
        boxShadow: solid ? "0 14px 30px rgba(194,37,92,0.35)" : "none",
      }}
    >
      {children}
    </a>
  );
}

export function SectionHeading({ eyebrow, title, accent = "pink", light = false }) {
  const accentColor = accent === "gold" ? tokens.goldDeep : tokens.pinkDeep;
  return (
    <div style={{ marginBottom: 40, maxWidth: 660 }}>
      <p style={{ fontFamily: "Karla, sans-serif", color: light ? tokens.gold : tokens.goldDeep, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, marginBottom: 12, textTransform: "uppercase" }}>
        {eyebrow}
      </p>
      <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(28px, 3.4vw, 40px)", color: light ? tokens.onDark : tokens.ink, margin: 0, lineHeight: 1.12 }}>
        {title.split("*").map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} style={{ fontStyle: "italic", color: light ? tokens.gold : accentColor }}>
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

export function AddButton({ product, label = "Add to cart", dark = false }) {
  const { add } = useShop();
  if (product.soldOut) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 12.5, color: tokens.inkSoft, border: `1px dashed ${tokens.line}`, padding: "9px 14px", borderRadius: 999, whiteSpace: "nowrap" }}>
        Sold out today
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => add(product)}
      className="add-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: "Karla, sans-serif",
        fontWeight: 600,
        fontSize: 13,
        cursor: "pointer",
        border: `1px solid ${dark ? "rgba(251,239,243,0.28)" : tokens.line}`,
        background: dark ? "transparent" : tokens.paper,
        color: dark ? tokens.onDark : tokens.ink,
        padding: "9px 15px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      <Plus size={13} /> {label}
    </button>
  );
}

export function Badge({ children, tone = "green" }) {
  const map = {
    green: { bg: "#E7F3EA", fg: "#2F6B42" },
    gold: { bg: tokens.goldLight, fg: tokens.goldDeep },
    pink: { bg: tokens.pinkPale, fg: tokens.pinkDeep },
  };
  const c = map[tone] || map.green;
  return (
    <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 10.5, letterSpacing: 0.4, color: c.fg, background: c.bg, padding: "4px 8px", borderRadius: 5, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

export function Stars({ rating = 5, size = 13 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: tokens.gold }} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} fill={n <= rating ? tokens.gold : "none"} color={tokens.gold} strokeWidth={n <= rating ? 0 : 1.5} />
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Header row 1 — utility bar: where we are, and how to reach us.
 * ------------------------------------------------------------------ */
function UtilityBar() {
  return (
    <div style={{ background: tokens.pink, color: "#FFE3EC", fontFamily: "Karla, sans-serif", fontSize: 12.5 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "9px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div className="util-left" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <MapPin size={13} color="#FFFFFF" /> {SHOP.address}
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Clock size={13} color="#FFFFFF" /> Open daily, {HOURS}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href={PHONE_HREF} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: tokens.onDark, textDecoration: "none", fontWeight: 600 }}>
            <Phone size={13} color="#FFFFFF" /> {PHONE_DISPLAY}
          </a>
          <span className="util-sep" style={{ width: 1, height: 14, background: "rgba(255,255,255,0.35)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="util-social" style={{ color: "#FFE3EC", display: "inline-flex" }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Header row 2 — the sticky one: wordmark, nav, search, cart.
 * ------------------------------------------------------------------ */
function SearchField() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return SEARCH_INDEX.filter(
      (r) => r.title.toLowerCase().includes(term) || (r.desc || "").toLowerCase().includes(term) || r.kind.toLowerCase().includes(term)
    ).slice(0, 6);
  }, [q]);

  const go = (r) => {
    setOpen(false);
    const term = q.trim();
    setQ("");
    // products live in the catalogue, so send the shopper there with the
    // query already applied; recipes stay on the landing page
    window.location.hash = r.recipe ? `/recipes/${r.id}` : `/shop?q=${encodeURIComponent(term)}`;
  };

  const seeAll = () => {
    const term = q.trim();
    setOpen(false);
    setQ("");
    window.location.hash = `/shop?q=${encodeURIComponent(term)}`;
  };

  return (
    <div ref={boxRef} style={{ position: "relative", flex: "0 1 300px" }} className="search-wrap">
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: tokens.base, border: `1px solid ${open ? tokens.pink : tokens.line}`, borderRadius: 999, padding: "9px 15px", transition: "border-color .2s ease" }}>
        <Search size={15} color={tokens.inkSoft} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) seeAll();
          }}
          style={{ flex: 1, display: "flex" }}
        >
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search cakes, jollof, recipes…"
            aria-label="Search the menu"
            style={{ border: "none", outline: "none", background: "transparent", fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.ink, width: "100%" }}
          />
        </form>
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" style={{ border: "none", background: "none", cursor: "pointer", color: tokens.inkSoft, display: "flex", padding: 0 }}>
            <X size={14} />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 14, boxShadow: "0 24px 48px rgba(43,20,32,0.16)", overflow: "hidden", zIndex: 120 }}>
          {results.length === 0 && (
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft, margin: 0, padding: "16px 18px" }}>
              Nothing matched “{q}”. Try “cake”, “chin chin” or “zobo”.
            </p>
          )}
          {results.map((r) => (
            <button key={r.kind + r.id} type="button" onClick={() => go(r)} className="search-row" style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", border: "none", background: "none", cursor: "pointer", padding: "10px 14px", borderBottom: `1px solid ${tokens.base}` }}>
              <img src={img(r.photo, 96, 96)} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "Fraunces, serif", fontSize: 14.5, color: tokens.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</span>
                <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, letterSpacing: 0.4 }}>
                  {r.kind}
                  {r.price ? ` · from ${naira(r.price)}` : ""}
                </span>
              </span>
            </button>
          ))}
          {results.length > 0 && (
            <button type="button" onClick={seeAll} className="search-row" style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: tokens.base, cursor: "pointer", padding: "11px 14px", fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 12.5, color: tokens.pinkDeep }}>
              See everything for “{q.trim()}” →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function CartButton() {
  const { count, setCartOpen } = useShop();
  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
      style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 13.5, padding: "11px 18px", borderRadius: 999, whiteSpace: "nowrap" }}
    >
      <ShoppingBag size={16} />
      <span className="cart-label">Cart</span>
      <span style={{ minWidth: 20, height: 20, padding: "0 6px", borderRadius: 999, background: tokens.gold, color: tokens.dark, fontSize: 11.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {count}
      </span>
    </button>
  );
}

function MainBar() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: tokens.paper, borderBottom: `1px solid ${tokens.line}` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 24, justifyContent: "space-between" }}>
        <a href="#/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Wordmark />
        </a>

        <nav className="desktop-nav" style={{ display: "flex", gap: 22, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" style={{ fontFamily: "Karla, sans-serif", fontSize: 14, color: l.href === "#/shop" ? tokens.pinkDeep : tokens.ink, textDecoration: "none", fontWeight: l.href === "#/shop" ? 700 : 500, whiteSpace: "nowrap" }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "0 1 auto" }}>
          <SearchField />
          <CartButton />
          <button className="mobile-toggle" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: tokens.ink, padding: 4 }} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${tokens.line}`, padding: "10px 24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontFamily: "Karla, sans-serif", color: tokens.ink, textDecoration: "none", fontSize: 15 }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const cartInput = {
  width: "100%",
  fontFamily: "Karla, sans-serif",
  fontSize: 14,
  color: tokens.ink,
  background: tokens.paper,
  border: `1px solid ${tokens.line}`,
  borderRadius: 10,
  padding: "11px 12px",
  outline: "none",
};

export function CartDrawer() {
  const { items, step, remove, clear, total, cartOpen, setCartOpen } = useShop();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [sending, setSending] = useState(false);

  // The order is saved first so it shows up in /admin, then WhatsApp opens
  // with the whole thing typed out — the customer only has to press send.
  const checkout = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    setSending(true);
    // opened now, while we still have the tap, or the browser blocks it
    const win = window.open("", "_blank");
    const order = {
      customer: { name: name.trim(), phone: phone.trim(), address: address.trim() },
      items: items.map(({ id, title, qty, price, options }) => ({ id, title, qty, price, options })),
      total,
    };
    let ref = "";
    try {
      ref = (await createOrder(order)).id;
    } catch (err) {
      console.warn("Order not saved, sending on WhatsApp only.", err);
    }
    const lines = [
      `Hello ${BRAND.name}, I'd like to order${ref ? ` (ref ${ref})` : ""}:`,
      "",
      ...items.map((p) => {
        const opts = p.options ? Object.entries(p.options).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(", ") : "";
        return `• ${p.qty} × ${p.title} — ${naira(p.price * p.qty)}${opts ? `\n   ${opts}` : ""}`;
      }),
      "",
      `Subtotal: ${naira(total)}`,
      `Name: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      order.customer.address ? `Deliver to: ${order.customer.address}` : null,
    ].filter((l) => l !== null);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    if (win) win.location.href = url;
    else window.location.href = url;
    setSending(false);
    clear();
    setCartOpen(false);
  };
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setCartOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  if (!cartOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(43,20,32,0.45)" }} />
      <aside className="cart-panel" style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "min(400px, 100%)", background: tokens.paper, display: "flex", flexDirection: "column", boxShadow: "-20px 0 60px rgba(43,20,32,0.3)" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 22px", borderBottom: `1px solid ${tokens.line}` }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 21, color: tokens.ink, margin: 0 }}>Your order</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" style={{ border: "none", background: "none", cursor: "pointer", color: tokens.inkSoft, display: "flex" }}>
            <X size={20} />
          </button>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 22px" }}>
          {items.length === 0 && (
            <div style={{ textAlign: "center", padding: "56px 8px", color: tokens.inkSoft, fontFamily: "Karla, sans-serif", fontSize: 14 }}>
              <ShoppingBag size={30} color={tokens.pinkLight} />
              <p style={{ margin: "14px 0 0", lineHeight: 1.6 }}>Nothing here yet. Add a cake or a tray of small chops and it will show up.</p>
            </div>
          )}
          {items.map((p) => (
            <div key={p.key} style={{ display: "flex", gap: 13, padding: "16px 0", borderBottom: `1px solid ${tokens.base}` }}>
              <img src={img(p.photo, 140, 140)} alt="" style={{ width: 58, height: 58, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 16, color: tokens.ink, margin: "0 0 3px" }}>{p.title}</h3>
                {p.options && (
                  <ul style={{ listStyle: "none", margin: "0 0 6px", padding: 0 }}>
                    {Object.entries(p.options)
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <li key={k} style={{ fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, lineHeight: 1.5 }}>
                          <span style={{ color: tokens.ink, fontWeight: 600 }}>{k}:</span> {v}
                        </li>
                      ))}
                  </ul>
                )}
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.pinkDeep, fontWeight: 700, margin: "0 0 9px" }}>{naira(p.price * p.qty)}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${tokens.line}`, borderRadius: 999 }}>
                    <button type="button" onClick={() => step(p.key, -1)} aria-label={`Fewer ${p.title}`} style={{ border: "none", background: "none", cursor: "pointer", padding: "5px 9px", color: tokens.ink, display: "flex" }}>
                      <Minus size={13} />
                    </button>
                    <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13, fontWeight: 700, minWidth: 18, textAlign: "center", color: tokens.ink }}>{p.qty}</span>
                    <button type="button" onClick={() => step(p.key, 1)} aria-label={`More ${p.title}`} style={{ border: "none", background: "none", cursor: "pointer", padding: "5px 9px", color: tokens.ink, display: "flex" }}>
                      <Plus size={13} />
                    </button>
                  </div>
                  <button type="button" onClick={() => remove(p.key)} aria-label={`Remove ${p.title}`} style={{ border: "none", background: "none", cursor: "pointer", color: tokens.inkSoft, display: "flex" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer style={{ padding: "18px 22px 22px", borderTop: `1px solid ${tokens.line}`, background: tokens.base }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.inkSoft }}>Subtotal</span>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 24, color: tokens.ink }}>{naira(total)}</span>
          </div>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, margin: "0 0 14px", lineHeight: 1.5 }}>Delivery is quoted per area once we confirm your slot.</p>
          {items.length > 0 && (
            <form onSubmit={checkout} style={{ display: "grid", gap: 9 }}>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" autoComplete="name" style={cartInput} />
              <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" aria-label="Phone number" autoComplete="tel" style={cartInput} />
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address (or leave blank to collect)" aria-label="Delivery address" autoComplete="street-address" style={cartInput} />
              <button
                type="submit"
                disabled={sending}
                style={{ marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "none", cursor: sending ? "wait" : "pointer", background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, padding: "14px", borderRadius: 999 }}
              >
                <MessageCircle size={16} /> {sending ? "Sending…" : "Confirm on WhatsApp"}
              </button>
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, margin: "2px 0 0", lineHeight: 1.5, textAlign: "center" }}>
                Afterwards,{" "}
                <a href="#/feedback" onClick={() => setCartOpen(false)} style={{ color: tokens.pinkDeep, fontWeight: 700 }}>
                  come back and tell us how it went
                </a>
                .
              </p>
            </form>
          )}
        </footer>
      </aside>
    </div>
  );
}

// The flyer's lockup: a pink script "Annie" over a solid "Cakes & Chops".
export function Wordmark({ light = false }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1 }}>
      <span style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: 34, color: light ? tokens.pinkLight : tokens.pink, lineHeight: 0.9, marginBottom: 3 }}>{BRAND.first}</span>
      <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 2.4, textTransform: "uppercase", color: light ? tokens.onDark : tokens.ink }}>{BRAND.rest}</span>
    </span>
  );
}

function AnnouncementBar() {
  if (!ANNOUNCEMENT) return null;
  return (
    <div style={{ background: tokens.pinkLight, color: tokens.pinkDeep, fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 1.2, textTransform: "uppercase", textAlign: "center", padding: "11px 16px" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
        <Gift size={16} /> {ANNOUNCEMENT}
      </span>
    </div>
  );
}

export function Header() {
  return (
    <>
      <UtilityBar />
      <MainBar />
      <AnnouncementBar />
    </>
  );
}

export function Footer() {
  return (
    <footer id="order" style={{ background: tokens.dark, padding: "56px 24px 28px" }}>
      <div className="footer-grid" style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.1fr", gap: 40, paddingBottom: 34, borderBottom: "1px solid #4A2438" }}>
        <div>
          <div style={{ marginBottom: 14 }}>
            <Wordmark light />
          </div>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
            Cakes, small chops, Nigerian meals and cold drinks, made fresh in Ayobo, delivered across Lagos the same day.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.8, color: tokens.gold, marginBottom: 14 }}>EXPLORE</p>
          {FOOTER_LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, textDecoration: "none", marginBottom: 9 }}>
              {l.label}
            </a>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.8, color: tokens.gold, marginBottom: 14 }}>VISIT</p>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, lineHeight: 1.8, margin: 0 }}>
            {SHOP.address}
            <br />
            Open daily, {HOURS}
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.8, color: tokens.gold, marginBottom: 14 }}>FOLLOW</p>
          {SOCIALS.map(({ label, handle, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, textDecoration: "none", marginBottom: 11, width: "100%" }}>
              <Icon size={15} /> {handle}
            </a>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12, color: "#8C647A", textAlign: "center", marginTop: 24, lineHeight: 1.7 }}>
        © {BRAND.name}. A concept design, not a live storefront.
        <br />
        Photos marked as stock in src/seed.js are still temporary
        {REVIEWS_ARE_REAL ? "." : ", and the reviews are placeholder copy until the first real feedback is published."}
      </p>
      <PhotoCredits />
    </footer>
  );
}

/* A licence condition, not a design choice: the CC BY-SA drink photos have
 * to name their photographer, link the licence and say they were changed.
 * Reads from PHOTO_CREDITS, so it disappears when that list is emptied. */
function PhotoCredits() {
  if (!PHOTO_CREDITS.length) return null;
  const link = { color: "#A87A92", textDecoration: "underline" };
  return (
    <p style={{ fontFamily: "Karla, sans-serif", fontSize: 11, color: "#7A566A", textAlign: "center", margin: "10px auto 0", lineHeight: 1.7, maxWidth: 760 }}>
      Photos:{" "}
      {PHOTO_CREDITS.map((c, i) => (
        <React.Fragment key={c.what}>
          {i > 0 && " · "}
          {c.what} by{" "}
          <a href={c.href} target="_blank" rel="noreferrer" style={link}>
            {c.author}
          </a>
          ,{" "}
          <a href={c.licenceHref} target="_blank" rel="noreferrer" style={link}>
            {c.licence}
          </a>
          {c.changed ? ` (${c.changed})` : ""}
        </React.Fragment>
      ))}
    </p>
  );
}

export const GLOBAL_CSS = `
  ${FONT_IMPORT}
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; }

  .photo-zoom img { transition: opacity .55s ease, transform .7s ease; }
  .photo-zoom:hover img { transform: scale(1.06); }

  .add-btn { transition: background .18s ease, color .18s ease, border-color .18s ease; }
  .add-btn:hover { background: ${tokens.pink}; color: ${tokens.onDark}; border-color: ${tokens.pink}; }

  .nav-link { position: relative; }
  .nav-link::after {
    content: ""; position: absolute; left: 0; right: 100%; bottom: -5px;
    height: 2px; background: ${tokens.gold}; transition: right .22s ease;
  }
  .nav-link:hover::after { right: 0; }

  .search-row:hover { background: ${tokens.pinkPale}; }
  .util-social { transition: color .18s ease; }
  .util-social:hover { color: #FFFFFF; }

  .snack-scroll::-webkit-scrollbar { height: 6px; }
  .snack-scroll::-webkit-scrollbar-thumb { background: rgba(147,23,63,0.28); border-radius: 3px; }

  .ticker-track { animation: ticker 34s linear infinite; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  .cart-panel { animation: slideIn .28s cubic-bezier(.2,.75,.2,1); }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

  /* mosaic: CSS columns give the deliberately ragged, un-gridded look */
  .mosaic { column-count: 3; column-gap: 22px; }
  .mosaic > * { break-inside: avoid; margin-bottom: 22px; display: inline-block; width: 100%; }

  /* dual-range price filter: two sliders sharing one track */
  .range-stack { position: relative; height: 30px; }
  .range-stack input[type=range] {
    position: absolute; left: 0; top: 10px; width: 100%; margin: 0;
    -webkit-appearance: none; appearance: none; background: none; pointer-events: none; height: 10px;
  }
  .range-stack input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none; pointer-events: auto; width: 17px; height: 17px; border-radius: 50%;
    background: ${tokens.paper}; border: 2px solid ${tokens.pink}; cursor: pointer; box-shadow: 0 1px 4px rgba(43,20,32,.3);
  }
  .range-stack input[type=range]::-moz-range-thumb {
    pointer-events: auto; width: 15px; height: 15px; border-radius: 50%;
    background: ${tokens.paper}; border: 2px solid ${tokens.pink}; cursor: pointer;
  }

  .filter-check { display: flex; align-items: center; gap: 9px; cursor: pointer; padding: 5px 0; }
  .filter-check input { accent-color: ${tokens.pink}; width: 15px; height: 15px; cursor: pointer; }
  .pill-link { transition: transform .18s ease, filter .18s ease; }
  .pill-link:hover { transform: translateY(-2px); filter: brightness(1.06); }
  .pick-card { transition: transform .22s ease; }
  .gallery-masonry { column-count: 3; column-gap: 20px; }
  .wed-detail-img { transition: transform .5s ease; }
  .wed-detail-img:hover { transform: scale(1.04); }
  .gallery-tile img, .gallery-card img { transition: transform .5s ease; }
  .gallery-tile:hover img, .gallery-card:hover img { transform: scale(1.03); }
  .pick-card:hover { transform: translateY(-4px); }

  .chip { transition: border-color .18s ease, background .18s ease; }

  /* #/feedback */
  .fb-input:focus { border-color: ${tokens.pink} !important; box-shadow: 0 0 0 3px ${tokens.pinkLight}; }
  .fb-star { transition: transform .12s ease; }
  .fb-star:hover { transform: scale(1.12); }
  .fb-submit { transition: filter .15s ease; }
  .fb-submit:hover:not(:disabled) { filter: brightness(1.06); }
  .fb-submit:disabled { opacity: .6; }
  .fb-invite { transition: background .18s ease, color .18s ease; }
  .fb-invite:hover { background: ${tokens.pink}; color: ${tokens.onDark}; }

  @media (prefers-reduced-motion: reduce) {
    .pill-link, .pick-card { transition: none; }
    .ticker-track, .cart-panel { animation: none; }
    .photo-zoom:hover img { transform: none; }
  }

  @media (max-width: 1180px) {
    .desktop-nav { display: none !important; }
    .mobile-toggle { display: block !important; }
    .search-wrap { flex: 0 1 220px; }
  }

  @media (max-width: 980px) {
    .catalog-shell { grid-template-columns: 1fr !important; }
    .filter-rail { position: static !important; }
    .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (max-width: 980px) {
    .pdp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
    .pdp-media { position: static !important; }
    .visit-grid { grid-template-columns: 1fr !important; }
    .review-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .occasion-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .pick-grid { grid-template-columns: repeat(3, 1fr) !important; }
    .gallery-masonry { column-count: 2; }
    .gallery-index { grid-template-columns: repeat(2, 1fr) !important; }
    .wed-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .wed-details { grid-template-columns: repeat(2, 1fr) !important; }
    .fb-grid { grid-template-columns: 1fr !important; }
  }

  @media (max-width: 860px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 52px !important; }
    .founder-strip { grid-template-columns: auto 1fr !important; }
    .founder-strip > svg:last-child { display: none; }
    .hero-inset { width: 128px !important; left: -14px !important; bottom: -22px !important; }
    .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
    .mosaic { column-count: 2; }
    .bakers-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
    .drinks-grid { grid-template-columns: 1fr !important; }
    .meals-grid { grid-template-columns: 1fr !important; }
    .hero-photo { width: 100% !important; -webkit-mask-image: none !important; mask-image: none !important; }
    .hero-wash { background: var(--hero-wash-mobile) !important; }
    .hero-tag { display: none; }
    .meals-feature { position: static !important; }
    .dietary-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .tut-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .tut-featured { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .util-left { display: none !important; }
  }

  @media (max-width: 560px) {
    .mosaic { column-count: 1; }
    .occasion-grid { grid-template-columns: 1fr !important; }
    .pick-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
    .gallery-masonry { column-count: 1; }
    .gallery-index { grid-template-columns: 1fr !important; }
    .wed-collage { grid-template-columns: 1fr 1fr !important; }
    .wed-collage > figure:first-child { grid-row: auto !important; grid-column: 1 / -1; }
    .review-grid { grid-template-columns: 1fr !important; }
    .pdp-when { grid-template-columns: 1fr !important; }
    .meal-row { grid-template-columns: 64px 1fr !important; }
    .meal-add { grid-column: 2; }
    .catalog-grid { grid-template-columns: 1fr !important; }
    .tut-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .cart-label { display: none; }
    .search-wrap { flex: 1 1 auto; }
    .util-sep { display: none; }
    .fb-two { grid-template-columns: 1fr !important; }
  }
`;
