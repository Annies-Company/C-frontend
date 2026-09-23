/* ------------------------------------------------------------------ *
 * The one place the front end talks to a backend.
 *
 * Set VITE_API_URL (e.g. in .env: VITE_API_URL=http://localhost:8080)
 * and every call below goes to the Rust API described in API.md.
 *
 * Leave it unset and the site runs in PREVIEW MODE: the same calls are
 * answered from this browser's localStorage, so the admin panel can be
 * clicked through and tested before the backend exists. Nothing saved in
 * preview mode reaches any other device.
 * ------------------------------------------------------------------ */
import { SEED_PRODUCTS, SEED_SETTINGS } from "./seed.js";
import { SITE } from "./site-store.js";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const PREVIEW_MODE = !API_URL;

// ---- real backend -----------------------------------------------------

async function http(method, path, body) {
  const isForm = body instanceof FormData;
  const res = await fetch(API_URL + path, {
    method,
    credentials: "include", // the session cookie set by POST /api/admin/login
    headers: body && !isForm ? { "Content-Type": "application/json" } : undefined,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });
  if (res.status === 401) throw new ApiError("Please log in again.", 401);
  if (!res.ok) {
    let message = `Something went wrong (${res.status}).`;
    try {
      message = (await res.json()).error || message;
    } catch {}
    throw new ApiError(message, res.status);
  }
  return res.status === 204 ? null : res.json();
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// ---- preview mode -----------------------------------------------------

const DB_KEY = "anniecakes.preview.db.v1";
const SESSION_KEY = "anniecakes.preview.session";
export const PREVIEW_LOGIN = { email: "admin@anniecakes.ng", password: "annie123" };

const clone = (v) => JSON.parse(JSON.stringify(v));

function readDb() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    // A db saved before feedback existed has no feedback table.
    if (raw) return { feedback: [], ...JSON.parse(raw) };
  } catch {}
  return { products: clone(SEED_PRODUCTS), settings: clone(SEED_SETTINGS), orders: [], feedback: [] };
}

function writeDb(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch {
    throw new ApiError("This browser is out of space for preview data. Try a smaller photo, or reset the preview data in Settings.");
  }
}

const wait = (v) => new Promise((r) => setTimeout(() => r(clone(v)), 150));

// ---- public site ------------------------------------------------------

// Called once before the app renders. Never throws: if the API is down the
// customer still gets the seed menu instead of a blank page.
export async function loadSite() {
  try {
    const site = PREVIEW_MODE ? previewSite() : await http("GET", "/api/site");
    SITE.products = site.products;
    SITE.settings = site.settings;
    SITE.reviews = site.reviews;
  } catch (err) {
    console.warn("Could not load live menu, showing the built-in one.", err);
  }
}

// Sent when a customer taps "Confirm on WhatsApp".
export async function createOrder(order) {
  if (!PREVIEW_MODE) return http("POST", "/api/orders", order);
  const db = readDb();
  const saved = { ...order, id: `AC-${Date.now().toString(36).toUpperCase()}`, status: "new", createdAt: new Date().toISOString() };
  db.orders.unshift(saved);
  writeDb(db);
  return wait(saved);
}

/* ------------------------------------------------------------------ *
 * Feedback — the form at #/feedback. Anyone can send one; nothing
 * reaches the website until it is published from #/admin/feedback.
 * ------------------------------------------------------------------ */
export async function submitFeedback(feedback) {
  if (!PREVIEW_MODE) return http("POST", "/api/feedback", feedback);
  const db = readDb();
  const saved = { ...feedback, id: `FB-${Date.now().toString(36).toUpperCase()}`, status: "new", createdAt: new Date().toISOString() };
  db.feedback.unshift(saved);
  writeDb(db);
  return wait(saved);
}

// What a customer sees: the seed menu plus whatever feedback is published.
function previewSite() {
  const db = readDb();
  return { products: db.products, settings: db.settings, reviews: publishable(db.feedback) };
}

// Only published entries, and only the fields a stranger may read —
// never the phone number someone left for a private reply.
const publishable = (feedback) =>
  (feedback || [])
    .filter((f) => f.status === "published")
    .map(({ name, area, rating, message, createdAt, photo }) => ({ name, area, rating, message, createdAt, photo: photo || null }));

// ---- admin ------------------------------------------------------------

export async function login(email, password) {
  if (!PREVIEW_MODE) return http("POST", "/api/admin/login", { email, password });
  if (email.trim().toLowerCase() !== PREVIEW_LOGIN.email || password !== PREVIEW_LOGIN.password) {
    await wait(null);
    throw new ApiError("That email and password don't match.", 401);
  }
  const user = { email: PREVIEW_LOGIN.email, name: "Annie" };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return wait(user);
}

export async function logout() {
  if (!PREVIEW_MODE) return http("POST", "/api/admin/logout");
  sessionStorage.removeItem(SESSION_KEY);
}

export async function currentUser() {
  if (!PREVIEW_MODE) {
    try {
      return await http("GET", "/api/admin/me");
    } catch (err) {
      if (err.status === 401) return null;
      throw err;
    }
  }
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export async function listProducts() {
  if (!PREVIEW_MODE) return http("GET", "/api/admin/products");
  return wait(readDb().products);
}

// Creates when the id is new, updates otherwise.
export async function saveProduct(product, { isNew }) {
  if (!PREVIEW_MODE) {
    return isNew ? http("POST", "/api/admin/products", product) : http("PUT", `/api/admin/products/${product.id}`, product);
  }
  const db = readDb();
  const at = db.products.findIndex((p) => p.id === product.id);
  if (isNew && at !== -1) throw new ApiError("Another product already uses that web address. Change the name slightly.");
  if (isNew) db.products.unshift(product);
  else db.products[at] = product;
  writeDb(db);
  return wait(product);
}

export async function deleteProduct(id) {
  if (!PREVIEW_MODE) return http("DELETE", `/api/admin/products/${id}`);
  const db = readDb();
  db.products = db.products.filter((p) => p.id !== id);
  writeDb(db);
}

// Returns the URL to store on the product. The real API should resize,
// store in R2/S3 and answer with { url }.
export async function uploadImage(file) {
  if (!PREVIEW_MODE) {
    const form = new FormData();
    form.append("file", file);
    return (await http("POST", "/api/admin/uploads", form)).url;
  }
  return shrinkToDataUrl(file, 1200, 0.82);
}

export async function listOrders() {
  if (!PREVIEW_MODE) return http("GET", "/api/admin/orders");
  return wait(readDb().orders);
}

export async function updateOrderStatus(id, status) {
  if (!PREVIEW_MODE) return http("PATCH", `/api/admin/orders/${id}`, { status });
  const db = readDb();
  const order = db.orders.find((o) => o.id === id);
  if (order) order.status = status;
  writeDb(db);
  return wait(order);
}

export async function listFeedback() {
  if (!PREVIEW_MODE) return http("GET", "/api/admin/feedback");
  return wait(readDb().feedback);
}

/* status: new | read | published | hidden
 *
 * "published" is the only one a customer ever sees. Someone who did not
 * tick the consent box can never be published — the admin panel hides
 * the button, and this refuses it even if the button is bypassed. The
 * real backend has to enforce the same rule (see API.md); the UI is not
 * the place where a promise like that is kept. */
export async function updateFeedbackStatus(id, status) {
  if (!PREVIEW_MODE) return http("PATCH", `/api/admin/feedback/${id}`, { status });
  const db = readDb();
  const entry = db.feedback.find((f) => f.id === id);
  if (!entry) throw new ApiError("That feedback is no longer here.", 404);
  if (status === "published" && !entry.consent) {
    throw new ApiError(`${entry.name} did not agree to this being shown on the website.`, 403);
  }
  entry.status = status;
  writeDb(db);
  return wait(entry);
}

export async function deleteFeedback(id) {
  if (!PREVIEW_MODE) return http("DELETE", `/api/admin/feedback/${id}`);
  const db = readDb();
  db.feedback = db.feedback.filter((f) => f.id !== id);
  writeDb(db);
}

export async function getSettings() {
  if (!PREVIEW_MODE) return http("GET", "/api/admin/settings");
  return wait({ ...SEED_SETTINGS, ...readDb().settings });
}

export async function saveSettings(settings) {
  if (!PREVIEW_MODE) return http("PUT", "/api/admin/settings", settings);
  const db = readDb();
  db.settings = settings;
  writeDb(db);
  return wait(settings);
}

export function resetPreviewData() {
  try {
    localStorage.removeItem(DB_KEY);
  } catch {}
}

// Phone photos are often 4–8 MB; scale them down before they go anywhere.
function shrinkToDataUrl(file, maxSide, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new ApiError("Couldn't read that file."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new ApiError("That file doesn't look like a photo."));
      image.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
