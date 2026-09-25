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
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
      'core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module': `${root}/core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/s4-service`,
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
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-s4-service.xml`,
        },
      ],
    ],
  },
});
