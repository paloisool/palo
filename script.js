/* ~*~ RaWr ThReAdZ shop script ~*~
 * EDIT THE STUFF IN THIS FIRST SECTION to make the shop yours.
 */

// where checkout orders get emailed to
const SHOP_EMAIL = "your-email@example.com"; // <-- CHANGE THIS
// optional: your paypal.me / venmo / cashapp link (leave "" to hide)
const PAY_LINK = "";

const SHIPPING_FLAT = 5;         // $ per order
const FREE_SHIPPING_OVER = 75;   // $ subtotal for free shipping
const BUNDLE_MIN = 2;            // items needed for bundle discount
const BUNDLE_DISCOUNT = 0.10;    // 10% off

/* YOUR MERCH ~ every item is one-of-a-kind.
 *  type:   "tee" | "hoodie" | "sweater"
 *  img:    path to a real photo (e.g. "images/tee1.jpg"). leave out to use a drawn placeholder.
 *  color / ink: placeholder shirt color + print color
 *  motif:  placeholder graphic: skull | heart | broken | star | bat | dino | bolt | crown
 *  sold:   true to show it as SOLD
 *  top8:   true to put it in the Top 8
 */
const PRODUCTS = [
  { id: "me-01", name: "Midnight Eyeliner — 'Cry Til Dawn' Tour Tee", band: "Midnight Eyeliner", type: "tee",
    size: "M", price: 38, was: 45, year: "2006", condition: "8/10 ~ light fade, cracked print (it's character)",
    color: "#0d0d0d", ink: "#ff2fa0", motif: "broken", tag: "NEW", top8: true,
    desc: "soft af black tee from the cry til dawn tour. back print lists all the dates. smells like a hot topic in 2006 (it doesn't, i washed it)." },
  { id: "vc-02", name: "Velvet Coffin — Bat Logo Zip Hoodie", band: "Velvet Coffin", type: "hoodie",
    size: "L", price: 64, year: "2004", condition: "9/10 ~ thumb holes intact!!",
    color: "#1a1a1a", ink: "#9d00ff", motif: "bat", tag: "RARE", top8: true,
    desc: "the holy grail. full zip, thumb holes, purple puff print bat on the front. barely worn." },
  { id: "sh-03", name: "Sk8r Hearts — Checkered Heart Tee", band: "Sk8r Hearts", type: "tee",
    size: "S", price: 30, year: "2007", condition: "9/10",
    color: "#ff69b4", ink: "#0d0d0d", motif: "heart", top8: true,
    desc: "hot pink baby tee w/ black checkered heart. fitted, cropped-ish. pair w/ a studded belt for full effect." },
  { id: "wt-04", name: "The Wristband Theory — Skull Crewneck Sweater", band: "The Wristband Theory", type: "sweater",
    size: "XL", price: 55, year: "2005", condition: "8/10 ~ tiny pill on left sleeve",
    color: "#2b0d1f", ink: "#39ff14", motif: "skull", top8: true,
    desc: "oversized maroon crewneck w/ lime skull. perfect for crying in a parking lot in october." },
  { id: "rm-05", name: "Rawr Means Forever — Dino Tee", band: "Rawr Means Forever", type: "tee",
    size: "M", price: 34, year: "2008", condition: "10/10 deadstock",
    color: "#39ff14", ink: "#0d0d0d", motif: "dino", tag: "NEW", top8: true,
    desc: "neon green tee w/ a dino that is saying rawr (i love u). deadstock, never worn, still has the fold lines." },
  { id: "bl-06", name: "Black Lace Ballroom — Crown Pullover Hoodie", band: "Black Lace Ballroom", type: "hoodie",
    size: "M", price: 58, year: "2006", condition: "8/10",
    color: "#0d0d0d", ink: "#ffd700", motif: "crown", top8: true,
    desc: "black pullover with gold crown + band name across the chest. kangaroo pocket for ur ipod nano." },
  { id: "sv-07", name: "Static Valentine — Lightning Tee", band: "Static Valentine", type: "tee",
    size: "L", price: 32, year: "2005", condition: "7/10 ~ some fading, priced accordingly",
    color: "#00b7d9", ink: "#ffffff", motif: "bolt", top8: true,
    desc: "faded cyan tee w/ lightning bolt. very warped tour core." },
  { id: "nm-08", name: "Neon Mascara — Star Sweater", band: "Neon Mascara", type: "sweater",
    size: "M", price: 48, year: "2007", condition: "9/10",
    color: "#111111", ink: "#ff2fa0", motif: "star", top8: true,
    desc: "black knit-feel crewneck, pink star. the sleeves are long enough to hide ur hands in." },
  { id: "gg-09", name: "Glitter & Gloom — Broken Heart Tee", band: "Glitter & Gloom", type: "tee",
    size: "XS", price: 28, year: "2009", condition: "9/10",
    color: "#ffffff", ink: "#ff0080", motif: "broken", sold: true,
    desc: "white baby tee, hot pink broken heart. sorry babe it's gone :'(" },
  { id: "pm-10", name: "Panic at the Mall — Skull Zip Hoodie", band: "Panic at the Mall", type: "hoodie",
    size: "S", price: 60, year: "2006", condition: "8/10",
    color: "#ff2fa0", ink: "#0d0d0d", motif: "skull",
    desc: "pink zip hoodie w/ black skull. the most scene thing i own. i'm sad to see it go fr." },
  { id: "hf-11", name: "Hearts on Fire Escape — Bat Tee", band: "Hearts on Fire Escape", type: "tee",
    size: "XL", price: 33, year: "2004", condition: "8/10",
    color: "#3d0066", ink: "#00e5ff", motif: "bat",
    desc: "purple tee, cyan bat. huge on the back too. fits like a dress on some ppl." },
  { id: "pk-12", name: "Paramour Kids — Star Longsleeve Sweater", band: "Paramour Kids", type: "sweater",
    size: "L", price: 46, year: "2008", condition: "9/10",
    color: "#0d0d0d", ink: "#ffffff", motif: "star", sold: true,
    desc: "black + white star crewneck. sold to a fellow emo kid ♥" },
];

/* ---------- (u don't need to edit below here unless u want to) ---------- */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => "$" + n.toFixed(2);
const byId = id => PRODUCTS.find(p => p.id === id);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- placeholder garment art ---------- */
const MOTIFS = {
  skull: ink => `<g fill="${ink}"><path d="M100 82c-17 0-28 11-28 26 0 9 4 15 10 19v9h36v-9c6-4 10-10 10-19 0-15-11-26-28-26z"/></g>
    <g fill="currentColor"><circle cx="89" cy="108" r="7"/><circle cx="111" cy="108" r="7"/><path d="M100 115l-4 7h8z"/>
    <rect x="88" y="129" width="3" height="7"/><rect x="95" y="129" width="3" height="7"/><rect x="102" y="129" width="3" height="7"/><rect x="109" y="129" width="3" height="7"/></g>`,
  heart: ink => `<path fill="${ink}" d="M100 140 C 60 115, 66 82, 86 84 C 94 85, 98 90, 100 95 C 102 90, 106 85, 114 84 C 134 82, 140 115, 100 140z"/>
    <g fill="currentColor" opacity=".9"><rect x="84" y="94" width="8" height="8"/><rect x="100" y="94" width="8" height="8"/><rect x="92" y="102" width="8" height="8"/><rect x="108" y="102" width="8" height="8"/><rect x="84" y="110" width="8" height="8"/><rect x="100" y="110" width="8" height="8"/><rect x="92" y="118" width="8" height="8"/></g>`,
  broken: ink => `<path fill="${ink}" d="M98 138 C 60 115, 66 82, 86 84 C 94 85, 97 90, 99 94 L 94 104 L 102 112 L 96 124z"/>
    <path fill="${ink}" d="M104 138 C 140 115, 134 82, 114 84 C 106 85, 103 90, 103 94 L 98 104 L 106 112 L 100 124z" transform="translate(4 3) rotate(6 104 110)"/>`,
  star: ink => `<path fill="${ink}" d="M100 78l9 22 24 2-18 15 6 23-21-13-21 13 6-23-18-15 24-2z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M100 90l5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1z"/>`,
  bat: ink => `<path fill="${ink}" d="M100 98c-3-6-3-10 0-12 3 2 3 6 0 12zm0 0c6-8 14-12 22-12-2 4-1 8 2 10 4-4 10-5 16-3-6 4-10 12-10 22-4-4-9-5-14-3-2-6-8-9-14-9-4 0-6 3-2 0l0 0c-6 0-12 3-14 9-5-2-10-1-14 3 0-10-4-18-10-22 6-2 12-1 16 3 3-2 4-6 2-10 8 0 16 4 22 12z"/>
    <circle cx="96" cy="94" r="1.5" fill="currentColor"/><circle cx="104" cy="94" r="1.5" fill="currentColor"/>`,
  dino: ink => `<path fill="${ink}" d="M74 136l4-22c-6-4-8-12-4-18l10-2 4-12c4-8 16-10 24-6 8 4 10 12 6 18l-10 4 2 8 14 6 8-6c2 6 0 12-6 16l-6 12h-8l-2-8-14 2-2 8z"/>
    <circle cx="108" cy="82" r="2.5" fill="currentColor"/><text x="100" y="152" text-anchor="middle" font-size="10" font-family="'Press Start 2P',monospace" fill="${ink}">rawr</text>`,
  bolt: ink => `<path fill="${ink}" d="M108 76l-30 38h18l-8 30 32-42h-19z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M108 76l-30 38h18l-8 30 32-42h-19z"/>`,
  crown: ink => `<path fill="${ink}" d="M72 130l-4-38 18 16 14-24 14 24 18-16-4 38z"/><rect x="72" y="132" width="56" height="7" fill="${ink}"/>
    <g fill="currentColor"><circle cx="86" cy="122" r="3"/><circle cx="100" cy="118" r="4"/><circle cx="114" cy="122" r="3"/></g>`,
};

function garmentSVG(p) {
  if (p.img) return `<img src="${p.img}" alt="${p.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block">`;
  const c = p.color, ink = p.ink;
  // "currentColor" in motifs = the shirt color, so cutouts look printed
  const shade = "rgba(0,0,0,.25)";
  let body = "";
  if (p.type === "tee") {
    body = `<path d="M62 32 L82 22 Q100 36 118 22 L138 32 L178 54 L162 84 L144 76 L144 182 L56 182 L56 76 L38 84 L22 54 Z" fill="${c}" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M82 22 Q100 42 118 22" fill="none" stroke="#000" stroke-width="2.5"/>
      <path d="M144 76 L144 90 M56 76 L56 90" stroke="${shade}" stroke-width="2"/>`;
  } else {
    const hood = p.type === "hoodie"
      ? `<path d="M70 34 Q70 4 100 4 Q130 4 130 34 Q100 52 70 34 Z" fill="${c}" stroke="#000" stroke-width="2.5"/>
         <path d="M78 34 Q100 46 122 34" fill="none" stroke="${shade}" stroke-width="5"/>`
      : "";
    body = `${hood}
      <path d="M62 32 L82 24 Q100 36 118 24 L138 32 Q166 42 172 72 L186 166 L166 170 L150 94 L148 182 L52 182 L50 94 L34 170 L14 166 L28 72 Q34 42 62 32 Z" fill="${c}" stroke="#000" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="52" y="172" width="96" height="10" fill="${shade}"/>
      <path d="M14 166 L34 170 L33 160 L16 157 Z M186 166 L166 170 L167 160 L184 157 Z" fill="${shade}"/>`;
    if (p.type === "hoodie") {
      body += `<path d="M72 146 L128 146 L136 172 L64 172 Z" fill="none" stroke="${shade}" stroke-width="2.5"/>
        <path d="M92 38 L90 70 M108 38 L110 70" stroke="#eee" stroke-width="2"/><circle cx="90" cy="71" r="2" fill="#ccc"/><circle cx="110" cy="71" r="2" fill="#ccc"/>`;
    } else {
      body += `<path d="M82 24 Q100 42 118 24" fill="none" stroke="#000" stroke-width="2.5"/>
        <path d="M84 27 Q100 40 116 27" fill="none" stroke="${shade}" stroke-width="4"/>`;
    }
  }
  const words = p.band.split(" ");
  const half = Math.ceil(words.length / 2);
  const l1 = words.length > 2 ? words.slice(0, half).join(" ") : p.band;
  const l2 = words.length > 2 ? words.slice(half).join(" ") : "";
  const textTop = p.type === "hoodie" ? 80 : 66;
  const motifY = p.type === "hoodie" ? 12 : 4;
  return `<svg viewBox="0 0 200 200" role="img" aria-label="${p.name}" style="color:${c}">
    ${body}
    <g font-family="'Pirata One',serif" fill="${ink}" text-anchor="middle" stroke="#000" stroke-width=".6" paint-order="stroke">
      <text x="100" y="${textTop - (l2 ? 8 : 0)}" font-size="${l1.length > 14 ? 11 : 14}">${l1}</text>
      ${l2 ? `<text x="100" y="${textTop + 6}" font-size="${l2.length > 14 ? 11 : 14}">${l2}</text>` : ""}
    </g>
    <g transform="translate(0 ${motifY}) translate(100 110) scale(.82) translate(-100 -110)">${MOTIFS[p.motif](ink)}</g>
    <text x="100" y="${p.type === "hoodie" ? 142 : 166}" font-family="monospace" font-size="7" fill="${ink}" text-anchor="middle" opacity=".85">~ ${p.year} ~</text>
  </svg>`;
}

/* ---------- top 8 ---------- */
function renderTop8() {
  const items = PRODUCTS.filter(p => p.top8 && !p.sold).slice(0, 8);
  $(".top8-count .hot").textContent = items.length;
  $("#top8-grid").innerHTML = items.map(p => `
    <button type="button" class="friend" data-view="${p.id}">
      <div class="thumb">${garmentSVG(p)}</div>
      <b>${p.band}</b>
    </button>`).join("");
}

/* ---------- shop ---------- */
let filter = "all";
let sort = "new";

function renderShop() {
  let items = PRODUCTS.map((p, i) => ({ ...p, i }));
  if (filter !== "all") items = items.filter(p => p.type === filter);
  if (sort === "low") items.sort((a, b) => a.price - b.price);
  else if (sort === "high") items.sort((a, b) => b.price - a.price);
  // sold stuff sinks to the bottom
  items.sort((a, b) => (a.sold ? 1 : 0) - (b.sold ? 1 : 0));

  const cart = getCart();
  $("#shop-grid").innerHTML = items.map(p => {
    const inCart = cart.includes(p.id);
    const tag = p.sold ? `<span class="tag sold">SOLD</span>`
      : p.tag ? `<span class="tag ${p.tag === "RARE" ? "rare" : ""}">${p.tag}</span>` : "";
    return `<article class="card ${p.sold ? "is-sold" : ""}">
      ${tag}
      <button type="button" class="img" data-view="${p.id}" aria-label="view ${p.name}">${garmentSVG(p)}</button>
      <h4>${p.name}</h4>
      <div class="meta">${p.type} · size ${p.size} · ${p.year}</div>
      <div class="price">${money(p.price)}${p.was ? `<s>${money(p.was)}</s>` : ""}</div>
      <button type="button" class="btn-glitter" data-add="${p.id}" ${p.sold || inCart ? "disabled" : ""}>
        ${p.sold ? "sold out :'(" : inCart ? "in cart ♥" : "add 2 cart"}
      </button>
    </article>`;
  }).join("") || `<p class="cart-empty">nothing here yet... check back soon xD</p>`;
}

/* ---------- product modal ---------- */
function openModal(id) {
  const p = byId(id);
  if (!p) return;
  const inCart = getCart().includes(p.id);
  $("#modal-title").textContent = p.band.toLowerCase().replace(/\s+/g, "_") + ".exe";
  $("#modal-body").innerHTML = `
    <div class="m-img">${garmentSVG(p)}</div>
    <div>
      <h3>${p.name}</h3>
      <div class="m-price">${money(p.price)}${p.was ? ` <s style="font-size:10px;color:#777">${money(p.was)}</s>` : ""}</div>
      <p class="m-desc">${p.desc}</p>
      <dl>
        <dt>type:</dt><dd>${p.type}</dd>
        <dt>size:</dt><dd>${p.size}</dd>
        <dt>era:</dt><dd>${p.year}</dd>
        <dt>condition:</dt><dd>${p.condition}</dd>
        <dt>qty:</dt><dd>1 (one of a kind!!)</dd>
      </dl>
      <button type="button" class="btn-glitter" data-add="${p.id}" ${p.sold || inCart ? "disabled" : ""}>
        ${p.sold ? "sold out :'(" : inCart ? "already in ur cart ♥" : "add 2 cart ♥"}
      </button>
    </div>`;
  $("#modal").hidden = false;
  $("#modal-close").focus();
}
function closeModal() { $("#modal").hidden = true; }

/* ---------- cart ---------- */
function getCart() { return store.get("rawr-cart", []).filter(id => byId(id) && !byId(id).sold); }
function setCart(c) { store.set("rawr-cart", c); updateCart(); renderShop(); }

function addToCart(id) {
  const c = getCart();
  if (c.includes(id)) return toast("already in ur cart silly ♥");
  c.push(id);
  setCart(c);
  toast("added 2 cart!! rawr xD");
  if (!$("#modal").hidden) openModal(id);
}
function removeFromCart(id) { setCart(getCart().filter(x => x !== id)); }

function totals() {
  const items = getCart().map(byId);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const discount = items.length >= BUNDLE_MIN ? subtotal * BUNDLE_DISCOUNT : 0;
  const after = subtotal - discount;
  const shipping = items.length === 0 || after >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  return { items, subtotal, discount, shipping, total: after + shipping };
}

function updateCart() {
  const t = totals();
  $$(".cart-count").forEach(el => (el.textContent = t.items.length));
  $("#cart-items").innerHTML = t.items.length
    ? t.items.map(p => `<div class="cart-item">
        <div class="ci-img">${garmentSVG(p)}</div>
        <div><div class="ci-name">${p.name}</div><div class="ci-meta">size ${p.size} · ${p.type}</div>
          <button type="button" class="ci-remove" data-remove="${p.id}">✖ remove</button></div>
        <div class="ci-price">${money(p.price)}</div>
      </div>`).join("")
    : `<p class="cart-empty">ur cart is empty...<br>just like my heart :'(</p>`;
  $("#cart-subtotal").textContent = money(t.subtotal);
  $("#discount-line").hidden = !t.discount;
  $("#cart-discount").textContent = "-" + money(t.discount);
  $("#cart-shipping").textContent = t.items.length && !t.shipping ? "FREE ♥" : money(t.shipping);
  $("#cart-total").textContent = money(t.total);
  $("#checkout").disabled = !t.items.length;
}

function openCart() {
  $("#cart").classList.add("open");
  $("#cart").setAttribute("aria-hidden", "false");
  $("#cart-overlay").hidden = false;
  $("#cart-close").focus();
}
function closeCart() {
  $("#cart").classList.remove("open");
  $("#cart").setAttribute("aria-hidden", "true");
  $("#cart-overlay").hidden = true;
}

function checkout() {
  const t = totals();
  if (!t.items.length) return;
  const lines = t.items.map(p => `- ${p.name} (size ${p.size}) [${p.id}] ... ${money(p.price)}`);
  const body = [
    "heyyy!! i wanna buy:",
    "",
    ...lines,
    "",
    `subtotal: ${money(t.subtotal)}`,
    t.discount ? `bundle discount: -${money(t.discount)}` : null,
    `shipping: ${t.shipping ? money(t.shipping) : "FREE"}`,
    `TOTAL: ${money(t.total)}`,
    "",
    "my name:",
    "shipping address:",
    "how i'll pay (paypal / venmo / cashapp):",
    "",
    "thx!! xoxo",
  ].filter(l => l !== null).join("\n");
  const subject = `RaWr ThReAdZ order (${t.items.length} item${t.items.length > 1 ? "s" : ""}) - ${money(t.total)}`;
  window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  toast("opening ur email app... hit send!! ♥");
  if (PAY_LINK) setTimeout(() => window.open(PAY_LINK, "_blank", "noopener"), 1200);
}

/* ---------- comments ---------- */
const SEED_COMMENTS = [
  { name: "xXsk8rboiXx", av: "🛹", text: "omg the velvet coffin hoodie?!?! i've been looking 4 that since 2005. thx 4 the add!! pc4pc?", when: "Oct 3 2026 11:47 PM" },
  { name: "~*sCeNe QuEeN*~", av: "👑", text: "got my order today and it came w/ STICKERS and a lil note ♥♥♥ 10/10 would rawr again", when: "Sep 28 2026 3:12 AM" },
  { name: "brokenmascara89", av: "🖤", text: "ur page layout is giving me flashbacks in the best way. bought 2 tees, the bundle discount is clutch", when: "Sep 21 2026 9:09 PM" },
];

function renderComments() {
  const all = [...store.get("rawr-comments", []), ...SEED_COMMENTS];
  $("#comment-count").textContent = all.length;
  $("#comment-total").textContent = all.length;
  const list = $("#comment-list");
  list.innerHTML = "";
  all.forEach(c => {
    const row = document.createElement("div");
    row.className = "comment";
    row.innerHTML = `<div class="who"><span class="av"></span><a href="#comments"></a></div>
      <div class="what"><span class="when"></span><span class="txt"></span></div>`;
    $(".av", row).textContent = c.av;
    $(".who a", row).textContent = c.name;
    $(".when", row).textContent = c.when;
    $(".txt", row).textContent = c.text;
    list.appendChild(row);
  });
}

function postComment(e) {
  e.preventDefault();
  const name = $("#c-name").value.trim();
  const text = $("#c-text").value.trim();
  if (!name || !text) return;
  const avs = ["🦇", "💀", "🖤", "⛓️", "🎸", "🦖", "✨", "🌙"];
  const when = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).replace(",", "").replace(",", "");
  const saved = store.get("rawr-comments", []);
  saved.unshift({ name, text, when, av: avs[Math.floor(Math.random() * avs.length)] });
  store.set("rawr-comments", saved.slice(0, 50));
  e.target.reset();
  renderComments();
  toast("comment posted!! thx 4 the luv");
}

/* ---------- fun stuff ---------- */
const MOODS = [["angsty", ":'("], ["rawr", "xD"], ["emo", ">.<"], ["scene", "^_^"], ["sleepy", "-_-"], ["thrifty", "$_$"], ["crushed", "</3"], ["hyper", ":D"]];
function rotateMood() {
  const [m, e] = MOODS[Math.floor(Math.random() * MOODS.length)];
  $("#mood").textContent = m;
  $("#mood-emoji").textContent = e;
}

const SONGS = [
  "the black parade is dead (but my closet isn't)",
  "midnight eyeliner - cry til dawn (acoustic)",
  "velvet coffin - my heart is a bat, it only comes out at night",
  "static valentine - i wrote ur name on my converse in sharpie",
  "rawr means forever - dinosaurs don't cry (but i do)",
  "neon mascara - this song has a really long title so u know it's emo",
];
let songIdx = 0;
function setSong(i) {
  songIdx = (i + SONGS.length) % SONGS.length;
  const el = $("#np-text");
  el.textContent = SONGS[songIdx];
  el.style.animation = "none"; void el.offsetWidth; el.style.animation = "";
}

function visitorCounter() {
  const n = store.get("rawr-visits", 0) + 1;
  store.set("rawr-visits", n);
  $("#counter").textContent = String(13337 + n).padStart(6, "0");
}

function sparkles() {
  const layer = $("#sparkle-layer");
  const chars = ["✦", "✧", "★", "♥", "☆", "✶"];
  const colors = ["#ff2fa0", "#39ff14", "#00e5ff", "#fff", "#9d00ff", "#ffd700"];
  let last = 0;
  const spawn = (x, y) => {
    const now = Date.now();
    if (now - last < 45) return;
    last = now;
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = chars[Math.floor(Math.random() * chars.length)];
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.color = colors[Math.floor(Math.random() * colors.length)];
    layer.appendChild(s);
    setTimeout(() => s.remove(), 900);
  };
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.addEventListener("pointermove", e => spawn(e.clientX, e.clientY), { passive: true });
}

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- wire it all up ---------- */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-add],[data-view],[data-remove],[data-open-cart],[data-filter]");
  if (!t) return;
  if (t.dataset.add) addToCart(t.dataset.add);
  else if (t.dataset.view) openModal(t.dataset.view);
  else if (t.dataset.remove) removeFromCart(t.dataset.remove);
  else if ("openCart" in t.dataset) { e.preventDefault(); closeModal(); openCart(); }
  else if (t.dataset.filter) {
    filter = t.dataset.filter;
    $$(".filter").forEach(b => b.classList.toggle("active", b === t));
    renderShop();
  }
});

$("#sort").addEventListener("change", e => { sort = e.target.value; renderShop(); });
$("#cart-close").addEventListener("click", closeCart);
$("#cart-overlay").addEventListener("click", closeCart);
$("#checkout").addEventListener("click", checkout);
$("#modal-close").addEventListener("click", closeModal);
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); closeCart(); } });
$("#comment-form").addEventListener("submit", postComment);
$("#add-friend").addEventListener("click", e => { e.preventDefault(); toast("friend request sent!! ♥ (u r now in my top 8 of luv)"); });
$("#msg-link").addEventListener("click", e => { e.preventDefault(); window.location.href = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent("hiii from ur shop page")}`; });
$("#prev-song").addEventListener("click", () => setSong(songIdx - 1));
$("#next-song").addEventListener("click", () => setSong(songIdx + 1));
$("#play-song").addEventListener("click", () => $(".player").classList.toggle("paused"));

$("#year").textContent = new Date().getFullYear();
rotateMood();
setInterval(rotateMood, 8000);
renderTop8();
renderShop();
updateCart();
renderComments();
visitorCounter();
sparkles();
