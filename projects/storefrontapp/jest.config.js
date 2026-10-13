/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../../tsconfig.json');
const { defaultTransformerOptions } = require('jest-preset-angular/presets');

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'node',
  testMatch: ['**/src/base-site-resolver.spec.ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/../../',
    }),
    // jest-preset-angular maps beasties the same way the setup lib does
    '^../third_party/beasties/index.js$':
      '<rootDir>/../../node_modules/beasties',
    '^../third_party/domino/bundled-domino\\.mjs$':
      '<rootDir>/../../core-libs/setup/__mocks__/bundled-domino.js',
  },
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        tsconfig: {
          types: ['jest', 'node'],
        },
      },
    ],
  },
};
