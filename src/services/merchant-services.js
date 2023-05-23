import puppeteer from 'puppeteer'
import { SITE_MAP } from '../configs/settings.js'

export async function merchantService() {

  const { SEARCH_MERCHANTS_URL, KEYWORD } = SITE_MAP

  //config browser and startup links
  const browser = await puppeteer.launch({
    headless: "new"
  })
  const page = await browser.newPage();

  let links = [{ merchant_name: "", merchant_path: "" }]

  try {

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
    const searchResultSelector = '.cardstack-section-container'

    await page.waitForSelector(searchResultSelector)



    // mount object
    links = await page.$$eval('.merchant-v2__name', '.merchant-v2__link', (names, links) => {
      return links.map(link => {
        return {
          merchant_name: names.textContent.trim(),
          merchant_path: links[index].href
        };
      });
    });


  } catch (error) {

  }
  finally {
    await browser.close()
  }

  return links
}