import { SsrOptimizationOptions } from '@spartacus/setup/ssr';

export const spikeSsrOptimizationOptions: SsrOptimizationOptions = {
  timeout: 5 * 60 * 1000,
  debug: false,
  concurrency: 100,
  maxRenderTime: 5 * 60 * 1000,
};
