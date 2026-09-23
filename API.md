# Annie Cakes & Chops — backend API

Everything the React site and admin panel expect from the Rust server.
The front end's only network code is `src/api.js`; each function there maps
to one endpoint below.

## Connecting

Create `.env` in the project root (see `.env.example`):

```
VITE_API_URL=http://localhost:8080
```

Restart `npm run dev`. The "Preview mode" banner disappears and every call
goes to the server. Without it, the site answers from localStorage.

All requests from the admin panel are sent with `credentials: "include"`, so
the server must:

- set the session as an `HttpOnly; Secure; SameSite=Lax` cookie on login
- if the API is on a different origin, send `Access-Control-Allow-Origin: <site origin>`
  (not `*`) and `Access-Control-Allow-Credentials: true`
- answer errors as JSON `{ "error": "Message the admin can read" }` — the text
  is shown to the admin as-is, so write it in plain English
- answer `401` when the session is missing or expired (the panel shows the login page)

Prices are whole naira as integers (`25000`, not `"₦25,000"` or kobo).

---

## Shapes

### Product

```jsonc
{
  "id": "partyjollof",          // URL slug, unique. The admin panel generates it from the title on create.
  "title": "Party Jollof Tray",
  "category": "Meals",          // one of: Cakes, Small Chops, Snacks, Meals, Drinks
  "desc": "Smoky, firewood-style jollof…",
  "price": 55000,
  "compareAt": 60000,           // optional — the old price, shown struck through
  "unit": "per cooler",         // optional — empty for cakes (sized 6"/8"/10" on the site)
  "photo": "https://…/jollof.jpg", // URL from POST /api/admin/uploads (or a /images/… path)
  "ratio": "4/5",               // tile shape on the homepage; "1/1" is fine for new products
  "tags": ["Rice", "Dairy-free"],
  "occasions": ["birthday", "wedding"],
  "leadDays": 1,                // days of notice needed; 0 = same day
  "sameDay": false,             // always leadDays === 0
  "personalisable": false,      // cakes only
  "featured": true,
  "soldOut": false,             // shown, but can't be ordered
  "hidden": false               // never sent to customers
}
```

### Settings

```jsonc
{
  "announcement": "Order before 2pm for same-day delivery in Lagos", // "" hides the bar
  "phoneDisplay": "0810 487 0450",
  "whatsappNumber": "2348104870450",  // digits only, starts with 234
  "instagram": "ceoanniecakes",       // no @
  "tiktok": "anniecakes",
  "address": "3 Omotayo Kuye Street, Ayobo, Ipaja, Lagos",
  "landmark": "Call when you turn into the street…",
  "openHour": 8,                      // 0–23
  "closeHour": 21
}
```

### Order

```jsonc
{
  "id": "AC-MU1BUGWF",                 // server-generated; shown to the customer in the WhatsApp message
  "status": "new",                     // new | confirmed | baking | out | delivered | cancelled
  "createdAt": "2026-09-14T14:17:23.727Z",
  "customer": { "name": "Ada", "phone": "08031234567", "address": "" }, // address "" = collecting
  "items": [
    {
      "id": "puffpuff",
      "title": "Puff Puff",
      "qty": 1,
      "price": 2500,                   // per unit, after cake-size multiplier
      "options": { "Unit": "per dozen", "Needed by": "Monday 14 September" } // free-form labels
    }
  ],
  "total": 2500
}
```

### Feedback

Left by a customer at `#/feedback`, read by the shop at `#/admin/feedback`.

```jsonc
{
  "id": "FB-MU1BUGWF",                 // server-generated
  "status": "new",                     // new | read | published | hidden
  "createdAt": "2026-09-16T14:17:23.727Z",
  "rating": 5,                         // 1–5, required
  "name": "Bisi O.",                   // required
  "area": "Ayobo",                     // optional
  "phone": "08031234567",              // optional. NEVER returned by a public endpoint
  "ordered": "8\" red velvet for a 60th", // optional, free text
  "message": "It arrived an hour early…",  // required
  "consent": true                      // "you may show this on the website"
}
```

**`consent: false` must never be publishable.** `PATCH …/feedback/:id` with
`{ "status": "published" }` on an entry whose `consent` is `false` has to be
refused with `403` — the admin panel hides the button, but the promise is made
to the customer on the form, so the server is where it has to be kept.
`src/api.js` refuses it in preview mode too, so the behaviour matches.

**`GET /api/site` must not leak `phone`.** Send published feedback as
`{ name, area, rating, message, createdAt, photo }` and nothing else. People
leave a number so the shop can apologise privately, not so it appears on a
homepage.

---

**Don't trust the prices in a submitted order.** Re-price each item from
the products table on the server (cake sizes multiply the base price by
1, 1.45 and 1.95, rounded to the nearest ₦100) before storing it or taking
payment.

---

## Public endpoints (no login)

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/api/site` | – | `{ products: Product[], settings: Settings, reviews: PublicReview[] }` — **exclude `hidden` products** |
| POST | `/api/orders` | `{ customer, items, total }` | the stored `Order` (with `id`, `status: "new"`, `createdAt`) |
| POST | `/api/feedback` | `{ rating, name, area, phone, ordered, message, consent }` | the stored `Feedback` (`status: "new"`) |

`reviews` is the published feedback, newest first, each one
`{ name, area, rating, message, createdAt, photo }`. The site falls back to
placeholder testimonials while the list is empty, and says so in the footer.

`POST /api/orders` and `POST /api/feedback` should both be rate-limited (e.g.
per IP) since anyone can call them. Cap `message` at a few thousand characters
and treat every field as untrusted text — it ends up on a public page.

## Admin endpoints (session cookie required)

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/api/admin/login` | `{ email, password }` | `{ email, name }` + sets cookie. `401` with `{ error }` on bad credentials |
| POST | `/api/admin/logout` | – | `204` |
| GET | `/api/admin/me` | – | `{ email, name }` or `401` |
| GET | `/api/admin/products` | – | `Product[]` — **including hidden ones** |
| POST | `/api/admin/products` | `Product` | the created `Product`. `409` if the id exists |
| PUT | `/api/admin/products/:id` | `Product` | the updated `Product` |
| DELETE | `/api/admin/products/:id` | – | `204` |
| POST | `/api/admin/uploads` | `multipart/form-data`, field `file` | `{ url }` — resize to ~1600px max side, store in R2/S3 |
| GET | `/api/admin/orders` | – | `Order[]`, newest first |
| PATCH | `/api/admin/orders/:id` | `{ status }` | the updated `Order` |
| GET | `/api/admin/feedback` | – | `Feedback[]`, newest first, **including `phone`** |
| PATCH | `/api/admin/feedback/:id` | `{ status }` | the updated `Feedback`. `403` if publishing without `consent` |
| DELETE | `/api/admin/feedback/:id` | – | `204` |
| GET | `/api/admin/settings` | – | `Settings` |
| PUT | `/api/admin/settings` | `Settings` | the saved `Settings` |

## Suggested Rust stack

- **axum** + **tokio** for the server, **tower-http** for CORS and body limits
- **sqlx** with Postgres (or SQLite to start)
- **argon2** for password hashes; **tower-sessions** (or a signed cookie) for sessions
- **aws-sdk-s3** (works with Cloudflare R2) + the **image** crate for uploads
- Create the first admin account with a small CLI command rather than a public sign-up route

## Seeding

The current menu lives in `src/seed.js`. Run

```
npm run export-seed
```

to write it to `seed.json` as `{ products, settings }`, then load that file into
the database once.
