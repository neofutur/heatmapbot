const puppeteer = require('puppeteer');

function delay(time) {
	   return new Promise(function(resolve) { 
		          setTimeout(resolve, time)
		      });
}

(async () => {
	  const browser = await puppeteer.launch({args: ['--no-sandbox']});
	  const page = await browser.newPage();
	  await page.setViewport({ width: 1920, height: 1080 });
	  await page.goto('https://bitcoinwisdom.io/the-heatmap', { waitUntil: 'networkidle2' });
	  // had to add this huge sleeping delay to make sure all the depth data is loaded
	  await delay(20000);
	  await page.waitForSelector('#wrapper');          // wait for the selector to load
	  const element = await page.$('#wrapper');        // declare a variable with an ElementHandle
	  await element.screenshot({path: 'heatmap.png'}); // take screenshot element in puppeteer
	  await browser.close();
})();

