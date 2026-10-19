/* RaWr ThReAdZ ~ shirt designs, batch 1
 * every design is drawn on a 1500 x 1800 canvas (= 15" x 18" print at 100 px/in,
 * rendered 3x to 4500 x 5400 px = 300 dpi for printing).
 * flat colors only (no gradients) so they work for screen print, DTF or heat press.
 */
(function () {
  const PINK = "#ff2fa0", LIME = "#39ff14", CYAN = "#00e5ff", WHITE = "#ffffff",
        BLACK = "#0a0a0a", LAV = "#b388ff",
        SCENE = "#1ab0ff", SCENE_MID = "#0b86e6", SCENE_DARK = "#032a66";

  const FONTS = "https://fonts.googleapis.com/css2?family=Anton&family=Metal+Mania&family=Nosifer&family=UnifrakturMaguntia&family=Press+Start+2P&family=Permanent+Marker&family=Bungee+Shade&display=swap";

  // ---------- helpers ----------
  function pixels(grid, x, y, size, colors) {
    let out = "";
    grid.forEach((row, r) => [...row].forEach((ch, c) => {
      if (colors[ch]) out += `<rect x="${x + c * size}" y="${y + r * size}" width="${size + 0.5}" height="${size + 0.5}" fill="${colors[ch]}"/>`;
    }));
    return out;
  }
  const HEART = [".XX...XX.", "XWXX.XXXX", "XXXXXXXXX", "XXXXXXXXX", ".XXXXXXX.", "..XXXXX..", "...XXX...", "....X...."];
  const STAR = ["....X....", "....X....", "...XXX...", "XXXXXXXXX", ".XXXXXXX.", "..XXXXX..", "..XX.XX..", ".XX...XX.", ".X.....X."];
  const SPARK = ["..X..", "..X..", "XXXXX", "..X..", "..X.."];

  function cubic(p0, p1, p2, p3, t) {
    const u = 1 - t;
    return [0, 1].map(i => u * u * u * p0[i] + 3 * u * u * t * p1[i] + 3 * u * t * t * p2[i] + t * t * t * p3[i]);
  }
  function barbedWire(p0, p1, p2, p3, color, n = 7) {
    let out = `<path d="M${p0} C${p1} ${p2} ${p3}" fill="none" stroke="${color}" stroke-width="12" stroke-linecap="round"/>`;
    out += `<path d="M${p0[0]},${p0[1] + 14} C${p1[0]},${p1[1] + 14} ${p2[0]},${p2[1] + 14} ${p3[0]},${p3[1] + 14}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`;
    for (let i = 1; i < n; i++) {
      const [x, y] = cubic(p0, p1, p2, p3, i / n);
      out += `<path d="M${x - 26},${y - 20} L${x + 26},${y + 34} M${x + 26},${y - 20} L${x - 26},${y + 34}" stroke="${color}" stroke-width="10" stroke-linecap="round"/>`;
    }
    return out;
  }
  function bat(x, y, s, fill) {
    const wing = "M0 -20 C 30 -60, 90 -70, 150 -40 Q 128 -20, 120 5 Q 100 -10, 78 12 Q 60 -5, 40 18 Q 22 0, 0 22 Z";
    return `<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}">
      <path d="${wing}"/><path d="${wing}" transform="scale(-1 1)"/>
      <ellipse cx="0" cy="4" rx="22" ry="36"/><circle cx="0" cy="-30" r="20"/>
      <path d="M-18 -36 L-20 -66 L-4 -44 Z M18 -36 L20 -66 L4 -44 Z"/></g>`;
  }
  const heartPath = (cx, top, w) => {
    const s = w / 860; // base heart is 860 wide, 650 tall
    return `M${cx},${top + 100 * s} C${cx - 30 * s},${top + 40 * s} ${cx - 110 * s},${top - 25 * s} ${cx - 230 * s},${top} C${cx - 450 * s},${top + 50 * s} ${cx - 400 * s},${top + 400 * s} ${cx},${top + 650 * s} C${cx + 400 * s},${top + 400 * s} ${cx + 450 * s},${top + 50 * s} ${cx + 230 * s},${top} C${cx + 110 * s},${top - 25 * s} ${cx + 30 * s},${top + 40 * s} ${cx},${top + 100 * s} Z`;
  };
  const text = (str, x, y, font, size, fill, len, extra = "") =>
    `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}" text-anchor="middle"${len ? ` textLength="${len}" lengthAdjust="spacingAndGlyphs"` : ""} ${extra}>${str}</text>`;

  // seeded random so every render is identical
  const seeded = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // leopard / cheetah rosettes: broken dark rings around a slightly darker center, seamless tile
  function leopardPattern(id, base, mid, dark, sx = 1, sy = 1) {
    const T = 300, rnd = seeded(11);
    let spots = "";
    const arc = (cx, cy, rx, ry, a1, a2) => {
      const p = a => [(cx + Math.cos(a) * rx).toFixed(1), (cy + Math.sin(a) * ry).toFixed(1)];
      return `M${p(a1)} A${rx} ${ry} 0 0 1 ${p(a2)}`;
    };
    const rosette = (cx, cy, r, rot) => {
      let g = `<g transform="rotate(${rot} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${r * 0.72}" ry="${r * 0.55}" fill="${mid}"/>`;
      let a = rnd() * 6.28;
      const segs = 2 + Math.floor(rnd() * 3), squash = 0.65 + rnd() * 0.3;
      for (let k = 0; k < segs; k++) {
        const len = (6.28 / segs) * (0.35 + rnd() * 0.45), rr = r * (0.85 + rnd() * 0.3);
        g += `<path d="${arc(cx, cy, rr, rr * squash, a, a + len)}" fill="none" stroke="${dark}" stroke-width="${(r * (0.24 + rnd() * 0.2)).toFixed(1)}" stroke-linecap="round"/>`;
        a += 6.28 / segs + (rnd() - 0.5) * 0.4;
      }
      return g + `</g>`;
    };
    const items = [];
    for (let i = 0; i < 17; i++) items.push(["r", rnd() * T, rnd() * T, 16 + rnd() * 22, rnd() * 180]);
    for (let i = 0; i < 34; i++) items.push(["d", rnd() * T, rnd() * T, 3 + rnd() * 8, rnd() * 180]);
    items.forEach(([kind, x, y, r, rot]) => {
      for (const ox of [-T, 0, T]) for (const oy of [-T, 0, T]) {
        const cx = x + ox, cy = y + oy;
        if (cx < -60 || cx > T + 60 || cy < -60 || cy > T + 60) continue;
        spots += kind === "r" ? rosette(cx, cy, r, rot)
          : `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.75).toFixed(1)}" transform="rotate(${rot.toFixed(0)} ${cx.toFixed(1)} ${cy.toFixed(1)})" fill="${dark}"/>`;
      }
    });
    return `<pattern id="${id}" width="${T}" height="${T}" patternUnits="userSpaceOnUse" patternTransform="scale(${sx} ${sy})"><rect width="${T}" height="${T}" fill="${base}"/>${spots}</pattern>`;
  }

  // worn / cracked vintage print: a mask that knocks tiny specks + cracks out of the ink
  function distressMask(id, seed = 3, amount = 1) {
    const rnd = seeded(seed);
    let holes = "";
    for (let i = 0; i < 2600 * amount; i++) {
      const x = rnd() * 1500, y = rnd() * 1800, r = 1 + rnd() * rnd() * 6;
      holes += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}"/>`;
    }
    for (let i = 0; i < 160 * amount; i++) {
      let x = rnd() * 1500, y = rnd() * 1800, d = `M${x.toFixed(0)},${y.toFixed(0)}`;
      for (let k = 0; k < 3 + Math.floor(rnd() * 4); k++) {
        x += (rnd() - 0.5) * 34; y += (rnd() - 0.5) * 34; d += ` L${x.toFixed(0)},${y.toFixed(0)}`;
      }
      holes += `<path d="${d}" fill="none" stroke="#000" stroke-width="${(1 + rnd() * 1.5).toFixed(1)}"/>`;
    }
    return `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="1500" height="1800"><rect width="1500" height="1800" fill="#fff"/><g fill="#000">${holes}</g></mask>`;
  }

  // nautical star: each point split into a light + dark half
  function nauticalStar(cx, cy, R, light, dark, rot = 0) {
    const r = R * 0.42;
    let out = `<g transform="rotate(${rot} ${cx} ${cy})">`;
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + i * 2 * Math.PI / 5;
      const tip = [cx + Math.cos(a) * R, cy + Math.sin(a) * R];
      const l = [cx + Math.cos(a - Math.PI / 5) * r, cy + Math.sin(a - Math.PI / 5) * r];
      const rr = [cx + Math.cos(a + Math.PI / 5) * r, cy + Math.sin(a + Math.PI / 5) * r];
      out += `<path d="M${cx},${cy} L${tip} L${l} Z" fill="${light}"/><path d="M${cx},${cy} L${tip} L${rr} Z" fill="${dark}"/>`;
    }
    return out + `</g>`;
  }
  // tall, stretched-down word
  const tallWord = (str, cx, baseline, size, stretch, len, attrs) =>
    `<g transform="translate(${cx} ${baseline}) scale(1 ${stretch})"><text x="0" y="0" font-family="'Anton'" font-size="${size}" text-anchor="middle" textLength="${len}" lengthAdjust="spacingAndGlyphs" ${attrs}>${str}</text></g>`;

  // ---------- the designs ----------
  const DESIGNS = [
    {
      id: "swag-white",
      name: "#SWAG",
      blurb: "big tall white #SWAG on a scene blue tee w/ a lil worn-in print texture. simple, loud, 2009.",
      inks: [WHITE], tees: ["#1e9fd8", BLACK],
      art: () => `
        ${distressMask("worn-swag", 9, 0.8)}
        <g mask="url(#worn-swag)">
          ${tallWord("#SWAG", 750, 1290, 540, 1.75, 1360, `fill="${WHITE}"`)}
        </g>`,
    },
    {
      id: "breakdowns-broken-hearts",
      name: "Breakdowns & Broken Hearts",
      blurb: "a cracked, stitched-up heart wrapped in barbed wire. for everyone who's been through it and kept moshing.",
      inks: [WHITE, PINK], tees: [BLACK, "#2b0d1f"],
      art: () => {
        const crack = "L 770 1200 L 720 1100 L 790 1000 L 710 900 Z";
        return `
        ${text("BREAKDOWNS", 750, 470, "'Metal Mania'", 250, WHITE, 1320)}
        <path d="M750 800 C 720 740, 640 675, 520 700 C 300 750, 350 1100, 750 1350 ${crack}" fill="${PINK}"/>
        <g transform="translate(34 18) rotate(5 750 1000)"><path d="M750 800 C 780 740, 860 675, 980 700 C 1200 750, 1150 1100, 750 1350 ${crack}" fill="${PINK}"/></g>
        <g stroke="${WHITE}" stroke-width="12" stroke-linecap="round">
          <path d="M700 860 L800 900 M690 960 L800 990 M720 1060 L820 1090 M700 1160 L800 1180"/>
        </g>
        ${barbedWire([270, 900], [500, 790], [1000, 1040], [1230, 900], WHITE)}
        ${barbedWire([290, 1110], [520, 1200], [990, 980], [1210, 1090], WHITE)}
        ${text("&amp; BROKEN HEARTS", 750, 1600, "'Metal Mania'", 170, PINK, 1300)}`;
      },
    },
    {
      id: "scene-is-not-dead",
      name: "Scene Is Not Dead",
      blurb: "a skull w/ the side-swept bangs + a lime bow. scene never died, it was just straightening its hair.",
      inks: [WHITE, PINK, LIME], tees: [BLACK, "#3d0066"],
      art: () => `
        <path id="arc-scene" d="M 100 1000 A 650 650 0 0 1 1400 1000" fill="none"/>
        <text font-family="'UnifrakturMaguntia'" font-size="200" fill="${WHITE}" text-anchor="middle"><textPath href="#arc-scene" startOffset="50%">Scene Is</textPath></text>
        <path d="M750 540 C 950 540, 1090 680, 1090 880 C 1090 1000, 1030 1080, 960 1120 L 960 1260 Q 960 1300 920 1300 L 580 1300 Q 540 1300 540 1260 L 540 1120 C 470 1080, 410 1000, 410 880 C 410 680, 550 540, 750 540 Z" fill="${WHITE}"/>
        <ellipse cx="870" cy="930" rx="85" ry="95" fill="${BLACK}"/>
        <ellipse cx="635" cy="935" rx="80" ry="90" fill="${BLACK}"/>
        <path d="M750 1010 L 712 1080 Q 750 1100 788 1080 Z" fill="${BLACK}"/>
        <g stroke="${BLACK}" stroke-width="12"><path d="M600 1180 L900 1180"/>
          <path d="M630 1150 L630 1300 M690 1150 L690 1300 M750 1150 L750 1300 M810 1150 L810 1300 M870 1150 L870 1300"/></g>
        <path d="M395 960 C 350 650, 560 470, 790 478 C 990 486, 1120 620, 1104 830 C 1050 730, 960 672, 840 668 C 790 790, 660 900, 540 1030 C 480 1000, 420 990, 395 960 Z" fill="${PINK}"/>
        <g fill="none" stroke="${BLACK}" stroke-width="8" stroke-linecap="round" opacity=".6">
          <path d="M520 560 C 600 640, 640 760, 600 900"/><path d="M640 520 C 720 600, 760 700, 720 820"/><path d="M800 500 C 900 560, 980 640, 1020 740"/></g>
        <g fill="${LIME}" transform="rotate(18 1000 560)">
          <path d="M1000 560 L 880 480 L 870 650 Z"/><path d="M1000 560 L 1120 480 L 1130 650 Z"/><circle cx="1000" cy="565" r="40"/></g>
        ${text("Not Dead", 750, 1580, "'UnifrakturMaguntia'", 280, PINK, 1050)}`,
    },
    {
      id: "rawr-xd",
      name: "Rawr XD",
      blurb: "a pixel dino w/ pink scene bangs yelling rawr. which, as we all know, means i love u in dinosaur.",
      inks: [LIME, PINK, WHITE], tees: [BLACK, "#ff69b4"],
      art: () => {
        const dino = [
          "..........HHHHH.....",
          "........HHHHHHHXX...",
          ".......HHHHHHXXXXXX.",
          ".......HHHHXXOXXXXXX",
          ".......XXXXXXXXXXXXX",
          ".......XXXXXXXW.W.W.",
          ".......XXXXXXX......",
          ".......XXXXXXXXXX...",
          "X.....XXXXXX........",
          "XX...XXXXXXXXX......",
          "XXX.XXXXXXXX.X......",
          "XXXXXXXXXXXX........",
          ".XXXXXXXXXXX........",
          "..XXXXXXXXX.........",
          "...XXXXXXX..........",
          "....XXX.XX..........",
          "....XX...XX.........",
        ];
        let checker = "";
        for (let i = 0; i < 20; i++) checker += `<rect x="${250 + i * 50}" y="${1390 + (i % 2) * 30}" width="50" height="30" fill="${WHITE}"/>`;
        return `
        ${pixels(dino, 230, 600, 46, { X: LIME, H: PINK, O: WHITE, W: WHITE })}
        <path d="M980 330 H 1330 Q 1370 330 1370 370 V 520 Q 1370 560 1330 560 H 1110 L 1040 640 L 1050 560 H 980 Q 940 560 940 520 V 370 Q 940 330 980 330 Z" fill="${WHITE}"/>
        ${text("RAWR!", 1155, 480, "'Press Start 2P'", 72, BLACK, 360)}
        ${checker}
        ${text("i love u (in dinosaur)", 750, 1600, "'Permanent Marker'", 120, WHITE, 1250)}
        ${pixels(SPARK, 1180, 760, 18, { X: PINK })}${pixels(SPARK, 1290, 960, 14, { X: WHITE })}${pixels(SPARK, 160, 420, 16, { X: WHITE })}`;
      },
    },
    {
      id: "top-8-or-die",
      name: "Top 8 Or Die",
      blurb: "8 pixel hearts in a myspace friend box. who made ur top 8? who got bumped?? the drama never ends.",
      inks: [PINK, CYAN, WHITE], tees: [BLACK, "#1a1a1a"],
      art: () => {
        let hearts = "";
        const cols = [PINK, CYAN, WHITE, PINK, CYAN, WHITE, PINK, CYAN];
        for (let i = 0; i < 8; i++) {
          const cx = 315 + (i % 4) * 290, cy = 760 + Math.floor(i / 4) * 280;
          hearts += pixels(HEART, cx - 90, cy - 80, 20, { X: cols[i], W: i % 3 === 2 ? PINK : WHITE });
          hearts += text(`#${i + 1}`, cx, cy + 135, "'Press Start 2P'", 30, WHITE);
        }
        return `
        ${text("TOP 8", 750, 470, "'Metal Mania'", 300, PINK, 900)}
        <rect x="160" y="560" width="1180" height="760" fill="none" stroke="${WHITE}" stroke-width="12"/>
        <rect x="160" y="560" width="1180" height="90" fill="${CYAN}"/>
        ${text("xX my friend space Xx", 750, 622, "'Press Start 2P'", 40, BLACK, 900)}
        ${hearts}
        ${text("OR DIE", 750, 1600, "'Metal Mania'", 280, WHITE, 1000)}`;
      },
    },
    {
      id: "up-til-3am",
      name: "Up Til 3AM",
      blurb: "bats flying across a big crescent moon. for the night owls making layouts + crying to breakdowns til sunrise.",
      inks: [WHITE, LAV], tees: [BLACK, "#2b0d1f"],
      art: () => `
        <mask id="moon-mask"><rect width="1500" height="1800" fill="#000"/><circle cx="740" cy="830" r="360" fill="#fff"/><circle cx="880" cy="760" r="310" fill="#000"/></mask>
        <rect width="1500" height="1800" fill="${WHITE}" mask="url(#moon-mask)"/>
        ${bat(560, 760, 1.5, BLACK)}${bat(470, 1000, 1.0, BLACK)}
        ${bat(1040, 700, 1.3, LAV)}${bat(1180, 960, 0.8, LAV)}${bat(980, 1120, 0.6, LAV)}
        ${pixels(STAR, 1200, 470, 16, { X: WHITE })}${pixels(SPARK, 300, 560, 16, { X: LAV })}${pixels(SPARK, 1290, 1180, 14, { X: WHITE })}${pixels(STAR, 230, 1180, 12, { X: LAV })}
        ${text("Up Til 3am", 750, 1460, "'UnifrakturMaguntia'", 260, LAV, 1150)}
        ${text("night owls club", 750, 1590, "'Press Start 2P'", 56, WHITE, 960)}`,
    },
    {
      id: "eyeliner-is-my-personality",
      name: "Eyeliner Is My Personality",
      blurb: "a dramatic winged eye w/ a single pink tear + drippy letters. made for white or pink shirts.",
      inks: [BLACK, PINK], tees: [WHITE, "#ff69b4"],
      art: () => `
        ${text("EYELINER", 750, 460, "'Nosifer'", 190, PINK, 1320)}
        <clipPath id="eye-clip"><path d="M380 860 Q 750 570 1120 860 Q 750 1090 380 860 Z"/></clipPath>
        <path d="M380 860 Q 750 570 1120 860 Q 750 1090 380 860 Z" fill="${WHITE}"/>
        <g clip-path="url(#eye-clip)"><circle cx="750" cy="850" r="165" fill="${PINK}"/><circle cx="750" cy="850" r="78" fill="${BLACK}"/><circle cx="795" cy="805" r="28" fill="${WHITE}"/></g>
        <path d="M360 870 Q 750 540 1130 840 L 1290 680 L 1110 890 Q 750 620 390 880 Z" fill="${BLACK}"/>
        <path d="M400 870 Q 750 1100 1110 870 Q 750 1060 400 870 Z" fill="${BLACK}"/>
        <g stroke="${BLACK}" stroke-width="14" stroke-linecap="round">
          <path d="M470 770 L430 690 M560 715 L535 625 M660 685 L650 590 M760 678 L770 580 M860 692 L885 600 M955 730 L995 650"/></g>
        <path d="M610 1040 C 575 1100, 570 1140, 610 1150 C 650 1140, 645 1100, 610 1040 Z" fill="${PINK}"/>
        ${text("is my personality", 750, 1460, "'Permanent Marker'", 140, BLACK, 1280)}`,
    },
    {
      id: "now-playing-my-feelings",
      name: "Now Playing: My Feelings",
      blurb: "a mixtape labeled 'my feelings (sad mix)' w/ a progress bar that says forever. ur profile song, but it's ur life.",
      inks: [WHITE, PINK, LIME], tees: [BLACK, "#3d0066"],
      art: () => `
        ${text("NOW PLAYING:", 750, 460, "'Press Start 2P'", 76, LIME, 1100)}
        <rect x="230" y="580" width="1040" height="690" rx="40" fill="none" stroke="${WHITE}" stroke-width="18"/>
        <rect x="320" y="650" width="860" height="250" rx="16" fill="${PINK}"/>
        ${text("my feelings (sad mix)", 750, 770, "'Permanent Marker'", 76, BLACK, 760)}
        ${text("SIDE A", 420, 860, "'Press Start 2P'", 30, BLACK)}${text("C-90", 1080, 860, "'Press Start 2P'", 30, BLACK)}
        <rect x="460" y="940" width="580" height="140" rx="70" fill="none" stroke="${WHITE}" stroke-width="12"/>
        <g fill="none" stroke="${WHITE}" stroke-width="12"><circle cx="560" cy="1010" r="52"/><circle cx="940" cy="1010" r="52"/></g>
        <g stroke="${WHITE}" stroke-width="10" stroke-linecap="round">
          <path d="M560 965 V990 M560 1030 V1055 M515 1010 H540 M580 1010 H605 M940 965 V990 M940 1030 V1055 M895 1010 H920 M960 1010 H985"/></g>
        <path d="M400 1270 L 450 1150 L 1050 1150 L 1100 1270" fill="none" stroke="${WHITE}" stroke-width="14"/>
        <g fill="${WHITE}"><circle cx="290" cy="640" r="14"/><circle cx="1210" cy="640" r="14"/><circle cx="290" cy="1210" r="14"/><circle cx="1210" cy="1210" r="14"/></g>
        <rect x="260" y="1380" width="980" height="40" fill="none" stroke="${LIME}" stroke-width="8"/>
        <rect x="260" y="1380" width="600" height="40" fill="${LIME}"/>
        ${text("&#9654; 3:33 / forever", 750, 1530, "'Press Start 2P'", 54, WHITE, 900)}`,
    },
    {
      id: "sad-but-rad",
      name: "Sad But Rad",
      blurb: "a big checkered heart + pixel stars. sad, but make it rad.",
      inks: [PINK, WHITE], tees: [BLACK, "#00b7d9"],
      art: () => `
        <pattern id="checks" width="140" height="140" patternUnits="userSpaceOnUse" x="40" y="10">
          <rect width="70" height="70" fill="${PINK}"/><rect x="70" y="70" width="70" height="70" fill="${PINK}"/></pattern>
        ${text("SAD", 750, 500, "'Metal Mania'", 320, WHITE, 620)}
        <path d="${heartPath(750, 640, 900)}" fill="url(#checks)" stroke="${WHITE}" stroke-width="22" stroke-linejoin="round"/>
        ${pixels(STAR, 170, 640, 22, { X: WHITE })}${pixels(STAR, 1150, 1110, 18, { X: PINK })}${pixels(SPARK, 1220, 620, 20, { X: PINK })}${pixels(SPARK, 230, 1180, 18, { X: WHITE })}
        ${text("BUT RAD", 750, 1610, "'Metal Mania'", 300, PINK, 1150)}`,
    },
  ];

  // full standalone svg for one design (transparent background)
  function designSVG(d, { fonts = true } = {}) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 1800" width="1500" height="1800">` +
      (fonts ? `<style>@import url('${FONTS.replace(/&/g, "&amp;")}');</style>` : "") +
      d.art() + `</svg>`;
  }

  const api = { DESIGNS, designSVG, FONTS };
  if (typeof module !== "undefined") module.exports = api;
  else window.RAWR_DESIGNS = api;
})();
