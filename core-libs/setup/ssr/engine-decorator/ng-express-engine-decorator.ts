/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CommonEngineOptions,
  CommonEngineRenderOptions,
} from '@angular/ssr/node';
import { NgSetupOptions } from '../engine/ng-express-engine';
import {
  OptimizedSsrEngine,
  SsrCallbackFn,
} from '../optimized-engine/optimized-ssr-engine';
import {
  SsrOptimizationOptions,
  defaultSsrOptimizationOptions,
} from '../optimized-engine/ssr-optimization-options';
import { getServerRequestProviders } from '../providers/ssr-providers';

/**
 * Type for a callback-based Express engine instance.
 *
 * @deprecated This type is part of the legacy ngExpressEngine system.
 * Use CxAngularNodeAppEngine with the modern Promise-based API instead.
 */
export type NgExpressEngineInstance = (
  filePath: string,
  options: object,
  callback: SsrCallbackFn
) => void;

/**
 * Type for a factory function that creates NgExpressEngineInstance.
 *
 * @deprecated This type is part of the legacy ngExpressEngine system.
 * Use CxAngularNodeAppEngine with the modern Promise-based API instead.
 */
export type NgExpressEngine = (
  setupOptions: Readonly<CommonEngineRenderOptions & CommonEngineOptions>
) => NgExpressEngineInstance;

/**
 * The wrapper over the standard ngExpressEngine, that provides tokens for Spartacus
 * 
 * @deprecated This is the legacy decorator for the callback-based ngExpressEngine.
 * Use CxAngularNodeAppEngine with the modern Promise-based API instead.
 * See server-legacy.ts for the old implementation and server.ts for the modern approach.
 * This will be removed in a future major version.
 * 
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

/**
 * Decorates ngExpressEngine with Spartacus providers and optional SSR optimization.
 *
 * @deprecated This function is part of the legacy ngExpressEngine system.
 * Use CxAngularNodeAppEngine with the modern Promise-based API instead.
 */
export function decorateExpressEngine(
  ngExpressEngine: NgExpressEngine,
  optimizationOptions:
    | SsrOptimizationOptions
    | null
    | undefined = defaultSsrOptimizationOptions
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
