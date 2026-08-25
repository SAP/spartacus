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
      '@spartacus/storefront/testing/mock-feature-directive': `${root}/core-libs/storefront/shared/test/mock-feature-directive.ts`,
      '@spartacus/storefront/testing/mock-feature-level-directive': `${root}/core-libs/storefront/shared/test/mock-feature-level-directive.ts`,
      '@spartacus/storefront/testing/icon-testing-module': `${root}/core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module.ts`,
      '@spartacus/core/testing/mock-feature-toggles': `${root}/core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      '@spartacus/core/testing/mock-url-pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/checkout`,
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
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-checkout.xml`,
        },
      ],
    ],
  },
});
