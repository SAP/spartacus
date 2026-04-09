import { defineConfig } from 'eslint/config';
import rootConfig from '../../../eslint.config.mjs';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'cx-org',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'cxOrg',
          style: 'camelCase',
        },
      ],
    },
  },
]);
