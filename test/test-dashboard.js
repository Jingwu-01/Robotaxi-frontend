// test the dashboard page with different sizes of data

const puppeteer = require('puppeteer');

(async () => {
  const sizes = [ 25, 50, 100, 200, 400, 800, 1600, 3200];
  const results = [];
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const size of sizes) {
    const url = `http://localhost:3000/dashboard?size=${size}`;
    const start = Date.now();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const end = Date.now();
    const loadTime = end - start;
    results.push({ size, loadTime });
    console.log(`Size: ${size}, Load Time: ${loadTime} ms`);
  }

  await browser.close();

  console.log('Test results:', results);
})();
