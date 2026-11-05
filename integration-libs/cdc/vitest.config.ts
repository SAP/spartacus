/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular(), nxViteTsPaths()],
  resolve: {
    alias: {
      'core-libs/core/src/features-config/feature-toggles/testing': `${import.meta.dirname}/../../core-libs/core/src/features-config/feature-toggles/testing`,
      // Resolve the core/user barrels to source so DI tokens (e.g. FeatureToggles)
      // are a single class identity. Without this, the base `LoginAsGuestGuard`
      // (from @spartacus/user) injects a prebundled FeatureToggles while
      // `provideMockFeatureToggles` overrides the source one — the tokens don't
      // match, the mocked toggle is never seen, and the guard takes the wrong
      // branch. Keep AFTER the more-specific `core-libs/*` alias.
      '@spartacus/core': `${import.meta.dirname}/../../core-libs/core/public_api.ts`,
      '@spartacus/storefront': `${import.meta.dirname}/../../core-libs/storefront/public_api.ts`,
    },
  },
  test: {
    pool: 'forks',
    watch: false,
    globals: true,
    environment: 'jsdom',
    restoreMocks: true,
    setupFiles: ['../../testing/setup-vitest.ts'],
    include: ['**/*.spec.ts'],
    typecheck: {
      tsconfig: `${import.meta.dirname}/tsconfig.spec.json`,
    },
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
      reportsDirectory: `${import.meta.dirname}/../../coverage/cdc`,
      exclude: [
        '**/public_api.ts',
        '**/index.ts',
        '**/*.module.ts',
        '../../testing/setup-test.ts',
      ],
      thresholds: {
        statements: 85,
        lines: 85,
        branches: 65,
        functions: 85,
      },
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-cdc.xml`,
        },
      ],
    ],
  },
});
