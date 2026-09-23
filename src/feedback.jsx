import React, { useState } from "react";
import { tokens } from "./theme.js";
import { SHOP, HOURS, WHATSAPP, PHONE_DISPLAY, PHONE_HREF, BRAND } from "./data.js";
import { SectionHeading } from "./shop.jsx";
import { Star, MessageCircle, Phone, MapPin, Clock, Check, ArrowRight, Heart } from "./icons.jsx";
import { submitFeedback } from "./api.js";

/* ------------------------------------------------------------------ *
 * #/feedback — where a customer tells us how it went.
 *
 * Nothing typed here reaches the website on its own. It lands in
 * #/admin/feedback as "new", and only shows up under "What people say"
 * once it is published from there — and only if the person ticked the
 * box saying we may.
 * ------------------------------------------------------------------ */

const font = "Karla, sans-serif";
const serif = "Fraunces, serif";

// The wording under the stars, so a 3 doesn't feel like an accusation and
// a 5 doesn't feel like the only acceptable answer.
const SCORE_WORDS = {
  1: "Something went wrong",
  2: "Not what you hoped for",
  3: "It was fine",
  4: "Good, with a small niggle",
  5: "Exactly right",
};

function StarPicker({ value, onChange, invalid }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Your rating out of 5"
        onMouseLeave={() => setHover(0)}
        style={{ display: "inline-flex", gap: 4, padding: "6px 10px 6px 6px", borderRadius: 999, border: `1.5px solid ${invalid ? tokens.pink : "transparent"}` }}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""} — ${SCORE_WORDS[n]}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            className="fb-star"
            style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "flex", color: tokens.gold }}
          >
            <Star size={34} fill={n <= shown ? tokens.gold : "none"} color={tokens.gold} strokeWidth={n <= shown ? 0 : 1.5} />
          </button>
        ))}
      </div>
      <p style={{ fontFamily: font, fontSize: 13.5, fontWeight: 600, color: shown ? tokens.pinkDeep : tokens.inkSoft, margin: "2px 0 0", minHeight: 20 }}>
        {shown ? SCORE_WORDS[shown] : "Tap a star"}
      </p>
    </div>
  );
}

const fieldLabel = { display: "block", fontFamily: font, fontWeight: 700, fontSize: 13.5, color: tokens.ink, marginBottom: 6 };

const control = {
  width: "100%",
  fontFamily: font,
  fontSize: 16, // 16px keeps iOS from zooming the page on focus
  color: tokens.ink,
  background: tokens.paper,
  border: `1px solid ${tokens.line}`,
  borderRadius: 12,
  padding: "12px 13px",
  outline: "none",
  minHeight: 48,
};

function Field({ label, hint, error, htmlFor, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={htmlFor} style={fieldLabel}>
        {label}
      </label>
      {children}
      {error ? (
        <p style={{ fontFamily: font, fontSize: 12.5, fontWeight: 600, color: tokens.pinkDeep, margin: "6px 0 0" }}>{error}</p>
      ) : (
        hint && <p style={{ fontFamily: font, fontSize: 12.5, color: tokens.inkSoft, margin: "6px 0 0", lineHeight: 1.45 }}>{hint}</p>
      )}
    </div>
  );
}

const EMPTY = { rating: 0, name: "", area: "", phone: "", ordered: "", message: "", consent: true };

export default function FeedbackPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");
  const [sent, setSent] = useState(null);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const validate = () => {
    const e = {};
    if (!form.rating) e.rating = "Pick a rating from one to five stars.";
    if (!form.name.trim()) e.name = "A first name is enough.";
    if (form.message.trim().length < 10) e.message = "Tell us a little more — a sentence is plenty.";
    return e;
  };

  const send = async (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    setFailed("");
    try {
      await submitFeedback({
        rating: form.rating,
        name: form.name.trim(),
        area: form.area.trim(),
        phone: form.phone.trim(),
        ordered: form.ordered.trim(),
        message: form.message.trim(),
        consent: form.consent,
      });
      setSent({ name: form.name.trim(), consent: form.consent });
      setForm(EMPTY);
    } catch (err) {
      // Never throw away what they typed — leave it on screen and offer WhatsApp.
      setFailed(err.message || "That didn't go through.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background: tokens.base }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 90px" }}>
        <SectionHeading eyebrow="Feedback" title={sent ? "Thank you — *really*" : "How did we *do*?"} />

        <div className="fb-grid" style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 28, alignItems: "start" }}>
          {sent ? <ThankYou sent={sent} onAgain={() => setSent(null)} /> : (
            <form onSubmit={send} noValidate style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 20, padding: "28px 26px 30px" }}>
              <p style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.7, color: tokens.ink, margin: "0 0 26px" }}>
                If we baked for you, tell us how it went — the good and the parts we got wrong.
                I read every one of these myself, and it is how the kitchen gets better.
              </p>

              <Field label="Your rating" error={errors.rating}>
                <StarPicker value={form.rating} onChange={(rating) => set({ rating })} invalid={!!errors.rating} />
              </Field>

              <Field label="Your feedback" htmlFor="fb-message" error={errors.message} hint="What did you order, how did it arrive, how did people react?">
                <textarea
                  id="fb-message"
                  className="fb-input"
                  rows={5}
                  value={form.message}
                  onChange={(e) => set({ message: e.target.value })}
                  placeholder="The cake got here an hour before the party and the colour was exactly what we asked for…"
                  style={{ ...control, resize: "vertical", lineHeight: 1.55 }}
                />
              </Field>

              <Field label="What did we make for you?" htmlFor="fb-ordered" hint="Optional — e.g. “10” red velvet for a 60th” or “small chops for 40”.">
                <input id="fb-ordered" className="fb-input" value={form.ordered} onChange={(e) => set({ ordered: e.target.value })} style={control} />
              </Field>

              <div className="fb-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="Your name" htmlFor="fb-name" error={errors.name}>
                  <input id="fb-name" className="fb-input" autoComplete="name" value={form.name} onChange={(e) => set({ name: e.target.value })} style={control} />
                </Field>
                <Field label="Your area" htmlFor="fb-area" hint="Optional — Ayobo, Ikeja, Surulere…">
                  <input id="fb-area" className="fb-input" value={form.area} onChange={(e) => set({ area: e.target.value })} style={control} />
                </Field>
              </div>

              <Field label="Phone or WhatsApp" htmlFor="fb-phone" hint="Optional, and never shown on the website. Only so we can reply if something went wrong.">
                <input id="fb-phone" className="fb-input" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} style={control} />
              </Field>

              <label style={{ display: "flex", gap: 11, alignItems: "flex-start", cursor: "pointer", background: tokens.pinkPale, borderRadius: 14, padding: "14px 16px", margin: "4px 0 20px" }}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set({ consent: e.target.checked })}
                  style={{ accentColor: tokens.pink, width: 18, height: 18, marginTop: 2, flexShrink: 0, cursor: "pointer" }}
                />
                <span style={{ fontFamily: font, fontSize: 13.5, lineHeight: 1.55, color: tokens.ink }}>
                  <strong>You may show this on the website.</strong> Your words, your first name and your
                  area only — never your phone number. Leave it unticked and it comes straight to us instead.
                </span>
              </label>

              {failed && (
                <div style={{ background: tokens.pinkPale, color: tokens.pinkDeep, fontFamily: font, fontSize: 13.5, lineHeight: 1.55, padding: "12px 15px", borderRadius: 12, marginBottom: 16 }}>
                  {failed} Nothing you typed is lost — try again, or{" "}
                  <a href={WHATSAPP} target="_blank" rel="noreferrer" style={{ color: tokens.pinkDeep, fontWeight: 700 }}>
                    send it to us on WhatsApp
                  </a>
                  .
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="fb-submit"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, width: "100%", border: "none", cursor: sending ? "wait" : "pointer", background: tokens.pink, color: tokens.onDark, fontFamily: font, fontWeight: 600, fontSize: 15, padding: "15px", borderRadius: 999 }}
              >
                <Heart size={17} /> {sending ? "Sending…" : "Send feedback"}
              </button>
            </form>
          )}

          <Aside />
        </div>
      </div>
    </div>
  );
}

function ThankYou({ sent, onAgain }) {
  return (
    <div style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 20, padding: "34px 30px 32px" }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", background: tokens.pinkPale, color: tokens.pinkDeep, marginBottom: 18 }}>
        <Check size={26} />
      </span>
      <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 27, color: tokens.ink, margin: "0 0 12px", lineHeight: 1.25 }}>
        Got it, {sent.name.split(" ")[0]}.
      </h2>
      <p style={{ fontFamily: serif, fontSize: 16.5, lineHeight: 1.75, color: tokens.inkSoft, margin: "0 0 14px" }}>
        {sent.consent
          ? "This has come straight through to us. If we put it on the website you will see it under “What people say” — your words and your first name, nothing else."
          : "This has come straight through to us and stays between us. Thank you for taking the time."}
      </p>
      <p style={{ fontFamily: serif, fontSize: 16.5, lineHeight: 1.75, color: tokens.inkSoft, margin: "0 0 26px" }}>
        If something went wrong and you left a number, expect to hear from us.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a href="#/shop" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.pink, color: tokens.onDark, fontFamily: font, fontWeight: 600, fontSize: 14.5, padding: "13px 24px", borderRadius: 999, textDecoration: "none" }}>
          Back to the shop <ArrowRight size={15} />
        </a>
        <button
          type="button"
          onClick={onAgain}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.paper, color: tokens.ink, border: `1px solid ${tokens.line}`, fontFamily: font, fontWeight: 600, fontSize: 14.5, padding: "13px 24px", borderRadius: 999, cursor: "pointer" }}
        >
          Leave another one
        </button>
      </div>
    </div>
  );
}

function Aside() {
  return (
    <aside style={{ display: "grid", gap: 16 }}>
      <div style={{ background: tokens.dark, borderRadius: 20, padding: "26px 24px" }}>
        <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 21, color: tokens.onDark, margin: "0 0 10px" }}>Rather just tell us?</h3>
        <p style={{ fontFamily: font, fontSize: 13.5, lineHeight: 1.65, color: tokens.onDarkSoft, margin: "0 0 20px" }}>
          A message or a phone call reaches us just as well as the form — especially if something needs fixing today.
        </p>
        <div style={{ display: "grid", gap: 10 }}>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#25A244", color: "#fff", fontFamily: font, fontWeight: 600, fontSize: 14, padding: "13px 20px", borderRadius: 999, textDecoration: "none", justifyContent: "center" }}>
            <MessageCircle size={16} /> WhatsApp us
          </a>
          <a href={PHONE_HREF} style={{ display: "inline-flex", alignItems: "center", gap: 9, border: "1px solid rgba(251,239,243,0.35)", color: tokens.onDark, fontFamily: font, fontWeight: 600, fontSize: 14, padding: "13px 20px", borderRadius: 999, textDecoration: "none", justifyContent: "center" }}>
            <Phone size={15} /> {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 20, padding: "24px 24px 22px" }}>
        <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: 19, color: tokens.ink, margin: "0 0 14px" }}>Or come in</h3>
        <p style={{ display: "flex", gap: 10, fontFamily: font, fontSize: 13.5, lineHeight: 1.6, color: tokens.inkSoft, margin: "0 0 10px" }}>
          <MapPin size={15} color={tokens.pink} style={{ flexShrink: 0, marginTop: 2 }} /> {SHOP.address}
        </p>
        <p style={{ display: "flex", gap: 10, fontFamily: font, fontSize: 13.5, lineHeight: 1.6, color: tokens.inkSoft, margin: 0 }}>
          <Clock size={15} color={tokens.pink} style={{ flexShrink: 0, marginTop: 2 }} /> Open daily, {HOURS}
        </p>
      </div>

      <p style={{ fontFamily: font, fontSize: 12.5, lineHeight: 1.65, color: tokens.inkSoft, margin: 0, padding: "0 4px" }}>
        {BRAND.name} reads every message. We publish the critical ones too — a page of
        nothing but five stars tells you nothing.
      </p>
    </aside>
  );
}

/* A short band for the homepage: the ask, where people will actually see it. */
export function FeedbackInvite() {
  return (
    <a
      href="#/feedback"
      className="fb-invite"
      style={{ display: "inline-flex", alignItems: "center", gap: 10, background: tokens.paper, border: `1.5px solid ${tokens.pink}`, color: tokens.pinkDeep, fontFamily: font, fontWeight: 600, fontSize: 14.5, padding: "13px 24px", borderRadius: 999, textDecoration: "none" }}
    >
      <Star size={16} fill={tokens.gold} color={tokens.gold} strokeWidth={0} /> Ordered from us? Leave your feedback
    </a>
  );
}
