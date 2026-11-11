/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

const root = `${import.meta.dirname}/../..`;

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      'core-libs/core/src/occ/adapters/user/unit-test.helper': `${root}/core-libs/core/src/occ/adapters/user/unit-test.helper.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/digital-payments`,
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
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-digital-payments.xml`,
        },
      ],
    ],
  },
});
