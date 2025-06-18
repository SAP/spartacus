const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.spec.json');
const { defaultTransformerOptions } = require('jest-preset-angular/presets');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
    // mapping required to use `beasties` from node modules that has proper ES module format
    // instead of the version internalized by the Angular Team which file format is not supported
    // by Jest.
    // for more, see: https://github.com/angular/angular-cli/pull/28228
    // and: https://github.com/angular/angular-cli/pull/28726
    '^../third_party/beasties/index.js$':
      '<rootDir>/../../node_modules/beasties',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
      },
    ],
  },

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
};
