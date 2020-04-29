const puppeteer = require("puppeteer");

(async () => {
  try {
    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();
    await page.goto(`https://www.news.google.com/`);
    await page.screenshot({ path: "../screenshot.png" });
    await browser.close();
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error("Closed"));
  }
})();
