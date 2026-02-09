/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AngularNodeAppEngine } from '@angular/ssr/node';
import { Request as ExpressRequest } from 'express';
import { NgExpressEngineInstance } from '../engine-decorator/ng-express-engine-decorator';
import {
  CxRequestContext,
  RequestContextWithCx,
} from '../engine/request-context.model';
import { ExpressServerLogger } from '../logger';
import { SsrCallbackFn } from './optimized-ssr-engine';

/**
 * Adapts Angular's modern AngularNodeAppEngine (Promise-based)
 * to the legacy NgExpressEngineInstance signature (callback-based).
 *
 * This allows OptimizedSsrEngine to work with the modern Angular engine
 * without any changes to OptimizedSsrEngine itself.
 *
 * Usage:
 * ```typescript
 * const adapter = new ModernEngineAdapter(logger);
 * const optimizedEngine = new OptimizedSsrEngine(
 *   adapter.engineInstance,
 *   ssrOptions
 * );
 * ```
 */
export class ModernEngineAdapter {
  private readonly angularEngine = new AngularNodeAppEngine();

  constructor(private readonly logger: ExpressServerLogger) {}

  /**
   * Returns a callback-based engine instance compatible with OptimizedSsrEngine.
   */
  get engineInstance(): NgExpressEngineInstance {
    return this.render.bind(this);
  }

  /**
   * Renders the Angular application for the given request.
   * Converts Promise-based AngularNodeAppEngine to callback-based API.
   *
   * @param _filePath - Not used by modern engine (kept for API compatibility)
   * @param options - Must contain `req` property with the Express request
   * @param callback - Called with (error, html) when rendering completes
   */
  private render(
    _filePath: string,
    options: object,
    callback: SsrCallbackFn
  ): void {
    const request = (options as { req: ExpressRequest }).req;
    let error: unknown;

    // Create Spartacus context for error propagation and logging
    const cxContext: CxRequestContext = {
      error: (propagatedError: unknown) => {
        // Capture only the first error
        error ??= propagatedError;
      },
      logger: this.logger,
    };

    const enhancedContext: RequestContextWithCx = {
      cx: cxContext,
    };

    // Use the Node.js request object (IncomingMessage) for AngularNodeAppEngine
    // Express enhances IncomingMessage but it's still compatible
    this.angularEngine
      .handle(request, enhancedContext)
      .then(async (response: Response | null) => {
        if (error) {
          callback(error as Error);
          return;
        }
        if (response) {
          const html = await response.text();
          callback(null, html);
        } else {
          // No matching route
          callback(null, undefined);
        }
      })
      .catch((err: Error) => {
        callback(err);
      });
  }
}
