/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  resolve: {
    alias: {
      // NOTE: order matters. Vite matches string aliases in order (first match
      // wins), and a bare alias like '@spartacus/storefront' also matches any
      // '@spartacus/storefront/...' import. The specific deep-path aliases must
      // come BEFORE the general package aliases, otherwise they get shadowed.
      '@spartacus/core/testing/feature-toggles': `${import.meta.dirname}/../../core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      '@spartacus/storefront/testing/mock-feature-directive': `${import.meta.dirname}/../../core-libs/storefront/shared/test/mock-feature-directive.ts`,
      '@spartacus/core/testing/i18n': `${import.meta.dirname}/../../core-libs/core/src/i18n/testing/index.ts`,
      '@spartacus/core/testing/url-testing': `${import.meta.dirname}/../../core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module.ts`,
      'core-libs/core/src/features-config/feature-toggles/testing': `${import.meta.dirname}/../../core-libs/core/src/features-config/feature-toggles/testing`,
      '@spartacus/core': path.resolve(
        import.meta.dirname,
        '../core/public_api.ts'
      ),
      '@spartacus/storefront': path.resolve(
        import.meta.dirname,
        './public_api.ts'
      ),
    },
  },
  plugins: [angular(), nxViteTsPaths()],
  test: {
    pool: 'forks',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../../testing/setup-vitest.ts'],
    include: ['**/*.spec.ts'],
    typecheck: {
      tsconfig: `${import.meta.dirname}/tsconfig.spec.json`,
    },
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
      reportsDirectory: `${import.meta.dirname}/../../coverage/storefront`,
      exclude: ['**/public_api.ts', '**/index.ts', '**/*.module.ts'],
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 80,
        functions: 90,
      },
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-storefront.xml`,
        },
      ],
    ],
  },
});
