import React, { useEffect, useState } from "react";
import { tokens, naira } from "../theme.js";
import { Wordmark } from "../shop.jsx";
import { LayoutDashboard, Package, Receipt, Star, Settings as SettingsIcon, ExternalLink, LogOut, Plus, ArrowRight } from "../icons.jsx";
import { PREVIEW_MODE, PREVIEW_LOGIN, currentUser, login, logout, listOrders, listProducts, listFeedback } from "../api.js";
import { ADMIN_CSS, ToastProvider, Button, Card, Field, Input, Notice, PageTitle, font, serif } from "./ui.jsx";
import { ProductList, ProductEditor } from "./Products.jsx";
import Orders from "./Orders.jsx";
import Settings from "./Settings.jsx";
import Feedback from "./Feedback.jsx";

/* Routes, all under #/admin:
 *   #/admin                  dashboard
 *   #/admin/products         list          #/admin/products/new    add
 *   #/admin/products/<id>    edit          #/admin/orders          orders
 *   #/admin/feedback         what customers said
 *   #/admin/settings         shop details
 */
export default function AdminApp({ path }) {
  const [user, setUser] = useState(undefined); // undefined = still checking

  useEffect(() => {
    currentUser().then(setUser).catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = ADMIN_CSS;
    document.head.appendChild(style);
    document.title = "Admin · Annie Cakes & Chops";
    return () => {
      document.head.removeChild(style);
      document.title = "Annie Cakes & Chops";
    };
  }, []);

  if (user === undefined) return <div style={{ minHeight: "100vh", background: tokens.base }} />;

  return (
    <ToastProvider>
      {user ? (
        <Shell path={path} user={user} onLogout={() => logout().finally(() => setUser(null))}>
          <Page path={path} user={user} />
        </Shell>
      ) : (
        <Login onDone={setUser} />
      )}
    </ToastProvider>
  );
}

function Page({ path, user }) {
  const [section, id] = path;
  if (section === "products" && id) return <ProductEditor id={id === "new" ? null : id} key={id} />;
  if (section === "products") return <ProductList />;
  if (section === "orders") return <Orders />;
  if (section === "feedback") return <Feedback />;
  if (section === "settings") return <Settings />;
  return <Dashboard user={user} />;
}

/* ---- frame ------------------------------------------------------------ */

const NAV = [
  { href: "#/admin", label: "Home", Icon: LayoutDashboard, match: undefined },
  { href: "#/admin/products", label: "Products", Icon: Package, match: "products" },
  { href: "#/admin/orders", label: "Orders", Icon: Receipt, match: "orders" },
  { href: "#/admin/feedback", label: "Feedback", Icon: Star, match: "feedback" },
  { href: "#/admin/settings", label: "Shop details", short: "Settings", Icon: SettingsIcon, match: "settings" },
];

function Shell({ path, user, onLogout, children }) {
  const current = path[0];
  return (
    <div className="adm-shell" style={{ display: "grid", gridTemplateColumns: "248px 1fr", minHeight: "100vh", background: tokens.base }}>
      <aside className="adm-side" style={{ position: "sticky", top: 0, height: "100vh", background: tokens.paper, borderRight: `1px solid ${tokens.line}`, padding: "22px 14px", display: "flex", flexDirection: "column" }}>
        <a href="#/admin" style={{ textDecoration: "none", padding: "0 10px 22px" }}>
          <Wordmark />
          <span style={{ display: "block", fontFamily: font, fontWeight: 700, fontSize: 11, letterSpacing: 1.6, color: tokens.goldDeep, marginTop: 8 }}>ADMIN</span>
        </a>
        <nav style={{ display: "grid", gap: 4 }}>
          {NAV.map(({ href, label, Icon, match }) => {
            const on = current === match;
            return (
              <a key={href} href={href} className="adm-nav" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px", borderRadius: 12, textDecoration: "none", fontFamily: font, fontWeight: 600, fontSize: 15, color: on ? tokens.pinkDeep : tokens.ink, background: on ? tokens.pinkPale : "transparent" }}>
                <Icon size={19} /> {label}
              </a>
            );
          })}
        </nav>
        <div style={{ marginTop: "auto", display: "grid", gap: 4 }}>
          <a href="#/" target="_blank" rel="noreferrer" className="adm-nav" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 12, textDecoration: "none", fontFamily: font, fontWeight: 600, fontSize: 14.5, color: tokens.ink }}>
            <ExternalLink size={18} /> View the website
          </a>
          <button type="button" onClick={onLogout} className="adm-nav" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 12, border: "none", background: "none", cursor: "pointer", fontFamily: font, fontWeight: 600, fontSize: 14.5, color: tokens.inkSoft, textAlign: "left" }}>
            <LogOut size={18} /> Log out ({user.name || user.email})
          </button>
        </div>
      </aside>

      <main className="adm-main" style={{ padding: "28px 36px 120px", minWidth: 0 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          {PREVIEW_MODE && (
            <div style={{ marginBottom: 18 }}>
              <Notice>
                <strong>Preview mode.</strong> Changes are saved on this device only, until the backend is connected.
              </Notice>
            </div>
          )}
          {children}
        </div>
      </main>

      {/* phone tab bar */}
      <nav className="adm-tabs" style={{ display: "none", gridTemplateColumns: `repeat(${NAV.length + 1}, 1fr)`, position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 300, background: tokens.paper, borderTop: `1px solid ${tokens.line}`, paddingBottom: "env(safe-area-inset-bottom)" }}>
        {NAV.map(({ href, label, short, Icon, match }) => {
          const on = current === match;
          return (
            <a key={href} href={href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 2px 9px", textDecoration: "none", fontFamily: font, fontWeight: 600, fontSize: 11.5, color: on ? tokens.pinkDeep : tokens.inkSoft }}>
              <Icon size={21} /> {short || label}
            </a>
          );
        })}
        <button type="button" onClick={onLogout} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 2px 9px", border: "none", background: "none", fontFamily: font, fontWeight: 600, fontSize: 11.5, color: tokens.inkSoft }}>
          <LogOut size={21} /> Log out
        </button>
      </nav>
    </div>
  );
}

/* ---- login -------------------------------------------------------------- */

function Login({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      onDone(await login(email, password));
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px 16px", background: `linear-gradient(160deg, ${tokens.pinkPale}, ${tokens.pinkLight})` }}>
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 400, background: tokens.paper, borderRadius: 22, padding: "32px 26px", boxShadow: "0 24px 60px rgba(147,23,63,0.14)" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <Wordmark />
          <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: 24, color: tokens.ink, margin: "18px 0 4px" }}>Admin login</h1>
          <p style={{ fontFamily: font, fontSize: 14, color: tokens.inkSoft, margin: 0 }}>Manage products, prices and orders.</p>
        </div>
        <Field label="Email" htmlFor="adm-email">
          <Input id="adm-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password" htmlFor="adm-password" error={error}>
          <Input id="adm-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Button type="submit" disabled={busy} style={{ width: "100%", marginTop: 6 }}>
          {busy ? "Logging in…" : "Log in"}
        </Button>
        {PREVIEW_MODE && (
          <div style={{ marginTop: 18 }}>
            <Notice>
              Preview login: <strong>{PREVIEW_LOGIN.email}</strong> / <strong>{PREVIEW_LOGIN.password}</strong>
            </Notice>
          </div>
        )}
      </form>
    </div>
  );
}

/* ---- dashboard ---------------------------------------------------------- */

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

function Dashboard({ user }) {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    listOrders().then(setOrders).catch(() => setOrders([]));
    listProducts().then(setProducts).catch(() => setProducts([]));
    listFeedback().then(setFeedback).catch(() => setFeedback([]));
  }, []);

  const today = new Date().toDateString();
  const fresh = (orders || []).filter((o) => o.status === "new");
  const todays = (orders || []).filter((o) => new Date(o.createdAt).toDateString() === today);
  const newFeedback = (feedback || []).filter((f) => f.status === "new");
  const stats = [
    { label: "New orders", value: orders ? fresh.length : "–", href: "#/admin/orders", hot: fresh.length > 0 },
    { label: "Orders today", value: orders ? todays.length : "–", href: "#/admin/orders" },
    { label: "Today's sales", value: orders ? naira(todays.filter((o) => o.status !== "cancelled").reduce((n, o) => n + o.total, 0)) : "–", href: "#/admin/orders" },
    { label: "Unread feedback", value: feedback ? newFeedback.length : "–", href: "#/admin/feedback", hot: newFeedback.length > 0 },
    { label: "Sold out right now", value: products ? products.filter((p) => p.soldOut).length : "–", href: "#/admin/products" },
  ];

  return (
    <>
      <PageTitle title={`${greeting()}, ${user.name || "there"}`} sub="Here's what's happening in the shop." />

      <div className="adm-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))", gap: 14, marginBottom: 22 }}>
        {stats.map((s) => (
          <a key={s.label} href={s.href} style={{ textDecoration: "none", background: s.hot ? tokens.pink : tokens.paper, border: `1px solid ${s.hot ? tokens.pink : tokens.line}`, borderRadius: 16, padding: "16px 16px 18px" }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: s.hot ? tokens.onDark : tokens.inkSoft }}>{s.label}</div>
            <div style={{ fontFamily: serif, fontSize: 30, color: s.hot ? tokens.onDark : tokens.ink, marginTop: 6 }}>{s.value}</div>
          </a>
        ))}
      </div>

      <div className="adm-two" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, alignItems: "start" }}>
        <Card title="Orders waiting for you" hint={fresh.length ? "Confirm these with the customer on WhatsApp, then update the status." : undefined}>
          {orders && fresh.length === 0 && <p style={{ fontFamily: font, fontSize: 14, color: tokens.inkSoft, margin: 0 }}>You're all caught up. New orders will show here.</p>}
          {fresh.slice(0, 5).map((o) => (
            <a key={o.id} href="#/admin/orders" style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 0", borderTop: `1px solid ${tokens.base}`, textDecoration: "none" }}>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontFamily: font, fontWeight: 700, fontSize: 14.5, color: tokens.ink }}>{o.customer.name}</span>
                <span style={{ display: "block", fontFamily: font, fontSize: 13, color: tokens.inkSoft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {o.items.map((i) => `${i.qty} × ${i.title}`).join(", ")}
                </span>
              </span>
              <span style={{ fontFamily: font, fontWeight: 700, fontSize: 14, color: tokens.pinkDeep, whiteSpace: "nowrap" }}>{naira(o.total)}</span>
            </a>
          ))}
          {fresh.length > 5 && (
            <a href="#/admin/orders" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontFamily: font, fontWeight: 700, fontSize: 14, color: tokens.pinkDeep, textDecoration: "none" }}>
              See all {fresh.length} <ArrowRight size={14} />
            </a>
          )}
        </Card>

        <Card title="Quick jobs">
          <div style={{ display: "grid", gap: 10 }}>
            <Button as="a" href="#/admin/products/new">
              <Plus size={17} /> Add a new product
            </Button>
            <Button as="a" href="#/admin/products" variant="secondary">
              Change a price or mark sold out
            </Button>
            <Button as="a" href="#/admin/feedback" variant="secondary">
              Read and publish customer feedback
            </Button>
            <Button as="a" href="#/admin/settings" variant="secondary">
              Edit the announcement bar
            </Button>
            <Button as="a" href="#/" target="_blank" rel="noreferrer" variant="secondary">
              <ExternalLink size={16} /> View the website
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

