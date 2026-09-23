// Building blocks for the admin panel. Everything here is sized for a
// thumb as much as a mouse — the person running the shop will mostly be
// on a phone, between orders.
import React, { createContext, useCallback, useContext, useState } from "react";
import { tokens } from "../theme.js";
import { Check, X } from "../icons.jsx";

export const font = "Karla, sans-serif";
export const serif = "Fraunces, serif";

export const ADMIN_CSS = `
  .adm-btn { transition: filter .15s ease, background .15s ease; }
  .adm-btn:hover:not(:disabled) { filter: brightness(0.96); }
  .adm-btn:disabled { opacity: .55; cursor: not-allowed; }
  .adm-nav:hover { background: ${tokens.pinkPale}; }
  .adm-input:focus { border-color: ${tokens.pink} !important; box-shadow: 0 0 0 3px ${tokens.pinkLight}; }
  .adm-row:hover { background: #FFFBFC; }

  @media (max-width: 860px) {
    .adm-shell { grid-template-columns: 1fr !important; }
    .adm-side { display: none !important; }
    .adm-tabs { display: grid !important; }
    .adm-main { padding: 20px 16px 110px !important; }
    .adm-two { grid-template-columns: 1fr !important; }
    .adm-stats { grid-template-columns: repeat(2, 1fr) !important; }
    /* six tabs on a narrow phone: trim the labels rather than wrap them */
    .adm-tabs a, .adm-tabs button { font-size: 10.5px !important; padding-left: 0 !important; padding-right: 0 !important; }
    .adm-editor { grid-template-columns: 1fr !important; }
    .adm-savebar { left: 0 !important; bottom: 64px !important; }
    .adm-prow { grid-template-columns: 56px 1fr auto !important; }
    .adm-prow-switches { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start !important; }
    .adm-prow > :last-child { grid-column: 3; grid-row: 1; }
  }
`;

/* ---- toasts ---------------------------------------------------------- */

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const show = useCallback((message, tone = "ok") => {
    const id = Date.now();
    setToast({ id, message, tone });
    setTimeout(() => setToast((t) => (t && t.id === id ? null : t)), 2800);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast && (
        <div role="status" style={{ position: "fixed", left: "50%", bottom: 88, transform: "translateX(-50%)", zIndex: 400, display: "flex", alignItems: "center", gap: 9, background: toast.tone === "error" ? tokens.pinkDeep : tokens.dark, color: tokens.onDark, fontFamily: font, fontWeight: 600, fontSize: 14, padding: "12px 18px", borderRadius: 999, boxShadow: "0 14px 34px rgba(43,20,32,0.3)", maxWidth: "calc(100vw - 32px)" }}>
          {toast.tone === "error" ? <X size={16} /> : <Check size={16} />}
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

/* ---- layout pieces --------------------------------------------------- */

export function PageTitle({ title, sub, action, back }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
      <div>
        {back}
        <h1 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(26px, 3vw, 32px)", color: tokens.ink, margin: 0 }}>{title}</h1>
        {sub && <p style={{ fontFamily: font, fontSize: 14.5, color: tokens.inkSoft, margin: "6px 0 0" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ title, hint, children, style }) {
  return (
    <section style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 16, padding: "20px 20px 22px", ...style }}>
      {title && <h2 style={{ fontFamily: font, fontWeight: 700, fontSize: 15.5, color: tokens.ink, margin: "0 0 4px" }}>{title}</h2>}
      {hint && <p style={{ fontFamily: font, fontSize: 13, color: tokens.inkSoft, margin: "0 0 16px", lineHeight: 1.5 }}>{hint}</p>}
      {!hint && title && <div style={{ height: 12 }} />}
      {children}
    </section>
  );
}

export function Notice({ children, tone = "gold" }) {
  const c = tone === "gold" ? { bg: tokens.goldLight, fg: tokens.goldDeep } : { bg: tokens.pinkPale, fg: tokens.pinkDeep };
  return <div style={{ background: c.bg, color: c.fg, fontFamily: font, fontSize: 13.5, lineHeight: 1.5, padding: "11px 14px", borderRadius: 12 }}>{children}</div>;
}

export function Empty({ title, children }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 20px", background: tokens.paper, border: `1px dashed ${tokens.line}`, borderRadius: 16 }}>
      <p style={{ fontFamily: serif, fontSize: 20, color: tokens.ink, margin: "0 0 6px" }}>{title}</p>
      <p style={{ fontFamily: font, fontSize: 14, color: tokens.inkSoft, margin: 0, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

/* ---- controls -------------------------------------------------------- */

export function Button({ children, variant = "primary", as = "button", style, ...rest }) {
  const looks = {
    primary: { background: tokens.pink, color: tokens.onDark, border: `1px solid ${tokens.pink}` },
    secondary: { background: tokens.paper, color: tokens.ink, border: `1px solid ${tokens.line}` },
    danger: { background: tokens.paper, color: tokens.pinkDeep, border: `1px solid ${tokens.pinkLight}` },
    dangerSolid: { background: tokens.pinkDeep, color: tokens.onDark, border: `1px solid ${tokens.pinkDeep}` },
  };
  const Tag = as;
  return (
    <Tag
      className="adm-btn"
      type={as === "button" ? rest.type || "button" : undefined}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: font, fontWeight: 600, fontSize: 14.5, padding: "12px 18px", minHeight: 46, borderRadius: 999, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", ...looks[variant], ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Field({ label, hint, error, children, htmlFor }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={htmlFor} style={{ display: "block", fontFamily: font, fontWeight: 700, fontSize: 13.5, color: tokens.ink, marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {error ? (
        <p style={{ fontFamily: font, fontSize: 12.5, color: tokens.pinkDeep, margin: "6px 0 0", fontWeight: 600 }}>{error}</p>
      ) : (
        hint && <p style={{ fontFamily: font, fontSize: 12.5, color: tokens.inkSoft, margin: "6px 0 0", lineHeight: 1.45 }}>{hint}</p>
      )}
    </div>
  );
}

export const inputStyle = {
  width: "100%",
  fontFamily: font,
  fontSize: 16, // 16px stops iOS zooming in on focus
  color: tokens.ink,
  background: tokens.paper,
  border: `1px solid ${tokens.line}`,
  borderRadius: 12,
  padding: "12px 13px",
  outline: "none",
  minHeight: 48,
};

export const Input = React.forwardRef(function Input(props, ref) {
  return <input ref={ref} className="adm-input" {...props} style={{ ...inputStyle, ...props.style }} />;
});

export function TextArea(props) {
  return <textarea className="adm-input" rows={4} {...props} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5, ...props.style }} />;
}

export function Select({ children, ...props }) {
  return (
    <select className="adm-input" {...props} style={{ ...inputStyle, cursor: "pointer", ...props.style }}>
      {children}
    </select>
  );
}

// A labelled on/off switch. The whole row is the tap target.
export function Toggle({ checked, onChange, label, hint, compact = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, width: compact ? "auto" : "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: compact ? "4px 0" : "10px 0" }}
    >
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontFamily: font, fontWeight: compact ? 600 : 700, fontSize: compact ? 13 : 14, color: tokens.ink }}>{label}</span>
        {hint && <span style={{ display: "block", fontFamily: font, fontSize: 12.5, color: tokens.inkSoft, marginTop: 2, lineHeight: 1.4 }}>{hint}</span>}
      </span>
      <span aria-hidden="true" style={{ flexShrink: 0, position: "relative", width: 44, height: 26, borderRadius: 999, background: checked ? tokens.pink : "#E3D3DA", transition: "background .15s ease" }}>
        <span style={{ position: "absolute", top: 3, left: checked ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left .15s ease" }} />
      </span>
    </button>
  );
}

// Tap-to-select chips for tags and occasions.
export function Chips({ options, selected, onToggle }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const value = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const on = selected.includes(value);
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(value)}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: font, fontWeight: 600, fontSize: 13.5, padding: "9px 14px", borderRadius: 999, cursor: "pointer", background: on ? tokens.pinkPale : tokens.paper, color: on ? tokens.pinkDeep : tokens.ink, border: `1.5px solid ${on ? tokens.pink : tokens.line}` }}
          >
            {on && <Check size={14} />}
            {label}
          </button>
        );
      })}
    </div>
  );
}
