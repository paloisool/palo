# xX RaWr ThReAdZ Xx

A y2k emo/scene shop page in the style of a 2006 MySpace profile, for selling your own custom emo merch: band-tee style shirts, hoodies and sweaters, made to order. It's plain HTML, CSS and JS with no build step, so you can drop it on Neocities, GitHub Pages or any static host.

## Make it yours (all in `script.js`, top section)

1. **`SHOP_EMAIL`**: set this to your email. Checkout opens the buyer's email app with their order already filled in, addressed to you.
2. **`PAY_LINK`**: optional paypal.me / venmo / cashapp link. If you set it, it opens after checkout.
3. **`PRODUCTS`**: your designs. Buyers pick any size (XS–3XL) and quantity.
   - Add `img: "images/whatever.jpg"` to show a real photo or mockup in place of the drawn placeholder shirt.
   - Set `soldOut: true` to stop taking orders for a design.
   - Set `top8: true` to put an item in the "Top 8 friends" grid.
4. Shipping, discounts and timing: `SHIPPING_FLAT`, `FREE_SHIPPING_OVER`, `BUNDLE_MIN`, `BUNDLE_DISCOUNT`, `BIG_SIZE_EXTRA` (2XL/3XL upcharge), `MADE_IN`.

Checkout and the **custom orders** form both show the buyer a filled-in message with a copy button and an "open email app" button, addressed to `SHOP_EMAIL`. The custom-order starting prices are written in `index.html`.

The shop name, bio, interests and so on are in `index.html`.

## Notes
- The cart, comments and visitor counter are stored in each visitor's own browser (localStorage). Comments people post aren't seen by anyone else, and real orders reach you through the checkout email.
- The demo designs are placeholders. Replace them with your real designs.
