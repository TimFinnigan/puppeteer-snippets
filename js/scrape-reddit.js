const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const [page] = await browser.pages();

  await page.goto("https://www.reddit.com/r/GameDeals/", {
    waitUntil: "networkidle0",
  });

  const links = await page.evaluate(async () => {
    window.scrollBy(0, document.body.clientHeight);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for some time, you might need to figure out a good value for this yourself
    return [
      ...document.querySelectorAll(
        ".scrollerItem div:nth-of-type(2) article div div:nth-of-type(3) a"
      ),
    ].map((el) => el.href);
  });

  console.log(links, links.length);

  await browser.close();
})();
