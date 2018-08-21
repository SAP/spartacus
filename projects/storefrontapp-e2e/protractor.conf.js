const {
  SpecReporter
} = require('jasmine-spec-reporter');

exports.config = {
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  allScriptsTimeout: 10000,
  specs: ['./src/**/*.e2e-spec.ts'],

  capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {}
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
  }
};
