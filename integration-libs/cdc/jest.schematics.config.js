const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.schematics.json');
const { defaultTransformerOptions } = require('jest-preset-angular/presets');

// ESM packages that need to be transformed by Jest
const esmPackages = [
  '@angular',
  'ora',
  'chalk',
  'cli-cursor',
  'cli-spinners',
  'is-interactive',
  'is-unicode-supported',
  'log-symbols',
  'stdin-discarder',
  'string-width',
  'strip-ansi',
  'ansi-regex',
  'is-fullwidth-code-point',
  'emoji-regex',
  'restore-cursor',
  'onetime',
  'mimic-function',
  'yoctocolors',
  'get-east-asian-width',
];

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*_)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        tsconfig: '<rootDir>/tsconfig.schematics.json',
      },
    ],
  },
  transformIgnorePatterns: [`node_modules/(?!${esmPackages.join('|')})`],

  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '<rootDir>/../../coverage/cdc/schematics',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};
