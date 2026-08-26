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
  resolve: {
    alias: {
      '@spartacus/core/testing/feature-toggles': `${import.meta.dirname}/../../core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      '@spartacus/storefront/testing/mock-feature-directive': `${import.meta.dirname}/../../core-libs/storefront/shared/test/mock-feature-directive.ts`,
      '@spartacus/core/testing/i18n': `${import.meta.dirname}/../../core-libs/core/src/i18n/testing/index.ts`,
      '@spartacus/core/testing/url-testing': `${import.meta.dirname}/../../core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module.ts`,
      'core-libs/core/src/features-config/feature-toggles/testing': `${import.meta.dirname}/../../core-libs/core/src/features-config/feature-toggles/testing`,
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
      enabled: true,
      provider: 'v8',
      reporter: ['text-summary', 'html', 'lcov'],
      reportsDirectory: `${import.meta.dirname}/../../coverage/storefront`,
      include: ['**/*.ts'],
      exclude: [
        '**/*.spec.ts',
        '**/public_api.ts',
        '**/index.ts',
        '**/*.module.ts',
        '**/vitest.config.ts',
        '**/assets/**',
        '**/testing/**',
        '**/schematics/**',
        'setup-jest.ts',
      ],
      thresholds: {
        statements: 80,
        lines: 80,
        functions: 80,
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
