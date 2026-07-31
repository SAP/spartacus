/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RequestHandler } from 'express';
import { getRequestOrigin } from './express-request-origin';

export interface OriginValidationOptions {
  allowedOrigins?: string[] | string;
}

/**
 * Returns an Express middleware that guards against Host header injection and
 * cache poisoning by validating the resolved request origin against an
 * operator-provided allowlist.
 *
 * When the resolved origin is not in the allowlist, the request is rejected
 * with a 421 Misdirected Request response and a `Cache-Control: no-store`
 * header so intermediary caches don't retain the rejection.
 *
 * When `allowedOrigins` is absent or empty, a no-op middleware is returned and
 * the default Express `trust proxy` behavior is preserved.
 *
 * `allowedOrigins` accepts either an array or a comma-separated string. It is
 * typically read from the `SSR_ALLOWED_ORIGINS` environment variable so it can
 * be configured per environment without code changes; if your deployment
 * environment does not support environment variables, pass the array directly
 * instead.
 *
 * Each entry must be a full origin (`protocol://host`) with no trailing slash,
 * e.g. `"https://my.domain.com"`. Matching is case-insensitive. A `*` wildcard
 * matches exactly one host label: it never crosses a dot and never matches the
 * apex domain (e.g. `"https://*.my.domain.com"` matches
 * `"https://shop.my.domain.com"` but not `"https://my.domain.com"`).
 *
 * Usage in server.ts:
 * ```ts
 * import { getOriginValidationMiddleware } from '@spartacus/setup/ssr';
 * // from an environment variable (comma-separated):
 * server.use(getOriginValidationMiddleware({
 *   allowedOrigins: process.env['SSR_ALLOWED_ORIGINS']
 * }));
 * // or, when env vars are unavailable, as an explicit array:
 * server.use(getOriginValidationMiddleware({
 *   allowedOrigins: ['https://my.domain.com', 'https://*.my.domain.com']
 * }));
 * ```
 */
export function getOriginValidationMiddleware(
  options: OriginValidationOptions
): RequestHandler {
  const allowedOrigins = parseAllowedOrigins(options.allowedOrigins);
  if (!allowedOrigins.length) {
    return (_req, _res, next) => next();
  }
  return (req, res, next) => {
    const origin = getRequestOrigin(req);
    if (!isAllowedOrigin(origin, allowedOrigins)) {
      res.setHeader('Cache-Control', 'no-store');
      res.status(421).send('Misdirected Request');
      return;
    }
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

function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
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
    return normalizedAllowed === normalizedOrigin;
  });
}
