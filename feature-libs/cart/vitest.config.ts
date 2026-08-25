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
      '@spartacus/core/testing/mock-feature-toggles': `${root}/core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      '@spartacus/core/testing/process-reducers': `${root}/core-libs/core/src/process/store/reducers/index.ts`,
      '@spartacus/core/testing/client-auth-reducers': `${root}/core-libs/core/src/auth/client-auth/store/reducers/index.ts`,
      '@spartacus/core/testing/user-reducers': `${root}/core-libs/core/src/user/store/reducers/index.ts`,
      '@spartacus/core/testing/mock-occ-endpoints': `${root}/core-libs/core/src/occ/adapters/user/unit-test.helper.ts`,
      '@spartacus/core/testing/mock-url-pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
      '@spartacus/storefront/testing/mock-feature-directive': `${root}/core-libs/storefront/shared/test/mock-feature-directive.ts`,
      '@spartacus/storefront/testing/mock-feature-level-directive': `${root}/core-libs/storefront/shared/test/mock-feature-level-directive.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/cart`,
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
      ],
      thresholds: { statements: 90, lines: 90, branches: 80, functions: 90 },
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-cart.xml`,
        },
      ],
    ],
  },
});
