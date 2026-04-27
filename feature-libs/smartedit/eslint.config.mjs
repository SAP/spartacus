import { defineConfig } from 'eslint/config';
import rootConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...rootConfig,
  { ignores: ['schematics/**/*.d.ts'] },
]);
