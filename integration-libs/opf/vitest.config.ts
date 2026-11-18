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
      // NOTE: order matters — specific deep-path aliases must come before bare
      // package aliases, or they get shadowed and fail to resolve.
      'core-libs/core/src/routing/configurable-routes/url-translation/testing': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing`,
      '@spartacus/opf/base/core': `${root}/integration-libs/opf/base/core/public_api.ts`,
      '@spartacus/opf/base/root': `${root}/integration-libs/opf/base/root/public_api.ts`,
      '@spartacus/opf/checkout/components': `${root}/integration-libs/opf/checkout/components/public_api.ts`,
      '@spartacus/opf/checkout/root': `${root}/integration-libs/opf/checkout/root/public_api.ts`,
      '@spartacus/opf/cta/core': `${root}/integration-libs/opf/cta/core/public_api.ts`,
      '@spartacus/opf/cta/root': `${root}/integration-libs/opf/cta/root/public_api.ts`,
      '@spartacus/opf/gift-card/core': `${root}/integration-libs/opf/gift-card/core/public_api.ts`,
      '@spartacus/opf/gift-card/root': `${root}/integration-libs/opf/gift-card/root/public_api.ts`,
      '@spartacus/opf/global-functions/core': `${root}/integration-libs/opf/global-functions/core/public_api.ts`,
      '@spartacus/opf/global-functions/root': `${root}/integration-libs/opf/global-functions/root/public_api.ts`,
      '@spartacus/opf/payment/core': `${root}/integration-libs/opf/payment/core/public_api.ts`,
      '@spartacus/opf/payment/root': `${root}/integration-libs/opf/payment/root/public_api.ts`,
      '@spartacus/opf/quick-buy/core': `${root}/integration-libs/opf/quick-buy/core/public_api.ts`,
      '@spartacus/opf/quick-buy/root': `${root}/integration-libs/opf/quick-buy/root/public_api.ts`,
      '@spartacus/opf/tokenisation/root': `${root}/integration-libs/opf/tokenisation/root/public_api.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/opf`,
      exclude: [
        '**/*.spec.ts',
        '**/public_api.ts',
        '**/index.ts',
        '**/*.module.ts',
        '**/vitest.config.ts',
        '**/assets/**',
        '**/testing/**',
        '**/schematics/**',
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
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-opf.xml`,
        },
      ],
    ],
  },
});
