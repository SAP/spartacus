/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * SPIKE — not production code.
 * Approach (a): Pure Node — no Angular involved.
 *
 * Framework-provided Express handler that resolves the baseSiteId for the
 * incoming request and hands it to an app-supplied `render` callback. The app
 * owns the route and the response content; the framework owns resolution and
 * the failure-to-HTTP mapping, so every consumer gets the same reliability
 * behaviour for free.
 */

import { RequestHandler } from 'express';
import { getRequestUrl } from '../express-utils/express-request-url';
import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

export interface BaseSiteRequestHandlerOptions {
  /** Resolver used to derive the baseSiteId from the request URL. */
  resolver: BaseSiteResolver;
  /**
   * Produces the response body from the resolved baseSiteId. Receives null when
   * no urlPattern matched and no default baseSite is configured.
   */
  render: (baseSiteId: string | null) => string | Promise<string>;
  /** Response content type. Default: 'text/plain'. */
  contentType?: string;
  /** `Retry-After` header value (seconds) sent with the 503. Default: 5. */
  retryAfterSeconds?: number;
}

/**
 * Builds an Express handler that:
 * - resolves the baseSiteId from a trust-proxy-aware request URL,
 * - renders the body via the supplied callback and sends it,
 * - maps resolver failures to `503 Service Unavailable` + `Retry-After`:
 *     - `ConcurrencyLimitError` — the request was shed under load,
 *     - `OccUnavailableError`   — OCC was unreachable or timed out.
 * Any other error is forwarded to the next error handler.
 */
export function createBaseSiteRequestHandler(
  options: BaseSiteRequestHandlerOptions
): RequestHandler {
  const {
    resolver,
    render,
    contentType = 'text/plain',
    retryAfterSeconds = 5,
  } = options;

  return async (req, res, next) => {
    try {
      const baseSiteId = await resolver.resolve(getRequestUrl(req));
      const body = await render(baseSiteId);
      res.type(contentType).send(body);
    } catch (err) {
      if (
        err instanceof ConcurrencyLimitError ||
        err instanceof OccUnavailableError
      ) {
        res
          .status(503)
          .set('Retry-After', String(retryAfterSeconds))
          .type(contentType)
          .send('Service Unavailable');
      } else {
        next(err);
      }
    }
  };
}
