/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Proxy module for Angular's bundled-domino.mjs.
 *
 * Jest runs in a CommonJS environment and cannot correctly resolve the default
 * export from the `.mjs` ES-module bundle that Angular internalised for domino.
 * This proxy re-exports the module so that Jest's CJS interop returns the
 * expected default export (the domino library object).
 *
 * The subpath `third_party/domino/bundled-domino.mjs` is not listed in
 * @angular/platform-server's `exports` map, so we resolve the package root
 * first, then build the direct filesystem path.
 *
 * See: https://github.com/angular/angular-cli/pull/28228
 * and: https://github.com/angular/angular-cli/pull/28726 (same pattern used
 * for beasties)
 */

// Resolve the platform-server package root by stripping the fesm2022 entry
// point from the resolved main file path.
const platformServerDir = require
  .resolve('@angular/platform-server')
  .replace(/fesm2022[/\\]platform-server\.mjs$/, '');

const domino = require(
  platformServerDir + 'third_party/domino/bundled-domino.mjs'
);
module.exports = domino.default ?? domino;

