// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-parallel'),
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
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml', 'dots'],
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/cart'),
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
      check: {
        global: {
          statements: 80,
          lines: 80,
          branches: 68,
          functions: 80,
        },
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
