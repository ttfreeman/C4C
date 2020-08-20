const puppeteer = require("puppeteer");

describe("all client tests", () => {
  test("Clicking Get Recent button should render recent table", async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/recent");
    await page.click("button#get-recent");

    // const text = await page.$eval("#table-body", (el) => el.textContent);
    const text = await page.$$eval("table tr td", (tds) =>
      tds.map((td) => {
        return td.innertext;
      })
    );
    console.log(text);
    expect(text).not.toBeNull();
  });
});
