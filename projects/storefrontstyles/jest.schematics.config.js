const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test-jest.ts'],
  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/../../coverage/schematics',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 74,
      functions: 90,
      lines: 90,
    },
  },

  roots: ['<rootDir>'],
  testMatch: ['**/*.spec.js'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(
    {},
    {
      prefix: '<rootDir>/',
    }
  ),
  //Will become default in v29, and can be removed. See: https://jestjs.io/docs/upgrading-to-jest29
  snapshotFormat: {
    escapeString: false,
    printBasicPrototype: false,
  },
};
