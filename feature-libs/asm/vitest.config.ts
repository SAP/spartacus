/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@spartacus/storefront/testing/mock-feature-directive': `${import.meta.dirname}/../../core-libs/storefront/shared/test/mock-feature-directive.ts`,
      '@spartacus/storefront/testing/mock-feature-level-directive': `${import.meta.dirname}/../../core-libs/storefront/shared/test/mock-feature-level-directive.ts`,
      '@spartacus/core/testing/process-reducers': `${import.meta.dirname}/../../core-libs/core/src/process/store/reducers/index.ts`,
      'core-libs/storefront/shared/test/mock-window-ref': `${import.meta.dirname}/../../core-libs/storefront/shared/test/mock-window-ref.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/asm`,
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
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-asm.xml`,
        },
      ],
    ],
  },
});
