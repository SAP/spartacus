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
import { ServerOptions } from '../providers/model';
import { getServerRequestProviders } from '../providers/ssr-providers';

export type NgExpressEngineInstance = (
  filePath: string,
  options: object,
  callback: SsrCallbackFn
) => void;

export type NgExpressEngine = (
  setupOptions: Readonly<CommonEngineRenderOptions & CommonEngineOptions>
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
   * @param optimizationOptions SSR optimization options
   * @param serverOptions server options; e.g. `allowedOrigins` for
   *   defense-in-depth request-origin validation in SSR mode.
   */
  static get(
    ngExpressEngine: NgExpressEngine,
    optimizationOptions?: SsrOptimizationOptions | null,
    serverOptions?: ServerOptions
  ): NgExpressEngine {
    return decorateExpressEngine(
      ngExpressEngine,
      optimizationOptions,
      serverOptions
    );
  }
}

export function decorateExpressEngine(
  ngExpressEngine: NgExpressEngine,
  optimizationOptions:
    | SsrOptimizationOptions
    | null
    | undefined = defaultSsrOptimizationOptions,
  serverOptions?: ServerOptions
): NgExpressEngine {
  return function (setupOptions: NgSetupOptions) {
    const engineInstance = ngExpressEngine({
      ...setupOptions,
      providers: [
        // add spartacus related providers
        ...getServerRequestProviders(serverOptions),
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
