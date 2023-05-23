import puppeteer from 'puppeteer';
import { SITE_MAP } from '../configs/settings.js';


(async () => {

  const { SEARCH_MERCHANTS_URL, KEYWORD } = SITE_MAP

  const browser = await puppeteer.launch({
    headless: "new"
  })
  const page = await browser.newPage();

  //go to page
  await page.goto(`${SEARCH_MERCHANTS_URL}${KEYWORD}&tab=0`);

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(
    '.search-input__field',
    SITE_MAP.KEYWORD
  );

  // Wait first result
  const searchResultSelector = '.cardstack-section-container';
  await page.waitForSelector(searchResultSelector);

  const links = await page.$$eval('.merchant-v2__link', links => {
    return links.map(link => {
      return {
        merchant_name: link.innerText,
        merchant_path: link.getAttribute('href')
      };
    });
  });


  // let element = await page.$('.merchant-list-v2')
  // let value = await page.evaluate(el => el.innerHTML, element)

  await browser.close()
  console.log(links)

})()