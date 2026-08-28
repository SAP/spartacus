/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';
import path from 'path';

const root = `${import.meta.dirname}/../..`;

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@spartacus/core': path.resolve(__dirname, '../../core-libs/core/public_api.ts'),
      '@spartacus/storefront': path.resolve(__dirname, '../../core-libs/storefront/public_api.ts'),
      'core-libs/storefront/shared/test/mock-feature-directive': `${root}/core-libs/storefront/shared/test/mock-feature-directive.ts`,
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
      provider: 'v8',
      reporter: ['lcov'],
      reportsDirectory: `${import.meta.dirname}/../../coverage/user`,
      exclude: [
        '**/public_api.ts',
        '**/index.ts',
        '**/*.module.ts',
        '../../testing/setup-vitest.ts',
      ],
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
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-user.xml`,
        },
      ],
    ],
  },
});
