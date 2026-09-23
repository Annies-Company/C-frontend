import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from "react";
import {
  Clock,
  Leaf,
  Sparkles,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
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
  ChefHat,
} from "./icons.jsx";

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Karla:wght@400;500;600;700&display=swap');`;

// Primary: deep pink (raspberry, not baby pink). Secondary: warm gold, used
// to give the pink something to sit against without introducing a third,
// unrelated hue. The dark tone is a near-black wine so it still reads as
// part of the pink family rather than a generic charcoal.
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

/* ------------------------------------------------------------------ *
 * Photography. Temporary stock from Unsplash so the layout can be
 * judged with real food in it — swap each id for Adùn House's own
 * shoot and nothing else here needs to change.
 * ------------------------------------------------------------------ */
const img = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const PH = {
  tieredCake: "1535141192574-5d4897c12636",
  dripCake: "1578985545062-69928b1d9587",
  macaronCake: "1562440499-64c9a111f713",
  coneCake: "1621303837174-89787a7d4729",
  nakedCake: "1606890737304-57a1ca8a5b62",
  redVelvetCupcake: "1614707267537-b85aaf00c4b7",
  tealCupcakes: "1486427944299-d1955d23e34d",
  cakeSlice: "1565958011703-44f9829ba187",
  mousseCake: "1602351447937-745cb720612f",
  handsCake: "1557925923-cd4648e211a0",
  chinChin: "1558961363-fa8fdf82db35",
  cookieTin: "1499636136210-6f4ee915583e",
  puffPuff: "1606491956689-2ea866880c84",
  meatPie: "1601050690597-df0568f70950",
  sausageRoll: "1555507036-ab1f4038808a",
  smallChops: "1601050690117-94f5f6fa8bd7",
  doughnuts: "1618411640018-972400a01458",
  latticePie: "1587248720327-8eb72564be1e",
  bakeryCase: "1517433670267-08bbd4be890f",
  headBaker: "1566554273541-37a9ca77b91f",
  kitchenCook: "1606787620819-8bdf0c44c293",
  pastryChef: "1577219491135-ce391730fb2c",
  kitchenFire: "1600565193348-f74bd3c7ccdf",
  yoghurt: "1488477181946-6428a0291777",
  tigernut: "1550583724-b2692b85b150",
  hibiscus: "1595981267035-7b04ca84a82d",
};

const naira = (n) => "₦" + n.toLocaleString("en-NG");

const CAKES = [
  {
    id: "wedding",
    title: "Wedding Cakes",
    desc: "Tiered, floral or minimalist — tastings run two weeks ahead of your date, so nothing is a surprise on the day.",
    price: 180000,
    photo: PH.tieredCake,
    featured: true,
  },
  { id: "custom", title: "Custom Cakes", desc: "Bring a theme or a flavour craving. We sketch it, then bake it.", price: 35000, photo: PH.macaronCake },
  { id: "birthday", title: "Birthday Cakes", desc: "Cartoon cakes for the kids, drip cakes for the grown-ups.", price: 25000, photo: PH.coneCake },
  { id: "celebration", title: "Tiered & Celebration", desc: "Two to five tiers, for engagements and graduations.", price: 95000, photo: PH.dripCake },
  { id: "bento", title: "Cupcakes & Bento", desc: "Individually boxed, with personalised toppers.", price: 12500, photo: PH.redVelvetCupcake },
  { id: "naked", title: "Naked & Semi-Naked", desc: "Minimal buttercream — our most-requested style.", price: 40000, photo: PH.nakedCake },
];

const SNACKS = [
  { id: "chinchin", title: "Chin Chin", desc: "Crunchy, lightly sweet, cut small.", price: 3500, unit: "per tin", photo: PH.chinChin },
  { id: "puffpuff", title: "Puff Puff", desc: "Golden and airy, fried fresh to order.", price: 2500, unit: "per dozen", photo: PH.puffPuff },
  { id: "meatpie", title: "Meat Pie", desc: "Flaky pastry, peppered beef and potato.", price: 1200, unit: "each", photo: PH.meatPie },
  { id: "sausage", title: "Sausage Rolls", desc: "House-made sausage in buttery pastry.", price: 1000, unit: "each", photo: PH.sausageRoll },
  { id: "platter", title: "Small Chops Platter", desc: "Spring rolls, samosas, puff puff, sausage rolls.", price: 18000, unit: "per tray", photo: PH.smallChops },
  { id: "doughnuts", title: "Doughnuts", desc: "Soft and glazed, filled on request.", price: 800, unit: "each", photo: PH.doughnuts },
];

const BAKERS = [
  // Captioned by role, not by name — these are stock stand-ins, and putting
  // invented names on photographs of real people would be a lie on the page.
  // Drop in the team's own portraits and names here.
  { role: "Head Baker", note: "Plating the morning's first orders", photo: PH.headBaker },
  { role: "Pastry Chef", note: "Finishing and glazing", photo: PH.pastryChef },
  { role: "Kitchen Lead", note: "Tasting before it leaves", photo: PH.kitchenCook },
  { role: "The Morning Line", note: "Every day from 6am", photo: PH.kitchenFire },
];

const DRINKS = [
  {
    id: "yoghurt",
    title: "Greek Yoghurt Parfait",
    tag: "Live cultures",
    desc: "Thick unsweetened yoghurt layered with granola and whatever fruit is best that week. No syrup, no thickeners.",
    price: 2800,
    photo: PH.yoghurt,
  },
  {
    id: "tigernut",
    title: "Tigernut Milk",
    tag: "Kunun aya · dairy-free",
    desc: "Tigernuts soaked overnight, milled with dates and a little ginger. Naturally sweet, so nothing is added.",
    price: 2200,
    photo: PH.tigernut,
  },
  {
    id: "hibiscus",
    title: "Hibiscus Zobo",
    tag: "Zero sugar option",
    desc: "Dried hibiscus steeped cold with pineapple, clove and thyme. Deep red, tart, and served properly chilled.",
    price: 2000,
    photo: PH.hibiscus,
  },
];

const DIETARY = [
  { title: "Sugar-Free Cakes", desc: "Sweetened with dates and monk fruit, no compromise on the crumb." },
  { title: "Gluten-Free Snacks", desc: "Chin chin and doughnuts made with rice and almond flour blends." },
  { title: "Vegan Bakes", desc: "Plant-based butter and egg replacers, taste-tested against the originals." },
];

const TUTORIALS = [
  {
    id: "stacking",
    tag: "Tutorial",
    title: "Levelling and Stacking a Tiered Cake",
    desc: "Dowels, cake boards and the exact order everything goes on. The one post every home baker asks us for.",
    time: "15 min read",
    photo: PH.mousseCake,
    featured: true,
  },
  { id: "buttercream", tag: "Tutorial", title: "Smooth Buttercream, No Air Bubbles", desc: "The piping-bag technique we teach every new baker on staff.", time: "12 min read", photo: PH.tealCupcakes },
  { id: "vanilla", tag: "Recipe", title: "Classic Vanilla Bean Layer Cake", desc: "Our house recipe — moist enough to eat without frosting.", time: "45 min bake", photo: PH.cakeSlice },
  { id: "chinchin-recipe", tag: "Recipe", title: "Crisp Chin Chin, Every Batch", desc: "Oil temperature and dough rest time make or break the crunch.", time: "1 hr, incl. resting", photo: PH.cookieTin },
  { id: "puffpuff-tip", tag: "Tip", title: "Why Your Puff Puff Isn't Rising", desc: "Three yeast mistakes that flatten a batch, and how to fix them.", time: "5 min read", photo: PH.puffPuff },
  { id: "meatpie-recipe", tag: "Recipe", title: "Baked (Not Fried) Meat Pie", desc: "A lighter pastry that still holds its shape and its flake.", time: "1 hr 20 min", photo: PH.latticePie },
  { id: "glaze", tag: "Tutorial", title: "Glazing Doughnuts Without Cracks", desc: "Get the glaze temperature right and it sets glossy instead of dull.", time: "8 min read", photo: PH.doughnuts },
];

const FACTS = [
  "Chin chin has roots in Chinese-Portuguese fried dough, adapted into Nigerian kitchens over a century ago.",
  "A pinch of salt in cake batter doesn't make it salty — it makes the sweetness taste stronger.",
  "Puff puff goes by other names across West Africa: bofrot in Ghana, mikate in Congo.",
  "Red velvet's original red came from cocoa reacting with buttermilk and vinegar, not food colouring.",
  "Resting cake batter for 10 minutes before baking lets the flour hydrate fully, for an evener crumb.",
  "Tigernuts aren't nuts at all — they're small tubers, which is why kunun aya is safe for nut allergies.",
];

const SOCIALS = [
  { label: "Instagram", handle: "@adunhouse", href: "https://instagram.com/adunhouse", Icon: Instagram },
  { label: "Facebook", handle: "Adùn House", href: "https://facebook.com/adunhouse", Icon: Facebook },
  { label: "WhatsApp", handle: "Order on WhatsApp", href: "https://wa.me/2349064976053", Icon: MessageCircle },
];

const NAV_LINKS = [
  { href: "#cakes", label: "Cakes" },
  { href: "#snacks", label: "Snacks" },
  { href: "#bakers", label: "Our Bakers" },
  { href: "#healthy", label: "Healthy" },
  { href: "#recipes", label: "Recipes & Tips" },
];

/* ------------------------------------------------------------------ *
 * Shop state — cart + search live at the top so the two header rows,
 * the product cards and the drawer all read from one place.
 * ------------------------------------------------------------------ */
const ShopContext = createContext(null);
const useShop = () => useContext(ShopContext);

function ShopProvider({ children }) {
  const [items, setItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const add = (product) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { id: product.id, title: product.title, price: product.price, photo: product.photo, qty: 1 }];
    });
    setCartOpen(true);
  };
  const step = (id, delta) =>
    setItems((prev) =>
      prev.flatMap((p) => (p.id === id ? (p.qty + delta <= 0 ? [] : [{ ...p, qty: p.qty + delta }]) : [p]))
    );
  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const count = items.reduce((n, p) => n + p.qty, 0);
  const total = items.reduce((n, p) => n + p.qty * p.price, 0);

  return (
    <ShopContext.Provider value={{ items, add, step, remove, count, total, cartOpen, setCartOpen }}>
      {children}
    </ShopContext.Provider>
  );
}

const SEARCH_INDEX = [
  ...CAKES.map((c) => ({ ...c, kind: "Cake", anchor: "#cakes" })),
  ...SNACKS.map((s) => ({ ...s, kind: "Snack", anchor: "#snacks" })),
  ...DRINKS.map((d) => ({ ...d, kind: "Healthy", anchor: "#healthy" })),
  ...TUTORIALS.map((t) => ({ ...t, kind: t.tag, anchor: "#recipes", price: null })),
];

/* ------------------------------------------------------------------ *
 * Building blocks
 * ------------------------------------------------------------------ */

// Every photo sits on a pink/gold gradient that shows through until the
// file decodes, so a slow connection degrades into the palette rather
// than into a grey hole.
function Photo({ src, alt, ratio = "4/3", radius = 0, zoom = false, style, children }) {
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

function SectionHeading({ eyebrow, title, accent = "pink", light = false, align = "left" }) {
  const accentColor = accent === "gold" ? tokens.goldDeep : tokens.pinkDeep;
  return (
    <div style={{ marginBottom: 40, maxWidth: 660, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0, textAlign: align }}>
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

function AddButton({ product, label = "Add to cart", dark = false }) {
  const { add } = useShop();
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

/* ------------------------------------------------------------------ *
 * Header row 1 — utility bar: where we are, and how to reach us.
 * ------------------------------------------------------------------ */
function UtilityBar() {
  return (
    <div style={{ background: tokens.dark, color: tokens.onDarkSoft, fontFamily: "Karla, sans-serif", fontSize: 12.5 }}>
      <div
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "9px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div className="util-left" style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <MapPin size={13} color={tokens.gold} /> 12 Herbert Macaulay Way, Yaba
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Clock size={13} color={tokens.gold} /> Open daily, 8am – 9pm
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="tel:+2349064976053"
            className="util-phone"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: tokens.onDark, textDecoration: "none", fontWeight: 600 }}
          >
            <Phone size={13} color={tokens.gold} /> 0906 497 6053
          </a>
          <span className="util-sep" style={{ width: 1, height: 14, background: "rgba(214,175,192,0.3)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="util-social"
                style={{ color: tokens.onDarkSoft, display: "inline-flex" }}
              >
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
    setQ("");
    const el = document.querySelector(r.anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={boxRef} style={{ position: "relative", flex: "0 1 300px" }} className="search-wrap">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: tokens.base,
          border: `1px solid ${open ? tokens.pink : tokens.line}`,
          borderRadius: 999,
          padding: "9px 15px",
          transition: "border-color .2s ease",
        }}
      >
        <Search size={15} color={tokens.inkSoft} />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search cakes, snacks, recipes…"
          aria-label="Search the menu"
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "Karla, sans-serif",
            fontSize: 13.5,
            color: tokens.ink,
            width: "100%",
          }}
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" style={{ border: "none", background: "none", cursor: "pointer", color: tokens.inkSoft, display: "flex", padding: 0 }}>
            <X size={14} />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: tokens.paper,
            border: `1px solid ${tokens.line}`,
            borderRadius: 14,
            boxShadow: "0 24px 48px rgba(43,20,32,0.16)",
            overflow: "hidden",
            zIndex: 120,
          }}
        >
          {results.length === 0 && (
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft, margin: 0, padding: "16px 18px" }}>
              Nothing matched “{q}”. Try “cake”, “chin chin” or “zobo”.
            </p>
          )}
          {results.map((r) => (
            <button
              key={r.kind + r.id}
              type="button"
              onClick={() => go(r)}
              className="search-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                textAlign: "left",
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "10px 14px",
                borderBottom: `1px solid ${tokens.base}`,
              }}
            >
              <img
                src={img(r.photo, 96, 96)}
                alt=""
                style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
              />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: "Fraunces, serif", fontSize: 14.5, color: tokens.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.title}
                </span>
                <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, letterSpacing: 0.4 }}>
                  {r.kind}
                  {r.price ? ` · from ${naira(r.price)}` : ""}
                </span>
              </span>
            </button>
          ))}
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
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        border: "none",
        cursor: "pointer",
        background: tokens.pink,
        color: tokens.onDark,
        fontFamily: "Karla, sans-serif",
        fontWeight: 600,
        fontSize: 13.5,
        padding: "11px 18px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      <ShoppingBag size={16} />
      <span className="cart-label">Cart</span>
      <span
        style={{
          minWidth: 20,
          height: 20,
          padding: "0 6px",
          borderRadius: 999,
          background: tokens.gold,
          color: tokens.dark,
          fontSize: 11.5,
          fontWeight: 700,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {count}
      </span>
    </button>
  );
}

function MainBar() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: tokens.paper, borderBottom: `1px solid ${tokens.line}` }}>
      <div
        style={{
          maxWidth: 1220,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          justifyContent: "space-between",
        }}
      >
        <a href="#top" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ display: "block", fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 500, fontSize: 23, color: tokens.pinkDeep, lineHeight: 1 }}>
            Adùn House
          </span>
          <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 9.5, letterSpacing: 2.6, color: tokens.inkSoft, marginTop: 3 }}>
            CAKES · SNACKS · LAGOS
          </span>
        </a>

        <nav className="desktop-nav" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" style={{ fontFamily: "Karla, sans-serif", fontSize: 14, color: tokens.ink, textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: 12, flex: "0 1 auto" }}>
          <SearchField />
          <CartButton />
          <button
            className="mobile-toggle"
            onClick={() => setOpen(!open)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: tokens.ink, padding: 4 }}
            aria-label="Toggle menu"
          >
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

function CartDrawer() {
  const { items, step, remove, total, cartOpen, setCartOpen } = useShop();
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setCartOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setCartOpen]);

  if (!cartOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
      <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(43,20,32,0.45)" }} />
      <aside
        className="cart-panel"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(400px, 100%)",
          background: tokens.paper,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(43,20,32,0.3)",
        }}
      >
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
              <p style={{ margin: "14px 0 0", lineHeight: 1.6 }}>
                Nothing here yet. Add a cake or a tray of small chops and it will show up.
              </p>
            </div>
          )}
          {items.map((p) => (
            <div key={p.id} style={{ display: "flex", gap: 13, padding: "16px 0", borderBottom: `1px solid ${tokens.base}` }}>
              <img src={img(p.photo, 140, 140)} alt="" style={{ width: 58, height: 58, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 16, color: tokens.ink, margin: "0 0 3px" }}>{p.title}</h3>
                <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.pinkDeep, fontWeight: 700, margin: "0 0 9px" }}>{naira(p.price * p.qty)}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${tokens.line}`, borderRadius: 999 }}>
                    <button type="button" onClick={() => step(p.id, -1)} aria-label={`Fewer ${p.title}`} style={{ border: "none", background: "none", cursor: "pointer", padding: "5px 9px", color: tokens.ink, display: "flex" }}>
                      <Minus size={13} />
                    </button>
                    <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13, fontWeight: 700, minWidth: 18, textAlign: "center", color: tokens.ink }}>{p.qty}</span>
                    <button type="button" onClick={() => step(p.id, 1)} aria-label={`More ${p.title}`} style={{ border: "none", background: "none", cursor: "pointer", padding: "5px 9px", color: tokens.ink, display: "flex" }}>
                      <Plus size={13} />
                    </button>
                  </div>
                  <button type="button" onClick={() => remove(p.id)} aria-label={`Remove ${p.title}`} style={{ border: "none", background: "none", cursor: "pointer", color: tokens.inkSoft, display: "flex" }}>
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
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, margin: "0 0 14px", lineHeight: 1.5 }}>
            Delivery is quoted per area once we confirm your slot.
          </p>
          <a
            href="https://wa.me/2349064976053"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: items.length ? tokens.pink : tokens.pinkLight,
              color: items.length ? tokens.onDark : tokens.inkSoft,
              fontFamily: "Karla, sans-serif",
              fontWeight: 600,
              fontSize: 14.5,
              padding: "14px",
              borderRadius: 999,
              textDecoration: "none",
              pointerEvents: items.length ? "auto" : "none",
            }}
          >
            <MessageCircle size={16} /> Confirm on WhatsApp
          </a>
        </footer>
      </aside>
    </div>
  );
}

function Header() {
  return (
    <>
      <UtilityBar />
      <MainBar />
    </>
  );
}

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
      {/* soft ornaments, a nod to the flyer's hanging baubles */}
      <div style={{ position: "absolute", top: -30, right: -18, width: 92, height: 92, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, #FFFFFF, ${tokens.goldLight})`, boxShadow: "0 16px 30px rgba(185,130,42,0.26)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, borderRadius: 24, overflow: "hidden", boxShadow: "0 34px 70px rgba(43,20,32,0.3)", transform: "rotate(-1.2deg)" }}>
        <div style={{ position: "relative", aspectRatio: "4/5" }}>
          {heroSlides.map((s, idx) => (
            <img
              key={s.photo}
              src={img(s.photo, 1000, 1250)}
              alt={s.tag}
              draggable="false"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: idx === i ? 1 : 0,
                transform: idx === i ? "scale(1)" : "scale(1.05)",
                transition: "opacity 1s ease, transform 1.6s ease",
              }}
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
      <div
        className="hero-inset"
        style={{
          position: "absolute",
          left: -34,
          bottom: -34,
          width: 176,
          zIndex: 2,
          borderRadius: 18,
          overflow: "hidden",
          border: `5px solid ${tokens.paper}`,
          boxShadow: "0 20px 44px rgba(43,20,32,0.26)",
          transform: "rotate(3deg)",
        }}
      >
        <Photo src={img(PH.headBaker, 420, 480)} alt="Our head baker plating an order" ratio="7/8" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" style={{ background: `linear-gradient(180deg, ${tokens.pinkPale} 0%, ${tokens.base} 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-12%", right: "-8%", width: 440, height: 440, borderRadius: "50%", background: `radial-gradient(circle, ${tokens.pinkLight}, transparent 70%)` }} />
      <div
        className="hero-grid"
        style={{ maxWidth: 1220, margin: "0 auto", padding: "72px 24px 76px", position: "relative", display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 64, alignItems: "center" }}
      >
        <HeroCollage />
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", color: tokens.goldDeep, fontWeight: 700, fontSize: 12.5, letterSpacing: 2, marginBottom: 18 }}>
            YABA, LAGOS · SINCE 2019
          </p>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(38px, 5.6vw, 62px)", lineHeight: 1.05, color: tokens.ink, margin: 0 }}>
            Cakes that
            <br />
            celebrate, snacks
            <br />
            that <span style={{ fontStyle: "italic", color: tokens.pinkDeep }}>disappear</span>.
          </h1>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 16, lineHeight: 1.7, color: tokens.inkSoft, marginTop: 22, maxWidth: 430 }}>
            Everything is baked to order by a team of six in our Yaba kitchen,
            then delivered the same day, anywhere in Lagos.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
            <a href="#cakes" style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, color: tokens.onDark, background: tokens.pink, padding: "15px 28px", textDecoration: "none", borderRadius: 999, whiteSpace: "nowrap" }}>
              Browse the menu
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

/* ------------------------------------------------------------------ *
 * Cakes — one large featured card, the rest on a photo grid.
 * ------------------------------------------------------------------ */
function Cakes() {
  const featured = CAKES.find((c) => c.featured);
  const rest = CAKES.filter((c) => !c.featured);
  return (
    <section id="cakes" style={{ background: tokens.base, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <SectionHeading eyebrow="Cakes" title="A cake for *every kind* of occasion" />

        <div className="cakes-split" style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 22, marginBottom: 22 }}>
          <Photo src={img(featured.photo, 900, 900)} alt={featured.title} ratio="1/1" radius={20} zoom>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(43,20,32,0.78) 100%)" }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "30px 32px" }}>
              <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1.4, color: tokens.gold }}>FEATURED</span>
              <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 32, color: tokens.onDark, margin: "8px 0 10px" }}>{featured.title}</h3>
              <p style={{ fontFamily: "Karla, sans-serif", fontSize: 14.5, color: tokens.onDarkSoft, lineHeight: 1.6, maxWidth: 360, margin: "0 0 20px" }}>{featured.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 15, color: tokens.onDark }}>From {naira(featured.price)}</span>
                <AddButton product={featured} dark />
              </div>
            </div>
          </Photo>

          {/* the other five stack alongside, each row stretching so the
              column ends flush with the featured photo */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {rest.map((c) => (
              <CakeRow key={c.id} cake={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CakeRow({ cake }) {
  return (
    <article
      className="cake-row"
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: tokens.paper,
        border: `1px solid ${tokens.line}`,
        borderRadius: 14,
        padding: 12,
        minHeight: 92,
      }}
    >
      <Photo src={img(cake.photo, 260, 260)} alt={cake.title} ratio="1/1" radius={10} zoom style={{ width: 78, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 17.5, color: tokens.ink, margin: "0 0 4px" }}>{cake.title}</h3>
        <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.inkSoft, lineHeight: 1.55, margin: 0 }}>{cake.desc}</p>
      </div>
      <div className="cake-row-buy" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
        <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13, color: tokens.pinkDeep, whiteSpace: "nowrap" }}>From {naira(cake.price)}</span>
        <AddButton product={cake} label="Add" />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Snacks — a photo rail you can push sideways.
 * ------------------------------------------------------------------ */
function Snacks() {
  return (
    <section id="snacks" style={{ background: tokens.pinkLight, padding: "96px 0" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeading eyebrow="Snacks & Small Chops" title="The tray *everyone* fights over" />
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
 * The bakers — the section the whole brief hangs on. Editorial collage,
 * text on the left, four frames on the right at deliberately unequal
 * heights so it reads as a spread rather than a staff directory.
 * ------------------------------------------------------------------ */
function Bakers() {
  return (
    <section id="bakers" style={{ background: tokens.paper, padding: "96px 24px" }}>
      <div className="bakers-grid" style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 60, alignItems: "center" }}>
        <div>
          <SectionHeading eyebrow="Our Bakers" title="The hands behind *every tray*" />
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15.5, lineHeight: 1.75, color: tokens.inkSoft, margin: "0 0 18px", maxWidth: 400 }}>
            Six people, one kitchen, and a 6am start. Nothing here is
            outsourced and nothing is baked the day before — the tray that
            reaches your table was mixed by someone standing in this room.
          </p>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15.5, lineHeight: 1.75, color: tokens.inkSoft, margin: "0 0 28px", maxWidth: 400 }}>
            If you want it done a particular way, ask for it. We would rather
            adjust the recipe than hand you something you did not order.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: tokens.base, borderRadius: 14, border: `1px solid ${tokens.line}`, maxWidth: 400 }}>
            <ChefHat size={24} color={tokens.pinkDeep} />
            <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.ink, margin: 0, lineHeight: 1.55 }}>
              Every baker on the team holds a food-handler certificate, renewed yearly.
            </p>
          </div>
        </div>

        <div className="bakers-collage" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {BAKERS.map((b) => (
            <figure key={b.role} style={{ margin: 0, position: "relative", borderRadius: 16, overflow: "hidden" }}>
              <Photo src={img(b.photo, 640, 800)} alt={`${b.role} — ${b.note}`} ratio="4/5" zoom />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(43,20,32,0.75) 100%)" }} />
              <figcaption style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
                <span style={{ display: "block", fontFamily: "Fraunces, serif", fontSize: 17, color: tokens.onDark }}>{b.role}</span>
                <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11.5, letterSpacing: 0.6, color: tokens.gold, marginTop: 3 }}>
                  {b.note}
                </span>
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
        <p style={{ fontFamily: "Karla, sans-serif", color: tokens.gold, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, margin: 0, textTransform: "uppercase" }}>
          Do You Know
        </p>
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
 * Healthy — the three drinks get real estate, the dietary options sit
 * underneath as supporting detail.
 * ------------------------------------------------------------------ */
function Healthy() {
  return (
    <section id="healthy" style={{ background: tokens.goldLight, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <SectionHeading eyebrow="Better-for-you" title="Cold-pressed, cultured, *properly chilled*" accent="gold" />

        <div className="drinks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {DRINKS.map((d) => (
            <article key={d.id} style={{ background: tokens.paper, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <Photo src={img(d.photo, 700, 780)} alt={d.title} ratio="7/8" zoom>
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    fontFamily: "Karla, sans-serif",
                    fontWeight: 700,
                    fontSize: 10.5,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: tokens.dark,
                    background: tokens.gold,
                    padding: "6px 11px",
                    borderRadius: 999,
                  }}
                >
                  {d.tag}
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
          {DIETARY.map((it) => (
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
 * Recipes & tutorials — every entry now carries the photo of what you
 * are actually being taught to make.
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
            <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: tagColor(featured.tag) }}>
              {featured.tag.toUpperCase()}
            </span>
            <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(23px, 2.4vw, 30px)", color: tokens.ink, margin: "10px 0 12px", lineHeight: 1.2 }}>
              {featured.title}
            </h3>
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
      <img
        src={img(PH.bakeryCase, 1600, 700)}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(100deg, ${tokens.dark}F0, ${tokens.pinkDeep}D9)` }} />
      <div style={{ position: "relative" }}>
        <p style={{ fontFamily: "Karla, sans-serif", color: tokens.gold, fontWeight: 700, fontSize: 13, letterSpacing: 1.6, marginBottom: 16, textTransform: "uppercase" }}>
          Ready when you are
        </p>
        <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(30px, 5vw, 50px)", color: tokens.onDark, margin: "0 0 32px", lineHeight: 1.12 }}>
          Let's bake something
          <br />
          worth celebrating.
        </h2>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/2349064976053"
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15, color: tokens.onDark, background: tokens.pink, padding: "16px 30px", borderRadius: 999, textDecoration: "none" }}
          >
            <MessageCircle size={17} /> Order on WhatsApp
          </a>
          <a
            href="tel:+2349064976053"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15, color: tokens.onDark, border: "1px solid rgba(251,239,243,0.4)", padding: "16px 30px", borderRadius: 999, textDecoration: "none" }}
          >
            <Phone size={16} /> 0906 497 6053
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="order" style={{ background: tokens.dark, padding: "56px 24px 28px" }}>
      <div className="footer-grid" style={{ maxWidth: 1220, margin: "0 auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.1fr", gap: 40, paddingBottom: 34, borderBottom: "1px solid #4A2438" }}>
        <div>
          <div style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 500, fontSize: 21, color: tokens.onDark, marginBottom: 12 }}>Adùn House</div>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
            Cakes, snacks and cold drinks baked and pressed fresh in Yaba,
            delivered across Lagos the same day.
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.8, color: tokens.gold, marginBottom: 14 }}>EXPLORE</p>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, textDecoration: "none", marginBottom: 9 }}>
              {l.label}
            </a>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.8, color: tokens.gold, marginBottom: 14 }}>VISIT</p>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, lineHeight: 1.8, margin: 0 }}>
            12 Herbert Macaulay Way
            <br />
            Yaba, Lagos
            <br />
            Open daily, 8am – 9pm
          </p>
        </div>
        <div>
          <p style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.8, color: tokens.gold, marginBottom: 14 }}>FOLLOW</p>
          {SOCIALS.map(({ label, handle, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.onDarkSoft, textDecoration: "none", marginBottom: 11, width: "100%" }}
            >
              <Icon size={15} /> {handle}
            </a>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: "Karla, sans-serif", fontSize: 12, color: "#8C647A", textAlign: "center", marginTop: 24, lineHeight: 1.7 }}>
        © Adùn House. A concept design, not a live storefront.
        <br />
        Photography is temporary stock from Unsplash, for layout only.
      </p>
    </footer>
  );
}

const GLOBAL_CSS = `
  ${FONT_IMPORT}
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; }

  .photo-zoom img { transition: opacity .55s ease, transform .7s ease; }
  .photo-zoom:hover img { transform: scale(1.06); }

  .add-btn { transition: background .18s ease, color .18s ease, border-color .18s ease; }
  .add-btn:hover { background: #C2255C; color: #FBEFF3; border-color: #C2255C; }

  .nav-link { position: relative; }
  .nav-link::after {
    content: ""; position: absolute; left: 0; right: 100%; bottom: -5px;
    height: 2px; background: #D9A544; transition: right .22s ease;
  }
  .nav-link:hover::after { right: 0; }

  .search-row:hover { background: #FCEEF2; }
  .util-social { transition: color .18s ease; }
  .util-social:hover { color: #D9A544; }

  .snack-scroll::-webkit-scrollbar { height: 6px; }
  .snack-scroll::-webkit-scrollbar-thumb { background: rgba(147,23,63,0.28); border-radius: 3px; }

  .ticker-track { animation: ticker 34s linear infinite; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  .cart-panel { animation: slideIn .28s cubic-bezier(.2,.75,.2,1); }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }

  @media (prefers-reduced-motion: reduce) {
    .ticker-track, .cart-panel { animation: none; }
    .photo-zoom:hover img { transform: none; }
  }

  @media (max-width: 1040px) {
    .desktop-nav { display: none !important; }
    .mobile-toggle { display: block !important; }
    .search-wrap { flex: 0 1 220px; }
  }

  @media (max-width: 860px) {
    .hero-grid { grid-template-columns: 1fr !important; gap: 52px !important; }
    .hero-inset { width: 128px !important; left: -14px !important; bottom: -22px !important; }
    .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
    .cakes-split { grid-template-columns: 1fr !important; }
    .bakers-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
    .drinks-grid { grid-template-columns: 1fr !important; }
    .dietary-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
    .tut-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .tut-featured { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .util-left { display: none !important; }
  }

  @media (max-width: 560px) {
    .cake-row { flex-wrap: wrap; }
    .cake-row-buy { flex-direction: row !important; align-items: center !important; width: 100%; justify-content: space-between; }
    .tut-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
    .cart-label { display: none; }
    .search-wrap { flex: 1 1 auto; }
    .util-phone span, .util-sep { display: none; }
  }
`;

export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <ShopProvider>
      <div style={{ background: tokens.base, minHeight: "100vh" }}>
        <Header />
        <Hero />
        <StatBand />
        <Cakes />
        <Snacks />
        <Bakers />
        <DoYouKnow />
        <Healthy />
        <Tutorials />
        <ClosingCTA />
        <Footer />
        <CartDrawer />
      </div>
    </ShopProvider>
  );
}



import React, { useState, useEffect } from "react";
import { Clock, Leaf, Sparkles, MessageCircle, ArrowRight, ArrowUpRight, Phone, Star, ChefHat, MapPin } from "./icons.jsx";
import { tokens, img, naira } from "./theme.js";
import { PH, PRODUCTS, byCategory, BAKERS, DIETARY_NOTES, RECIPES, FACTS, OCCASIONS, REVIEWS, SHOP, RATING, FOUNDER, WHATSAPP, PHONE_DISPLAY, PHONE_HREF } from "./data.js";
import { Photo, AddButton, SectionHeading, Stars } from "./shop.jsx";

const CAKES = byCategory("Cakes");
const SNACKS = byCategory("Snacks");
const DRINKS = byCategory("Drinks");
const MEALS = byCategory("Meals");

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */
// Deliberately opens on a shot that appears nowhere else on the page, so
// the hero never sits directly above an identical product card.
const heroSlides = [
  { photo: PH.handsCake, tag: "Baked This Morning" },
  { photo: PH.smallChops, tag: "Small Chops & Trays" },
  { photo: PH.jollofFish, tag: "Jollof From Our Kitchen" },
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
            <a href="#/recipes" style={{ fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14.5, color: tokens.ink, padding: "15px 8px", textDecoration: "none", borderBottom: `2px solid ${tokens.gold}`, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              Learn to bake <ArrowRight size={15} />
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 30, fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft }}>
            <span style={{ display: "inline-flex", gap: 2, color: tokens.gold }}>
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} size={13} fill={tokens.gold} strokeWidth={0} />
              ))}
            </span>
            {RATING.score} from {RATING.count} Lagos orders
          </div>
        </div>
      </div>

      {/* scrolling tag strip, built from what we actually sell */}
      <div style={{ background: tokens.dark, padding: "18px 0", overflow: "hidden" }}>
        <div className="ticker-track" style={{ display: "flex", gap: 40, width: "max-content" }}>
          {Array(2)
            .fill(["Wedding Cakes", "Chin Chin", "Puff Puff", "Custom Cakes", "Small Chops", "Party Jollof", "Meat Pie", "Egusi & Pounded Yam", "Dodo", "Cupcakes", "Doughnuts", "Zobo", "Tigernut Milk"])
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
    { n: RATING.score, l: "Average Rating" },
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
            <ViewAll href="#/shop?q=meals">All {MEALS.length} meals</ViewAll>
          </div>
        </div>

        <div className="meals-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 36, alignItems: "start" }}>
          {/* the party cooler */}
          <article style={{ position: "relative", borderRadius: 22, overflow: "hidden", boxShadow: "0 26px 56px rgba(43,20,32,0.18)" }}>
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
                    Book a cooler <ArrowRight size={14} />
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
              <Photo src={img(o.photo, 560, 420)} alt={o.label} ratio="4/3" zoom />
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
const fmtHour = (h) => (h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`);

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
          Adùn House
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
            <Photo src={img(PH.storefront, 900, 620)} alt="The front of the shop on Herbert Macaulay Way" ratio="3/2" radius={16} zoom />
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
                { k: "Monday – Friday", v: "8am – 9pm" },
                { k: "Saturday", v: "8am – 9pm" },
                { k: "Sunday", v: "8am – 9pm" },
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
  return (
    <section id="reviews" style={{ background: tokens.pinkPale, padding: "92px 24px" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <SectionHeading eyebrow="From our customers" title="What people say *after* the party" />
          <div style={{ marginBottom: 40, textAlign: "right" }}>
            <div style={{ fontFamily: "Fraunces, serif", fontSize: 42, color: tokens.ink, lineHeight: 1 }}>{RATING.score}</div>
            <Stars rating={5} size={14} />
            <div style={{ fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.inkSoft, marginTop: 4 }}>{RATING.count} Lagos orders</div>
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
      <StatBand />
      <Occasions />
      <Cakes />
      <Snacks />
      <Meals />
      <Bakers />
      <DoYouKnow />
      <Healthy />
      <Reviews />
      <Tutorials />
      <FounderStrip />
      <Visit />
      <ClosingCTA />
    </div>
  );
}
