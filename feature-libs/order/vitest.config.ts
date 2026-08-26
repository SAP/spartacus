/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';

const root = `${import.meta.dirname}/../..`;

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular(), nxViteTsPaths()],
  resolve: {
    alias: {
      '@spartacus/core/process/store/reducers': `${root}/core-libs/core/src/process/store/reducers/index.ts`,
      '@spartacus/storefront/testing': `${root}/core-libs/storefront/shared/test/index.ts`,
      '@spartacus/storefront/keyboard-focus/testing': `${root}/core-libs/storefront/layout/a11y/keyboard-focus/focus-testing.module.ts`,
      '@spartacus/core/occ/testing': `${root}/core-libs/core/src/occ/adapters/user/unit-test.helper.ts`,
      '@spartacus/core/routing/testing': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
    },
  },
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/order`,
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
      thresholds: { statements: 90, lines: 90, functions: 90 },
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-order.xml`,
        },
      ],
    ],
  },
});
