/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ESM-only packages that need to be transformed by Jest.
 *
 * By default, Jest doesn't transform node_modules. However, these packages
 * ship only ESM (no CommonJS fallback), so Jest must transform them to work
 * in its CommonJS-based test environment.
 *
 * @see https://jestjs.io/docs/ecmascript-modules
 * @see https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
 */
const esmMatchers = [
  '.*\\.mjs$',
  '@angular/common/locales/.*\\.js$',
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
  'parse5',
  'entities',
];

module.exports = { esmMatchers };
