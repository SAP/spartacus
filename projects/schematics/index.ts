/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * Public API Surface of schematics
 * NOTE: it exports utils for other Spartacus libs' schematics, but is not intended
 *       as a public API for external use. It may change without deprecation.
 */
export { Schema as SpartacusOptions } from './src/add-spartacus/schema';
export * from './src/shared/index';
