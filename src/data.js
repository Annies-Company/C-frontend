import { PH, SEED_PRODUCTS, SEED_SETTINGS } from "./seed.js";
import { SITE } from "./site-store.js";

export { PH };

export const CATEGORIES = ["Cakes", "Small Chops", "Snacks", "Meals", "Drinks"];
export const TYPES = ["Chocolate", "Cupcakes", "Tiered", "Custom", "Fried", "Savoury", "Baked", "Fruit", "Rice", "Soup & Swallow", "Grilled"];
export const DIETARY = ["Vegan", "Sugar-free", "Gluten-free", "Dairy-free"];

/* ------------------------------------------------------------------ *
 * Occasions — people don't shop for "a tiered cake", they shop for
 * "my mum's 60th on Saturday". Each product lists which of these it
 * suits, and the admin form ticks them.
 * ------------------------------------------------------------------ */
export const OCCASIONS = [
  { id: "birthday", label: "Birthday", photo: PH.butterflyCakePink, blurb: "Candles, sprinkles, and a name piped across the top." },
  { id: "wedding", label: "Wedding", photo: PH.weddingFiveTier, blurb: "Tasting two weeks ahead, then delivered and stacked on site." },
  { id: "naming", label: "Naming Ceremony", photo: PH.cakeParfaitCups, blurb: "Soft pastels and enough trays for the whole compound." },
  { id: "graduation", label: "Graduation", photo: PH.sprinkleCake, blurb: "School colours, cap toppers, collected the same morning." },
  { id: "sallah", label: "Sallah", photo: PH.ricePacksRack, blurb: "Packs of jollof, trays of small chops, and cold zobo for everyone who stops by." },
  { id: "anniversary", label: "Anniversary", photo: PH.weddingBurgundyRoses, blurb: "Two tiers, gold leaf, and a message only they will understand." },
];

// Whatever the admin has saved wins; the seed is only the fallback.
const SETTINGS = { ...SEED_SETTINGS, ...(SITE.settings || {}) };
export const ALL_PRODUCTS = SITE.products || SEED_PRODUCTS;
// Hidden items stay in the admin list but never reach a customer.
export const PRODUCTS = ALL_PRODUCTS.filter((p) => !p.hidden);

export const byCategory = (c) => PRODUCTS.filter((p) => p.category === c);
export const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

// Cake tiers priced off the base. Snacks, meals and drinks sell by the unit, so
// they skip this and just take a quantity.
export const CAKE_SIZES = [
  { id: "6in", label: '6" round', serves: "serves 8–10", mult: 1 },
  { id: "8in", label: '8" round', serves: "serves 15–20", mult: 1.45 },
  { id: "10in", label: '10" round', serves: "serves 25–30", mult: 1.95 },
];

export const FLAVOURS = ["Vanilla bean", "Chocolate fudge", "Red velvet", "Carrot & spice", "Lemon"];

// Meals get a pepper choice instead of a size — the kitchen cooks to the
// middle one unless told otherwise.
export const SPICE_LEVELS = [
  { id: "mild", label: "Mild", note: "for the children" },
  { id: "medium", label: "Medium", note: "how we cook it" },
  { id: "hot", label: "Naija hot", note: "extra scotch bonnet" },
];


export const SHOP = {
  address: SETTINGS.address,
  landmark: SETTINGS.landmark,
  // Approximate centre of Ayobo — the map card is only a locator. The
  // "Get directions" button searches the full address, so that part is exact.
  // Nudge these two numbers if you want the pin exactly on the gate.
  lat: 6.6146,
  lon: 3.2502,
  openHour: SETTINGS.openHour,
  closeHour: SETTINGS.closeHour,
  directions: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SETTINGS.address)}`,
};

export const ANNOUNCEMENT = SETTINGS.announcement;

export const fmtHour = (h) => (h === 0 ? "12am" : h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`);
export const HOURS = `${fmtHour(SHOP.openHour)} – ${fmtHour(SHOP.closeHour)}`;

/* ------------------------------------------------------------------ *
 * Reviews. Feedback left at #/feedback and then published from
 * #/admin/feedback becomes the reviews on the homepage. Until the first
 * one is published these placeholders stand in, and the footer says so.
 * ------------------------------------------------------------------ */

// "3 days ago", "last week" — a review dated to the hour reads like a receipt.
export const relativeWhen = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (!Number.isFinite(days)) return "recently";
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "last week";
  if (days < 60) return `${Math.round(days / 7)} weeks ago`;
  return `${Math.round(days / 30)} months ago`;
};

const PLACEHOLDER_REVIEWS = [
  { name: "Adaeze O.", area: "Egbeda", rating: 5, when: "2 weeks ago", text: "Ordered the 10\" for my mum's 60th and it arrived exactly when they said, no chasing. The inscription was spelled right, which honestly surprised me.", photo: PH.coneCake },
  { name: "Ibrahim K.", area: "Ipaja", rating: 5, when: "1 month ago", pull: "Still warm when it got here", text: "Small chops for 40 people at a naming ceremony. Still warm when it got here and there was nothing left by 3pm.", photo: PH.smallChops },
  { name: "Chinelo A.", area: "Ayobo", rating: 4, when: "1 month ago", text: "I walk past the shop most mornings. The puff puff is the reason I am late for work twice a week." },
  { name: "Tolu B.", area: "Ikeja GRA", rating: 5, when: "2 months ago", text: "They called to confirm the shade of pink before baking. That one phone call is why I keep coming back.", photo: PH.macaronCake },
  { name: "Emeka N.", area: "Alimosho", rating: 5, when: "2 months ago", text: "The zobo is properly tart, not sugar water. Order it by the bottle." },
  { name: "Funmi A.", area: "Ikotun", rating: 4, when: "3 months ago", text: "Wedding cake was tasted, adjusted, then delivered and stacked on site without any drama on the day." },
];

// Newest first, and only what the API chose to publish.
const PUBLISHED_REVIEWS = (SITE.reviews || []).map((r) => ({
  name: r.name,
  area: r.area || "Lagos",
  rating: r.rating,
  when: relativeWhen(r.createdAt),
  text: r.message,
  photo: r.photo || null,
}));

// True once real customer feedback is on the page. The footer caveat and
// the wording under the score both read this.
export const REVIEWS_ARE_REAL = PUBLISHED_REVIEWS.length > 0;
export const REVIEWS = REVIEWS_ARE_REAL ? PUBLISHED_REVIEWS : PLACEHOLDER_REVIEWS;

// The one-liner beside the stars in the hero. Placeholders nominate their
// own; a real review is trimmed to its first sentence so the shout stays short.
const firstSentence = (text = "") => {
  const cut = text.split(/(?<=[.!?])\s/)[0] || text;
  return cut.length > 74 ? cut.slice(0, 71).trimEnd() + "…" : cut;
};
// Only real, published feedback is ever quoted or scored. Until the first
// review is published these are null and every place that shows them hides.
export const PULL_QUOTE = (() => {
  if (!REVIEWS_ARE_REAL) return null;
  const picked = REVIEWS.find((r) => r.pull) || [...REVIEWS].sort((a, b) => a.text.length - b.text.length)[0];
  return picked ? { text: picked.pull || firstSentence(picked.text), name: picked.name, rating: picked.rating } : null;
})();

const average = (list) => list.reduce((n, r) => n + (Number(r.rating) || 0), 0) / list.length;

export const RATING = REVIEWS_ARE_REAL
  ? { score: average(PUBLISHED_REVIEWS).toFixed(1), count: String(PUBLISHED_REVIEWS.length), basis: PUBLISHED_REVIEWS.length === 1 ? "review" : "reviews" }
  : null;

export const BAKERS = [
  // Captioned by role, not by name — these are stock stand-ins, and putting
  // invented names on photographs of real people would be a lie on the page.
  // Drop in the team's own portraits and names here.
  { role: "Head Baker", note: "Plating the morning's first orders", photo: PH.headBaker },
  { role: "Pastry Chef", note: "Finishing and glazing", photo: PH.pastryChef },
  { role: "Kitchen Lead", note: "Tasting before it leaves", photo: PH.kitchenCook },
  { role: "The Morning Line", note: "Every day from 6am", photo: PH.spongeTiers },
];

export const DIETARY_NOTES = [
  { title: "Sugar-Free Cakes", desc: "Sweetened with dates and monk fruit, no compromise on the crumb." },
  { title: "Gluten-Free Snacks", desc: "Chin chin and doughnuts made with rice and almond flour blends." },
  { title: "Vegan Bakes", desc: "Plant-based butter and egg replacers, taste-tested against the originals." },
];

export const RECIPE_CATEGORIES = ["Cakes", "Frostings", "Snacks", "Drinks", "Tutorials", "Troubleshooting"];

export const RECIPES = [
  {
    id: "stacking",
    tag: "Tutorial",
    category: "Tutorials",
    title: "Levelling and Stacking a Tiered Cake",
    desc: "Dowels, cake boards and the exact order everything goes on. The one post every home baker asks us for.",
    time: "15 min read",
    level: "Intermediate",
    yields: "One 3-tier cake",
    photo: PH.mousseCake,
    featured: true,
    ingredients: [
      { group: "You will need", items: ["3 baked and chilled tiers (10\", 8\", 6\")", "3 cake boards, cut to match each tier", "Wooden dowels or thick straws", "A long serrated knife", "Offset palette knife", "Buttercream, at room temperature"] },
    ],
    steps: [
      "Chill every tier for at least two hours. A cold crumb cuts clean; a warm one tears.",
      "Level each tier with the serrated knife held flat against the work surface — let the blade find the horizon rather than eyeballing from above.",
      "Crumb coat each tier on its own board, then chill again for 20 minutes until the coat is dry to a light touch.",
      "Push dowels into the bottom tier where the next tier will sit, mark them at cake height, pull them out and cut them all to the shortest mark.",
      "Reinsert the dowels, spread a thin smear of buttercream over them, then lower the next tier down by its board.",
      "Repeat upward, then run a final coat around the seams so the joins disappear.",
    ],
    tips: ["If the tiers lean, one dowel is longer than the rest — pull them and re-cut to the shortest.", "Transport tiers separately and stack on site whenever the drive is longer than 20 minutes."],
  },
  {
    id: "buttercream",
    tag: "Tutorial",
    category: "Frostings",
    title: "Smooth Buttercream, No Air Bubbles",
    desc: "The piping-bag technique we teach every new baker on staff.",
    time: "12 min read",
    level: "Beginner",
    yields: "Enough for one 8\" cake",
    photo: PH.tealCupcakes,
    ingredients: [
      { group: "Buttercream", items: ["250g unsalted butter, properly softened", "450g icing sugar, sifted twice", "3 tbsp full-cream milk", "1 tsp vanilla extract", "A pinch of salt"] },
    ],
    steps: [
      "Beat the butter alone for a full five minutes, until it is visibly paler. This is the step everyone cuts short.",
      "Add the sifted sugar in three additions on the lowest speed. Going fast whips air in, and air is what you are trying to avoid.",
      "Add milk, vanilla and salt, then beat on low for two more minutes.",
      "Switch to a paddle and press the buttercream against the bowl for a minute to push out trapped air.",
      "Load the piping bag in small amounts and tap it down hard on the counter before twisting the top.",
    ],
    tips: ["Softened means it dents under a finger, not that it slumps. Melted butter will never come back.", "If it splits, it is too cold — warm a few spoonfuls and beat them back in."],
  },
  {
    id: "vanilla",
    tag: "Recipe",
    category: "Cakes",
    title: "Classic Vanilla Bean Layer Cake",
    desc: "Our house recipe — moist enough to eat without frosting.",
    time: "45 min bake",
    level: "Beginner",
    yields: "Two 8\" layers",
    photo: PH.cakeSlice,
    ingredients: [
      { group: "Cake", items: ["340g plain flour", "2½ tsp baking powder", "½ tsp salt", "225g unsalted butter, softened", "350g caster sugar", "4 large eggs, at room temperature", "1 vanilla pod, seeds scraped", "240ml buttermilk"] },
    ],
    steps: [
      "Heat the oven to 175°C and line two 8\" tins.",
      "Whisk the flour, baking powder and salt together and set aside.",
      "Cream the butter and sugar for four minutes until light, then add the eggs one at a time.",
      "Add the vanilla seeds, then alternate the flour mixture and buttermilk in three additions, starting and ending with flour.",
      "Divide between the tins and bake 32–36 minutes, until a skewer comes out with a couple of moist crumbs.",
      "Cool in the tin for 10 minutes, then turn out onto a rack.",
    ],
    tips: ["Room-temperature eggs emulsify; cold eggs curdle the batter and you lose the crumb.", "Rest the batter 10 minutes before it goes in — the flour hydrates and bakes evener."],
  },
  {
    id: "chocolate",
    tag: "Recipe",
    category: "Cakes",
    title: "Everyday Chocolate Cake",
    desc: "One bowl, no mixer, and better the next day.",
    time: "40 min bake",
    level: "Beginner",
    yields: "Two 8\" layers",
    photo: PH.dripCake,
    ingredients: [
      { group: "Cake", items: ["250g plain flour", "75g cocoa powder", "400g caster sugar", "2 tsp bicarbonate of soda", "1 tsp salt", "2 eggs", "240ml buttermilk", "120ml vegetable oil", "240ml boiling water or hot coffee"] },
    ],
    steps: [
      "Heat the oven to 175°C and line two 8\" tins.",
      "Whisk all the dry ingredients together in one large bowl.",
      "Add the eggs, buttermilk and oil, and whisk until just combined.",
      "Pour in the boiling water last and whisk again — the batter will look alarmingly thin. That is correct.",
      "Divide and bake 30–35 minutes.",
    ],
    tips: ["Hot coffee instead of water deepens the chocolate without tasting of coffee.", "This one improves overnight — bake it a day ahead if you can."],
  },
  {
    id: "chinchin-recipe",
    tag: "Recipe",
    category: "Snacks",
    title: "Crisp Chin Chin, Every Batch",
    desc: "Oil temperature and dough rest time make or break the crunch.",
    time: "1 hr, incl. resting",
    level: "Beginner",
    yields: "One large tin",
    photo: PH.cookieTin,
    ingredients: [
      { group: "Dough", items: ["500g plain flour", "100g sugar", "½ tsp nutmeg, freshly grated", "¼ tsp salt", "100g cold butter, cubed", "1 egg", "120ml evaporated milk", "Vegetable oil, for frying"] },
    ],
    steps: [
      "Rub the butter into the flour, sugar, nutmeg and salt until it looks like coarse sand.",
      "Add the egg and milk and bring together into a firm dough. Do not knead it soft — chin chin wants a tight dough.",
      "Wrap and rest for 30 minutes at room temperature.",
      "Roll to 5mm and cut into small squares. Keep them even or they fry unevenly.",
      "Fry at 165°C in small batches for 4–5 minutes, until deep gold. Drain on a rack, not on paper.",
    ],
    tips: ["Too hot and the outside colours before the inside dries — that is what makes it chewy instead of crisp.", "Cool completely before storing or the steam softens the whole tin."],
  },
  {
    id: "meatpie-recipe",
    tag: "Recipe",
    category: "Snacks",
    title: "Baked (Not Fried) Meat Pie",
    desc: "A lighter pastry that still holds its shape and its flake.",
    time: "1 hr 20 min",
    level: "Intermediate",
    yields: "12 pies",
    photo: PH.latticePie,
    ingredients: [
      { group: "Pastry", items: ["500g plain flour", "250g cold butter", "1 tsp salt", "120ml ice water"] },
      { group: "Filling", items: ["400g minced beef", "2 potatoes, diced small", "1 carrot, diced small", "1 onion, finely chopped", "1 tbsp plain flour", "150ml beef stock", "Seasoning, thyme and pepper to taste"] },
    ],
    steps: [
      "Rub the butter into the flour and salt until pea-sized, add ice water, bring together and chill for 30 minutes.",
      "Fry the onion, add the beef and brown it properly before adding the vegetables.",
      "Stir in the flour, add the stock, and simmer until thick. Cool the filling completely — warm filling makes soggy pastry.",
      "Roll the pastry to 3mm, cut rounds, fill, fold and seal with a fork.",
      "Brush with egg wash and bake at 190°C for 25–30 minutes.",
    ],
    tips: ["Cut a small vent in each pie or the steam splits the seam.", "Cold filling, cold pastry, hot oven — in that order."],
  },
  {
    id: "zobo-recipe",
    tag: "Recipe",
    category: "Drinks",
    title: "Cold-Steeped Zobo",
    desc: "Steeping cold keeps it bright red and stops it turning bitter.",
    time: "8 hrs, mostly waiting",
    level: "Beginner",
    yields: "2 litres",
    photo: PH.hibiscus,
    ingredients: [
      { group: "Drink", items: ["100g dried hibiscus petals, rinsed", "2 litres cold water", "1 pineapple, skin and core only", "4 cloves", "A thumb of ginger, sliced", "A few sprigs of thyme", "Sweetener to taste, added at the end"] },
    ],
    steps: [
      "Rinse the petals twice to get the dust off.",
      "Combine everything except the sweetener in a large jar and refrigerate for 8 hours or overnight.",
      "Strain twice, the second time through a cloth.",
      "Sweeten only now, and taste as you go — the tartness is the point.",
      "Serve very cold over ice.",
    ],
    tips: ["Boiling hibiscus is what makes zobo taste stewed and bitter. Cold water takes longer and tastes cleaner.", "The pineapple skin does the aromatic work — save the flesh for something else."],
  },
  {
    id: "glaze",
    tag: "Tutorial",
    category: "Tutorials",
    title: "Glazing Doughnuts Without Cracks",
    desc: "Get the glaze temperature right and it sets glossy instead of dull.",
    time: "8 min read",
    level: "Beginner",
    yields: "24 doughnuts",
    photo: PH.doughnuts,
    ingredients: [{ group: "Glaze", items: ["400g icing sugar, sifted", "80ml whole milk", "1 tsp vanilla", "A pinch of salt"] }],
    steps: [
      "Warm the milk to just above body temperature — not hot.",
      "Whisk into the sifted sugar until it coats the back of a spoon and ribbons briefly.",
      "Dip the doughnuts while they are still warm, but not hot.",
      "Lift, let the excess run off for three seconds, then set on a rack.",
    ],
    tips: ["A cracked glaze means it set too fast — the glaze was too cold or too thick.", "A dull glaze means the doughnut was too hot and melted it."],
  },
  {
    id: "puffpuff-tip",
    tag: "Tip",
    category: "Troubleshooting",
    title: "Why Your Puff Puff Isn't Rising",
    desc: "Three yeast mistakes that flatten a batch, and how to fix them.",
    time: "5 min read",
    level: "Beginner",
    yields: "Reading only",
    photo: PH.puffPuff,
    ingredients: [{ group: "What to check", items: ["Yeast expiry date", "Water temperature", "Proving spot", "Batter consistency"] }],
    steps: [
      "Water too hot. Anything above 45°C kills yeast outright. It should feel barely warm on your wrist.",
      "Batter too stiff. Puff puff batter should drop off a spoon in a thick ribbon, not sit in a lump.",
      "Not proved long enough. It needs to double — an hour in a Lagos kitchen, longer in an air-conditioned one.",
      "Test the yeast first: a spoon of sugar in warm water plus the yeast should foam within ten minutes. No foam, no rise.",
    ],
    tips: ["Old yeast is the culprit nine times out of ten.", "Frying too cold makes them greasy and flat even when the rise was fine — hold the oil near 170°C."],
  },
];

/* The founder's story, from Anuoluwapo's own account. The portrait is
 * still a stock placeholder — drop a real photo into /public/images and
 * point `photo` at it, e.g. "/images/anu.jpg". Everything on the About
 * page reads from this one object. */
export const FOUNDER = {
  name: "Anuoluwapo Ali",
  role: "Founder & Head Baker",
  photo: PH.headBaker, // PLACEHOLDER — swap for a real portrait
  since: 2013,
  intro:
    "Hi, and thanks for stopping by. I have been baking since I was a teenager — my aunty taught me, and the first cake that was really mine was my own 15th birthday cake. I have been in love with the kitchen ever since.",
  story: [
    "It started around 2012, in my aunty's kitchen. She taught me the basics and I practised on whatever anyone in the house was willing to eat. The first cake that was properly mine was my own 15th birthday cake — I wish I still had the picture of it.",
    "By the time I got to school, enough people had told me I should be doing this professionally that I let myself be convinced. So I went and learned it properly: not just the steps, but the reasons behind them. That is the point it stopped being a hobby.",
    "I have been at it ever since and I have never fallen out of love with the craft. It is not only the baking either — I love the kitchen, I love cooking, and I am always learning something new. That part I never get tired of.",
  ],
  favourites: [
    // TODO (Anu): these three quotes are placeholders — say why each one is
    // actually yours and they will read as yours.
    { id: "chocolate", why: "The one I make when I am not thinking about it." },
    { id: "chinchin-recipe", why: "The ratios I keep coming back to." },
    { id: "zobo-recipe", why: "Cold-steeped. I will not be moved on this." },
  ],
  startHere: ["vanilla", "buttercream", "stacking", "puffpuff-tip"],
  facts: [
    "My aunty taught me to bake. The first cake I made for myself was my own 15th birthday cake.",
    "I wish I still had the photo of that cake.",
    "I am also a programmer — I build software. Foundan is my favourite of the things I have built, because of how much of it was creative work.",
    "Learning something new is my favourite way to spend an evening.",
    "The kitchen is my favourite room in any house, baking or not.",
    "I used to really love eating. Then I started baking properly, and the sheer amount of it became a little overwhelming.",
  ],
};

export const FACTS = [
  "Chin chin has roots in Chinese-Portuguese fried dough, adapted into Nigerian kitchens over a century ago.",
  "A pinch of salt in cake batter doesn't make it salty — it makes the sweetness taste stronger.",
  "Puff puff goes by other names across West Africa: bofrot in Ghana, mikate in Congo.",
  "Red velvet's original red came from cocoa reacting with buttermilk and vinegar, not food colouring.",
  "Resting cake batter for 10 minutes before baking lets the flour hydrate fully, for an evener crumb.",
  "Party jollof's smoky 'bottom pot' taste comes from letting the rice catch slightly on the base — cooks do it on purpose.",
  "Egusi is ground melon seed. The same seeds are pressed for oil across West Africa.",
  "Tigernuts aren't nuts at all — they're small tubers, which is why kunun aya is safe for nut allergies.",
];

/* ------------------------------------------------------------------ *
 * Gallery — one page per kind of work, at #/gallery/<id>. Real photos
 * only; captions describe what's in the frame, not what's for sale.
 * `shop` is where the "Order one like this" button goes.
 * ------------------------------------------------------------------ */
export const GALLERIES = [
  {
    id: "wedding-cakes",
    title: "Wedding Cakes",
    blurb: "Tiered, sugar-flowered and finished on site. Every one is tasted two weeks ahead, then delivered and stacked at the venue.",
    cover: PH.weddingGoldMonogramIvory,
    shop: "#weddings",
    photos: [
      { src: PH.weddingGoldMonogramIvory, caption: "Four tiers, pink sugar roses and a gold A&J monogram" },
      { src: PH.weddingVenueWhiteRoses, caption: "Five tiers among white roses at the venue" },
      { src: PH.weddingBurgundyRosesIvory, caption: "Burgundy roses, lilies and gold leaf" },
      { src: PH.weddingDetailGoldMonogram, caption: "The A&J monogram, up close" },
      { src: PH.weddingGreenFlowersIvory, caption: "Green sugar peonies and gold beading" },
      { src: PH.weddingDetailPeony, caption: "A sugar peony, made petal by petal" },
      { src: PH.weddingGreenFlowersVenue, caption: "Mr & Mrs, at the reception" },
      { src: PH.weddingDetailBurgundyRose, caption: "J&V in gold, with a burgundy rose" },
      { src: PH.weddingGoldMonogramVenue, caption: "The monogram cake, set up for the reception" },
      { src: PH.weddingDetailTopper, caption: "A gold Mr & Mrs topper" },
      { src: PH.ruffleTieredCake, caption: "Ruffled bottom tier with a gold marble top" },
    ],
  },
  {
    id: "birthday-cakes",
    title: "Birthday Cakes",
    blurb: "From a first birthday to a 66th. Tell us the age, the colours and the name, and we'll do the rest.",
    cover: PH.goldCrown40thCake,
    shop: "#/p/birthday",
    photos: [
      { src: PH.goldCrown40thCake, caption: "A gold crown and quilted tier for a 40th" },
      { src: PH.pink66thCake, caption: "Three tiers of pink and white for a 66th" },
      { src: PH.butterflyCakeWhitePink, caption: "White and pink, with butterflies and gold spheres" },
      { src: PH.starmanCakeSet, caption: "Black and gold, with a matching cupcake set" },
      { src: PH.butterflyCakePink, caption: "Textured pink buttercream and pearl spheres" },
      { src: PH.whiteOreoDripCake, caption: "White drip cake with Oreos and a cherry" },
      { src: PH.lineArtCake, caption: "Line-art face and fresh flowers for a 25th" },
      { src: PH.blackGoldCake, caption: "Gold leaf and black brushstrokes" },
      { src: PH.chocolateVanillaDripCake, caption: "Half chocolate, half vanilla, fully loaded" },
      { src: PH.redVelvetMiniCake, caption: "Red velvet mini cake with cherries" },
      { src: PH.cherryDripCake, caption: "Chocolate web and cherries" },
      { src: PH.oreoStrawberrySheetCake, caption: "Oreo and strawberry sheet cake" },
      { src: PH.oreoSquareCake, caption: "Cookies and cream square cake" },
      { src: PH.tuxedo50thCake, caption: "A tuxedo and gold bow tie for a 50th" },
      { src: PH.cowPrintCake, caption: "Black and gold, with a chocolate-sphere crown" },
      { src: PH.whiteDripSquareCake, caption: "A tall square cake with a white drip" },
      { src: PH.purpleRoseCake, caption: "White ruffles and a purple rose" },
      { src: PH.chocolateWebCake, caption: "A chocolate web, cherries and a piped name" },
      { src: PH.redVelvetSheetCake, caption: "A red velvet sheet cake for sharing" },
    ],
  },
  {
    id: "custom-cakes",
    title: "Customised Cakes",
    blurb: "Favourite characters, a name in gold, a theme only your family understands. Send a picture and we'll sketch it first.",
    cover: PH.princessCastleCake,
    shop: "#/p/custom",
    photos: [
      { src: PH.princessCastleCake, caption: "A princess castle with the birthday girl's name" },
      { src: PH.princessCake, caption: "Princesses and a gold frame for a first birthday" },
      { src: PH.teenTitansCake, caption: "Teen Titans Go! for an 8th birthday" },
      { src: PH.wreckItRalphCake, caption: "Wreck-It Ralph for a first birthday" },
      { src: PH.pjMasksCake, caption: "PJ Masks with a comic-book skyline" },
      { src: PH.cocomelonCake, caption: "Cocomelon and a rainbow, with the birthday boy's name" },
      { src: PH.halfBirthdayCake, caption: "A half cake for a half birthday" },
      { src: PH.bentoBalloonBox, caption: "A personalised bento cake with a balloon" },
    ],
  },
  {
    id: "small-chops",
    title: "Small Chops",
    blurb: "Puff puff, samosa, spring rolls, peppered chicken and sausage, fried the morning of your event and packed to travel.",
    cover: PH.smallChopsBox,
    shop: "#/p/platter",
    photos: [
      { src: PH.smallChopsBox, caption: "The party box: puff puff, waffles, samosa, spring rolls and chicken" },
      { src: PH.smallChopsBasket, caption: "Spring roll, puff puff and chicken on sticks" },
      { src: PH.smallChopsFoilTray, caption: "A foil tray of peppered chicken, sausage and puff puff" },
      { src: PH.grilledChicken, caption: "Chicken on the grill" },
      { src: PH.smallChopsPack, caption: "A takeaway pack, labelled and sealed" },
      { src: PH.ricePacksChickenDodo, caption: "Party jollof packs with chicken and dodo" },
      { src: PH.ricePacksRack, caption: "Packs for a big event, ready to go out" },
    ],
  },
  {
    id: "puff-puff",
    title: "Puff Puff",
    blurb: "Soft in the middle, golden outside, and fried fresh to order. Nobody leaves a party without a handful.",
    cover: PH.puffPuffPile,
    shop: "#/p/puffpuff",
    photos: [
      { src: PH.puffPuffPile, caption: "Straight out of the oil" },
      { src: PH.puffPuffFrying, caption: "Frying, one batch at a time" },
      { src: PH.smallChopsBox, caption: "Half a box of puff puff in the party pack" },
      { src: PH.smallChopsBasket, caption: "A puff puff on the side of a small chops basket" },
    ],
  },
  {
    id: "food-trays",
    title: "Food Trays",
    blurb: "Rice, chicken, noodles and dodo, packed into one tray with fruit and drinks. For birthdays, surprises and anyone you want to feed properly.",
    cover: PH.birthdayTrayMiniCake,
    shop: "#/shop?category=Meals",
    photos: [
      { src: PH.birthdayTrayMiniCake, caption: "A birthday tray with a mini cake, rice, chicken, fruit and drinks" },
      { src: PH.birthdayTrayRiceChicken, caption: "Jollof and fried rice, chicken and a Happy Birthday mini cake" },
      { src: PH.riceRoastChickenTray, caption: "Jollof and fried rice with a whole roast chicken, salad and fruit" },
      { src: PH.roastChickenTrayClose, caption: "Roast chicken on cucumber, with rice and salad" },
      { src: PH.noodlesDodoTrayClose, caption: "Noodles and dodo, up close" },
      { src: PH.annieFoodsWrappedTray, caption: "A wrapped Annie Foods tray on its way to the party" },
    ],
  },
  {
    id: "naming-ceremony",
    title: "Naming Ceremony",
    blurb: "Cooked on site in the big pots, the way a naming ceremony should be: party rice, stew and enough for the whole compound.",
    cover: PH.stirringPartyRice,
    shop: "#/shop?occasion=naming",
    photos: [
      { src: PH.stirringPartyRice, caption: "Stirring party rice in the big pot" },
      { src: PH.partyRiceOnions, caption: "Rice going in, with onions on top" },
      { src: PH.stewBasePot, caption: "The stew base, cooked down" },
      { src: PH.fryingBigPan, caption: "Frying in the big pan" },
      { src: PH.buffetChafingDishes, caption: "Chafing dishes and plates set out for the guests" },
    ],
  },
  {
    id: "bread",
    title: "Bread & Doughnuts",
    blurb: "Handmade from the dough up, shaped by hand, proved slowly and baked or fried the same day.",
    cover: PH.handmadeBreadLoaf,
    shop: "#/p/doughnuts",
    photos: [
      { src: PH.handmadeBreadLoaf, caption: "A handmade loaf, pulled apart while it's still soft" },
      { src: PH.doughBallsProving, caption: "Dough, shaped by hand and proving" },
      { src: PH.sugarDoughnutsBoxed, caption: "Cream-filled sugar doughnuts, three to a box" },
      { src: PH.sugarDoughnutsOpenBoxes, caption: "Boxed and ready for pickup" },
      { src: PH.sugarDoughnutsBoxes, caption: "A table full of doughnut boxes" },
    ],
  },
  {
    id: "gifts",
    title: "Gifts & Treat Boxes",
    blurb: "Hampers, Valentine's boxes and treat boxes, packed with whatever says it best: cake cups, doughnuts, chocolates, perfume.",
    cover: PH.valentineBoxCard,
    shop: "#/p/treatbox",
    photos: [
      { src: PH.valentineBoxCard, caption: "A Valentine's box with a card, perfume, wine and a cake cup" },
      { src: PH.valentineBoxCake, caption: "A Valentine's box with a loaf cake" },
      { src: PH.giftHamperBasket, caption: "A wrapped gift hamper basket" },
      { src: PH.giftBoxFlask, caption: "A named flask, chocolates and biscuits" },
      { src: PH.valentineCupcakes, caption: "Valentine's cupcakes with hand-made toppers" },
      { src: PH.cakeCupsThree, caption: "Cake cups in three flavours" },
      { src: PH.cakeCupDoughnutsHeld, caption: "A red velvet cake cup and doughnuts" },
      { src: PH.cakeCupSpringRolls, caption: "A cake cup and spring rolls, boxed together" },
      { src: PH.chinChinBigJar, caption: "The big chin chin jar" },
      { src: PH.ownMeatPies, caption: "Meat pies, crimped by hand" },
    ],
  },
  {
    id: "event-decor",
    title: "Event Décor",
    blurb: "We decorate as well as bake. Backdrops, balloon garlands, table settings and centrepieces, like this 50th birthday we set up at Terra Kulture.",
    cover: PH.terraKultureBackdrop,
    ask: "I saw your event décor on the website and I'd like to talk about decorating my event.",
    photos: [
      { src: PH.terraKultureBackdrop, caption: "A 50th birthday backdrop with a black and gold balloon garland at Terra Kulture" },
      { src: PH.terraKultureCentrepiece, caption: "Black linen, gold chargers and white rose centrepieces" },
      { src: PH.terraKultureTableSetting, caption: "Chiavari chairs and a long table, ready for dinner" },
      { src: PH.terraKultureCourtyard, caption: "The Terra Kulture courtyard, dressed for the evening" },
    ],
  },
  {
    id: "ushers",
    title: "Ushers",
    blurb: "Our ushers welcome your guests, seat them, and keep the food and drinks moving all event long.",
    cover: PH.eventUshers,
    ask: "I'd like to book ushers for my event.",
    photos: [{ src: PH.eventUshers, caption: "Our ushers in white, ready for the guests" }],
  },
];
export const findGallery = (id) => GALLERIES.find((g) => g.id === id);

export const NAV_LINKS = [
  { href: "#/shop", label: "Shop All" },
  { href: "#weddings", label: "Weddings" },
  { href: "#/gallery", label: "Gallery" },
  { href: "#cakes", label: "Cakes" },
  { href: "#snacks", label: "Snacks" },
  { href: "#meals", label: "Meals" },
  { href: "#visit", label: "Visit Us" },
];

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: "#/feedback", label: "Leave Feedback" },
  { href: "#occasions", label: "Occasions" },
  { href: "#healthy", label: "Healthy Options" },
  { href: "#bakers", label: "Our Bakers" },
  { href: "#recipes", label: "Recipes & Tips" },
];

/* ------------------------------------------------------------------ *
 * Photo credits. The two Wikimedia Commons drink photos are CC BY-SA 4.0,
 * which REQUIRES the photographer's name, the licence and a note that the
 * image was changed (both are cropped). The footer renders this list.
 *
 * This is a licence condition, not decoration: if you swap one of these
 * for your own photo, delete its line here at the same time. An empty
 * list hides the footer credits entirely.
 * ------------------------------------------------------------------ */
export const PHOTO_CREDITS = [
  {
    what: "Zobo",
    author: "Lyndadelz",
    licence: "CC BY-SA 4.0",
    licenceHref: "https://creativecommons.org/licenses/by-sa/4.0/",
    href: "https://commons.wikimedia.org/wiki/File:Zobo_drink.jpg",
    changed: "cropped",
  },
  {
    what: "Yoghurt",
    author: "Muktee1494",
    licence: "CC BY-SA 4.0",
    licenceHref: "https://creativecommons.org/licenses/by-sa/4.0/",
    href: "https://commons.wikimedia.org/wiki/File:Creamy_yogurt.jpg",
    changed: "cropped",
  },
  // Tigernut Milk is CC0 (public domain) — no credit required, so none here.
];

export const BRAND = {
  name: "Annie Cakes & Chops",
  first: "Annie",
  rest: "Cakes & Chops",
};

export const INSTAGRAM = { handle: `@${SETTINGS.instagram}`, href: `https://instagram.com/${SETTINGS.instagram}` };
export const TIKTOK = { handle: SETTINGS.tiktok, href: `https://www.tiktok.com/@${SETTINGS.tiktok}` };

export const WHATSAPP_NUMBER = SETTINGS.whatsappNumber;
export const WHATSAPP = `https://wa.me/${SETTINGS.whatsappNumber}`;
export const PHONE_DISPLAY = SETTINGS.phoneDisplay;
export const PHONE_HREF = `tel:+${SETTINGS.whatsappNumber}`;
