/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RequestHandler } from 'express';
import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import { getRequestUrl } from './request-url';

/** Options for an Express handler backed by a base-site resolver. */
export interface BaseSiteRequestHandlerOptions {
  resolver: BaseSiteResolver;
  render: (baseSite: string | null) => string | Promise<string>;
  /** Response content type. Default: `text/plain`. */
  contentType?: string;
  /** Retry delays returned for recoverable resolver failures. */
  retryAfterSeconds?: {
    /** Delay for cold-cache load shedding. Default: `3`. */
    concurrencyLimit?: number;
    /** Delay for OCC failures. Default: `25`. */
    occUnavailable?: number;
  };
}

/** Creates an Express handler that renders the resolved base-site. */
export function createBaseSiteRequestHandler(
  options: BaseSiteRequestHandlerOptions
): RequestHandler {
  return async (request, response, next) => {
    try {
      const baseSite = await options.resolver.resolve(getRequestUrl(request));
      const output = await options.render(baseSite);
      response.type(options.contentType ?? 'text/plain').send(output);
    } catch (error) {
      let retryAfterSeconds: number;

      if (error instanceof ConcurrencyLimitError) {
        retryAfterSeconds =
          options.retryAfterSeconds?.concurrencyLimit ?? 3;
      } else if (error instanceof OccUnavailableError) {
        retryAfterSeconds =
          options.retryAfterSeconds?.occUnavailable ?? 25;
      } else {
        next(error);
        return;
      }

      response.setHeader('Retry-After', String(retryAfterSeconds));
      response.status(503).send('Service Unavailable');
    }
  };
}
