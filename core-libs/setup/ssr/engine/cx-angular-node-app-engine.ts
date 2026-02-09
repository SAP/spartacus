/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { IncomingMessage } from 'node:http';
import type { Http2ServerRequest } from 'node:http2';
import { DefaultExpressServerLogger } from '../logger/loggers/default-express-server-logger';
import { ExpressServerLogger } from '../logger/loggers/express-server-logger';
import { ModernEngineAdapter } from '../optimized-engine/modern-engine-adapter';
import { OptimizedSsrEngine } from '../optimized-engine/optimized-ssr-engine';
import {
  defaultSsrOptimizationOptions,
  SsrOptimizationOptions,
} from '../optimized-engine/ssr-optimization-options';

/**
 * Configuration options for CxAngularNodeAppEngine.
 */
export interface CxAngularNodeAppEngineOptions {
  /**
   * Path to the index.html file for CSR fallback.
   *
   * This file is used when:
   * - SSR rendering times out
   * - Concurrency limit is exceeded
   * - An error occurs during rendering
   */
  documentFilePath: string;

  /**
   * SSR optimization options for timeout, caching, concurrency control,
   * and render reuse features via OptimizedSsrEngine.
   *
   * If not provided, defaults from `defaultSsrOptimizationOptions` are used.
   *
   * Features available:
   * - Timeout with CSR fallback
   * - Response caching
   * - Concurrency limiting
   * - Render reuse for concurrent requests to the same URL
   */
  optimization?: SsrOptimizationOptions;

  /**
   * Server logger for contextual logging with request information.
   * If not provided, DefaultExpressServerLogger will be used.
   */
  logger?: ExpressServerLogger;
}

/**
 * Spartacus wrapper for Angular's modern AngularNodeAppEngine.
 *
 * Provides production-grade SSR with OptimizedSsrEngine features:
 * - Timeout with CSR fallback
 * - Response caching
 * - Concurrency control
 * - Render reuse for concurrent requests
 *
 * Error propagation: If an error is propagated from the rendered application
 * (via `REQUEST_CONTEXT.cx.error` callback), the promise will be rejected
 * but only AFTER the rendering is complete.
 *
 * @example
 * ```typescript
 * const angularApp = new CxAngularNodeAppEngine({
 *   documentFilePath: join(serverDistFolder, 'index.server.html'),
 *   optimization: {
 *     ...defaultSsrOptimizationOptions,
 *     timeout: 3000,
 *     cache: true,
 *     concurrency: 10,
 *   },
 * });
 *
 * // In Express middleware
 * server.use((req, res, next) => {
 *   angularApp.handle(req)
 *     .then(response => response ? writeResponseToNodeResponse(response, res) : next())
 *     .catch(next);
 * });
 * ```
 */
export class CxAngularNodeAppEngine {
  private readonly logger: ExpressServerLogger;
  private readonly optimizedEngine: OptimizedSsrEngine;
  private readonly documentFilePath: string;

  constructor(options: CxAngularNodeAppEngineOptions) {
    this.logger = options.logger ?? new DefaultExpressServerLogger();
    this.documentFilePath = options.documentFilePath;

    const adapter = new ModernEngineAdapter(this.logger);
    this.optimizedEngine = new OptimizedSsrEngine(adapter.engineInstance, {
      ...defaultSsrOptimizationOptions,
      ...options.optimization,
      logger: this.logger,
    });
  }

  /**
   * Handles an incoming HTTP request by rendering the Angular application.
   *
   * Uses OptimizedSsrEngine which provides timeout, caching, and concurrency control.
   *
   * @param request - The Node.js request object (can be Express-enhanced)
   * @returns Promise resolving to a Response object or null if no matching route,
   *          OR rejects with the error if any is propagated from the rendered app.
   */
  handle(request: IncomingMessage | Http2ServerRequest): Promise<Response | null> {
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

      this.optimizedEngine.engineInstance(
        this.documentFilePath,
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
