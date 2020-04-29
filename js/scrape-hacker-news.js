const puppeteer = require("puppeteer");
var fs = require("fs");

(async () => {
  try {
    var browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();
    await page.goto(`https://news.ycombinator.com/`);
    await page.waitForSelector("a.storylink");

    var news = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll(`a.storylink`);
      var ageList = document.querySelectorAll(`span.age`);
      var scoreList = document.querySelectorAll(`span.score`);
      var titleLinkArray = [];
      for (var i = 0; i < titleNodeList.length; i++) {
        if (!titleNodeList[i] || !ageList[i] || !scoreList[i]) continue;
        titleLinkArray[i] = {
          title: titleNodeList[i].innerText.trim(),
          link: titleNodeList[i].getAttribute("href"),
          age: ageList[i].innerText.trim(),
          score: scoreList[i].innerText.trim(),
        };
      }
      return titleLinkArray;
    });

    await browser.close();
    
    fs.writeFile("../hackernews.json", JSON.stringify(news), function (err) {
      if (err) throw err;
      console.log("Saved JSON");
    });
  } catch (err) {
    console.log(err);
    await browser.close();
  }
})();
