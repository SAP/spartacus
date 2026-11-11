const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const fs = require('fs');

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);
  // The JUnit reporter does not print failures to the CI console.
  on('after:spec', (spec, results) => {
    for (const test of results?.tests ?? []) {
      if (test.state === 'failed') {
        console.error(`${spec.relative}: ${test.title.join(' > ')}`);
        console.error(test.displayError);
      }
    }
  });
  on('task', {
    readFile(filename) {
      if (fs.existsSync(filename)) {
        return fs.readFileSync(filename, 'utf8');
      }

      return null;
    },

    deleteFolder(folderName) {
      return new Promise((resolve, reject) => {
        fs.rm(
          folderName,
          { maxRetries: 3, recursive: true, force: true },
          (err) => {
            if (err) {
              console.error(err);
              return reject(err);
            }
            resolve(null);
          }
        );
      });
    },
  });

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome') {
      // Disable Chrome Reading mode - mainly to resolve CXSPA-9374 issue with multi-dimensional checkout as guest spec running in Chrome
      // Definition: "Reader mode simplifies web pages to improve readability by removing unnecessary elements."
      launchOptions.args.push('--disable-reader-mode');
    }
    return launchOptions;
  });

  /* Set exact timestamp to be shared in all spec files */
  config.env.TIMESTAMP = Date.now() - 1535535333333;

  // Preserve existing --env/CYPRESS_* overrides for public test configuration.
  // Credentials stay in env and are retrieved with cy.env() when needed.
  const publicKeys = [
    'API_URL',
    'BASE_SITE',
    'BASE_LANG',
    'BASE_CURRENCY',
    'CLIENT_ID',
    'OCC_PREFIX',
    'OCC_PREFIX_USER_ENDPOINT',
    'OCC_PREFIX_ORDER_ENDPOINT',
    'MAIL_CCV2_URL',
    'MAIL_CCV2_PREFIX',
    'JDK_VERSION',
    'CX_MY_ACCOUNT_V2',
    'TIMESTAMP',
    'VIEWPORT',
    'disabledBestPracticeIds',
    'subscriptionContractFrequency',
    'subscriptionOrderNumber',
  ];
  config.expose = { ...config.expose };
  for (const key of publicKeys) {
    if (Object.prototype.hasOwnProperty.call(config.env, key)) {
      config.expose[key] = config.env[key];
    }
  }

  return config;
};
