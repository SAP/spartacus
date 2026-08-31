/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import angular from '@analogjs/vite-plugin-angular';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

const root = `${import.meta.dirname}/../..`;

export default defineConfig({
  root: import.meta.dirname,
  plugins: [angular(), nxViteTsPaths()],
  resolve: {
    alias: {
      // NOTE: order matters. Vite matches string aliases in order (first match
      // wins), and a bare alias like '@spartacus/storefront' also matches any
      // '@spartacus/storefront/...' import. The specific deep-path '/testing/*'
      // aliases MUST come before the bare package aliases below, or they get
      // shadowed and fail to resolve.
      '@spartacus/storefront/testing/mock-feature-directive': `${root}/core-libs/storefront/shared/test/mock-feature-directive.ts`,
      '@spartacus/storefront/testing/mock-feature-level-directive': `${root}/core-libs/storefront/shared/test/mock-feature-level-directive.ts`,
      '@spartacus/storefront/testing/icon-testing-module': `${root}/core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module.ts`,
      '@spartacus/core/testing/mock-feature-toggles': `${root}/core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      '@spartacus/core/testing/mock-url-pipe': `${root}/core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts`,
      'core-libs/core/src/features-config/feature-toggles/testing': `${root}/core-libs/core/src/features-config/feature-toggles/testing/index.ts`,
      // Resolve the storefront barrel to source so a newly added `export *`
      // symbol (e.g. FocusFirstInvalidFieldDirective) isn't dropped by esbuild's
      // dependency pre-bundling under the barrel's circular re-exports, which
      // would leave it `undefined` in a component's standalone `imports`.
      '@spartacus/storefront': `${root}/core-libs/storefront/public_api.ts`,
      // Resolve the core barrel to source too, so DI tokens like
      // FeatureConfigService/FeatureToggles are a single class identity. Without
      // this, the component's `@spartacus/core` FeatureDirective injects a
      // prebundled FeatureConfigService while `provideMockFeatureToggles`
      // overrides the source one — the tokens don't match, `*cxFeature` never
      // sees the mocked toggles, and gated content (e.g. the form body) never
      // renders.
      '@spartacus/core': `${root}/core-libs/core/public_api.ts`,
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
      reportsDirectory: `${import.meta.dirname}/../../coverage/checkout`,
      exclude: ['**/public_api.ts', '**/index.ts', '**/*.module.ts'],
      thresholds: { statements: 90, lines: 90, branches: 80, functions: 90 },
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
