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
};
