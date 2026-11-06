import { defineConfig } from 'eslint/config';
import nxPlugin from '@nx/eslint-plugin';
import rootConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    plugins: { '@nx': nxPlugin },
    rules: {
      '@angular-eslint/component-selector': 'off',
      '@nx/workspace-use-provide-default-config': 'off',
      '@nx/workspace-use-provide-default-config-factory': 'off',
      '@nx/workspace-use-provide-default-feature-toggles': 'off',
      '@nx/workspace-use-provide-default-feature-toggles-factory': 'off',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          checkDynamicDependenciesExceptions: ['@spartacus/**'],
        },
      ],
    },
  },
  {
    files: ['**/spartacus-features.module.ts'],
    plugins: { '@nx': nxPlugin },
    rules: {
      '@nx/workspace-no-storefrontapp-false-feature-toggles': 'error',
    },
  },
]);
