import React from "react";
import { tokens, img, naira, DISPLAY } from "./theme.js";
import { PH, findProduct, WHATSAPP_NUMBER, BRAND } from "./data.js";
import { PillLink } from "./shop.jsx";
import { MessageCircle, ArrowRight } from "./icons.jsx";

/* ------------------------------------------------------------------ *
 * Weddings — its own ivory world inside the pink site. Real cakes only:
 * the showpieces were cut out onto a warm ivory backdrop, the details
 * are cropped from the full-size originals (see photos/originals).
 * ------------------------------------------------------------------ */
const IVORY = "#FFF8F1";
const WINE = "#5E1233";
const GOLD = tokens.goldDeep;
const font = "Karla, sans-serif";
const serif = "Fraunces, serif";

const tastingLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello ${BRAND.name}, I'd like to book a wedding cake tasting. Our date is: `)}`;

const STEPS = [
  { n: "01", title: "Tell us about the day", text: "Your date, the venue, the colours and roughly how many guests. Send pictures of anything you love." },
  { n: "02", title: "Taste and sketch", text: "Two weeks before, you taste the flavours and approve a sketch of the design." },
  { n: "03", title: "Delivered and stacked", text: "We bring it to the venue ourselves and set it up, so nothing is left to chance." },
];

const DETAILS = [
  { photo: PH.weddingDetailGoldMonogram, caption: "Gold monograms, cut to your initials" },
  { photo: PH.weddingDetailPeony, caption: "Sugar peonies, made petal by petal" },
  { photo: PH.weddingDetailBurgundyRose, caption: "Burgundy roses and gold leaf" },
  { photo: PH.weddingDetailTopper, caption: "Toppers to match the invitation" },
];

export default function Weddings() {
  const wedding = findProduct("wedding");
  return (
    <section id="weddings" style={{ background: IVORY, padding: "96px 24px 100px", borderTop: `1px solid #F1E4D6`, borderBottom: `1px solid #F1E4D6` }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <div className="wed-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr", gap: 56, alignItems: "center" }}>
          {/* ---- the pitch ---- */}
          <div>
            <p style={{ fontFamily: font, fontWeight: 700, fontSize: 13, letterSpacing: 2.4, color: GOLD, textTransform: "uppercase", margin: "0 0 14px" }}>Wedding cakes</p>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(34px, 5vw, 60px)", lineHeight: 1.02, textTransform: "uppercase", color: WINE, margin: 0 }}>
              The cake they'll <span style={{ color: GOLD }}>remember</span>
            </h2>
            <p style={{ fontFamily: serif, fontStyle: "italic", fontSize: "clamp(18px, 1.8vw, 22px)", lineHeight: 1.5, color: tokens.ink, margin: "20px 0 26px", maxWidth: 480 }}>
              Tiered, sugar-flowered and finished with your initials in gold — designed with you, then built at the venue.
            </p>

            <ol style={{ listStyle: "none", margin: "0 0 30px", padding: 0, display: "grid", gap: 16 }}>
              {STEPS.map((s) => (
                <li key={s.n} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 14, alignItems: "start" }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 15, color: GOLD, border: `1.5px solid ${tokens.gold}`, borderRadius: "50%", width: 44, height: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{s.n}</span>
                  <span>
                    <span style={{ display: "block", fontFamily: font, fontWeight: 700, fontSize: 16, color: tokens.ink }}>{s.title}</span>
                    <span style={{ display: "block", fontFamily: font, fontSize: 14.5, color: tokens.inkSoft, lineHeight: 1.55, marginTop: 3 }}>{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <PillLink href={tastingLink} external>
                <MessageCircle size={17} /> Book a tasting
              </PillLink>
              <PillLink href="#/gallery/wedding-cakes" variant="outline" outlineColor={WINE}>
                See all wedding cakes
              </PillLink>
            </div>
            {wedding && (
              <p style={{ fontFamily: font, fontSize: 14, color: tokens.inkSoft, margin: "16px 0 0" }}>
                From <strong style={{ color: WINE }}>{naira(wedding.price)}</strong> · order at least {wedding.leadDays} days ahead
              </p>
            )}
          </div>

          {/* ---- the collage ---- */}
          <div className="wed-collage" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gridTemplateRows: "auto auto", gap: 16 }}>
            <figure style={{ gridRow: "1 / span 2", margin: 0, borderRadius: 26, overflow: "hidden", boxShadow: "0 30px 60px rgba(94,18,51,0.12)", background: "#FBEEDC" }}>
              <img src={img(PH.weddingGoldMonogramIvory, 900, 1200)} alt="Four-tier white wedding cake with pink sugar roses and a gold A&J monogram" loading="lazy" style={{ display: "block", width: "100%", height: "100%", minHeight: 420, objectFit: "cover" }} />
            </figure>
            <figure style={{ margin: 0, borderRadius: 22, overflow: "hidden", background: "#FBEEDC" }}>
              <img src={img(PH.weddingVenueWhiteRoses, 700, 800)} alt="Five-tier wedding cake set among white roses at the venue" loading="lazy" style={{ display: "block", width: "100%", aspectRatio: "7/8", objectFit: "cover" }} />
            </figure>
            <figure style={{ margin: 0, borderRadius: 22, overflow: "hidden", background: "#FBEEDC" }}>
              <img src={img(PH.weddingBurgundyRosesIvory, 700, 800)} alt="Three-tier wedding cake with burgundy roses and a gold J&V monogram" loading="lazy" style={{ display: "block", width: "100%", aspectRatio: "7/8", objectFit: "cover" }} />
            </figure>
          </div>
        </div>

        {/* ---- the details ---- */}
        <div style={{ marginTop: 72 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
            <h3 style={{ fontFamily: serif, fontWeight: 500, fontSize: "clamp(24px, 2.6vw, 32px)", color: tokens.ink, margin: 0 }}>
              It's all in the <span style={{ fontStyle: "italic", color: GOLD }}>details</span>
            </h3>
            <a href="#/gallery/wedding-cakes" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: font, fontWeight: 700, fontSize: 14.5, color: WINE, textDecoration: "none", borderBottom: `2px solid ${tokens.gold}`, paddingBottom: 3 }}>
              The full wedding gallery <ArrowRight size={15} />
            </a>
          </div>
          <div className="wed-details" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {DETAILS.map((d) => (
              <figure key={d.caption} style={{ margin: 0 }}>
                <div style={{ borderRadius: 20, overflow: "hidden", background: "#FBEEDC" }}>
                  <img src={img(d.photo, 600, 700)} alt={d.caption} loading="lazy" className="wed-detail-img" style={{ display: "block", width: "100%", aspectRatio: "6/7", objectFit: "cover" }} />
                </div>
                <figcaption style={{ fontFamily: font, fontSize: 14, color: tokens.inkSoft, margin: "10px 4px 0", lineHeight: 1.45 }}>{d.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
