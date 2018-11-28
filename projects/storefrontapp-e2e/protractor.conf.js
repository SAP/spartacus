const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  allScriptsTimeout: 20000,
  specs: ['./src/**/*.e2e-spec.ts'],
  SELENIUM_PROMISE_MANAGER: false,
  capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    chromeOptions: {
      args: [
        'window-size=1600,1024',
        'disable-infobars',
        'disable-web-security'
      ]
    }
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      })
    );

    // Add custom locators
    require('./src/custom-locators').addCustomLocators(by);
  }
};
