// exports print files: designs/print/<id>.png (4500x5400, transparent) + designs/svg/<id>.svg
// run from the repo root:  node designs/render.js   (needs playwright)
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { DESIGNS, designSVG, FONTS } = require("./designs.js");

(async () => {
  const out = path.join(__dirname, "print");
  const svgOut = path.join(__dirname, "svg");
  fs.mkdirSync(out, { recursive: true });
  fs.mkdirSync(svgOut, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 1800 }, deviceScaleFactor: 3 });
  for (const d of DESIGNS) {
    fs.writeFileSync(path.join(svgOut, `${d.id}.svg`), designSVG(d));
    await page.setContent(`<!doctype html><html><head><link rel="stylesheet" href="${FONTS}">
      <style>html,body{margin:0;background:transparent}</style></head>
      <body>${designSVG(d, { fonts: false })}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.locator("svg").screenshot({ path: path.join(out, `${d.id}.png`), omitBackground: true });
    console.log("rendered", d.id);
  }
  await browser.close();
})();
