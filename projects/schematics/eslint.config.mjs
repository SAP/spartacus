import { defineConfig } from 'eslint/config';
import rootConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...rootConfig,
  { ignores: ['**/*.d.ts'] },
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
]);
