import React, { useEffect, useRef, useState } from "react";
import { tokens, img, DISPLAY } from "./theme.js";
import { GALLERIES, findGallery, WHATSAPP_NUMBER, INSTAGRAM, BRAND } from "./data.js";
import { ArrowRight, ChevronLeft, MessageCircle, Instagram, X } from "./icons.jsx";
import { PillLink } from "./shop.jsx";

const WINE = "#5E1233";
const font = "Karla, sans-serif";

// Services (décor, ushers) have nothing to add to a cart, so they carry
// their own WhatsApp message and skip the "Order one like this" button.
const askLink = (gallery) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello ${BRAND.name}, ${gallery.ask || `I saw your ${gallery.title.toLowerCase()} on the website and I'd like one like it.`}`)}`;

/* ------------------------------------------------------------------ *
 * Shared header band — blush, big shout, like the homepage hero.
 * ------------------------------------------------------------------ */
function Band({ crumbs, title, children }) {
  return (
    <section style={{ background: "linear-gradient(160deg, #FEF3F7 0%, #FADFE9 60%, #F4C9D8 100%)", padding: "clamp(40px, 6vw, 72px) 24px clamp(40px, 5vw, 60px)" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <nav aria-label="Breadcrumb" style={{ fontFamily: font, fontSize: 13, color: tokens.inkSoft, marginBottom: 18 }}>
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span style={{ margin: "0 7px" }}>/</span>}
              {c.href ? (
                <a href={c.href} style={{ color: tokens.inkSoft, textDecoration: "none" }}>
                  {c.label}
                </a>
              ) : (
                <span style={{ color: tokens.ink }}>{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(34px, 6vw, 68px)", lineHeight: 1.02, textTransform: "uppercase", color: tokens.ink, margin: 0 }}>{title}</h1>
        {children}
      </div>
    </section>
  );
}

function CollectionTabs({ current }) {
  return (
    <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "18px 24px 4px", maxWidth: 1268, margin: "0 auto" }}>
      {GALLERIES.map((g) => {
        const on = g.id === current;
        return (
          <a
            key={g.id}
            href={`#/gallery/${g.id}`}
            aria-current={on ? "page" : undefined}
            style={{ flexShrink: 0, fontFamily: font, fontWeight: 700, fontSize: 14, padding: "10px 16px", borderRadius: 999, textDecoration: "none", border: `1.5px solid ${on ? tokens.pink : tokens.line}`, background: on ? tokens.pink : tokens.paper, color: on ? tokens.onDark : tokens.ink }}
          >
            {g.title}
          </a>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * #/gallery — all collections
 * ------------------------------------------------------------------ */
export function GalleryIndex() {
  const total = GALLERIES.reduce((n, g) => n + g.photos.length, 0);
  return (
    <div style={{ background: tokens.base }}>
      <Band crumbs={[{ label: "Home", href: "#/" }, { label: "Gallery" }]} title="Our work">
        <p style={{ fontFamily: font, fontWeight: 700, fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55, color: tokens.ink, margin: "18px 0 0", maxWidth: 560 }}>
          Real cakes and chops from real orders — {total} photos across {GALLERIES.length} collections. Pick one to see more.
        </p>
      </Band>

      <div className="gallery-index" style={{ maxWidth: 1220, margin: "0 auto", padding: "40px 24px 90px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {GALLERIES.map((g) => (
          <a key={g.id} href={`#/gallery/${g.id}`} className="gallery-card" style={{ position: "relative", display: "block", borderRadius: 24, overflow: "hidden", textDecoration: "none", boxShadow: "0 18px 40px rgba(94,18,51,0.12)" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", background: tokens.pinkLight }}>
              <img src={img(g.cover, 800, 1000)} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(43,20,32,0) 50%, rgba(43,20,32,0.78) 100%)" }} />
              <div style={{ position: "absolute", left: 20, right: 20, bottom: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 20, textTransform: "uppercase", color: "#fff", lineHeight: 1.1 }}>{g.title}</div>
                  <div style={{ fontFamily: font, fontSize: 13.5, color: "rgba(255,255,255,0.85)", marginTop: 5 }}>{g.photos.length} photos</div>
                </div>
                <span style={{ flexShrink: 0, width: 42, height: 42, borderRadius: "50%", background: "#fff", color: WINE, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <ArrowRight size={18} />
                </span>
              </div>
            </div>
          </a>
        ))}
        <a href={INSTAGRAM.href} target="_blank" rel="noreferrer" className="gallery-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: 12, borderRadius: 24, textDecoration: "none", background: tokens.pink, color: tokens.onDark, padding: 28, minHeight: 260 }}>
          <Instagram size={34} />
          <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 20, textTransform: "uppercase" }}>More on Instagram</span>
          <span style={{ fontFamily: font, fontSize: 15 }}>{INSTAGRAM.handle}</span>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * #/gallery/<id> — one collection
 * ------------------------------------------------------------------ */
export function GalleryPage({ id }) {
  const gallery = findGallery(id);
  const [open, setOpen] = useState(null); // index of the photo in the viewer

  if (!gallery) {
    return (
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "110px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: 32, color: tokens.ink, margin: "0 0 12px" }}>We can't find that collection</h1>
        <a href="#/gallery" style={{ fontFamily: font, fontWeight: 700, color: tokens.pinkDeep }}>
          See the whole gallery
        </a>
      </div>
    );
  }

  return (
    <div style={{ background: tokens.base }}>
      <Band crumbs={[{ label: "Home", href: "#/" }, { label: "Gallery", href: "#/gallery" }, { label: gallery.title }]} title={gallery.title}>
        <p style={{ fontFamily: font, fontWeight: 700, fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.55, color: tokens.ink, margin: "18px 0 26px", maxWidth: 600 }}>{gallery.blurb}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {gallery.shop && <PillLink href={gallery.shop}>Order one like this</PillLink>}
          <PillLink href={askLink(gallery)} variant="outline" outlineColor={tokens.ink} external>
            <MessageCircle size={17} /> Ask on WhatsApp
          </PillLink>
        </div>
      </Band>

      <CollectionTabs current={gallery.id} />

      <div className="gallery-masonry" style={{ maxWidth: 1220, margin: "0 auto", padding: "22px 24px 40px" }}>
        {gallery.photos.map((p, i) => (
          <figure key={p.src + i} style={{ margin: "0 0 20px", breakInside: "avoid" }}>
            <button type="button" onClick={() => setOpen(i)} className="gallery-tile" aria-label={`View larger: ${p.caption}`} style={{ display: "block", width: "100%", padding: 0, border: "none", cursor: "zoom-in", borderRadius: 18, overflow: "hidden", background: tokens.pinkLight }}>
              <img src={img(p.src, 800, 800)} alt={p.caption} loading="lazy" style={{ display: "block", width: "100%", height: "auto" }} />
            </button>
            <figcaption style={{ fontFamily: font, fontSize: 14, color: tokens.inkSoft, lineHeight: 1.45, margin: "9px 4px 0" }}>{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      <section style={{ maxWidth: 1220, margin: "0 auto", padding: "0 24px 90px" }}>
        <div style={{ background: tokens.paper, border: `1px solid ${tokens.line}`, borderRadius: 24, padding: "clamp(26px, 4vw, 40px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(22px, 3vw, 32px)", textTransform: "uppercase", color: WINE, margin: 0 }}>Want one like these?</h2>
            <p style={{ fontFamily: font, fontSize: 15.5, color: tokens.ink, margin: "8px 0 0" }}>Send us a screenshot of the one you like and your date.</p>
          </div>
          <PillLink href={askLink(gallery)} external>
            <MessageCircle size={17} /> Chat on WhatsApp
          </PillLink>
        </div>
      </section>

      {open !== null && <Viewer photos={gallery.photos} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Full-screen viewer: arrows, Escape, swipe, and focus kept inside.
 * ------------------------------------------------------------------ */
function Viewer({ photos, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const touch = useRef(null);
  const photo = photos[index];
  const go = (d) => onChange((index + d + photos.length) % photos.length);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const arrow = (side) => ({ position: "absolute", top: "50%", [side]: "clamp(8px, 2vw, 24px)", transform: "translateY(-50%)", width: 52, height: 52, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(255,255,255,0.14)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
      style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(30,12,22,0.94)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 16px 24px" }}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 14, right: 14, width: 46, height: 46, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(255,255,255,0.14)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <X size={22} />
      </button>
      <span style={{ position: "absolute", top: 26, left: 22, fontFamily: font, fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
        {index + 1} / {photos.length}
      </span>

      <img src={img(photo.src, 1600, 1600)} alt={photo.caption} style={{ maxWidth: "min(92vw, 1100px)", maxHeight: "calc(100vh - 150px)", objectFit: "contain", borderRadius: 14 }} />
      <p style={{ fontFamily: font, fontSize: 15.5, color: "#fff", textAlign: "center", margin: "14px 0 0", maxWidth: 640 }}>{photo.caption}</p>

      {photos.length > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" style={arrow("left")}>
            <ChevronLeft size={26} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" style={arrow("right")}>
            <ArrowRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Homepage strip — a way into each collection.
 * ------------------------------------------------------------------ */
// The homepage shows only collections nothing else on the page covers:
// weddings, small chops and puff puff already have sections of their own,
// and occasions has its own grid. The rest are one click away in the gallery.
const HOME_COLLECTIONS = ["birthday-cakes", "custom-cakes", "food-trays", "gifts", "event-decor"];

export function GalleryStrip() {
  const picks = HOME_COLLECTIONS.map(findGallery).filter(Boolean);
  return (
    <section id="gallery" style={{ background: tokens.base, padding: "88px 24px" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(28px, 4.6vw, 56px)", lineHeight: 1.05, textTransform: "uppercase", color: WINE, margin: 0 }}>Straight from our kitchen</h2>
          <p style={{ fontFamily: font, fontSize: 16, color: tokens.ink, margin: "14px auto 0", maxWidth: 560, lineHeight: 1.55 }}>
            Real orders, real customers. See everything we've made in each collection.
          </p>
        </div>
        <div className="pick-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {picks.map((g) => (
            <a key={g.id} href={`#/gallery/${g.id}`} className="pick-card" style={{ position: "relative", display: "block", borderRadius: 22, overflow: "hidden", textDecoration: "none", aspectRatio: "3/4", background: tokens.pinkLight }}>
              <img src={img(g.cover, 600, 800)} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(43,20,32,0) 45%, rgba(43,20,32,0.8) 100%)" }} />
              <div style={{ position: "absolute", left: 14, right: 14, bottom: 14 }}>
                <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 15.5, textTransform: "uppercase", color: "#fff", lineHeight: 1.15 }}>{g.title}</div>
                <div style={{ fontFamily: font, fontSize: 12.5, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{g.photos.length} photos</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <a href="#/gallery" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: font, fontWeight: 700, fontSize: 15, color: tokens.pinkDeep, textDecoration: "none", borderBottom: `2px solid ${tokens.gold}`, paddingBottom: 3 }}>
            See all {GALLERIES.length} collections <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
