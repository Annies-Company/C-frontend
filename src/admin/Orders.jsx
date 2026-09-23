import React, { useEffect, useState } from "react";
import { tokens, naira } from "../theme.js";
import { Phone, MessageCircle, MapPin } from "../icons.jsx";
import { listOrders, updateOrderStatus } from "../api.js";
import { Empty, Notice, PageTitle, Select, useToast, font } from "./ui.jsx";

export const STATUSES = [
  { id: "new", label: "New", color: tokens.pink },
  { id: "confirmed", label: "Confirmed", color: "#B9822A" },
  { id: "baking", label: "In the kitchen", color: "#8A5CC2" },
  { id: "out", label: "Out for delivery", color: "#2F7FB5" },
  { id: "delivered", label: "Delivered", color: "#2F6B42" },
  { id: "cancelled", label: "Cancelled", color: "#8C6E7A" },
];
const statusOf = (id) => STATUSES.find((s) => s.id === id) || STATUSES[0];

// Nigerian numbers get typed every way imaginable: 0906…, +234 906…, 234906…
const waNumber = (phone) => {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0")) return "234" + digits.slice(1);
  return digits;
};

const when = (iso) => {
  const d = new Date(iso);
  const mins = Math.round((Date.now() - d) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  if (mins < 60 * 24) return `${Math.round(mins / 60)} hr ago`;
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
};

export default function Orders() {
  const toast = useToast();
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("open");

  useEffect(() => {
    listOrders().then(setOrders).catch((err) => setError(err.message));
  }, []);

  const setStatus = async (order, status) => {
    setOrders((list) => list.map((o) => (o.id === order.id ? { ...o, status } : o)));
    try {
      await updateOrderStatus(order.id, status);
      toast(`${order.customer.name}'s order: ${statusOf(status).label}`);
    } catch (err) {
      setOrders((list) => list.map((o) => (o.id === order.id ? order : o)));
      toast(err.message, "error");
    }
  };

  const all = orders || [];
  const isOpen = (o) => !["delivered", "cancelled"].includes(o.status);
  const tabs = [
    { id: "open", label: "To do", count: all.filter(isOpen).length },
    ...STATUSES.map((s) => ({ id: s.id, label: s.label, count: all.filter((o) => o.status === s.id).length })),
    { id: "all", label: "All", count: all.length },
  ];
  const shown = all.filter((o) => (filter === "all" ? true : filter === "open" ? isOpen(o) : o.status === filter));

  return (
    <>
      <PageTitle title="Orders" sub="Orders arrive here when a customer taps “Confirm on WhatsApp”." />
      {error && <Notice tone="pink">{error}</Notice>}

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 }}>
        {tabs.map((t) => {
          const on = t.id === filter;
          return (
            <button key={t.id} type="button" onClick={() => setFilter(t.id)} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: font, fontWeight: 600, fontSize: 14, padding: "9px 14px", borderRadius: 999, cursor: "pointer", border: `1.5px solid ${on ? tokens.pink : tokens.line}`, background: on ? tokens.pink : tokens.paper, color: on ? tokens.onDark : tokens.ink }}>
              {t.label}
              <span style={{ fontSize: 12, fontWeight: 700, minWidth: 20, padding: "1px 6px", borderRadius: 999, background: on ? "rgba(255,255,255,0.25)" : tokens.base }}>{t.count}</span>
            </button>
          );
        })}
      </div>

      {orders && shown.length === 0 && (
        <Empty title={all.length ? "Nothing in this list" : "No orders yet"}>
          {all.length ? "Pick another tab above." : "When a customer sends an order from the website, it will appear here."}
        </Empty>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {shown.map((o) => {
          const s = statusOf(o.status);
          const wa = waNumber(o.customer.phone);
          return (
            <article key={o.id} style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderLeft: `5px solid ${s.color}`, borderRadius: 16, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: font, fontWeight: 700, fontSize: 17, color: tokens.ink }}>{o.customer.name}</div>
                  <div style={{ fontFamily: font, fontSize: 13, color: tokens.inkSoft, marginTop: 2 }}>
                    {o.id} · {when(o.createdAt)}
                  </div>
                </div>
                <Select value={o.status} onChange={(e) => setStatus(o, e.target.value)} aria-label="Order status" style={{ width: "auto", minWidth: 190, fontWeight: 700, color: s.color }}>
                  {STATUSES.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.label}
                    </option>
                  ))}
                </Select>
              </div>

              <ul style={{ listStyle: "none", margin: "14px 0", padding: "12px 0", borderTop: `1px solid ${tokens.base}`, borderBottom: `1px solid ${tokens.base}` }}>
                {o.items.map((item, i) => (
                  <li key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "5px 0", fontFamily: font, fontSize: 14.5, color: tokens.ink }}>
                    <span>
                      <strong>{item.qty} ×</strong> {item.title}
                      {item.options && (
                        <span style={{ display: "block", fontSize: 12.5, color: tokens.inkSoft, marginTop: 2 }}>
                          {Object.entries(item.options)
                            .filter(([, v]) => v)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </span>
                      )}
                    </span>
                    <span style={{ whiteSpace: "nowrap" }}>{naira(item.price * item.qty)}</span>
                  </li>
                ))}
                <li style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, fontFamily: font, fontWeight: 700, fontSize: 15, color: tokens.pinkDeep }}>
                  <span>Total (before delivery)</span>
                  <span>{naira(o.total)}</span>
                </li>
              </ul>

              <div style={{ display: "flex", gap: "8px 18px", flexWrap: "wrap", alignItems: "center", fontFamily: font, fontSize: 14 }}>
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 700, color: "#fff", background: "#25A244", padding: "10px 16px", borderRadius: 999, textDecoration: "none" }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <a href={`tel:+${wa}`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 700, color: tokens.ink, textDecoration: "none" }}>
                  <Phone size={15} /> {o.customer.phone}
                </a>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: tokens.inkSoft }}>
                  <MapPin size={15} /> {o.customer.address || "Collecting from the shop"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
