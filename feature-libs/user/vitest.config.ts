/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

const root = `${import.meta.dirname}/../..`;

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular(), nxViteTsPaths()],
  resolve: {
    alias: {
      '@spartacus/storefront': `${root}/core-libs/storefront/public_api.ts`,
      '@spartacus/core': `${root}/core-libs/core/public_api.ts`,
      'core-libs/storefront/shared/test/mock-feature-directive': `${root}/core-libs/storefront/shared/test/mock-feature-directive.ts`,
      'core-libs/storefront/shared/test/mock-window-ref': `${root}/core-libs/storefront/shared/test/mock-window-ref.ts`,
      'core-libs/core/src/features-config/feature-toggles/testing': `${root}/core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module.ts`,
    },
  },
  test: {
    clearMocks: true,
    restoreMocks: true,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/user`,
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
        '../../testing/setup-vitest.ts',
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
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-user.xml`,
        },
      ],
    ],
  },
});
