// Primary: deep pink (raspberry, not baby pink). Secondary: warm gold, used
// to give the pink something to sit against without introducing a third,
// unrelated hue. The dark tone is a near-black wine so it still reads as
// part of the pink family rather than a generic charcoal.
export const tokens = {
  base: "#FDF6F8",
  paper: "#FFFFFF",
  pink: "#C2255C",
  pinkDeep: "#93173F",
  pinkLight: "#F6D9E3",
  pinkPale: "#FCEEF2",
  gold: "#D9A544",
  goldDeep: "#B9822A",
  goldLight: "#F6ECD4",
  ink: "#3A2530",
  inkSoft: "#8C6E7A",
  line: "#EDD9E0",
  dark: "#2B1420",
  darkAlt: "#391A2B",
  onDark: "#FBEFF3",
  onDarkSoft: "#D6AFC0",
};

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Karla:wght@400;500;600;700&family=Unbounded:wght@700;800;900&family=Dancing+Script:wght@700&display=swap');`;

// The chunky all-caps display face used by the hero and the big section
// shouts. Fraunces stays for product names and editorial headings.
export const DISPLAY = "Unbounded, 'Arial Black', sans-serif";

// Photos are either an Unsplash id (temporary stock) or a path to one of
// your own pictures. Drop your gallery photos in /public/images and point
// the matching entry in PH (data.js) at them, e.g. "/images/wedding-cake.jpg".
// Nothing else in the codebase needs to change.
export const img = (id, w, h) =>
  /^(\/|https?:|data:)/.test(id) ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const naira = (n) => "₦" + n.toLocaleString("en-NG");
