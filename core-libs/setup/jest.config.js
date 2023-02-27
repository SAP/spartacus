const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.spec.json');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),

  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/../../coverage/core-libs/ssr',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
  },
  //Will become default in v29, and can be removed. See: https://jestjs.io/docs/upgrading-to-jest29
  snapshotFormat: {
    escapeString: false,
    printBasicPrototype: false,
  },
};
