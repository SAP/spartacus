// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    parallelOptions: {
      executors: 2,
      shardStrategy: 'round-robin',
    },
    client: {
      clearContext: true, // close Jasmine Spec Runner output in browser to avoid 'Some of your tests did a full page reload!' error when '--no-watch' is active
      jasmine: {
        random: false,
      },
    },
    reporters: ['progress', 'kjhtml', 'dots'],
    coverageReporter: {
      dir: require('path').join(
        __dirname,
        '../../coverage/estimated-delivery-date'
      ),
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
      check: {
        global: {
          statements: 90,
          lines: 90,
          branches: 75,
          functions: 85,
        },
      },
    },
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
