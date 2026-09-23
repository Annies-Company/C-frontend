// import React, { useEffect, useState } from "react";

// /* ================================================================== *
//  *  Annie Cakes & Chops — hero
//  *  Recreated to match the New-Year flyer:
//  *   - blush-pink field
//  *   - princess/castle cake bleeding off the LEFT
//  *   - hanging silver baubles top-right
//  *   - gold "2025"  ->  HAPPY NEW YEAR  ->  from all of us at
//  *   - "ANNIE Cakes & Chops"   (the accent line "switches" on a timer)
//  *   - white rounded thank-you card with the dancer logo
//  *   - Instagram / Facebook pills + phone pill
//  *   - small-chops photo bleeding in from the BOTTOM-RIGHT
//  *
//  *  >>> TEMPORARY IMAGES <<<
//  *  CAKE_IMG / CHOPS_IMG are inline-SVG placeholders so the layout is
//  *  visible with zero assets. Swap for real photos:
//  *    import cakePhoto  from "./assets/cake.jpg";
//  *    import chopsPhoto from "./assets/small-chops.jpg";
//  *  then use them in SLIDES below.
//  * ================================================================== */

// const toDataUri = (svg) => "data:image/svg+xml," + encodeURIComponent(svg);

// /* ---- placeholder: princess / castle celebration cake ------------ */
// const CAKE_SVG = `
// <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 620'>
//   <defs>
//     <linearGradient id='ctop' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#ffb7d6'/><stop offset='1' stop-color='#ff8dc0'/></linearGradient>
//     <linearGradient id='cmid' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#ef78bd'/><stop offset='1' stop-color='#df4ea1'/></linearGradient>
//     <linearGradient id='cbot' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#bd94ea'/><stop offset='1' stop-color='#9a70dc'/></linearGradient>
//     <linearGradient id='cgold' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#f8e0a0'/><stop offset='.5' stop-color='#cd9d3d'/><stop offset='1' stop-color='#f4d789'/></linearGradient>
//   </defs>
//   <ellipse cx='268' cy='306' rx='250' ry='288' fill='#ffd6e7' opacity='.5'/>
//   <g fill='#ffffff' opacity='.5'>
//     <circle cx='82' cy='96' r='34'/><circle cx='486' cy='128' r='27'/><circle cx='510' cy='300' r='20'/>
//   </g>
//   <g stroke='#ffc7de' stroke-width='2' opacity='.7'><path d='M82 130 v40'/><path d='M486 155 v40'/></g>

//   <!-- gold castle silhouette -->
//   <g fill='url(#cgold)' opacity='.9'>
//     <rect x='150' y='176' width='38' height='120'/>
//     <rect x='252' y='142' width='46' height='154'/>
//     <rect x='362' y='182' width='38' height='114'/>
//     <rect x='198' y='214' width='154' height='82'/>
//     <path d='M146 176 l23 -32 23 32 z'/>
//     <path d='M248 142 l27 -38 27 38 z'/>
//     <path d='M358 182 l23 -32 23 32 z'/>
//     <g><rect x='198' y='206' width='16' height='12'/><rect x='226' y='206' width='16' height='12'/><rect x='254' y='206' width='16' height='12'/><rect x='282' y='206' width='16' height='12'/><rect x='310' y='206' width='16' height='12'/><rect x='336' y='206' width='16' height='12'/></g>
//   </g>
//   <g stroke='#d9a63a' stroke-width='3'><path d='M169 144 v-18'/><path d='M275 104 v-20'/><path d='M381 150 v-18'/></g>
//   <g fill='#e0559b'><path d='M169 126 l15 5 -15 6z'/><path d='M275 84 l16 5 -16 6z'/><path d='M381 132 l15 5 -15 6z'/></g>

//   <!-- bottom tier -->
//   <path d='M118 452 h304 v168 h-304 z' fill='url(#cbot)'/>
//   <ellipse cx='270' cy='452' rx='152' ry='26' fill='#c8a0f0'/>
//   <g fill='#ffffff'><circle cx='150' cy='486' r='9'/><circle cx='210' cy='486' r='9'/><circle cx='270' cy='486' r='9'/><circle cx='330' cy='486' r='9'/><circle cx='390' cy='486' r='9'/></g>

//   <!-- middle tier -->
//   <path d='M158 340 h224 v112 h-224 z' fill='url(#cmid)'/>
//   <ellipse cx='270' cy='340' rx='112' ry='22' fill='#f186c6'/>
//   <ellipse cx='270' cy='398' rx='31' ry='39' fill='url(#cgold)'/>
//   <ellipse cx='270' cy='398' rx='22' ry='29' fill='#fff5e8'/>
//   <text x='270' y='413' text-anchor='middle' font-family='Georgia, serif' font-weight='700' font-size='34' fill='#c99a3c'>1</text>
//   <g fill='#ffffff'><circle cx='188' cy='372' r='7'/><circle cx='188' cy='420' r='7'/><circle cx='352' cy='372' r='7'/><circle cx='352' cy='420' r='7'/></g>

//   <!-- top tier -->
//   <path d='M195 244 h150 v98 h-150 z' fill='url(#ctop)'/>
//   <ellipse cx='270' cy='244' rx='76' ry='18' fill='#ffc4de'/>
//   <path d='M196 246 q12 18 24 0 q12 18 24 0 q12 18 24 0 q12 18 24 0 q12 18 24 0 q12 18 24 0 v-10 h-144 z' fill='#ffffff' opacity='.9'/>

//   <!-- birthday topper -->
//   <g stroke='url(#cgold)' stroke-width='4'><path d='M236 240 v-36'/><path d='M304 240 v-36'/></g>
//   <rect x='210' y='186' width='120' height='22' rx='7' fill='url(#cgold)'/>
//   <text x='270' y='202' text-anchor='middle' font-family='Georgia, serif' font-weight='700' font-size='10.5' fill='#7a591a'>HAPPY BIRTHDAY</text>

//   <!-- figurines on the top tier -->
//   <g>
//     <g transform='translate(210,214)'><path d='M0 26 q10 -30 20 0 z' fill='#7ec8e3'/><circle cx='10' cy='-2' r='6' fill='#ffe0c2'/></g>
//     <g transform='translate(240,210)'><path d='M0 30 q11 -34 22 0 z' fill='#ff9ecb'/><circle cx='11' cy='-4' r='6.5' fill='#ffe0c2'/></g>
//     <g transform='translate(275,212)'><path d='M0 28 q10 -32 20 0 z' fill='#ffd27a'/><circle cx='10' cy='-3' r='6' fill='#ffe0c2'/></g>
//     <g transform='translate(306,214)'><path d='M0 26 q10 -30 20 0 z' fill='#c9a7ef'/><circle cx='10' cy='-2' r='6' fill='#ffe0c2'/></g>
//   </g>

//   <!-- butterflies -->
//   <g opacity='.92'>
//     <g transform='translate(150,362)' fill='#6fd0d6'><ellipse cx='-6' cy='-6' rx='7' ry='9'/><ellipse cx='6' cy='-6' rx='7' ry='9'/><ellipse cx='-6' cy='6' rx='6' ry='7'/><ellipse cx='6' cy='6' rx='6' ry='7'/></g>
//     <line x1='150' y1='352' x2='150' y2='372' stroke='#2b2b2b' stroke-width='2'/>
//     <g transform='translate(398,300)' fill='#8fb6f0'><ellipse cx='-6' cy='-6' rx='7' ry='9'/><ellipse cx='6' cy='-6' rx='7' ry='9'/><ellipse cx='-6' cy='6' rx='6' ry='7'/><ellipse cx='6' cy='6' rx='6' ry='7'/></g>
//     <line x1='398' y1='290' x2='398' y2='310' stroke='#2b2b2b' stroke-width='2'/>
//   </g>
// </svg>`;

// /* ---- placeholder: platter of party small chops ----------------- */
// const CHOPS_SVG = `
// <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'>
//   <defs>
//     <radialGradient id='sbg' cx='50%' cy='40%' r='75%'><stop offset='0' stop-color='#fff3e2'/><stop offset='1' stop-color='#ffdfbe'/></radialGradient>
//     <radialGradient id='spp' cx='40%' cy='34%' r='72%'><stop offset='0' stop-color='#f1be7d'/><stop offset='1' stop-color='#bf7d3b'/></radialGradient>
//   </defs>
//   <rect width='600' height='600' rx='40' fill='url(#sbg)'/>
//   <ellipse cx='300' cy='344' rx='238' ry='208' fill='#a76e3d'/>
//   <ellipse cx='300' cy='330' rx='216' ry='188' fill='#c8945c'/>
//   <ellipse cx='300' cy='324' rx='196' ry='168' fill='#d8a771'/>
//   <g transform='rotate(-27 404 250)'>
//     <rect x='356' y='232' width='98' height='34' rx='17' fill='#e6b06a'/>
//     <rect x='356' y='232' width='15' height='34' rx='7' fill='#c78d48'/>
//     <rect x='439' y='232' width='15' height='34' rx='7' fill='#c78d48'/>
//   </g>
//   <g transform='rotate(-12 414 298)'>
//     <rect x='366' y='286' width='98' height='34' rx='17' fill='#edba77'/>
//     <rect x='366' y='286' width='15' height='34' rx='7' fill='#cf974f'/>
//     <rect x='449' y='286' width='15' height='34' rx='7' fill='#cf974f'/>
//   </g>
//   <path d='M352 402 l74 -20 22 68 z' fill='#dda24f' stroke='#c68a3b' stroke-width='3'/>
//   <path d='M392 436 l66 -12 8 64 z' fill='#e2ac5e' stroke='#c68a3b' stroke-width='3'/>
//   <g>
//     <circle cx='214' cy='300' r='34' fill='url(#spp)'/>
//     <circle cx='282' cy='288' r='34' fill='url(#spp)'/>
//     <circle cx='250' cy='352' r='34' fill='url(#spp)'/>
//     <circle cx='316' cy='346' r='30' fill='url(#spp)'/>
//     <circle cx='188' cy='360' r='30' fill='url(#spp)'/>
//     <g fill='#ffffff' opacity='.32'>
//       <ellipse cx='204' cy='288' rx='10' ry='6'/><ellipse cx='272' cy='276' rx='10' ry='6'/><ellipse cx='240' cy='340' rx='10' ry='6'/>
//     </g>
//   </g>
//   <ellipse cx='268' cy='432' rx='46' ry='30' fill='#ffffff'/>
//   <ellipse cx='268' cy='428' rx='33' ry='19' fill='#e2392a'/>
//   <g stroke='#8a5a2c' stroke-width='4' stroke-linecap='round'><path d='M250 262 l14 -30'/><path d='M322 330 l18 -26'/></g>
//   <g fill='#4fae52'><circle cx='300' cy='300' r='5'/><circle cx='230' cy='332' r='4'/><circle cx='342' cy='362' r='5'/><circle cx='382' cy='322' r='4'/></g>
// </svg>`;

// /* ---- hanging silver baubles (top-right decoration) ------------- */
// const BAUBLES_SVG = `
// <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 340 300'>
//   <defs>
//     <radialGradient id='ball' cx='36%' cy='30%' r='72%'>
//       <stop offset='0' stop-color='#ffffff'/><stop offset='.55' stop-color='#dde1e7'/><stop offset='1' stop-color='#aeb6c2'/>
//     </radialGradient>
//     <linearGradient id='bgold' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#f4d789'/><stop offset='1' stop-color='#c99a3c'/></linearGradient>
//   </defs>
//   <g stroke='#c9a24b' stroke-width='2.5' opacity='.8'>
//     <path d='M96 0 V150'/><path d='M196 0 V96'/><path d='M280 0 V150'/>
//   </g>
//   <g>
//     <rect x='90' y='150' width='12' height='12' rx='2' fill='url(#bgold)'/>
//     <circle cx='96' cy='206' r='44' fill='url(#ball)'/>
//     <ellipse cx='82' cy='190' rx='12' ry='7' fill='#ffffff' opacity='.6'/>
//   </g>
//   <g>
//     <rect x='190' y='96' width='12' height='12' rx='2' fill='url(#bgold)'/>
//     <circle cx='196' cy='160' r='54' fill='url(#ball)'/>
//     <ellipse cx='180' cy='142' rx='14' ry='8' fill='#ffffff' opacity='.6'/>
//   </g>
//   <g>
//     <rect x='274' y='150' width='12' height='12' rx='2' fill='url(#bgold)'/>
//     <circle cx='280' cy='198' r='38' fill='url(#ball)'/>
//     <ellipse cx='268' cy='184' rx='10' ry='6' fill='#ffffff' opacity='.6'/>
//   </g>
// </svg>`;

// const CAKE_IMG = toDataUri(CAKE_SVG);
// const CHOPS_IMG = toDataUri(CHOPS_SVG);
// const BAUBLES_IMG = toDataUri(BAUBLES_SVG);

// /* the accent line + which photo shows where, per switch step */
// const SLIDES = [
//   { accent: "Cakes", left: CAKE_IMG, corner: CHOPS_IMG },
//   { accent: "Chops", left: CHOPS_IMG, corner: CAKE_IMG },
//   { accent: "Cakes & Chops", left: CAKE_IMG, corner: CHOPS_IMG },
// ];

// const ROTATE_MS = 3400;
// const IG_URL = "https://instagram.com/ceoanniecakes";
// const FB_URL = "https://facebook.com/Anniecakes";
// const TEL_URL = "tel:09064976053";

// function prefersReducedMotion() {
//   return (
//     typeof window !== "undefined" &&
//     window.matchMedia &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches
//   );
// }

// export default function LandingPage() {
//   const [i, setI] = useState(0);
//   const [paused, setPaused] = useState(false);

//   useEffect(() => {
//     if (paused || prefersReducedMotion()) return;
//     const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), ROTATE_MS);
//     return () => clearInterval(id);
//   }, [paused]);

//   const slide = SLIDES[i];

//   return (
//     <section
//       className="ac-hero"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <style>{CSS}</style>

//       {/* --- bleeding photo, left --- */}
//       <div className="ac-cake">
//         <img src={CAKE_IMG} alt="Celebration cake" className={slide.left === CAKE_IMG ? "on" : ""} draggable="false" />
//         <img src={CHOPS_IMG} alt="Party small chops" className={slide.left === CHOPS_IMG ? "on" : ""} draggable="false" />
//       </div>

//       {/* --- hanging baubles, top-right --- */}
//       <img className="ac-baubles" src={BAUBLES_IMG} alt="" aria-hidden="true" draggable="false" />

//       {/* --- bleeding photo, bottom-right --- */}
//       <div className="ac-snack">
//         <img src={CHOPS_IMG} alt="Party small chops" className={slide.corner === CHOPS_IMG ? "on" : ""} draggable="false" />
//         <img src={CAKE_IMG} alt="Celebration cake" className={slide.corner === CAKE_IMG ? "on" : ""} draggable="false" />
//         <span className="ac-badge">Sample image — replace</span>
//       </div>

//       {/* --- content --- */}
//       <div className="ac-inner">
//         <div className="ac-year">2025</div>
//         <h1 className="ac-hny">HAPPY NEW YEAR</h1>
//         <p className="ac-from">from all of us at</p>

//         <div className="ac-brand">
//           <span className="ac-annie">
//             <span className="ac-q">&ldquo;</span>ANNIE
//           </span>
//           <span className="ac-cc" aria-live="polite">
//             <span key={i} className="ac-swap">{slide.accent}</span>
//             <span className="ac-q ac-q-end">&rdquo;</span>
//           </span>
//         </div>

//         <div className="ac-card">
//           <div className="ac-logo">
//             <svg viewBox="0 0 44 50" width="30" height="34" aria-hidden="true">
//               <path
//                 fill="#e5308a"
//                 d="M25 4a5 5 0 1 1-.1 0zM23 13c-2 3-2.5 6-5 9-3 3.5-7 5-11.5 4 3.6 2.8 8.6 2.6 12.5-.4-1.8 3.8-3.3 8-3.7 12.6H27c.7-4.9 2.3-8.9 4.5-12.2 2 3.4 3.1 7.5 3.3 12.2h6.4c.2-6.3-1.6-12.1-5.2-16.8 2.3-2.9 5.4-4.9 9.4-5.8-4.3-2-9-1.3-12.6 1.1.9-3.1.7-6.2-1.5-9z"
//               />
//             </svg>
//             <span>Annie Cakes</span>
//           </div>
//           <p>
//             We love and appreciate your support in the year <b>2024</b>
//           </p>
//           <p className="ac-card-big">
//             Cheers to a greater year <b>2025</b>
//           </p>
//         </div>

//         <div className="ac-socials">
//           <a className="ac-pill" href={IG_URL} target="_blank" rel="noreferrer">
//             <span className="ac-ic ac-ic-ig">
//               <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" strokeWidth="2">
//                 <rect x="3" y="3" width="18" height="18" rx="5" />
//                 <circle cx="12" cy="12" r="4" />
//                 <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" stroke="none" />
//               </svg>
//             </span>
//             ceoanniecakes
//           </a>
//           <a className="ac-pill" href={FB_URL} target="_blank" rel="noreferrer">
//             <span className="ac-ic ac-ic-fb">
//               <svg viewBox="0 0 24 24" width="13" height="13" fill="#fff">
//                 <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17V.2C16.6.1 15.6 0 14.5 0 12 0 10.3 1.5 10.3 4.3V6H8v3h2.3v10H14z" />
//               </svg>
//             </span>
//             Anniecakes
//           </a>
//         </div>

//         <a className="ac-pill ac-phone" href={TEL_URL}>
//           <span className="ac-ic ac-ic-tel">
//             <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff">
//               <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.4 0 .8-.3 1z" />
//             </svg>
//           </span>
//           09064976053
//         </a>

//         <div className="ac-dots" role="tablist" aria-label="Switch showcase">
//           {SLIDES.map((s, idx) => (
//             <button
//               key={idx}
//               type="button"
//               aria-label={`Show ${s.accent}`}
//               aria-current={idx === i}
//               onClick={() => setI(idx)}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// const CSS = `
// .ac-hero{
//   position:relative;overflow:hidden;isolation:isolate;
//   min-height:clamp(600px,94vh,860px);
//   color:#23202a;
//   font-family:'Poppins',ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
//   background:
//     radial-gradient(130% 90% at 82% 4%, #fdeef4 0%, #f7dbe6 46%, #f2cfdd 100%);
// }
// .ac-hero *{box-sizing:border-box;}

// /* bleeding cake, left */
// .ac-cake{position:absolute;left:clamp(-70px,-4vw,-30px);bottom:-26px;width:clamp(300px,42vw,540px);aspect-ratio:560/620;z-index:1;pointer-events:none;}
// .ac-cake img,.ac-snack img{
//   position:absolute;inset:0;width:100%;height:100%;object-fit:contain;
//   opacity:0;transform:scale(1.03);transition:opacity .7s ease,transform 1.1s ease;
// }
// .ac-cake img.on,.ac-snack img.on{opacity:1;transform:scale(1);}

// /* baubles, top-right */
// .ac-baubles{position:absolute;right:clamp(8px,3vw,52px);top:-14px;width:clamp(150px,24vw,320px);z-index:1;pointer-events:none;}

// /* bleeding snacks, bottom-right */
// .ac-snack{position:absolute;right:clamp(-50px,-3vw,-24px);bottom:clamp(-46px,-3vw,-30px);width:clamp(190px,24vw,320px);aspect-ratio:1;z-index:1;border-radius:26px;overflow:hidden;box-shadow:0 26px 60px -26px rgba(160,40,90,.5);}
// .ac-snack img{object-fit:cover;}
// .ac-badge{position:absolute;z-index:2;left:12px;bottom:12px;background:rgba(35,32,42,.6);color:#fff;font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;padding:4px 8px;border-radius:7px;}

// /* content column, right side */
// .ac-inner{
//   position:relative;z-index:3;
//   max-width:1180px;margin:0 auto;min-height:inherit;
//   padding:clamp(28px,6vh,64px) clamp(20px,5vw,52px);
//   display:flex;flex-direction:column;align-items:flex-end;justify-content:center;
//   text-align:center;
// }
// .ac-inner > *{max-width:480px;}

// .ac-year{
//   font-family:'Playfair Display',Georgia,serif;font-weight:800;
//   font-size:clamp(46px,7.5vw,78px);line-height:1;letter-spacing:.04em;
//   background:linear-gradient(180deg,#f6dc94 0%,#cd9a34 52%,#f3d485 100%);
//   -webkit-background-clip:text;background-clip:text;color:transparent;
//   filter:drop-shadow(0 3px 4px rgba(150,110,20,.28));
// }
// .ac-hny{margin:8px 0 0;font-weight:800;letter-spacing:.14em;font-size:clamp(19px,3vw,30px);color:#23202a;}
// .ac-from{margin:6px 0 0;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:500;color:#7b6a72;font-size:clamp(14px,2vw,19px);}

// .ac-brand{margin-top:12px;}
// .ac-annie{
//   display:block;font-weight:800;letter-spacing:.08em;color:#e5308a;
//   font-size:clamp(30px,5vw,50px);position:relative;
// }
// .ac-cc{
//   display:block;font-weight:800;color:#23202a;
//   font-size:clamp(30px,5.2vw,50px);line-height:1.05;
// }
// .ac-swap{
//   display:inline-block;
//   animation:ac-swap-in .5s cubic-bezier(.2,.75,.2,1);
// }
// @keyframes ac-swap-in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
// .ac-q{font-family:'Playfair Display',Georgia,serif;color:#e5308a;font-size:1.15em;line-height:0;vertical-align:-.15em;}
// .ac-q-end{margin-left:.06em;}

// /* thank-you card */
// .ac-card{
//   margin-top:22px;background:#fff;border-radius:26px;
//   padding:20px 26px;max-width:400px;
//   box-shadow:0 30px 60px -26px rgba(190,40,110,.4);
// }
// .ac-logo{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;}
// .ac-logo span{font-family:'Dancing Script',cursive;font-weight:700;font-size:22px;color:#3f2b33;}
// .ac-card p{margin:5px 0;color:#7b6a72;font-size:14.5px;line-height:1.5;}
// .ac-card b{color:#23202a;font-weight:700;}
// .ac-card-big{font-size:16px;}
// .ac-card-big b{font-size:1.12em;}

// /* pills */
// .ac-socials{margin-top:16px;display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
// .ac-pill{
//   display:inline-flex;align-items:center;gap:9px;text-decoration:none;
//   background:#fff;border-radius:999px;padding:9px 16px;
//   font-weight:600;font-size:13.5px;color:#23202a;
//   box-shadow:0 12px 26px rgba(150,40,90,.16);
//   transition:transform .15s ease,box-shadow .2s ease;
// }
// .ac-pill:hover{transform:translateY(-2px);box-shadow:0 16px 32px rgba(150,40,90,.22);}
// .ac-phone{margin-top:12px;}
// .ac-ic{width:20px;height:20px;border-radius:7px;display:grid;place-items:center;flex:0 0 auto;}
// .ac-ic-ig{background:linear-gradient(45deg,#f9ce34,#ee2a7b 45%,#6228d7);}
// .ac-ic-fb{background:#1877f2;border-radius:50%;}
// .ac-ic-tel{background:linear-gradient(45deg,#ff3d97,#ff6a3d);border-radius:50%;}

// /* switch dots */
// .ac-dots{margin-top:18px;display:flex;gap:8px;justify-content:center;}
// .ac-dots button{
//   width:8px;height:8px;padding:0;border:0;border-radius:50%;background:#f0b9d3;cursor:pointer;
//   transition:width .2s ease,background .2s ease;
// }
// .ac-dots button[aria-current="true"]{width:22px;background:linear-gradient(90deg,#e5308a,#ff6a3d);}

// /* tablet */
// @media (max-width:1024px){
//   .ac-inner{align-items:center;}
//   .ac-cake{opacity:.9;width:min(38vw,360px);left:-40px;}
//   .ac-snack{display:none;}
// }

// /* phone */
// @media (max-width:720px){
//   .ac-hero{min-height:0;}
//   .ac-baubles{width:118px;right:6px;top:-6px;opacity:.9;}
//   .ac-inner{padding-top:44px;padding-bottom:44px;}
//   .ac-cake{
//     position:static;width:min(74vw,300px);margin:2px auto 10px;
//     filter:drop-shadow(0 24px 30px rgba(160,40,100,.25));
//   }
//   .ac-inner > *{max-width:100%;}
// }

// @media (prefers-reduced-motion:reduce){
//   .ac-cake img,.ac-snack img{transition:opacity .25s ease;}
//   .ac-swap{animation:none;}
// }
// `