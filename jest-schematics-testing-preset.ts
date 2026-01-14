/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export default {
  preset: 'jest-preset-angular',
  transformIgnorePatterns: [
    /**
     * Because ESM support is experimental in Jest, we don't enable it
     * So Jest has to transform ESM files inside node_modules.
     * For more see Jest docs: https://jestjs.io/docs/ecmascript-modules
     *
     * Due to a negative lookahead, we need to compose 2 patterns into one:
     * -  Original pattern `node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))` - copied from jest-preset-angular sources
     *   see https://github.com/thymikee/jest-preset-angular/blob/8b7673ee739919433b0834fe4a3f55862801bd40/src/presets/create-cjs-preset.ts#L22
     - Custom pattern `node_modules/(?!parse5)` - because in parse5@18.0.0 became an ESM-only package
     */
    'node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$)|parse5)',
  ],
};
