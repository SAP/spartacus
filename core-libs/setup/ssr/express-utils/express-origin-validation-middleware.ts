/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, RequestHandler } from 'express';
import type { ExpressServerLogger } from '../logger/loggers/express-server-logger';
import { getRequestOrigin } from './express-request-origin';

export interface OriginValidationOptions {
  allowedOrigins?: string[] | string;
  logger?: ExpressServerLogger;
}

/**
 * Returns an Express middleware that guards against Host header injection and
 * cache poisoning by validating the resolved request origin against an
 * operator-provided allowlist.
 *
 * When the resolved origin is not in the allowlist, the request is rejected
 * with a 403 Forbidden response.
 *
 * When `allowedOrigins` is absent or empty, a no-op middleware is returned and
 * the default Express `trust proxy` behavior is preserved.
 *
 * `allowedOrigins` accepts either an array or a comma-separated string (e.g.
 * directly from `process.env['SSR_ALLOWED_ORIGINS']`).
 *
 * When a `logger` is provided, diagnostic messages are emitted through it as
 * structured (JSON) log entries carrying the request context, so they land in
 * the `logs-json-*` index of SAP Cloud Logging.
 *
 * Usage in server.ts:
 * ```ts
 * import { getOriginValidationMiddleware } from '@spartacus/setup/ssr';
 * server.use(getOriginValidationMiddleware({
 *   allowedOrigins: process.env['SSR_ALLOWED_ORIGINS']
 * }));
 * ```
 */
export function getOriginValidationMiddleware(
  options: OriginValidationOptions
): RequestHandler {
  const { logger } = options;
  const allowedOrigins = parseAllowedOrigins(options.allowedOrigins);
  if (!allowedOrigins.length) {
    return (_req, _res, next) => next();
  }
  return (req, res, next) => {
    const origin = getRequestOrigin(req);
    logger?.log('allowedOrigins size: ' + allowedOrigins.length, {
      request: req,
    });
    if (!isAllowedOrigin(origin, allowedOrigins, req, logger)) {
      logger?.warn(
        `Origin "${origin}" is not in the allowedOrigins list. Rejecting request.`,
        { request: req }
      );
      res.status(403).send('Forbidden');
      return;
    }
    logger?.log(`Resolved origin: ${origin}`, { request: req });
    next();
  };
}

function parseAllowedOrigins(
  allowedOrigins: string[] | string | undefined
): string[] {
  if (!allowedOrigins) {
    return [];
  }
  if (typeof allowedOrigins === 'string') {
    return allowedOrigins
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);
  }
  return allowedOrigins;
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
