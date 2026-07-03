/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { join } from 'node:path';

export default defineConfig({
  root: join(import.meta.dirname),
  plugins: [angular(), nxViteTsPaths()],
  test: {
    pool: 'forks',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-test.ts'],
    include: ['**/*.spec.ts'],
    typecheck: {
      tsconfig: join(import.meta.dirname, 'tsconfig.spec.json'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['lcov'],
      reportsDirectory: join(import.meta.dirname, '../../coverage/core'),
      exclude: [
        '**/public_api.ts',
        '**/index.ts',
        '**/*.module.ts',
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
      ['junit', { outputFile: join(import.meta.dirname, '../../unit-tests-reports/unit-test-core.xml') }],
    ],
  },
});
