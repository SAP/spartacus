/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonEngineRenderOptions } from '@angular/ssr';
import {
  OptimizedSsrEngine,
  SsrCallbackFn,
} from '../optimized-engine/optimized-ssr-engine';
import {
  SsrOptimizationOptions,
  defaultSsrOptimizationOptions,
} from '../optimized-engine/ssr-optimization-options';
import { getServerRequestProviders } from '../providers/ssr-providers';

export type CxExpressEngineInstance = (
  filePath: string,
  options: object,
  callback: SsrCallbackFn
) => void;

export type CxExpressEngine = (
  setupOptions: Readonly<CommonEngineRenderOptions>
) => CxExpressEngineInstance;

/**
 * The wrapper over the standard ngExpressEngine, that provides tokens for Spartacus
 * @param ngExpressEngine
 */
export class NgExpressEngineDecorator {
  /**
   * Returns the higher order ngExpressEngine with provided tokens for Spartacus
   *
   * @param cxExpressEngine
   */
  static get(
    cxExpressEngine: CxExpressEngine,
    optimizationOptions?: SsrOptimizationOptions | null
  ): CxExpressEngine {
    return decorateExpressEngine(cxExpressEngine, optimizationOptions);
  }
}

export function decorateExpressEngine(
  ngExpressEngine: CxExpressEngine,
  optimizationOptions:
    | SsrOptimizationOptions
    | null
    | undefined = defaultSsrOptimizationOptions
): CxExpressEngine {
  return function (setupOptions: CommonEngineRenderOptions) {
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
