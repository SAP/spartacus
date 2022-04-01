const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.schematics');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/test-jest.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.schematics.json',
    }
  },
  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/../../coverage/schematics',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 69,
      functions: 88,
      lines: 90,
    },
  },

  roots: ['<rootDir>/src'],
  testMatch: ['**/+(*_)+(spec).+(ts)'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
