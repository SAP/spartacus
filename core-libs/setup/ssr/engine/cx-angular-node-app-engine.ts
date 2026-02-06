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
}

/**
 * Spartacus wrapper for Angular's modern AngularNodeAppEngine.
 *
 * It is able to handle the propagated errors caught during server-side rendering
 * of a Spartacus app. If an error is propagated from the rendered application
 * (via `REQUEST_CONTEXT.cx.error` callback), then such an error will be thrown
 * and the result promise rejected - but only AFTER the rendering is complete.
 *
 * Note: if more errors are captured during the rendering, only the first one
 * will be used as the payload of the rejected promise, others won't.
 */
export class CxAngularNodeAppEngine {
  private readonly angularEngine = new AngularNodeAppEngine();
  private readonly logger: ExpressServerLogger;

  constructor(options?: CxAngularNodeAppEngineOptions) {
    this.logger = options?.logger ?? new DefaultExpressServerLogger();
  }

  /**
   * Handles an incoming HTTP request by rendering the Angular application.
   *
   * @param request - The Node.js request object
   * @param requestContext - Optional context passed to Angular's REQUEST_CONTEXT
   * @returns Promise resolving to a Response object or null if no matching route,
   *          OR rejects with the error if any is propagated from the rendered app.
   */
  handle(
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
}
