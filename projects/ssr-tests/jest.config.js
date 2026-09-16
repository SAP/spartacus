const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  // SSR e2e specs bind fixed ports (SSR 4000, proxy 9002). Running spec files
  // in parallel workers causes EADDRINUSE. Force serial execution.
  maxWorkers: 1,
  transform: {
    '^.+\\.(ts|js|mjs)$': ['ts-jest'],
  },

  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/../../coverage/ssr-tests',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 74,
      functions: 90,
      lines: 90,
    },
  },
  testEnvironment: './src/environments/custom-test-environment.ts',
  globalSetup: './validate-ssr-build.ts',
};
