/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const PACKAGE_JSON = 'package.json';
export const NG_PACKAGE_JSON = 'ng-package.json';
export const SPARTACUS_SCOPE = '@spartacus';
export const SAP_SCOPE = 'sap';
export const SAPUI5_TYPES = '@sapui5/ts-types-esm';
export const SPARTACUS_SCHEMATICS = `${SPARTACUS_SCOPE}/schematics`;
export const PUBLISHING_VERSION = '221121.20.0';

/**
 * Implied peerDependencies: external packages we depend on indirectly, through
 * the peerDependencies of another package we DO import directly.
 *
 * The dependency scanner only detects packages we `import` in our own source,
 * so it never sees these. Without this map, `config:update` would neither add
 * them nor keep them (it strips anything not directly imported).
 *
 * `@ng-select/ng-select@24` imports `@angular/cdk/*` and lists `@angular/cdk`
 * in its peerDependencies; a customer installing a Spartacus lib that uses
 * ng-select therefore also needs `@angular/cdk`.
 */
export const IMPLIED_PEER_DEPENDENCIES: Record<string, string[]> = {
  '@ng-select/ng-select': ['@angular/cdk'],
};
