import puppeteer from 'puppeteer'
import { SITE_MAP } from '../configs/settings.js'

export async function catalogService(path) {

  const { SEARCH_MERCHANTS_URL, KEYWORD } = SITE_MAP

  //config browser and startup links
  const browser = await puppeteer.launch()
  const page = await browser.newPage();

  let products = [];

  try {
    const url = `https://www.ifood.com.br${path}`

    await page.goto(url);

    await page.setViewport({ width: 1080, height: 1024 });


    // Wait first result
    const searchResultSelector = '.market-catalog-aisle__container';
    await page.waitForSelector(searchResultSelector);

    // mount object
    const productCards = await page.$$('.product-card-content')

    for (let i = 0; i < productCards.length; i++) {
      const title = await productCards[i].$eval('.product-card__description', el => el.innerText)
      const price = await productCards[i].$eval('.product-card__price', el => el.innerText)
      products.push({ title, price })
    }


  } catch (error) {

  }
  finally {
    await browser.close()
  }

  return products
}