import React, { useState, useEffect } from "react";
import { tokens } from "./theme.js";
import { ShopProvider, Header, Footer, CartDrawer, GLOBAL_CSS } from "./shop.jsx";
import LandingPage from "./landingpage.jsx";
import Catalog from "./catalog.jsx";
import ProductPage from "./product.jsx";
import { RecipesHub, RecipePage } from "./recipes.jsx";
import About from "./about.jsx";
import FeedbackPage from "./feedback.jsx";
import AdminApp from "./admin/AdminApp.jsx";
import { GalleryIndex, GalleryPage } from "./gallery.jsx";

/* Hash routing, no dependency. Routes start with a slash; anything else is
 * treated as a landing-page anchor so #cakes and #visit still work.
 *   #/shop, #/shop?q=zobo, #/shop?occasion=sallah, #/shop?category=Meals
 *   #/p/<product>          #/recipes        #/recipes/<recipe>
 *   #/about                #/gallery, #/gallery/<collection>
 *   #/feedback             the customer feedback form
 *   #cakes, #visit, …      landing-page sections
 *   #/admin/…              the shop owner's panel (see admin/AdminApp.jsx)
 */
const readHash = () => window.location.hash.replace(/^#/, "");

function useHashRoute() {
  const [hash, setHash] = useState(readHash);
  useEffect(() => {
    const onChange = () => setHash(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function renderRoute(path, params) {
  const seg = path.split("/").filter(Boolean); // "/p/wedding" -> ["p","wedding"]

  if (seg[0] === "shop") {
    return <Catalog initialQuery={params.get("q") || ""} initialOccasion={params.get("occasion") || ""} initialCategory={params.get("category") || ""} />;
  }
  if (seg[0] === "p" && seg[1]) return <ProductPage id={seg[1]} />;
  if (seg[0] === "recipes") return seg[1] ? <RecipePage id={seg[1]} /> : <RecipesHub />;
  if (seg[0] === "about") return <About />;
  if (seg[0] === "feedback") return <FeedbackPage />;
  if (seg[0] === "gallery") return seg[1] ? <GalleryPage id={seg[1]} key={seg[1]} /> : <GalleryIndex />;
  return <LandingPage />;
}

export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const hash = useHashRoute();
  const [path, qs] = hash.split("?");
  const params = new URLSearchParams(qs || "");

  useEffect(() => {
    const html = document.documentElement;
    const isSection = path && !path.startsWith("/");
    if (isSection) {
      const el = document.getElementById(path);
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return () => clearTimeout(t);
      }
      return;
    }
    // moving between pages should land at the top, not animate the whole way
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }, [hash, path]);

  // The admin panel has its own frame — no shop header, footer or cart.
  if (path.startsWith("/admin")) return <AdminApp path={path.split("/").filter(Boolean).slice(1)} />;

  return (
    <ShopProvider>
      <div style={{ background: tokens.base, minHeight: "100vh" }}>
        <Header />
        {renderRoute(path, params)}
        <Footer />
        <CartDrawer />
      </div>
    </ShopProvider>
  );
}
