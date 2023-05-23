import puppeteer from 'puppeteer'
require("dotenv").config()

export async function getTokenCollected() {
  const FIXED_POINT = 'https://www.ifood.com.br/delivery/sao-paulo-sp/drogaria-farmais-luz/d3624119-36a2-499e-8a99-6286d71f3dfb?item=c461612e-2352-4644-a459-893ae3877607'

  const HTTP_INTERCEPTED = '/catalog?category_items_size=12'

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === 'production'
        ? process.env.PUPPETEER.EXECUTABLE_PATH
        : puppeteer.executablePath(),
    // headless: "new"
  })

  const page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('request', (interceptedRequest) => {
    const requestUrl = interceptedRequest.url()
    const requestMethod = interceptedRequest.method()

    if (requestUrl.includes(HTTP_INTERCEPTED) && requestMethod === 'GET') {
      interceptedRequest.continue({ headers: interceptedRequest.headers() })
    } else {
      interceptedRequest.continue()
    }
  })

  let tokenCollected = ''

  page.on('response', async (response) => {
    const responseUrl = response.url()
    const responseMethod = response.request().method()
    const headers = response.headers()

    if (headers.hasOwnProperty('session_token')) {
      tokenCollected = headers['session_token']
    }
  })

  await page.goto(FIXED_POINT)
  await browser.close()

  return tokenCollected
}