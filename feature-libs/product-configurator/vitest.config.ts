/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

const root = `${import.meta.dirname}/../..`;

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular(), nxViteTsPaths()],
  resolve: {
    alias: {
      'core-libs/storefront/shared/test/mock-feature-directive': `${root}/core-libs/storefront/shared/test/mock-feature-directive.ts`,
      'core-libs/storefront/shared/test/mock-feature-level-directive': `${root}/core-libs/storefront/shared/test/mock-feature-level-directive.ts`,
      'core-libs/core/src/features-config/feature-toggles/testing': `${root}/core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/product-configurator`,
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
        'textfield/root/**',
        '../../testing/setup-vitest.ts',
      ],
      thresholds: {
        statements: 90,
        lines: 90,
        functions: 90,
      },
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-product-configurator.xml`,
        },
      ],
    ],
  },
});
