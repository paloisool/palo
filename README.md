# xX RaWr ThReAdZ Xx

A y2k emo/scene shop page in the style of a 2006 MySpace profile, for a small emo brand selling its own emo tees and sweaters. It's plain HTML, CSS and JS with no build step, so you can drop it on Neocities, GitHub Pages or any static host.

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

## Shirt designs (`designs/`)
- `designs/index.html`: design sheet. Open it to see every design on shirt mockups and try different shirt colors.
- `designs/print/*.png`: print-ready files, 4500 × 5400 px (15" × 18" at 300 dpi) with transparent backgrounds.
- `designs/svg/*.svg`: vector versions. They load their fonts from Google Fonts, so open them in a browser, or convert text to outlines before using them in Illustrator or Inkscape.
- `designs/designs.js`: where the designs are drawn. After editing it, run `node designs/render.js` (needs Playwright) to re-export the PNG and SVG files.

## Ashgrove Streets (`ashgrove/`)
An original open-world city game that runs in the browser: walk, steal cars, run courier jobs, find 12 hidden stashes and shake off the police. Open `ashgrove/index.html` on a phone (landscape) for touch controls, or on desktop with WASD + mouse. It loads Three.js from cdnjs, so it needs an internet connection. "Play my own clip" plays a video from your device full screen behind the touch controls (the file stays on the device).

You can also paste a YouTube link on the start screen. The video plays through YouTube's own player behind the touch controls: Gas and Brake change its playback speed, and steering pans the picture. YouTube links only work when the page is served from a normal web host such as GitHub Pages (Settings → Pages → deploy from this branch, then open `/ashgrove/`). They don't work inside the claude.ai artifact viewer, which blocks embedded players, or when the file is opened directly from disk. Some uploaders turn off embedding, and those videos won't play.

## Palmetto Keys (`palmetto/`)
An original sunset beach-city game with a launcher-style front end: a title screen, then a main menu (Home, Story, Characters, Stats, Settings) with the live city behind it. It has a 5-mission story, free roam with courier jobs, three playable characters with perks, graphics, volume and look settings, a loading screen with tips, and a pause menu with a full map. Progress saves in the browser. Touch controls work on phones (landscape); WASD and the mouse work on desktop.

## Launcher Kit (`launcher/`)
A launcher shell and fan-concept main menu for your own art. The menu (Story Mode, Online, Settings, Gallery, Store, Credits, Quit) opens and responds but is for demonstration only. Load a boot logo, an opening video, a game logo, background pictures and a gameplay video from your phone. It plays them in order: boot logo, opening video (tap to skip), title screen, menu, loading screen, then the gameplay video with touch controls on top. Gas and Brake change the video's speed. The files stay in your browser and are never uploaded. Nothing in this repo includes third-party art or video.
