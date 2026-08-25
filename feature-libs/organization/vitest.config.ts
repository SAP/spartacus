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
      'core-libs/core/src/process/store/reducers/index': `${root}/core-libs/core/src/process/store/reducers/index.ts`,
      'core-libs/core/src/global-message/models/global-message.model': `${root}/core-libs/core/src/global-message/models/global-message.model.ts`,
      'core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module': `${root}/core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module.ts`,
      'core-libs/storefront/layout/a11y/keyboard-focus/focus-testing.module': `${root}/core-libs/storefront/layout/a11y/keyboard-focus/focus-testing.module.ts`,
      'core-libs/storefront/shared/test/mock-feature-directive': `${root}/core-libs/storefront/shared/test/mock-feature-directive.ts`,
      'core-libs/core/src/occ/adapters/user/unit-test.helper': `${root}/core-libs/core/src/occ/adapters/user/unit-test.helper.ts`,
      'core-libs/core/src/i18n/testing/mock-translation.service': `${root}/core-libs/core/src/i18n/testing/mock-translation.service.ts`,
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
      'core-libs/storefront/shared/components/list-navigation/pagination/testing/pagination-testing.module': `${root}/core-libs/storefront/shared/components/list-navigation/pagination/testing/pagination-testing.module.ts`,
      'core-libs/storefront/shared/components/split-view/testing/spit-view-testing.module': `${root}/core-libs/storefront/shared/components/split-view/testing/spit-view-testing.module.ts`,
      'core-libs/core/src/util/testing-time-utils': `${root}/core-libs/core/src/util/testing-time-utils.ts`,
      'core-libs/core/src/routing/configurable-routes/url-translation/url.pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/url.pipe.ts`,
      'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module.ts`,
      'core-libs/storefront/shared/components/split-view/view/view.component': `${root}/core-libs/storefront/shared/components/split-view/view/view.component.ts`,
      'core-libs/core/src/features-config/feature-toggles/testing': `${root}/core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/organization`,
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
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-organization.xml`,
        },
      ],
    ],
  },
});
