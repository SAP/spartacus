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
      include: ['**/*.ts'],
      reportsDirectory: `${import.meta.dirname}/../../coverage/omf`,
      exclude: [
        '**/public_api.ts',
        '**/index.ts',
        '**/*.module.ts',
        '**/*.spec.ts',
        '*/setup-jest.ts',
        '*/default-*.ts',
        '*/feature-name.ts',
        '../../testing/setup-test.ts',
        '**/schematics/**',
      ],
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 75,
        functions: 90,
      },
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-omf.xml`,
        },
      ],
    ],
  },
});
