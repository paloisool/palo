# xX RaWr ThReAdZ Xx

A y2k emo/scene shop page in the style of a 2006 MySpace profile, for an emo clothing brand selling its own mustache tees and sweaters. It's plain HTML, CSS and JS with no build step, so you can drop it on Neocities, GitHub Pages or any static host.

## Make it yours (all in `script.js`, top section)

1. **`SHOP_EMAIL`**: set this to your email. Orders are addressed to this email.
2. **`PAY_LINK`**: optional paypal.me / venmo / cashapp link. If you set it, a pay button shows at checkout.
3. **`PRODUCTS`**: your shirts. Buyers pick a size (XS–3XL) and how many.
   - Add `img: "images/whatever.jpg"` to show a real photo in place of the drawn placeholder shirt.
   - Set `soldOut: true` to stop taking orders for a design.
   - Set `top8: true` to put an item in the "Top 8 friends" grid.
4. Shipping, discounts and timing: `SHIPPING_FLAT`, `FREE_SHIPPING_OVER`, `BUNDLE_MIN`, `BUNDLE_DISCOUNT`, `BIG_SIZE_EXTRA` (2XL/3XL upcharge), `SHIPS_IN`.

Checkout shows the buyer their order as a filled-in message with a copy button and an "open email app" button, addressed to `SHOP_EMAIL`.

The shop name, bio, interests and so on are in `index.html`.

## Notes
- The cart, comments and visitor counter are stored in each visitor's own browser (localStorage). Comments people post aren't seen by anyone else, and real orders reach you through the checkout email.
- The demo designs are placeholders. Replace them with your real shirts.
