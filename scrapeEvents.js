const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const todayISO = new Date().toISOString().split("T")[0];

  await page.goto("https://www.borkum.de/veranstaltungen/", {
    waitUntil: "networkidle2",
  });

  // Warte auf Events
  await page.waitForSelector(".tribe-events-calendar-list__event");

  const events = await page.evaluate((today) => {
    const eventNodes = document.querySelectorAll(".tribe-events-calendar-list__event");
    const result = [];

    eventNodes.forEach((node) => {
      const date = node.querySelector("time.tribe-events-calendar-list__event-datetime")?.getAttribute("datetime");
      if (date !== today) return;

      const title = node.querySelector(".tribe-events-calendar-list__event-title")?.textContent.trim();
      const time = node.querySelector(".tribe-event-date-start")?.textContent.trim();
      const location = node.querySelector(".tribe-events-calendar-list__event-venue")?.textContent.trim();
      const description = node.querySelector(".tribe-events-calendar-list__event-description")?.textContent.trim();
      const url = node.querySelector("a.tribe-events-calendar-list__event-title-link")?.href;

      result.push({ title, time, location, description, url, date });
    });

    return result;
  }, todayISO);

  await browser.close();

  fs.writeFileSync("events-today.json", JSON.stringify(events, null, 2));
  console.log(`✅ ${events.length} Veranstaltungen für heute gespeichert.`);
})();
