/* ~*~ RaWr ThReAdZ shop script ~*~
 * EDIT THE STUFF IN THIS FIRST SECTION to make the shop yours.
 */

// where orders get sent
const SHOP_EMAIL = "your-email@example.com"; // <-- CHANGE THIS
// optional: your paypal.me / venmo / cashapp link (leave "" to hide)
const PAY_LINK = "";

const SHIPPING_FLAT = 5;         // $ per order
const FREE_SHIPPING_OVER = 75;   // $ subtotal for free shipping
const BUNDLE_MIN = 2;            // items needed for bundle discount
const BUNDLE_DISCOUNT = 0.10;    // 10% off
const BIG_SIZE_EXTRA = 4;        // $ added for 2XL + 3XL
const SHIPS_IN = "3-5 biz days"; // how long shipping takes

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

/* YOUR SHIRTS ~ buyers pick a size, then add to cart.
 *  type:   "tee" | "sweater"
 *  print:  the words on the placeholder drawing
 *  small:  tiny text under the graphic
 *  img:    path to a real photo (e.g. "images/cry-til-dawn.jpg"). leave out to use the drawn placeholder.
 *  color / ink: placeholder shirt color + print color
 *  motif:  placeholder graphic: skull | heart | broken | star | bat | dino | bolt | crown | tear
 *  soldOut: true to stop taking orders for it
 *  top8:   true to put it in the Top 8
 */
const PRODUCTS = [
  { id: "cry-til-dawn", name: "'Cry Til Dawn' Tee", print: "Cry Til Dawn", small: "est. 2005", type: "tee",
    price: 28, was: 32, color: "#0d0d0d", ink: "#ff2fa0", motif: "broken", tag: "NEW", top8: true,
    desc: "my best seller 4 a reason. hot pink broken heart on a soft black tee. made for crying in the car w/ the windows down." },
  { id: "leave-me-alone", name: "'Pls Leave Me Alone' Sweater", print: "Pls Leave Me Alone", small: "knock first", type: "sweater",
    price: 48, color: "#1a1a1a", ink: "#9d00ff", motif: "bat", tag: "HOT", top8: true,
    desc: "black crewneck w/ a purple bat. for when ur door is closed and ur music is LOUD." },
  { id: "rawr-xd", name: "'Rawr Means I Love U' Tee", print: "Rawr Means I Love U", small: "(in dinosaur)", type: "tee",
    price: 28, color: "#39ff14", ink: "#0d0d0d", motif: "dino", tag: "NEW", top8: true,
    desc: "neon green tee w/ a lil dino saying rawr. a love letter u can wear." },
  { id: "sad-kids-club", name: "'Sad Kids Club' Sweater", print: "Sad Kids Club", small: "members only", type: "sweater",
    price: 46, color: "#2b0d1f", ink: "#39ff14", motif: "skull", top8: true,
    desc: "maroon crewneck w/ a lime skull. oversized, sleeves long enough 2 hide ur hands in." },
  { id: "checkered-heart", name: "'Checkered Heart' Tee", print: "Sk8r Hearts", small: "kickflip ur feelings", type: "tee",
    price: 28, color: "#ff69b4", ink: "#0d0d0d", motif: "heart", top8: true,
    desc: "hot pink tee w/ a black checkered heart. pair w/ a studded belt 4 the full effect." },
  { id: "king-of-feelings", name: "'King of Feelings' Tee", print: "King of Feelings", small: "royalty of sadness", type: "tee",
    price: 30, color: "#0d0d0d", ink: "#ffd700", motif: "crown", top8: true,
    desc: "black tee w/ a gold crown. for the one who feels everything the most." },
  { id: "eyeliner-sweater", name: "'Eyeliner Forever' Sweater", print: "Eyeliner Forever", small: "smudged on purpose", type: "sweater",
    price: 48, color: "#111111", ink: "#ff2fa0", motif: "star", top8: true,
    desc: "black crewneck w/ a pink star. soft inside, scene on the outside." },
  { id: "dancing-in-rain", name: "'Crying in the Rain' Tee", print: "Crying in the Rain", small: "no umbrella. no regrets.", type: "tee",
    price: 28, color: "#00b7d9", ink: "#ffffff", motif: "tear", top8: true,
    desc: "cyan tee w/ a big white raindrop (or a tear?? u decide)." },
  { id: "glitter-gloom", name: "'Glitter & Gloom' Tee", print: "Glitter & Gloom", small: "sparkle sadly", type: "tee",
    price: 26, color: "#ffffff", ink: "#ff0080", motif: "broken",
    desc: "white tee w/ a hot pink broken heart. the og design that started it all." },
  { id: "static-scene", name: "'Static Scene Queen' Sweater", print: "Static Scene Queen", small: "zap ur heart", type: "sweater",
    price: 46, color: "#ff2fa0", ink: "#0d0d0d", motif: "bolt", tag: "HOT",
    desc: "pink crewneck w/ a black lightning bolt. the most scene thing i've ever dropped." },
  { id: "3am-again", name: "'Up Til 3am Again' Tee", print: "Up Til 3am Again", small: "night owls only", type: "tee",
    price: 28, color: "#3d0066", ink: "#00e5ff", motif: "bat",
    desc: "purple tee w/ a cyan bat. for the night owls making layouts til sunrise." },
  { id: "top-8-drama", name: "'Top 8 Drama' Sweater", print: "Top 8 Drama", small: "u got bumped", type: "sweater",
    price: 44, color: "#0d0d0d", ink: "#ffffff", motif: "star", soldOut: true,
    desc: "black + white star crewneck. sold out rn, restock coming soon!!" },
];

/* ---------- (u don't need to edit below here unless u want to) ---------- */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => "$" + n.toFixed(2);
const byId = id => PRODUCTS.find(p => p.id === id);
const sizePrice = (p, size) => p.price + (size === "2XL" || size === "3XL" ? BIG_SIZE_EXTRA : 0);
const sizeOptions = (sel = "M") => SIZES.map(s => `<option${s === sel ? " selected" : ""}>${s}</option>`).join("");
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- placeholder garment art ---------- */
const MOTIFS = {
  tear: ink => `<path fill="${ink}" d="M100 80 C 86 102, 84 116, 100 118 C 116 116, 114 102, 100 80 Z"/><path fill="currentColor" opacity=".5" d="M94 104 C 92 110, 94 112, 97 112 C 95 110, 95 107, 94 104 Z"/>`,
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
  const words = p.print.split(" ");
  const half = Math.ceil(words.length / 2);
  const l1 = words.length > 2 ? words.slice(0, half).join(" ") : p.print;
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
    <text x="100" y="${p.type === "hoodie" ? 142 : 166}" font-family="monospace" font-size="7" fill="${ink}" text-anchor="middle" opacity=".85">~ ${p.small} ~</text>
  </svg>`;
}

/* ---------- top 8 ---------- */
function renderTop8() {
  const items = PRODUCTS.filter(p => p.top8 && !p.soldOut).slice(0, 8);
  $(".top8-count .hot").textContent = items.length;
  $("#top8-grid").innerHTML = items.map(p => `
    <button type="button" class="friend" data-view="${p.id}">
      <div class="thumb">${garmentSVG(p)}</div>
      <b>${p.print}</b>
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
  // sold out stuff sinks to the bottom
  items.sort((a, b) => (a.soldOut ? 1 : 0) - (b.soldOut ? 1 : 0));

  $("#shop-grid").innerHTML = items.map(p => {
    const tag = p.soldOut ? `<span class="tag sold">SOLD OUT</span>`
      : p.tag ? `<span class="tag ${p.tag === "HOT" ? "rare" : ""}">${p.tag}</span>` : "";
    return `<article class="card ${p.soldOut ? "is-sold" : ""}">
      ${tag}
      <button type="button" class="img" data-view="${p.id}" aria-label="view ${p.name}">${garmentSVG(p)}</button>
      <h4>${p.name}</h4>
      <div class="meta">${p.type} · designed by me ♥</div>
      <div class="price">${money(p.price)}${p.was ? `<s>${money(p.was)}</s>` : ""}</div>
      ${p.soldOut ? "" : `<label class="size-pick">size: <select id="size-${p.id}" data-size-for="${p.id}">${sizeOptions()}</select></label>`}
      <button type="button" class="btn-glitter" data-add="${p.id}" ${p.soldOut ? "disabled" : ""}>
        ${p.soldOut ? "sold out :'(" : "add 2 cart"}
      </button>
    </article>`;
  }).join("") || `<p class="cart-empty">nothing here yet... check back soon xD</p>`;
}

/* ---------- product modal ---------- */
function openModal(id) {
  const p = byId(id);
  if (!p) return;
  $("#modal-title").textContent = p.id.replace(/-/g, "_") + ".exe";
  $("#modal-body").innerHTML = `
    <div class="m-img">${garmentSVG(p)}</div>
    <div>
      <h3>${p.name}</h3>
      <div class="m-price">${money(p.price)}${p.was ? ` <s style="font-size:10px;color:#777">${money(p.was)}</s>` : ""}</div>
      <p class="m-desc">${p.desc}</p>
      <dl>
        <dt>type:</dt><dd>${p.type}</dd>
        <dt>sizes:</dt><dd>XS–3XL (2XL + 3XL are +${money(BIG_SIZE_EXTRA)})</dd>
        <dt>shipping:</dt><dd>${SHIPS_IN}</dd>
        <dt>design:</dt><dd>mine!! (small brand, big feelings) ♥</dd>
      </dl>
      ${p.soldOut ? "" : `<div class="pickers">
        <label class="size-pick">size: <select id="m-size" data-size-for="${p.id}">${sizeOptions()}</select></label>
        <label class="qty-pick">qty: <input type="number" id="m-qty" min="1" max="20" value="1"></label>
      </div>`}
      <button type="button" class="btn-glitter" data-add="${p.id}" data-from-modal ${p.soldOut ? "disabled" : ""}>
        ${p.soldOut ? "sold out :'(" : "add 2 cart ♥"}
      </button>
    </div>`;
  $("#modal").hidden = false;
  $("#modal-close").focus();
}
function closeModal() { $("#modal").hidden = true; }

/* ---------- cart ---------- */
// cart = [{ id, size, qty }]
function getCart() {
  return store.get("rawr-cart-v2", []).filter(l => byId(l.id) && !byId(l.id).soldOut && SIZES.includes(l.size) && l.qty > 0);
}
function setCart(c) { store.set("rawr-cart-v2", c); updateCart(); }

function addToCart(id, fromModal) {
  const sizeEl = fromModal ? $("#m-size") : $(`#size-${id}`);
  const size = sizeEl ? sizeEl.value : "M";
  const qty = fromModal ? Math.max(1, Math.min(20, parseInt($("#m-qty").value, 10) || 1)) : 1;
  const c = getCart();
  const line = c.find(l => l.id === id && l.size === size);
  if (line) line.qty = Math.min(20, line.qty + qty);
  else c.push({ id, size, qty });
  setCart(c);
  toast(`added ${qty > 1 ? qty + "x " : ""}size ${size} 2 cart!! rawr xD`);
  if (fromModal) closeModal();
}
function changeQty(i, d) {
  const c = getCart();
  if (!c[i]) return;
  c[i].qty += d;
  if (c[i].qty <= 0) c.splice(i, 1);
  else c[i].qty = Math.min(20, c[i].qty);
  setCart(c);
}

function totals() {
  const lines = getCart().map(l => ({ ...l, p: byId(l.id), each: sizePrice(byId(l.id), l.size) }));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.each * l.qty, 0);
  const discount = count >= BUNDLE_MIN ? subtotal * BUNDLE_DISCOUNT : 0;
  const after = subtotal - discount;
  const shipping = count === 0 || after >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FLAT;
  return { lines, count, subtotal, discount, shipping, total: after + shipping };
}

function updateCart() {
  const t = totals();
  $$(".cart-count").forEach(el => (el.textContent = t.count));
  $("#cart-items").innerHTML = t.lines.length
    ? t.lines.map((l, i) => `<div class="cart-item">
        <div class="ci-img">${garmentSVG(l.p)}</div>
        <div><div class="ci-name">${l.p.name}</div><div class="ci-meta">size ${l.size} · ${money(l.each)} each</div>
          <div class="ci-qty">
            <button type="button" data-qty="${i}" data-d="-1" aria-label="one less">−</button>
            <span>${l.qty}</span>
            <button type="button" data-qty="${i}" data-d="1" aria-label="one more">+</button>
            <button type="button" class="ci-remove" data-qty="${i}" data-d="-999">✖ remove</button>
          </div></div>
        <div class="ci-price">${money(l.each * l.qty)}</div>
      </div>`).join("")
    : `<p class="cart-empty">ur cart is empty...<br>just like my heart :'(</p>`;
  $("#cart-subtotal").textContent = money(t.subtotal);
  $("#discount-line").hidden = !t.discount;
  $("#cart-discount").textContent = "-" + money(t.discount);
  $("#cart-shipping").textContent = t.count && !t.shipping ? "FREE ♥" : money(t.shipping);
  $("#cart-total").textContent = money(t.total);
  $("#checkout").disabled = !t.count;
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

// shows a message + copy button (email links don't open for everyone)
function showSendWindow(title, heading, intro, subject, body) {
  const mailto = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  closeCart();
  $("#modal-title").textContent = title;
  $("#modal-body").innerHTML = `
    <div class="checkout-box">
      <h3></h3>
      <p class="m-desc"><span class="intro"></span> send it to <b class="select-me" id="shop-email"></b> and i'll get back 2 u asap ♥</p>
      <textarea id="order-text" class="order-text" rows="12" readonly></textarea>
      <div class="checkout-actions">
        <button type="button" class="btn-glitter" id="copy-order">copy it</button>
        <a class="btn-glitter" id="mail-order" href="#">open email app</a>
        ${PAY_LINK ? `<a class="btn-glitter" href="${PAY_LINK}" target="_blank" rel="noopener">pay link</a>` : ""}
      </div>
    </div>`;
  $(".checkout-box h3").textContent = heading;
  $(".checkout-box .intro").textContent = intro;
  $("#shop-email").textContent = SHOP_EMAIL;
  $("#order-text").value = `${subject}\n\n${body}`;
  $("#mail-order").href = mailto;
  $("#copy-order").addEventListener("click", () => {
    const ta = $("#order-text");
    navigator.clipboard.writeText(ta.value)
      .then(() => toast("copied!! paste it in an email or DM ♥"))
      .catch(() => { ta.focus(); ta.select(); toast("select all + copy it ♥"); });
  });
  $("#modal").hidden = false;
  $("#modal-close").focus();
}

function checkout() {
  const t = totals();
  if (!t.count) return;
  const lines = t.lines.map(l => `- ${l.qty}x ${l.p.name} (size ${l.size}) ... ${money(l.each * l.qty)}`);
  const body = [
    "heyyy!! i wanna order:",
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
    "anything else (fit, notes):",
    "",
    "thx!! xoxo",
  ].filter(l => l !== null).join("\n");
  const subject = `RaWr ThReAdZ order (${t.count} item${t.count > 1 ? "s" : ""}) - ${money(t.total)}`;
  showSendWindow("checkout.exe", "almost done!! ♥", "fill in ur name + address at the bottom, then", subject, body);
}

/* ---------- comments ---------- */
const SEED_COMMENTS = [
  { name: "xXsk8rboiXx", av: "🛹", text: "omg the 'pls leave me alone' sweater?!?! i NEED it. thx 4 the add!! pc4pc?", when: "Oct 3 2026 11:47 PM" },
  { name: "~*sCeNe QuEeN*~", av: "👑", text: "got my order today and it came w/ STICKERS and a lil note ♥♥♥ 10/10 would rawr again", when: "Sep 28 2026 3:12 AM" },
  { name: "brokenmascara89", av: "🖤", text: "ur page layout is giving me flashbacks in the best way. ordered 2 tees, the bundle discount is clutch", when: "Sep 21 2026 9:09 PM" },
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
  "asking alexandria - the final episode (let's change the channel)",
  "attack attack! - stick stickly",
  "bullet for my valentine - tears don't fall",
  "escape the fate - situations",
  "black veil brides - knives and pens",
  "blessthefall - hey baby, here's that song you wanted",
  "sleeping with sirens - if i'm james dean, you're audrey hepburn",
  "falling in reverse - the drug in me is you",
  "bring me the horizon - chelsea smile",
  "of mice & men - second & sebring",
  "the devil wears prada - hey john, what's your name again?",
  "fall out boy - sugar, we're goin down",
  "alesana - the thespian",
  "taking back sunday - cute without the 'e' (cut from the team)",
  "a day to remember - the downfall of us all",
  "the used - the taste of ink",
  "chiodos - there's no penguins in alaska",
  "underoath - writing on the walls",
  "breathe carolina - blackout",
  "dance gavin dance - me and zoloft get along just fine",
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
  const t = e.target.closest("[data-add],[data-view],[data-qty],[data-open-cart],[data-filter]");
  if (!t) return;
  if (t.dataset.add) addToCart(t.dataset.add, "fromModal" in t.dataset);
  else if (t.dataset.view) openModal(t.dataset.view);
  else if (t.dataset.qty) changeQty(+t.dataset.qty, +t.dataset.d);
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
