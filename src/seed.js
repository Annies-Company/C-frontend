/* ------------------------------------------------------------------ *
 * Starting data. The site shows this until the admin panel (or the Rust
 * API behind it) has saved its own copy — see api.js. Edit here to change
 * what a fresh install ships with; edit in /admin to change the live site.
 * ------------------------------------------------------------------ */

// Every photo id below has been eyeballed against the actual image — do not
// swap one without looking at what comes back from the CDN first.
export const PH = {
  // ---- Annie Cakes & Chops' own photos, served from /public/images ----
  // Full-size originals live in /photos/originals under the same names.
  // Cakes on a pink backdrop were cut out with `npm run photos`.
  princessCake: "/images/princess-birthday-cake.jpg",
  butterflyCakeWhitePink: "/images/butterfly-birthday-cake-white-pink.jpg",
  butterflyCakePink: "/images/butterfly-birthday-cake-pink.jpg",
  chocolateVanillaDripCake: "/images/chocolate-vanilla-drip-cake.jpg",
  oreoSquareCake: "/images/oreo-square-birthday-cake.jpg",
  oreoStrawberrySheetCake: "/images/oreo-strawberry-sheet-cake.jpg",
  teenTitansCake: "/images/teen-titans-birthday-cake.jpg",
  wreckItRalphCake: "/images/wreck-it-ralph-birthday-cake.jpg",
  pjMasksCake: "/images/pj-masks-birthday-cake.jpg",
  lineArtCake: "/images/25th-birthday-line-art-cake.jpg",
  blackGoldCake: "/images/black-and-gold-birthday-cake.jpg",
  cherryDripCake: "/images/cherry-drip-birthday-cake.jpg",
  halfBirthdayCake: "/images/half-birthday-heart-cake.jpg",
  creamSheetCake: "/images/cream-sheet-cake-tray.jpg",
  weddingGoldMonogram: "/images/wedding-cake-gold-monogram.jpg",
  weddingGoldMonogramVenue: "/images/wedding-cake-gold-monogram-venue.jpg",
  weddingBurgundyRoses: "/images/wedding-cake-burgundy-roses.jpg",
  weddingFiveTier: "/images/wedding-cake-five-tier.jpg",
  weddingGreenFlowers: "/images/wedding-cake-green-sugar-flowers.jpg",
  ruffleTieredCake: "/images/ruffle-monogram-tiered-cake.jpg",
  bentoBalloonBox: "/images/bento-cake-balloon-box.jpg",
  bentoGiftSet: "/images/bento-gift-set-balloon.jpg",
  cakeCupDoughnutBox: "/images/cake-cup-and-doughnut-box.jpg",
  cakeParfaitCups: "/images/cake-parfait-cups.jpg",
  redVelvetCakeCup: "/images/red-velvet-cake-cup.jpg",
  redVelvetCupcakes: "/images/red-velvet-cupcakes.jpg",
  chinChinJars: "/images/chin-chin-jars.jpg",
  chinChinJar: "/images/chin-chin-jar.jpg",
  smallChopsBox: "/images/small-chops-box.jpg",
  smallChopsFoilTray: "/images/small-chops-foil-tray.jpg",
  smallChopsPack: "/images/small-chops-takeaway-pack.jpg",
  ricePacksChickenDodo: "/images/party-rice-packs-chicken-dodo.jpg",
  ricePacksRack: "/images/party-rice-packs-rack.jpg",
  ricePacksTurkey: "/images/party-rice-packs-turkey.jpg",
  spongeTiers: "/images/sponge-tiers-stacked.jpg",
  chocolateSpongeTiers: "/images/chocolate-sponge-tiers.jpg",
  cakeTiersWrapped: "/images/cake-tiers-wrapped.jpg",
  goldCrown40thCake: "/images/gold-crown-40th-birthday-cake.jpg",
  pink66thCake: "/images/pink-66th-birthday-tiered-cake.jpg",
  starmanCakeSet: "/images/black-and-gold-starman-cake-and-cupcakes.jpg",
  whiteOreoDripCake: "/images/white-oreo-drip-birthday-cake.jpg",
  redVelvetMiniCake: "/images/red-velvet-mini-cake-cherries.jpg",
  princessCastleCake: "/images/princess-castle-birthday-cake.jpg",
  weddingGreenFlowersVenue: "/images/wedding-cake-green-sugar-flowers-venue.jpg",
  puffPuffFrying: "/images/puff-puff-frying.jpg",
  puffPuffPile: "/images/puff-puff-fresh-pile.jpg",
  smallChopsBasket: "/images/small-chops-basket.jpg",
  grilledChicken: "/images/grilled-chicken-on-the-grill.jpg",
  // wedding section: showpieces on ivory, detail crops, venue shot
  weddingGoldMonogramIvory: "/images/wedding-gold-monogram-ivory.jpg",
  weddingBurgundyRosesIvory: "/images/wedding-burgundy-roses-ivory.jpg",
  weddingGreenFlowersIvory: "/images/wedding-green-sugar-flowers-ivory.jpg",
  weddingVenueWhiteRoses: "/images/wedding-venue-white-roses.jpg",
  weddingDetailGoldMonogram: "/images/wedding-detail-gold-monogram-roses.jpg",
  weddingDetailPeony: "/images/wedding-detail-green-sugar-peony.jpg",
  weddingDetailBurgundyRose: "/images/wedding-detail-burgundy-rose-monogram.jpg",
  weddingDetailTopper: "/images/wedding-detail-mr-and-mrs-topper.jpg",
  // food trays
  birthdayTrayRiceChicken: "/images/birthday-food-tray-rice-and-chicken.jpg",
  birthdayTrayMiniCake: "/images/birthday-food-tray-mini-cake.jpg",
  riceRoastChickenTray: "/images/rice-and-roast-chicken-tray.jpg",
  roastChickenTrayClose: "/images/roast-chicken-tray-close.jpg",
  noodlesDodoTrayClose: "/images/noodles-and-dodo-tray-close.jpg",
  annieFoodsWrappedTray: "/images/annie-foods-wrapped-tray.jpg",
  // naming ceremony cooking
  stirringPartyRice: "/images/stirring-party-rice-big-pot.jpg",
  partyRiceOnions: "/images/party-rice-with-onions-in-the-pot.jpg",
  stewBasePot: "/images/stew-base-in-the-pot.jpg",
  fryingBigPan: "/images/frying-in-the-big-pan.jpg",
  buffetChafingDishes: "/images/buffet-chafing-dishes.jpg",
  // bread and doughnuts
  handmadeBreadLoaf: "/images/handmade-bread-loaf.jpg",
  doughBallsProving: "/images/dough-balls-proving.jpg",
  sugarDoughnutsBoxed: "/images/sugar-doughnuts-boxed.jpg",
  sugarDoughnutsBoxes: "/images/sugar-doughnuts-boxes.jpg",
  sugarDoughnutsOpenBoxes: "/images/sugar-doughnuts-open-boxes.jpg",
  // event décor at Terra Kulture, and ushers
  terraKultureBackdrop: "/images/terra-kulture-birthday-backdrop.jpg",
  terraKultureCentrepiece: "/images/terra-kulture-table-centrepiece.jpg",
  terraKultureTableSetting: "/images/terra-kulture-table-setting.jpg",
  terraKultureCourtyard: "/images/terra-kulture-courtyard-tables.jpg",
  eventUshers: "/images/event-ushers.jpg",
  // gifts and treats
  ownMeatPies: "/images/meat-pies.jpg",
  giftHamperBasket: "/images/gift-hamper-basket.jpg",
  valentineBoxCard: "/images/valentine-gift-box-card.jpg",
  valentineBoxCake: "/images/valentine-gift-box-cake.jpg",
  giftBoxFlask: "/images/gift-box-flask-and-chocolates.jpg",
  valentineCupcakes: "/images/valentine-cupcakes.jpg",
  cakeCupsThree: "/images/cake-cups-three-flavours.jpg",
  cakeCupDoughnutsHeld: "/images/cake-cup-and-doughnuts-held.jpg",
  cakeCupSpringRolls: "/images/cake-cup-and-spring-rolls-box.jpg",
  chinChinBigJar: "/images/chin-chin-big-jar.jpg",
  // more birthday cakes
  chocolateWebCake: "/images/chocolate-web-birthday-cake.jpg",
  cowPrintCake: "/images/black-and-gold-cow-print-cake.jpg",
  whiteDripSquareCake: "/images/white-drip-square-birthday-cake.jpg",
  purpleRoseCake: "/images/purple-rose-birthday-cake.jpg",
  tuxedo50thCake: "/images/tuxedo-50th-birthday-cake.jpg",
  redVelvetSheetCake: "/images/red-velvet-sheet-cake-tray.jpg",
  cocomelonCake: "/images/cocomelon-rainbow-birthday-cake.jpg",

  /* ---- freely-licensed stock, self-hosted ----
   * Not Annie's own photos, but the real Nigerian thing rather than a
   * western stand-in, so they live here instead of on the Unsplash CDN.
   * All three are still placeholders: photograph your own bottles and the
   * path below is the only line that changes.
   *
   * The two CC BY-SA ones MUST keep their credit — see PHOTO_CREDITS in
   * data.js, which the footer renders. Drop the photo, drop the credit. */

  // replaces an Unsplash shot of a dairy-milk jug, which is not tigernut milk
  tigernut: "/images/tigernut-kunun-aya-bottles.jpg", // CC0 — no credit needed
  // replaces a garnished western cocktail; this is plain chilled zobo
  hibiscus: "/images/zobo-chilled-glass.jpg", // CC BY-SA 4.0, cropped
  // replaces strawberry parfait jars. Real Nigerian yoghurt, but in the
  // takeaway cups it is usually sold in — not the bottle Annie asked for.
  yoghurt: "/images/yoghurt-creamy-cup.jpg", // CC BY-SA 4.0, cropped

  // ---- temporary stock (Unsplash ids) ----

  tieredCake: "1535141192574-5d4897c12636",
  dripCake: "1578985545062-69928b1d9587",
  macaronCake: "1562440499-64c9a111f713",
  coneCake: "1621303837174-89787a7d4729",
  nakedCake: "1606890737304-57a1ca8a5b62",
  redVelvetCupcake: "1614707267537-b85aaf00c4b7",
  tealCupcakes: "1486427944299-d1955d23e34d",
  vanillaCupcakes: "1519869325930-281384150729",
  swirlCupcakes: "1607478900766-efe13248b125",
  cakeSlice: "1565958011703-44f9829ba187",
  mousseCake: "1602351447937-745cb720612f",
  handsCake: "1557925923-cd4648e211a0",
  panCake: "1516054575922-f0b8eeadec1a",
  sprinkleCake: "1464349095431-e9a21285b5f3",
  cheesecake: "1578775887804-699de7086ff9",
  tiramisu: "1571115177098-24ec42ed204d",
  chinChin: "1558961363-fa8fdf82db35",
  cookieTin: "1499636136210-6f4ee915583e",
  puffPuff: "1606491956689-2ea866880c84",
  meatPie: "1601050690597-df0568f70950",
  sausageRoll: "1555507036-ab1f4038808a",
  smallChops: "1601050690117-94f5f6fa8bd7",
  doughnuts: "1618411640018-972400a01458",
  sprinkleDoughnuts: "1551024601-bec78aea704b",
  cinnamonRolls: "1509365465985-25d11c17e812",
  muffins: "1607958996333-41aef7caefaa",
  breadRolls: "1608198093002-ad4e005484ec",
  rusticBread: "1509440159596-0249088772ff",
  latticePie: "1587248720327-8eb72564be1e",
  bakeryCase: "1517433670267-08bbd4be890f",
  storefront: "1591261730799-ee4e6c2d16d7",
  counter: "1568254183919-78a4f43a2877",
  headBaker: "1566554273541-37a9ca77b91f",
  kitchenCook: "1606787620819-8bdf0c44c293",
  pastryChef: "1577219491135-ce391730fb2c",
  kitchenFire: "1600565193348-f74bd3c7ccdf",
  chapman: "1556679343-c7306c1976bc",
  citrusJuice: "1600271886742-f049cd451bba",
  lemonMint: "1621263764928-df1444c5e859",
  shake: "1572490122747-3968b75cc699",
  oreoParfait: "1563805042-7684c019e1cb",
  // Nigerian kitchen
  jollofTray: "1666190092689-e3968aa0c32c",
  jollofChicken: "1603496987674-79600a000f55",
  jollofFish: "1665332195309-9d75071138f0",
  jollofSkewers: "1664992960082-0ea299a9c53e",
  friedRice: "1638436684761-7e59f8a9072f",
  riceStew: "1569058242252-623df46b5025",
  egusi: "1763048443535-1243379234e2",
  efoRiro: "1604329760661-e71dc83f8f26",
  dodoTray: "1788530757669-417558f26bef",
  boli: "1540714605746-4f474eefc6d4",
};

// `ratio` drives the landing-page mosaic — the deliberately uneven tile
// heights come from here, not from the layout code.
const RAW_PRODUCTS = [
  // ---- Cakes -------------------------------------------------------
  { id: "wedding", title: "Wedding Cakes", category: "Cakes", desc: "Tiered, floral or minimalist — tastings run two weeks ahead of your date, so nothing is a surprise on the day.", price: 180000, photo: PH.weddingGoldMonogram, ratio: "4/5", tags: ["Tiered", "Custom"], personalisable: true, featured: true },
  { id: "custom", title: "Custom Character Cakes", category: "Cakes", desc: "Teen Titans, Wreck-It Ralph, PJ Masks — bring the character and the name, we sketch it, then bake it.", price: 35000, photo: PH.teenTitansCake, ratio: "1/1", tags: ["Custom"], personalisable: true },
  { id: "birthday", title: "Birthday Cakes", category: "Cakes", desc: "Cartoon cakes for the kids, drip cakes for the grown-ups.", price: 25000, photo: PH.princessCake, ratio: "3/4", tags: ["Custom"], personalisable: true, sameDay: true },
  { id: "celebration", title: "Tiered & Celebration", category: "Cakes", desc: "Two to five tiers, for engagements, milestone birthdays and big family days.", price: 95000, photo: PH.ruffleTieredCake, ratio: "3/4", tags: ["Tiered", "Custom"], personalisable: true },
  { id: "bento", title: "Bento Cake Gift Box", category: "Cakes", desc: "A mini cake with your message, boxed with a balloon — the surprise people film.", price: 12500, photo: PH.bentoBalloonBox, ratio: "3/4", tags: ["Custom"], personalisable: true, sameDay: true },
  { id: "butterfly", title: "Butterfly Birthday Cake", category: "Cakes", desc: "Textured pink buttercream, pearl spheres and a cloud of butterflies, with a Happy Birthday topper.", price: 45000, photo: PH.butterflyCakePink, ratio: "1/1", tags: ["Custom"], personalisable: true },
  { id: "oreosheet", title: "Oreo & Strawberry Sheet Cake", category: "Cakes", desc: "A big rectangle for the office or the party, loaded with Oreos, cookies, strawberries and a chocolate drip.", price: 40000, photo: PH.oreoStrawberrySheetCake, ratio: "5/4", tags: ["Chocolate", "Fruit"], personalisable: true },
  { id: "dripcake", title: "Chocolate & Vanilla Drip Cake", category: "Cakes", desc: "Half vanilla, half chocolate, piled high with biscuits, chocolate bars and fresh strawberries.", price: 38000, photo: PH.chocolateVanillaDripCake, ratio: "1/1", tags: ["Chocolate"], personalisable: true },
  { id: "redvelvetcups", title: "Red Velvet Cupcakes", category: "Cakes", desc: "Soft red velvet, six to a box, frosted the morning they go out.", price: 9500, unit: "per six", photo: PH.redVelvetCupcakes, ratio: "4/3", tags: ["Cupcakes"], sameDay: true },
  { id: "naked", title: "Naked & Semi-Naked", category: "Cakes", desc: "Minimal buttercream — our most-requested style.", price: 40000, photo: PH.nakedCake, ratio: "4/5", tags: ["Chocolate"], personalisable: true },
  { id: "fudge", title: "Dark Chocolate Fudge", category: "Cakes", desc: "Dense, barely sweet, finished with a cocoa dusting.", price: 28000, compareAt: 31000, photo: PH.panCake, ratio: "5/4", tags: ["Chocolate"], sameDay: true },
  { id: "confetti", title: "Confetti Sprinkle Cake", category: "Cakes", desc: "Vanilla sponge shot through with sprinkles, cut to order.", price: 22000, photo: PH.sprinkleCake, ratio: "1/1", tags: ["Custom"], personalisable: true, sameDay: true },
  { id: "cheesecake", title: "Baked Cheesecake", category: "Cakes", desc: "Slow-baked, cracked-top, with whatever fruit is good that week.", price: 26000, photo: PH.cheesecake, ratio: "3/4", tags: ["Fruit"], sameDay: true },
  { id: "tiramisu", title: "Tiramisu Slab", category: "Cakes", desc: "Espresso-soaked layers, cut into squares for sharing.", price: 24000, photo: PH.tiramisu, ratio: "1/1", tags: ["Chocolate"] },
  { id: "vanillacup", title: "Classic Vanilla Cupcakes", category: "Cakes", desc: "Six to a box, buttercream piped on the morning of.", price: 9000, photo: PH.vanillaCupcakes, ratio: "1/1", tags: ["Cupcakes"], sameDay: true },
  { id: "swirlcup", title: "Buttercream Swirl Cupcakes", category: "Cakes", desc: "Two-tone swirls, in your colours if you send them ahead.", price: 11000, photo: PH.swirlCupcakes, ratio: "5/4", tags: ["Cupcakes"], personalisable: true, sameDay: true },
  { id: "berryslice", title: "Berry Layer Slice", category: "Cakes", desc: "A single generous slice — cream, sponge and fresh raspberries.", price: 4500, photo: PH.cakeSlice, ratio: "1/1", tags: ["Fruit"], sameDay: true },
  { id: "vegancake", title: "Vegan Chocolate Cake", category: "Cakes", desc: "Plant-based butter and aquafaba, taste-tested against the original.", price: 38000, photo: PH.mousseCake, ratio: "4/5", tags: ["Chocolate", "Vegan", "Dairy-free"], sameDay: true },

  // ---- Snacks ------------------------------------------------------
  { id: "chinchin", title: "Chin Chin Jar", category: "Snacks", desc: "Crunchy, lightly sweet, cut small, in our labelled jar that keeps it crisp for weeks.", price: 3500, unit: "per jar", photo: PH.chinChinJars, ratio: "1/1", tags: ["Fried"], sameDay: true },
  { id: "puffpuff", title: "Puff Puff", category: "Small Chops", desc: "Golden and airy, fried fresh to order.", price: 2500, unit: "per dozen", photo: PH.puffPuffPile, ratio: "5/4", tags: ["Fried"], sameDay: true },
  { id: "meatpie", title: "Meat Pie", category: "Small Chops", desc: "Flaky pastry, peppered beef and potato.", price: 1200, unit: "each", photo: PH.ownMeatPies, ratio: "1/1", tags: ["Savoury"], sameDay: true },
  { id: "sausage", title: "Sausage Rolls", category: "Small Chops", desc: "House-made sausage in buttery pastry.", price: 1000, unit: "each", photo: PH.sausageRoll, ratio: "3/4", tags: ["Savoury"], sameDay: true },
  { id: "platter", title: "Small Chops Platter", category: "Small Chops", desc: "Puff puff, samosas, spring rolls and peppered chicken, packed in one box.", price: 18000, unit: "per tray", photo: PH.smallChopsBox, ratio: "16/10", tags: ["Savoury"], sameDay: true, featured: true },
  { id: "doughnuts", title: "Doughnuts", category: "Snacks", desc: "Soft, cream-filled and rolled in sugar, boxed three to a pack.", price: 800, unit: "each", photo: PH.sugarDoughnutsBoxed, ratio: "1/1", tags: ["Fried"], sameDay: true },
  { id: "treatbox", title: "Cake Cup & Doughnut Box", category: "Snacks", desc: "A red velvet cake cup and three jam doughnuts, boxed in red tissue. Made for gifting.", price: 7500, unit: "per box", photo: PH.cakeCupDoughnutBox, ratio: "1/1", tags: ["Fried"], sameDay: true },
  { id: "sprinkledo", title: "Sprinkle Doughnuts", category: "Snacks", desc: "Chocolate-dipped and covered, the kids' order every time.", price: 950, unit: "each", photo: PH.sprinkleDoughnuts, ratio: "1/1", tags: ["Fried"], sameDay: true },
  { id: "cinnamon", title: "Cinnamon Rolls", category: "Snacks", desc: "Proved overnight, iced while still warm.", price: 1500, unit: "each", photo: PH.cinnamonRolls, ratio: "4/5", tags: ["Baked"], sameDay: true },
  { id: "muffins", title: "Blueberry Muffins", category: "Snacks", desc: "Full of fruit, with a proper domed top.", price: 1200, unit: "each", photo: PH.muffins, ratio: "1/1", tags: ["Baked", "Fruit"], sameDay: true },
  { id: "rolls", title: "Soft Dinner Rolls", category: "Snacks", desc: "Pull-apart rolls, six to a bag, best the day they're baked.", price: 2800, unit: "per six", photo: PH.breadRolls, ratio: "5/4", tags: ["Baked"], sameDay: true },
  { id: "bananabread", title: "Wholemeal Banana Bread", category: "Snacks", desc: "Sweetened only with overripe banana and dates.", price: 6500, unit: "per loaf", photo: PH.rusticBread, ratio: "5/4", tags: ["Baked", "Sugar-free"], sameDay: true },
  { id: "gfchinchin", title: "Gluten-Free Chin Chin", category: "Snacks", desc: "Rice and almond flour blend — same crunch, no wheat.", price: 4200, unit: "per tin", photo: PH.cookieTin, ratio: "1/1", tags: ["Fried", "Gluten-free"], sameDay: true },

  // ---- Meals -------------------------------------------------------
  // Cooked in the same kitchen as the small chops, packed hot in foil
  // coolers so a tray still steams when the lid comes off at the party.
  { id: "partyjollof", title: "Party Jollof Packs", category: "Meals", desc: "Smoky party jollof with chicken, sealed in individual packs — easy to share out at parties, church and office events.", price: 55000, unit: "per 10 packs", photo: PH.ricePacksRack, ratio: "4/5", tags: ["Rice", "Dairy-free"], featured: true },
  { id: "jollofchicken", title: "Jollof Rice & Chicken", category: "Meals", desc: "Party jollof with peppered chicken and dodo, in a takeaway pack.", price: 5500, unit: "per pack", photo: PH.ricePacksChickenDodo, ratio: "1/1", tags: ["Rice", "Grilled", "Dairy-free"], sameDay: true },
  { id: "friedrice", title: "Nigerian Fried Rice", category: "Meals", desc: "Curry-yellow rice with liver, peas and carrots, a boiled egg and fried chicken on the side.", price: 5500, unit: "per plate", photo: PH.friedRice, ratio: "5/4", tags: ["Rice", "Dairy-free"], sameDay: true },
  { id: "jollofsuya", title: "Jollof & Chicken Suya", category: "Meals", desc: "Skewers rubbed in yaji and charred, laid over jollof with peppers and onions.", price: 6500, unit: "per plate", photo: PH.jollofSkewers, ratio: "1/1", tags: ["Rice", "Grilled"], sameDay: true },
  { id: "jolloffish", title: "Jollof & Grilled Croaker", category: "Meals", desc: "A whole croaker, scored, peppered and grilled, served with jollof and lemon.", price: 12000, unit: "per dish", photo: PH.jollofFish, ratio: "4/5", tags: ["Rice", "Grilled", "Dairy-free"], sameDay: true },
  { id: "ricestew", title: "Rice, Beef Stew & Egg", category: "Meals", desc: "White rice, fried-pepper tomato stew with tender beef, a boiled egg and cucumber.", price: 4800, unit: "per plate", photo: PH.riceStew, ratio: "1/1", tags: ["Rice", "Dairy-free"], sameDay: true },
  { id: "egusi", title: "Egusi & Pounded Yam", category: "Meals", desc: "Melon-seed soup loaded with assorted meat — shaki, beef and cow leg — with a wrap of pounded yam.", price: 7500, unit: "per bowl", photo: PH.egusi, ratio: "4/5", tags: ["Soup & Swallow", "Dairy-free"], sameDay: true },
  { id: "eforiro", title: "Efo Riro & Pounded Yam", category: "Meals", desc: "Spinach cooked down in palm oil and locust beans, with smoked fish and a smooth wrap of pounded yam.", price: 7000, unit: "per bowl", photo: PH.efoRiro, ratio: "5/4", tags: ["Soup & Swallow", "Dairy-free"], sameDay: true },
  { id: "dodotray", title: "Dodo Tray", category: "Meals", desc: "Ripe plantain fried golden and sweet at the edges — the side nobody leaves a party without.", price: 15000, unit: "per tray", photo: PH.dodoTray, ratio: "5/4", tags: ["Fried", "Vegan", "Gluten-free", "Dairy-free"] },
  { id: "boli", title: "Boli & Groundnut", category: "Meals", desc: "Plantain roasted over charcoal until blistered, with a twist of roasted groundnut.", price: 2000, unit: "per portion", photo: PH.boli, ratio: "1/1", tags: ["Grilled", "Vegan", "Gluten-free", "Dairy-free"], sameDay: true },

  // ---- Drinks ------------------------------------------------------
  // TODO (Anu): confirm the three drinks below — bottle size, whether the
  // yoghurt is sweetened or flavoured, and whether your zobo is plain or
  // spiced. Prices are unchanged from the concept build.
  { id: "yoghurt", title: "Yoghurt", category: "Drinks", desc: "Thick and properly creamy, chilled and sold by the bottle.", price: 2800, unit: "per bottle", photo: PH.yoghurt, ratio: "7/8", tags: [], sameDay: true, featured: true },
  { id: "tigernut", title: "Tigernut Milk", category: "Drinks", desc: "Tigernuts soaked overnight and milled with dates. Naturally sweet, so nothing is added. Sold by the bottle.", price: 2200, unit: "per bottle", photo: PH.tigernut, ratio: "7/8", tags: ["Dairy-free", "Vegan", "Gluten-free"], sameDay: true, featured: true },
  { id: "hibiscus", title: "Zobo", category: "Drinks", desc: "Dried hibiscus steeped down and chilled. Deep red, properly tart, not sugar water. Sold by the bottle.", price: 2000, unit: "per bottle", photo: PH.hibiscus, ratio: "7/8", tags: ["Vegan", "Sugar-free", "Gluten-free"], sameDay: true, featured: true },
  { id: "chapman", title: "Lagos Chapman", category: "Drinks", desc: "Bitters, citrus and cucumber over a lot of ice.", price: 2400, photo: PH.chapman, ratio: "1/1", tags: ["Vegan"], sameDay: true },
  { id: "pineapple", title: "Pineapple & Ginger", category: "Drinks", desc: "Cold-pressed that morning, with enough ginger to notice.", price: 2300, photo: PH.citrusJuice, ratio: "1/1", tags: ["Vegan", "Gluten-free"], sameDay: true },
  { id: "lemonmint", title: "Lemon Mint Cooler", category: "Drinks", desc: "Unsweetened, muddled with mint from the market.", price: 2100, photo: PH.lemonMint, ratio: "3/4", tags: ["Vegan", "Sugar-free"], sameDay: true },
  { id: "shake", title: "Chocolate Shake", category: "Drinks", desc: "Blended with our own cake crumb, which is the point.", price: 3200, photo: PH.shake, ratio: "1/1", tags: ["Chocolate"], sameDay: true },
  { id: "parfaitcup", title: "Cake Cups", category: "Drinks", desc: "Red velvet, Oreo or vanilla cake layered with cream in a lidded cup, built to survive the drive.", price: 3000, photo: PH.cakeParfaitCups, ratio: "3/4", tags: ["Chocolate"], sameDay: true },
];

const OCCASION_MAP = {
  wedding: ["wedding", "anniversary"],
  custom: ["birthday", "anniversary", "graduation"],
  birthday: ["birthday"],
  celebration: ["wedding", "graduation", "anniversary"],
  bento: ["birthday", "naming"],
  naked: ["anniversary", "birthday"],
  fudge: ["birthday"],
  confetti: ["birthday", "graduation"],
  cheesecake: ["anniversary"],
  tiramisu: ["anniversary"],
  vanillacup: ["naming", "birthday"],
  swirlcup: ["naming", "birthday", "graduation"],
  vegancake: ["birthday", "anniversary"],
  chinchin: ["sallah", "naming"],
  puffpuff: ["sallah", "naming", "birthday"],
  meatpie: ["sallah", "naming"],
  sausage: ["sallah", "naming"],
  platter: ["sallah", "naming", "birthday", "graduation"],
  doughnuts: ["birthday", "naming"],
  sprinkledo: ["birthday"],
  rolls: ["sallah"],
  gfchinchin: ["sallah"],
  tigernut: ["naming", "sallah"],
  hibiscus: ["sallah", "naming"],
  chapman: ["birthday", "graduation"],
  shake: ["birthday"],
  parfaitcup: ["birthday", "naming"],
  butterfly: ["birthday"],
  oreosheet: ["birthday", "graduation", "naming"],
  dripcake: ["birthday", "anniversary"],
  redvelvetcups: ["birthday", "naming"],
  treatbox: ["birthday", "anniversary"],
  partyjollof: ["birthday", "wedding", "naming", "graduation", "sallah"],
  jollofchicken: ["birthday", "graduation"],
  friedrice: ["birthday", "naming", "sallah"],
  jollofsuya: ["birthday", "graduation"],
  jolloffish: ["anniversary"],
  ricestew: ["naming"],
  egusi: ["naming", "sallah"],
  eforiro: ["naming"],
  dodotray: ["wedding", "naming", "birthday", "sallah"],
  boli: ["graduation"],
};

// How much notice each order needs. Same-day items are 0; a wedding cake
// is quoted, tasted and built, so it asks for a fortnight. Party trays
// only need the night before, so the rice can go on at dawn.
const LEAD_DAYS = { wedding: 14, celebration: 5, naked: 3, tiramisu: 2, cheesecake: 2, vegancake: 2, partyjollof: 1, dodotray: 1 };

// Occasions and notice live on each product once saved, so the admin form
// can edit them directly instead of through the two lookups above.
export const SEED_PRODUCTS = RAW_PRODUCTS.map((p) => ({
  ...p,
  occasions: OCCASION_MAP[p.id] || [],
  leadDays: LEAD_DAYS[p.id] ?? (p.sameDay ? 0 : 3),
  soldOut: false,
  hidden: false,
}));

export const SEED_SETTINGS = {
  announcement: "Order before 2pm for same-day delivery in Lagos",
  phoneDisplay: "0810 487 0450",
  whatsappNumber: "2348104870450",
  instagram: "ceoanniecakes",
  tiktok: "anniecakes",
  address: "3 Omotayo Kuye Street, Ayobo, Ipaja, Lagos",
  // TODO: replace with the real landmark — the nearest junction, a shop
  // opposite, whatever you actually say on the phone. Editable in
  // #/admin/settings without touching this file.
  landmark: "Call or WhatsApp when you turn into the street and we will come out to meet you.",
  openHour: 8,
  closeHour: 21,
};
