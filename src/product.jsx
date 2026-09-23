import React, { useState, useMemo, useEffect } from "react";
import { tokens, img, naira } from "./theme.js";
import { findProduct, PRODUCTS, CAKE_SIZES, FLAVOURS, SPICE_LEVELS, SHOP, RATING, WHATSAPP } from "./data.js";
import { Photo, Badge, Stars, useShop } from "./shop.jsx";
import { Clock, MapPin, ChefHat, ShoppingBag, ArrowRight, Leaf, X, MessageCircle } from "./icons.jsx";

const DAY = 86400000;
const iso = (d) => d.toISOString().slice(0, 10);
const pretty = (s) =>
  new Date(s + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
        <label style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13, color: tokens.ink }}>{label}</label>
        {hint && <span style={{ fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft }}>{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  fontFamily: "Karla, sans-serif",
  fontSize: 14,
  color: tokens.ink,
  background: tokens.paper,
  border: `1px solid ${tokens.line}`,
  borderRadius: 10,
  padding: "12px 13px",
  outline: "none",
};

export default function ProductPage({ id }) {
  const product = findProduct(id);
  const { add } = useShop();

  const isCake = product?.category === "Cakes";
  const isMeal = product?.category === "Meals";
  const leadDays = product?.leadDays ?? 0;
  const earliest = useMemo(() => iso(new Date(Date.now() + leadDays * DAY)), [leadDays]);

  const [size, setSize] = useState(CAKE_SIZES[0].id);
  const [flavour, setFlavour] = useState(FLAVOURS[0]);
  const [spice, setSpice] = useState(SPICE_LEVELS[1].id);
  const [message, setMessage] = useState("");
  const [when, setWhen] = useState(earliest);
  const [qty, setQty] = useState(1);
  const [refPhoto, setRefPhoto] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => setWhen(earliest), [earliest]);
  useEffect(() => () => refPhoto && URL.revokeObjectURL(refPhoto.url), [refPhoto]);

  if (!product) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "110px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 32, color: tokens.ink, margin: "0 0 12px" }}>We can't find that one</h1>
        <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15, color: tokens.inkSoft, margin: "0 0 24px" }}>It may have been renamed, or the link is off.</p>
        <a href="#/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, padding: "13px 26px", borderRadius: 999, textDecoration: "none" }}>
          Back to the menu <ArrowRight size={15} />
        </a>
      </div>
    );
  }

  const tier = CAKE_SIZES.find((s) => s.id === size);
  const unitPrice = isCake ? Math.round((product.price * tier.mult) / 100) * 100 : product.price;
  const lineTotal = unitPrice * qty;

  const related = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.occasions.some((o) => product.occasions.includes(o)))).slice(0, 4);

  const onPick = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (refPhoto) URL.revokeObjectURL(refPhoto.url);
    setRefPhoto({ name: file.name, url: URL.createObjectURL(file) });
  };

  const submit = (e) => {
    e.preventDefault();
    const options = {};
    if (isCake) {
      options.Size = `${tier.label} (${tier.serves})`;
      options.Flavour = flavour;
      if (product.personalisable && message.trim()) options.Message = `“${message.trim()}”`;
    }
    if (isMeal) options.Pepper = SPICE_LEVELS.find((l) => l.id === spice).label;
    if (product.unit) options.Unit = product.unit;
    options["Needed by"] = pretty(when);
    if (refPhoto) options.Reference = refPhoto.name;
    if (note.trim()) options.Note = note.trim();
    if (product.soldOut) return;
    add(product, { options, price: unitPrice, qty });
  };

  return (
    <div style={{ background: tokens.base }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "18px 24px 0", fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.inkSoft }}>
        <a href="#/" style={{ color: tokens.inkSoft, textDecoration: "none" }}>Home</a>
        <span style={{ margin: "0 7px" }}>/</span>
        <a href="#/shop" style={{ color: tokens.inkSoft, textDecoration: "none" }}>The Full Menu</a>
        <span style={{ margin: "0 7px" }}>/</span>
        <span style={{ color: tokens.ink }}>{product.title}</span>
      </div>

      <div className="pdp-grid" style={{ maxWidth: 1320, margin: "0 auto", padding: "22px 24px 70px", display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 48, alignItems: "start" }}>
        {/* ---- the cake itself ---- */}
        <div style={{ position: "sticky", top: 88 }} className="pdp-media">
          <Photo src={img(product.photo, 1000, 1000)} alt={product.title} ratio="1/1" radius={20} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
            {product.sameDay && <Badge>Same Day Delivery</Badge>}
            {product.personalisable && <Badge tone="gold">Personalisable</Badge>}
            {product.tags.map((t) => (
              <Badge key={t} tone="pink">{t}</Badge>
            ))}
          </div>
        </div>

        {/* ---- the counter conversation ---- */}
        <div>
          <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(30px, 3.6vw, 42px)", color: tokens.ink, margin: "0 0 10px", lineHeight: 1.12 }}>{product.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Stars rating={5} />
            <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft }}>{RATING.score} · {RATING.count} {RATING.basis}</span>
          </div>
          <p style={{ fontFamily: "Karla, sans-serif", fontSize: 15.5, lineHeight: 1.7, color: tokens.inkSoft, margin: "0 0 20px" }}>{product.desc}</p>

          <div style={{ display: "flex", alignItems: "baseline", gap: 10, paddingBottom: 20, borderBottom: `1px solid ${tokens.line}`, marginBottom: 22 }}>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: 32, color: tokens.ink }}>{naira(lineTotal)}</span>
            {qty > 1 && <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft }}>{naira(unitPrice)} each</span>}
            {product.unit && <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft }}>{product.unit}</span>}
          </div>

          <form onSubmit={submit}>
            {isCake && (
              <>
                <Field label="Size" hint={tier.serves}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {CAKE_SIZES.map((s) => {
                      const on = s.id === size;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSize(s.id)}
                          style={{ cursor: "pointer", textAlign: "left", background: on ? tokens.pinkPale : tokens.paper, border: `2px solid ${on ? tokens.pink : tokens.line}`, borderRadius: 12, padding: "12px 13px" }}
                        >
                          <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.ink }}>{s.label}</span>
                          <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, marginTop: 3 }}>{s.serves}</span>
                          <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 12.5, color: tokens.pinkDeep, marginTop: 6 }}>
                            {naira(Math.round((product.price * s.mult) / 100) * 100)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field label="Flavour">
                  <select value={flavour} onChange={(e) => setFlavour(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                    {FLAVOURS.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                </Field>

                {product.personalisable && (
                  <Field label="Message on the cake" hint={`${message.length}/40`}>
                    <input value={message} maxLength={40} onChange={(e) => setMessage(e.target.value)} placeholder="Happy 60th, Mummy" style={inputStyle} />
                  </Field>
                )}
              </>
            )}

            {isMeal && (
              <Field label="How much pepper?">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {SPICE_LEVELS.map((l) => {
                    const on = l.id === spice;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setSpice(l.id)}
                        style={{ cursor: "pointer", textAlign: "left", background: on ? tokens.pinkPale : tokens.paper, border: `2px solid ${on ? tokens.pink : tokens.line}`, borderRadius: 12, padding: "12px 13px" }}
                      >
                        <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13.5, color: tokens.ink }}>{l.label}</span>
                        <span style={{ display: "block", fontFamily: "Karla, sans-serif", fontSize: 11.5, color: tokens.inkSoft, marginTop: 3 }}>{l.note}</span>
                      </button>
                    );
                  })}
                </div>
              </Field>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: 14 }} className="pdp-when">
              <Field label="When do you need it?" hint={leadDays ? `${leadDays === 1 ? "A day's" : `${leadDays} days'`} notice` : "Same day"}>
                <input type="date" value={when} min={earliest} onChange={(e) => setWhen(e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Quantity">
                <input type="number" min={1} max={99} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(99, +e.target.value || 1)))} style={inputStyle} />
              </Field>
            </div>

            <p style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Karla, sans-serif", fontSize: 12.5, color: tokens.goldDeep, background: tokens.goldLight, borderRadius: 10, padding: "10px 13px", margin: "0 0 20px" }}>
              <Clock size={14} />
              {leadDays === 0 ? "Order before 2pm and we can get this out today." : `We need ${leadDays === 1 ? "a day" : `${leadDays} days`} for this one — the earliest is ${pretty(earliest)}.`}
            </p>

            {product.personalisable && (
              <Field label="Reference photo" hint="optional">
                {refPhoto ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, border: `1px solid ${tokens.line}`, borderRadius: 10, padding: 10, background: tokens.paper }}>
                    <img src={refPhoto.url} alt="" style={{ width: 46, height: 46, objectFit: "cover", borderRadius: 8 }} />
                    <span style={{ flex: 1, minWidth: 0, fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{refPhoto.name}</span>
                    <button type="button" onClick={() => { URL.revokeObjectURL(refPhoto.url); setRefPhoto(null); }} aria-label="Remove reference photo" style={{ border: "none", background: "none", cursor: "pointer", color: tokens.inkSoft, display: "flex" }}>
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <label style={{ display: "block", cursor: "pointer", border: `1px dashed ${tokens.line}`, borderRadius: 10, padding: "16px 13px", textAlign: "center", background: tokens.paper, fontFamily: "Karla, sans-serif", fontSize: 13, color: tokens.inkSoft }}>
                    Attach a design you like
                    <input type="file" accept="image/*" onChange={onPick} style={{ display: "none" }} />
                  </label>
                )}
              </Field>
            )}

            <Field label="Anything else we should know?" hint="optional">
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder={isMeal ? "No shaki, extra dodo, delivery window…" : "Nut allergy, delivery window, colour of the icing…"} style={{ ...inputStyle, resize: "vertical" }} />
            </Field>

            <button
              type="submit"
              disabled={product.soldOut}
              style={{ width: "100%", opacity: product.soldOut ? 0.5 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, border: "none", cursor: "pointer", background: tokens.pink, color: tokens.onDark, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15.5, padding: "16px", borderRadius: 999 }}
            >
              <ShoppingBag size={17} /> {product.soldOut ? "Sold out today" : `Add to order · ${naira(lineTotal)}`}
            </button>

            <a href={WHATSAPP} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12, fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 14, color: tokens.ink, border: `1px solid ${tokens.line}`, padding: "14px", borderRadius: 999, textDecoration: "none", background: tokens.paper }}>
              <MessageCircle size={16} /> Ask us a question first
            </a>
          </form>

          <div style={{ display: "grid", gap: 12, marginTop: 26 }}>
            {[
              { Icon: ChefHat, text: `${isMeal ? "Cooked" : "Baked"} to order by our own team — nothing is bought in or frozen.` },
              { Icon: MapPin, text: `Delivered across Lagos from ${SHOP.address}.` },
              { Icon: Leaf, text: "Sugar-free, gluten-free and vegan versions of most items on request." },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <Icon size={17} color={tokens.goldDeep} style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: "Karla, sans-serif", fontSize: 13.5, color: tokens.inkSoft, lineHeight: 1.55 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px 90px" }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 26, color: tokens.ink, margin: "0 0 22px" }}>Often ordered together</h2>
          <div className="catalog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {related.map((r) => (
              <a key={r.id} href={`#/p/${r.id}`} style={{ textDecoration: "none", background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, overflow: "hidden", display: "block" }}>
                <Photo src={img(r.photo, 500, 500)} alt={r.title} ratio="1/1" zoom />
                <div style={{ padding: "14px 16px 16px" }}>
                  <h3 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 16.5, color: tokens.ink, margin: "0 0 6px" }}>{r.title}</h3>
                  <span style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 13, color: tokens.pinkDeep }}>From {naira(r.price)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
