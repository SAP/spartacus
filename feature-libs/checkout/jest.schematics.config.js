const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.schematics');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.schematics.json',
    },
  },
  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/../../coverage/checkout/schematics',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },

  roots: ['<rootDir>/schematics'],
  modulePaths: ['<rootDir>/../../projects/schematics'],
  testMatch: ['**/+(*_)+(spec).+(ts)'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
