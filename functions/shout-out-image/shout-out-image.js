const playwright = require('playwright-aws-lambda');
const fs = require('fs');
const path = require('path');
const { getUserData } = require('./get-user-data');

const script = fs.readFileSync(path.resolve(__dirname, './image.js'), 'utf-8');

exports.handler = async function (event, ctx, callback) {
  const { queryStringParameters } = event;

  const userId = queryStringParameters.id || 'yannbf';
  const blogTitle = queryStringParameters.title;
  const userData = await getUserData(userId);

  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();

  page.setViewportSize({
    width: 1200,
    height: 630,
  });

  await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <link
        href="https://fonts.googleapis.com/css?family=Inter:400,700,800,900&display=swap"
        rel="stylesheet"
      />
      <link rel="preload" href="${
        userData ? userData.image : ''
      }" as="image" media="(max-width: 600px)" />
    </head>

    <body>
      <div id="app">
        <div
          style="
            display: flex;
            align-items: center;
            text-align: center;
            font-size: 50px;
            font-weight: 900;
            line-height: 1.2;
            font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial,
              sans-serif;
            width: 1200px;
            height: 630px;
            overflow: hidden;
          "
        >
          ${blogTitle}
        </div>
      </div>
    </body>
  </html>
  `);

  if (userData) {
    await page.addScriptTag({
      content: `
      window.image = "${userData.image}";
      window.username = "${userData.username}";
    `,
    });
    await page.addScriptTag({ content: script });
  }

  const boundingRect = await page.evaluate(() => {
    const app = document.getElementById('app');
    const { x, y, width, height } = app.children[0].getBoundingClientRect();
    return { x, y, width, height };
  });

  const screenshotBuffer = await page.screenshot({ clip: boundingRect });
  await browser.close();

  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': screenshotBuffer.length.toString(),
    },
    body: screenshotBuffer.toString('base64'),
  };
};
