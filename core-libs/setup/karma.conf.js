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
      require('karma-junit-reporter'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'kjhtml', 'dots', 'junit'],
    junitReporter: {
      outputFile: 'unit-test-setup.xml',
      outputDir: require('path').join(__dirname, '../../unit-tests-reports'),
      useBrowserName: false,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage/setup'),
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
      check: {
        global: {
          statements: 88,
          lines: 88,
          branches: 80,
          functions: 87,
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
    buildWebpack: {
      webpackConfig: {
        resolve: {
          fallback: {
            fs: false,
          },
        },
      },
    },
  });
};
