import { NgSetupOptions } from '@nguniversal/express-engine';
import {
  OptimizedSsrEngine,
  SsrCallbackFn,
} from '../optimized-engine/optimized-ssr-engine';
import { SsrOptimizationOptions } from '../optimized-engine/ssr-optimization-options';
import { getServerRequestProviders } from '../providers/ssr-providers';

export type NgExpressEngineInstance = (
  filePath: string,
  options: object,
  callback: SsrCallbackFn
) => void;

export type NgExpressEngine = (
  setupOptions: Readonly<NgSetupOptions>
) => NgExpressEngineInstance;

/**
 * The wrapper over the standard ngExpressEngine, that provides tokens for Spartacus
 * @param ngExpressEngine
 */
export class NgExpressEngineDecorator {
  /**
   * Returns the higher order ngExpressEngine with provided tokens for Spartacus
   *
   * @param ngExpressEngine
   */
  static get(
    ngExpressEngine: NgExpressEngine,
    optimizationOptions?: SsrOptimizationOptions | null
  ): NgExpressEngine {
    return decorateExpressEngine(ngExpressEngine, optimizationOptions);
  }
}

export function decorateExpressEngine(
  ngExpressEngine: NgExpressEngine,
  optimizationOptions: SsrOptimizationOptions | null = {
    concurrency: 20,
    timeout: 3000,
  }
): NgExpressEngine {
  return function (setupOptions: NgSetupOptions) {
    const engineInstance = ngExpressEngine({
      ...setupOptions,
      providers: [
        // add spartacus related providers
        ...getServerRequestProviders(),
        ...(setupOptions.providers ?? []),
      ],
    });

    // apply optimization wrapper if optimization options were defined
    return optimizationOptions
      ? new OptimizedSsrEngine(engineInstance, optimizationOptions)
          .engineInstance
      : engineInstance;
  };
}
