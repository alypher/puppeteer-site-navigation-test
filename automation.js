// Before run the script
// 1- Install the dependencies using npm (with nodeJS installed):
//  - Run "npm i" at your terminal/cmd; 
// 2- Insert your credentials at constants "EMAIL" and "PASSWORD";
// 3- Run script using "npm run start" at your terminal/cmd.

import puppeteer from 'puppeteer';

const WEBSITE = 'https://prenotami.esteri.it/'
const EMAIL = 'joao@email.com'
const PASSWORD = '123456789'

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
    headless: false, // if false you can see the browser
    slowMo: 250, // slow down by 250ms
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto(WEBSITE);

// Set screen size.
await page.setViewport({width: 1080, height: 1024});

// Type into login fields.
await page.locator('#login-email').fill(EMAIL);
await page.locator('#login-password').fill(PASSWORD);

// // Wait and click on submit button.
await page.locator('#login-form > button').click();
await page.waitForNavigation({waitUntil: 'networkidle2'}) // Await the loading time

// // Wait and click on "Reservation".
await page.locator('#advanced').click();
await page.waitForNavigation({waitUntil: 'networkidle2'}) // Await the loading time

// Here you need to have the right path to go, in this way we can navigate and get the page content by demand.
// Below is just a sample 

// Locate the title with a unique string.
const text = await page
  .locator('#main > div.heading-container > h1')
  .waitHandle();
const fullTitle = await text?.evaluate(el => el.textContent);

// Print the full title.
console.log('The title of the page "%s".', fullTitle);

await browser.close();