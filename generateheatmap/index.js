const puppeteer = require('puppeteer');
const select = require ('puppeteer-select');

function delay(time) {
	   return new Promise(function(resolve) { 
		          setTimeout(resolve, time)
		      });
}

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
    return `concat('${splitedQuotes}', '')`;
};

const clickByText = async function(page, text, element) {
	    const elementa = element || 'a';
	    const escapedText = escapeXpathString(text);
	    xpath = `//${element}[text()[contains(., ${escapedText})]]`;
	    await page.waitForXPath(xpath);
	    const elements = await page.$x(xpath);
	    if(elements.length > 0) {
		            for(i in elements) {
				                e = elements[i];
				                if(await e.isIntersectingViewport()) {
							                await e.click();
							                return;
							            }
				            }
		        }
	    else {
		            console.log(xpath);
		        }
	    throw new Error(`Link not found: ${text}`);
};

/*
const clickByText = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(`//a[contains(text(), ${escapedText})]`);
 
  if (linkHandlers.length > 0) {
        await linkHandlers[0].click();
  } else {
         throw new Error(`Link not found: ${text}`);
  }
};
*/

(async () => {
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 1080 });
	await page.setDefaultNavigationTimeout(120000);
	// https://bitcoinwisdom.io/the-heatmap?interval=60&clearStorage&notoolbar&grid_mode 
	// link with timeframe in minutes
	 
	// generate 5m screenshot
	//await page.goto('https://bitcoinwisdom.io/the-heatmap?interval=5&clearStorage&notoolbar&grid_mode', { waitUntil: 'networkidle0' });
	await page.goto('https://bitcoinwisdom.io/the-heatmap?interval=5&clearStorage&notoolbar&grid_mode', { waitUntil: 'domcontentloaded' });
	await delay(10000);
	await page.waitForSelector('#wrapper');          // wait for the selector to load
	var wrapper = await page.$('#wrapper');        // declare a variable with an ElementHandle
	await wrapper.screenshot({path: '/home/neoxena/public_html/heatmap_5m.png'}); // take screenshot element in puppeteer
	console.log(`5m generated`);

	// generate 15m screenshot
	await page.goto('https://bitcoinwisdom.io/the-heatmap?interval=15&clearStorage&notoolbar&grid_mode', { waitUntil: 'domcontentloaded' });
	await delay(15000);
	await page.waitForSelector('#wrapper');          // wait for the selector to load
	wrapper = await page.$('#wrapper');        // declare a variable with an ElementHandle
	await wrapper.screenshot({path: '/home/neoxena/public_html/heatmap_15m.png'}); // take screenshot element in puppeteer
	console.log(`15m generated`);
	
	// generate 30m screenshot
	await page.goto('https://bitcoinwisdom.io/the-heatmap?interval=30&clearStorage&notoolbar&grid_mode', { waitUntil: 'domcontentloaded' });
	await delay(20000);
	await page.waitForSelector('#wrapper');          // wait for the selector to load
	wrapper = await page.$('#wrapper');        // declare a variable with an ElementHandle
	await wrapper.screenshot({path: '/home/neoxena/public_html/heatmap_30m.png'}); // take screenshot element in puppeteer
	console.log(`30m generated`);
	  
	// generate 1h screenshot
	await page.goto('https://bitcoinwisdom.io/the-heatmap?interval=60&clearStorage&notoolbar&grid_mode', { waitUntil: 'domcontentloaded' });
	await delay(25000);
	await page.waitForSelector('#wrapper');          // wait for the selector to load
	wrapper = await page.$('#wrapper');        // declare a variable with an ElementHandle
	await wrapper.screenshot({path: '/home/neoxena/public_html/heatmap_60m.png'}); // take screenshot element in puppeteer
	console.log(`1h generated`);
	
	// generate 4h screenshot
	await page.goto('https://bitcoinwisdom.io/the-heatmap?interval=240&clearStorage&notoolbar&grid_mode', { waitUntil: 'domcontentloaded' });
	await delay(30000);
	await page.waitForSelector('#wrapper');          // wait for the selector to load
	wrapper = await page.$('#wrapper');        // declare a variable with an ElementHandle
	await wrapper.screenshot({path: '/home/neoxena/public_html/heatmap_240m.png'}); // take screenshot element in puppeteer
	console.log(`4h generated`);
	
	await browser.close();
})();

