const puppeteer = require('puppeteer');

(async () => {
  const sizes = [50, 100, 200, 400, 800, 1000];

  // The URL of your running Next.js frontend
  // Assume your Next.js app is running at http://localhost:3000
  // Add a query param `size` so the frontend fetches larger data sets if implemented
  // For example: 
  // In your frontend fetch: fetch(`http://localhost:5000/cost?size=${sizeParam}`)
  // Make sure you handle `sizeParam` in frontend to scale data requests.
  
  const results = [];
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const size of sizes) {
    const url = `http://localhost:3000/dashboard?size=${size}`;
    const start = Date.now();
    // waitUntil: 'networkidle0' ensures we measure after all requests are done
    await page.goto(url, { waitUntil: 'networkidle0' });
    const end = Date.now();
    const loadTime = end - start;
    results.push({ size, loadTime });
    console.log(`Size: ${size}, Load Time: ${loadTime} ms`);
  }

  await browser.close();

  console.log('Test results:', results);
})();
