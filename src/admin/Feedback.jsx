import React, { useEffect, useState } from "react";
import { tokens } from "../theme.js";
import { Star, MessageCircle, Phone, Check, Trash2, Heart } from "../icons.jsx";
import { listFeedback, updateFeedbackStatus, deleteFeedback } from "../api.js";
import { Button, Empty, Notice, PageTitle, useToast, font, serif } from "./ui.jsx";

/* ------------------------------------------------------------------ *
 * #/admin/feedback — everything customers have sent from #/feedback.
 *
 * "Published" is the only status a customer ever sees: it puts the
 * review under "What people say" on the homepage. Everything else is
 * just your own filing.
 * ------------------------------------------------------------------ */

export const FB_STATUSES = [
  { id: "new", label: "New", color: tokens.pink },
  { id: "read", label: "Read", color: "#8C6E7A" },
  { id: "published", label: "On the website", color: "#2F6B42" },
  { id: "hidden", label: "Put away", color: "#8C6E7A" },
];
const statusOf = (id) => FB_STATUSES.find((s) => s.id === id) || FB_STATUSES[0];

// Nigerian numbers get typed every way imaginable: 0810…, +234 810…, 234810…
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

function Score({ rating }) {
  return (
    <span style={{ display: "inline-flex", gap: 2, color: tokens.gold }} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={15} fill={n <= rating ? tokens.gold : "none"} color={tokens.gold} strokeWidth={n <= rating ? 0 : 1.5} />
      ))}
    </span>
  );
}

export default function Feedback() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("new");

  useEffect(() => {
    listFeedback()
      .then(setItems)
      .catch((err) => setError(err.message));
  }, []);

  // Optimistic: the switch moves under the thumb, and rolls back if the save fails.
  const setStatus = async (entry, status) => {
    setItems((list) => list.map((f) => (f.id === entry.id ? { ...f, status } : f)));
    try {
      await updateFeedbackStatus(entry.id, status);
      toast(status === "published" ? `${entry.name}'s review is on the website` : `Moved to ${statusOf(status).label.toLowerCase()}`);
    } catch (err) {
      setItems((list) => list.map((f) => (f.id === entry.id ? entry : f)));
      toast(err.message, "error");
    }
  };

  const remove = async (entry) => {
    if (!window.confirm(`Delete ${entry.name}'s feedback for good? This cannot be undone.`)) return;
    const before = items;
    setItems((list) => list.filter((f) => f.id !== entry.id));
    try {
      await deleteFeedback(entry.id);
      toast("Deleted");
    } catch (err) {
      setItems(before);
      toast(err.message, "error");
    }
  };

  const all = items || [];
  const tabs = [
    ...FB_STATUSES.map((s) => ({ id: s.id, label: s.label, count: all.filter((f) => f.status === s.id).length })),
    { id: "all", label: "All", count: all.length },
  ];
  const shown = all.filter((f) => (filter === "all" ? true : f.status === filter));

  const live = all.filter((f) => f.status === "published").length;
  const average = live ? (all.filter((f) => f.status === "published").reduce((n, f) => n + f.rating, 0) / live).toFixed(1) : null;

  return (
    <>
      <PageTitle
        title="Feedback"
        sub="What customers sent from the “Leave your feedback” form. Nothing here is on the website until you publish it."
      />
      {error && <Notice tone="pink">{error}</Notice>}

      {live > 0 && (
        <div style={{ marginBottom: 18 }}>
          <Notice>
            <strong>
              {live} review{live === 1 ? "" : "s"} showing on the homepage
            </strong>{" "}
            · average {average} stars. That replaces the placeholder reviews the site shipped with.
          </Notice>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 }}>
        {tabs.map((t) => {
          const on = t.id === filter;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: font, fontWeight: 600, fontSize: 14, padding: "9px 14px", borderRadius: 999, cursor: "pointer", border: `1.5px solid ${on ? tokens.pink : tokens.line}`, background: on ? tokens.pink : tokens.paper, color: on ? tokens.onDark : tokens.ink }}
            >
              {t.label}
              <span style={{ fontSize: 12, fontWeight: 700, minWidth: 20, padding: "1px 6px", borderRadius: 999, background: on ? "rgba(255,255,255,0.25)" : tokens.base }}>{t.count}</span>
            </button>
          );
        })}
      </div>

      {items && shown.length === 0 && (
        <Empty title={all.length ? "Nothing in this list" : "No feedback yet"}>
          {all.length
            ? "Pick another tab above."
            : "Send customers to anniecakes.ng/#/feedback after their party — the link is in the footer of every page and under the reviews on the homepage."}
        </Empty>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {shown.map((f) => {
          const s = statusOf(f.status);
          const wa = waNumber(f.phone);
          const published = f.status === "published";
          return (
            <article key={f.id} style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderLeft: `5px solid ${s.color}`, borderRadius: 16, padding: "16px 18px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
                <div>
                  <Score rating={f.rating} />
                  <div style={{ fontFamily: font, fontWeight: 700, fontSize: 16.5, color: tokens.ink, marginTop: 6 }}>
                    {f.name}
                    {f.area ? <span style={{ fontWeight: 400, color: tokens.inkSoft }}> · {f.area}</span> : null}
                  </div>
                  <div style={{ fontFamily: font, fontSize: 13, color: tokens.inkSoft, marginTop: 2 }}>
                    {when(f.createdAt)}
                    {f.ordered ? ` · ${f.ordered}` : ""}
                  </div>
                </div>
                <span style={{ fontFamily: font, fontWeight: 700, fontSize: 12, letterSpacing: 0.6, textTransform: "uppercase", color: s.color, background: tokens.base, padding: "6px 12px", borderRadius: 999 }}>
                  {s.label}
                </span>
              </div>

              <p style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.7, color: tokens.ink, margin: "14px 0", padding: "14px 0", borderTop: `1px solid ${tokens.base}`, borderBottom: `1px solid ${tokens.base}` }}>
                “{f.message}”
              </p>

              {!f.consent && (
                <div style={{ marginBottom: 14 }}>
                  <Notice tone="pink">
                    They did <strong>not</strong> tick “you may show this on the website”, so please keep it off the homepage.
                  </Notice>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {f.consent && (
                  <Button
                    variant={published ? "secondary" : "primary"}
                    onClick={() => setStatus(f, published ? "read" : "published")}
                    style={{ padding: "10px 16px", minHeight: 42, fontSize: 14 }}
                  >
                    {published ? "Take off the website" : <><Heart size={15} /> Put on the website</>}
                  </Button>
                )}
                {f.status === "new" && (
                  <Button variant="secondary" onClick={() => setStatus(f, "read")} style={{ padding: "10px 16px", minHeight: 42, fontSize: 14 }}>
                    <Check size={15} /> Mark as read
                  </Button>
                )}
                {f.status !== "hidden" && !published && (
                  <Button variant="secondary" onClick={() => setStatus(f, "hidden")} style={{ padding: "10px 16px", minHeight: 42, fontSize: 14 }}>
                    Put away
                  </Button>
                )}
                {wa && (
                  <a
                    href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hello ${f.name}, thank you for the feedback you left on our website.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: font, fontWeight: 700, fontSize: 14, color: "#fff", background: "#25A244", padding: "10px 16px", borderRadius: 999, textDecoration: "none" }}
                  >
                    <MessageCircle size={15} /> Reply
                  </a>
                )}
                {f.phone && (
                  <a href={`tel:+${wa}`} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: font, fontWeight: 600, fontSize: 14, color: tokens.ink, textDecoration: "none" }}>
                    <Phone size={15} /> {f.phone}
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => remove(f)}
                  aria-label={`Delete ${f.name}'s feedback`}
                  style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, border: "none", background: "none", cursor: "pointer", fontFamily: font, fontSize: 13.5, color: tokens.inkSoft }}
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
