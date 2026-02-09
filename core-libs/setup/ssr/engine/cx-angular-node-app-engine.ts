/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AngularNodeAppEngine } from '@angular/ssr/node';
import type { IncomingMessage } from 'node:http';
import type { Http2ServerRequest } from 'node:http2';
import { DefaultExpressServerLogger } from '../logger/loggers/default-express-server-logger';
import { ExpressServerLogger } from '../logger/loggers/express-server-logger';
import { ModernEngineAdapter } from '../optimized-engine/modern-engine-adapter';
import { OptimizedSsrEngine } from '../optimized-engine/optimized-ssr-engine';
import { SsrOptimizationOptions } from '../optimized-engine/ssr-optimization-options';
import {
  CxRequestContext,
  RequestContextWithCx,
} from './request-context.model';

/**
 * Configuration options for CxAngularNodeAppEngine.
 */
export interface CxAngularNodeAppEngineOptions {
  /**
   * Server logger for contextual logging with request information.
   * If not provided, DefaultExpressServerLogger will be used.
   */
  logger?: ExpressServerLogger;

  /**
   * SSR optimization options. When provided, enables timeout, caching,
   * concurrency control, and render reuse features via OptimizedSsrEngine.
   *
   * When enabled, all the features from OptimizedSsrEngine become available:
   * - Timeout with CSR fallback
   * - Response caching
   * - Concurrency limiting
   * - Render reuse for concurrent requests to the same URL
   */
  optimization?: SsrOptimizationOptions;

  /**
   * Path to the index.html file for CSR fallback.
   * Required when optimization is enabled.
   *
   * This file is used when:
   * - SSR rendering times out
   * - Concurrency limit is exceeded
   * - An error occurs during rendering
   */
  documentFilePath?: string;
}

/**
 * Spartacus wrapper for Angular's modern AngularNodeAppEngine.
 *
 * Provides two modes of operation:
 *
 * 1. **Direct mode** (no optimization): Renders directly via AngularNodeAppEngine.
 *    Use this for development or when optimization is not needed.
 *
 * 2. **Optimized mode**: Uses OptimizedSsrEngine for production-grade SSR with:
 *    - Timeout with CSR fallback
 *    - Response caching
 *    - Concurrency control
 *    - Render reuse for concurrent requests
 *
 * Error propagation: If an error is propagated from the rendered application
 * (via `REQUEST_CONTEXT.cx.error` callback), the promise will be rejected
 * but only AFTER the rendering is complete.
 *
 * @example
 * ```typescript
 * // Direct mode (no optimization)
 * const angularApp = new CxAngularNodeAppEngine({ logger });
 *
 * // Optimized mode (with all SSR features)
 * const angularApp = new CxAngularNodeAppEngine({
 *   logger,
 *   documentFilePath: join(serverDistFolder, 'index.server.html'),
 *   optimization: {
 *     ...defaultSsrOptimizationOptions,
 *     timeout: 3000,
 *     cache: true,
 *     concurrency: 10,
 *   },
 * });
 * ```
 */
export class CxAngularNodeAppEngine {
  private readonly angularEngine = new AngularNodeAppEngine();
  private readonly logger: ExpressServerLogger;
  private readonly optimizedEngine?: OptimizedSsrEngine;
  private readonly documentFilePath?: string;

  constructor(options?: CxAngularNodeAppEngineOptions) {
    this.logger = options?.logger ?? new DefaultExpressServerLogger();
    this.documentFilePath = options?.documentFilePath;

    if (options?.optimization) {
      if (!options.documentFilePath) {
        throw new Error(
          'CxAngularNodeAppEngine: documentFilePath is required when optimization is enabled'
        );
      }
      const adapter = new ModernEngineAdapter(this.logger);
      this.optimizedEngine = new OptimizedSsrEngine(adapter.engineInstance, {
        ...options.optimization,
        logger: this.logger,
      });
    }
  }

  /**
   * Handles an incoming HTTP request by rendering the Angular application.
   *
   * When optimization is enabled, this method uses OptimizedSsrEngine which
   * provides timeout, caching, and concurrency control.
   *
   * @param request - The Node.js request object (can be Express-enhanced)
   * @param requestContext - Optional context passed to Angular's REQUEST_CONTEXT
   * @returns Promise resolving to a Response object or null if no matching route,
   *          OR rejects with the error if any is propagated from the rendered app.
   */
  handle(
    request: IncomingMessage | Http2ServerRequest,
    requestContext?: unknown
  ): Promise<Response | null> {
    if (this.optimizedEngine) {
      return this.handleWithOptimization(request);
    }
    return this.handleDirect(request, requestContext);
  }

  /**
   * Direct rendering without optimization (original behavior).
   * Used when no optimization options are provided.
   */
  private handleDirect(
    request: IncomingMessage | Http2ServerRequest,
    requestContext?: unknown
  ): Promise<Response | null> {
    let error: unknown;

    const cxContext: CxRequestContext = {
      error: (propagatedError: unknown) => {
        // Capture only the first error
        error ??= propagatedError;
      },
      logger: this.logger,
    };

    const enhancedContext: RequestContextWithCx = {
      ...(requestContext as object),
      cx: cxContext,
    };

    return this.angularEngine
      .handle(request, enhancedContext)
      .then((response: Response | null) => {
        if (error) {
          throw error;
        }
        return response;
      });
  }

  /**
   * Rendering with OptimizedSsrEngine (timeout, caching, concurrency).
   * Converts callback-based OptimizedSsrEngine back to Promise API.
   *
   * The request object is expected to be an Express request (IncomingMessage
   * enhanced by Express middleware) since OptimizedSsrEngine uses Express-specific
   * properties like `originalUrl`, `protocol`, and `get()` method.
   */
  private handleWithOptimization(
    request: IncomingMessage | Http2ServerRequest
  ): Promise<Response | null> {
    return new Promise((resolve, reject) => {
      // Ensure originalUrl is set for render key resolution
      // Express sets this, but we provide fallback for raw IncomingMessage
      const expressRequest = request as any;
      if (!expressRequest.originalUrl) {
        expressRequest.originalUrl = expressRequest.url;
      }
      // Ensure res exists for fallbackToCsr (it calls res.set())
      // This is a no-op mock since we handle response ourselves
      if (!expressRequest.res) {
        expressRequest.res = { set: () => {} };
      }

      const options = { req: expressRequest };

      this.optimizedEngine!.engineInstance(
        this.documentFilePath!,
        options,
        (err, html) => {
          if (err) {
            reject(err);
            return;
          }
          if (html) {
            resolve(
              new Response(html, {
                status: 200,
                headers: { 'Content-Type': 'text/html;charset=UTF-8' },
              })
            );
          } else {
            resolve(null);
          }
        }
      );
    });
  }
}
