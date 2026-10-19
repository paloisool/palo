# xX RaWr ThReAdZ Xx

A y2k emo/scene shop page in the style of a 2006 MySpace profile, for selling band tees, hoodies and sweaters. It's plain HTML, CSS and JS with no build step, so you can drop it on Neocities, GitHub Pages or any static host.

## Make it yours (all in `script.js`, top section)

1. **`SHOP_EMAIL`**: set this to your email. Checkout opens the buyer's email app with their order already filled in, addressed to you.
2. **`PAY_LINK`**: optional paypal.me / venmo / cashapp link. If you set it, it opens after checkout.
3. **`PRODUCTS`**: your inventory. Each item is one-of-a-kind (qty 1).
   - Add `img: "images/whatever.jpg"` to show a real photo in place of the drawn placeholder shirt.
   - Set `sold: true` when something sells.
   - Set `top8: true` to put an item in the "Top 8 friends" grid.
4. Shipping and bundle discount: `SHIPPING_FLAT`, `FREE_SHIPPING_OVER`, `BUNDLE_MIN`, `BUNDLE_DISCOUNT`.

The shop name, bio, interests and so on are in `index.html`.

## Notes
- The cart, comments and visitor counter are stored in each visitor's own browser (localStorage). Comments people post aren't seen by anyone else, and real orders reach you through the checkout email.
- The band names in the demo inventory are made up. Replace them with your real items.
