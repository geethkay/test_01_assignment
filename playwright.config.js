
module.exports = {
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 },
      baseURL: 'https://curious-halva-9294ed.netlify.app/',
    },
  };

  
module.exports = {
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 },
      baseURL: 'https://curious-halva-9294ed.netlify.app/',
    },
    reporter: [
      ['list'],
      ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ['json', { outputFile: 'playwright-report/results.json' }]
    ],
  };


const { HTMLReporter } = require('playwright-html-reporter');

module.exports = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://curious-halva-9294ed.netlify.app/',
  },
  reporter: [
    ['list'],
    [HTMLReporter, { outputFolder: 'playwright-report', open: 'never' }]
  ],
};

  
  