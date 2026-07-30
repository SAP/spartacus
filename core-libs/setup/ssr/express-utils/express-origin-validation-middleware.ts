/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, RequestHandler } from 'express';
import type { ExpressServerLogger } from '../logger/loggers/express-server-logger';
import { getRequestOrigin } from './express-request-origin';

export interface OriginValidationOptions {
  allowedOrigins?: string[];
  logger?: ExpressServerLogger;
}

/**
 * Returns an Express middleware that guards against Host header injection and
 * cache poisoning by validating the resolved request origin against an
 * operator-provided allowlist.
 *
 * When the resolved origin is not in the allowlist, the `host` and
 * `x-forwarded-host` headers are overwritten with the canonical host parsed
 * from the first entry of `allowedOrigins`, so that downstream SSR URL
 * construction always uses a safe, operator-controlled origin.
 *
 * When `allowedOrigins` is absent or empty, a no-op middleware is returned and
 * the default Express `trust proxy` behavior is preserved.
 *
 * When a `logger` is provided, diagnostic messages are emitted through it as
 * structured (JSON) log entries carrying the request context, so they land in
 * the `logs-json-*` index of SAP Cloud Logging.
 *
 * Usage in server.ts:
 * ```ts
 * import { getOriginValidationMiddleware } from '@spartacus/setup/ssr';
 * server.use(getOriginValidationMiddleware({ allowedOrigins }));
 * ```
 */
export function getOriginValidationMiddleware(
  options: OriginValidationOptions
): RequestHandler {
  const { allowedOrigins, logger } = options;
  if (!allowedOrigins?.length) {
    return (_req, _res, next) => next();
  }
  const canonicalHost = new URL(allowedOrigins[0]).host;
  return (req, _res, next) => {
    const origin = getRequestOrigin(req);
    logger?.log('allowedOrigins size: ' + allowedOrigins.length, {
      request: req,
    });
    if (!isAllowedOrigin(origin, allowedOrigins, req, logger)) {
      logger?.warn(
        `Origin "${origin}" is not in the allowedOrigins list. Rewriting to canonical origin "${allowedOrigins[0]}".`,
        { request: req }
      );
      req.headers['host'] = canonicalHost;
      req.headers['x-forwarded-host'] = canonicalHost;
    } else {
      logger?.log(`Resolved origin: ${origin}`, { request: req });
    }
    next();
  };
}

function isAllowedOrigin(
  origin: string,
  allowedOrigins: string[],
  req: Request,
  logger?: ExpressServerLogger
): boolean {
  const normalizedOrigin = origin.toLowerCase();
  return allowedOrigins.some((allowed) => {
    const normalizedAllowed = allowed.toLowerCase();
    if (normalizedAllowed.includes('*')) {
      const pattern = normalizedAllowed
        .split('*')
        .map((segment) =>
          segment.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
        )
        .join('[^.]+');
      return new RegExp(`^${pattern}$`).test(normalizedOrigin);
    }
    logger?.log('normalizedOrigin: ' + normalizedOrigin, { request: req });
    return normalizedAllowed === normalizedOrigin;
  });
}
