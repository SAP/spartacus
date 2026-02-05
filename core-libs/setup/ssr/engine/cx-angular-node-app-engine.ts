/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AngularNodeAppEngine } from '@angular/ssr/node';
import type { IncomingMessage } from 'node:http';
import type { Http2ServerRequest } from 'node:http2';

/**
 * Spartacus wrapper for Angular's modern AngularNodeAppEngine.
 * 
 * This class wraps the standard Angular SSR engine and provides integration
 * with Spartacus-specific SSR optimization features (timeout, caching, concurrency).
 * 
 * Unlike the legacy CommonEngine-based approach, this uses the modern
 * Promise-based API with web-standard Request/Response objects.
 * 
 * @remarks
 * This is the modern replacement for the legacy ngExpressEngine + CxCommonEngine approach.
 * It coexists with the legacy system during migration but will become the default in future versions.
 * 
 * @example
 * ```typescript
 * const angularApp = new CxAngularNodeAppEngine();
 * 
 * app.use((req, res, next) => {
 *   angularApp.handle(req)
 *     .then(response => response ? writeResponseToNodeResponse(response, res) : next())
 *     .catch(next);
 * });
 * ```
 */
export class CxAngularNodeAppEngine {
  private readonly angularEngine = new AngularNodeAppEngine();

  /**
   * Creates a new instance of CxAngularNodeAppEngine.
   * 
   * @param options - Optional SSR optimization options (timeout, caching, concurrency)
   *                  Note: Optimization features will be added in Phase 3
   */
  constructor() {
    // Future: Accept SsrOptimizationOptions parameter in Phase 3
  }

  /**
   * Handles an incoming HTTP request by rendering the Angular application.
   * 
   * This method:
   * 1. Converts the Node.js request to a web-standard Request
   * 2. Delegates to AngularNodeAppEngine for rendering
   * 3. Returns a web-standard Response or null if no matching route
   * 
   * @param request - The Node.js request object (IncomingMessage or Http2ServerRequest)
   * @param requestContext - Optional context for rendering (passed to Angular)
   * @returns Promise resolving to a Response object or null if no matching Angular route
   * 
   * @remarks
   * - Returns null for non-Angular routes (static files, API endpoints)
   * - Errors during rendering will reject the Promise (caught by Express error middleware)
   * - Future: Will integrate error propagation mechanism in Phase 2
   */
  async handle(
    request: IncomingMessage | Http2ServerRequest,
    requestContext?: unknown
  ): Promise<Response | null> {
    // Future Phase 2: Add error propagation mechanism here
    // Future Phase 3: Add orchestrator for timeout, caching, concurrency
    
    return this.angularEngine.handle(request, requestContext);
  }
}
