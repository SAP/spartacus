/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      'core-libs/storefront/shared/test/mock-feature-directive': path.resolve(__dirname, '../../core-libs/storefront/shared/test/mock-feature-directive.ts'),
      'core-libs/core/src/i18n/testing': path.resolve(__dirname, '../../core-libs/core/src/i18n/testing/index.ts'),
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module': path.resolve(__dirname, '../../core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module.ts'),
      'core-libs/core/src/features-config/feature-toggles/testing': path.resolve(__dirname, '../../core-libs/core/src/features-config/feature-toggles/testing/index.ts'),
    },
  },
  plugins: [angular(), nxViteTsPaths()],
  test: {
    pool: 'forks',
    watch: false,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../../testing/setup-vitest.ts'],
    include: ['**/*.spec.ts'],
    typecheck: {
      tsconfig: path.resolve(__dirname, 'tsconfig.spec.json'),
    },
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text-summary', 'html', 'lcov'],
      reportsDirectory: path.resolve(__dirname, '../../coverage/storefront'),
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
        statements: 80,
        lines: 80,
        functions: 80,
      },
    },
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: path.resolve(__dirname, '../../unit-tests-reports/unit-test-storefront.xml'),
        },
      ],
    ],
  },
});
