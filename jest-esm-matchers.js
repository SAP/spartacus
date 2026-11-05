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
  // ESM-only deps pulled in by `@angular/ssr/node` (via cheerio/htmlparser2) on
  // Angular 22. Needed so `@spartacus/setup/ssr` Jest tests can load it as CJS.
  'cheerio',
  'cheerio-select',
  'css-select',
  'css-what',
  'domhandler',
  'domutils',
  'dom-serializer',
  'domelementtype',
  'htmlparser2',
  'nth-check',
  'boolbase',
  'parse5-htmlparser2-tree-adapter',
];

module.exports = { esmMatchers };
