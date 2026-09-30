/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Makes Vitest's globals (`vi`, `describe`, `it`, `expect`, ...) available to
// the editor's TypeScript language server without an explicit import. Vitest is
// already configured with `globals: true` and `tsconfig.spec.json` lists
// `vitest/globals` in its `types`, but the editor resolves files under the root
// `tsconfig.json`, which does not. This root-level ambient reference bridges
// that gap additively, without overriding the root `types` (which would drop
// other ambient globals such as node/jasmine repo-wide).
/// <reference types="vitest/globals" />
