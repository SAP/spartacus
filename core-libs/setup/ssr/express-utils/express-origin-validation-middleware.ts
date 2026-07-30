/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { RequestHandler } from 'express';
import { getRequestOrigin } from './express-request-origin';

export interface OriginValidationOptions {
  allowedOrigins?: string[];
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
 * Usage in server.ts:
 * ```ts
 * import { getOriginValidationMiddleware } from '@spartacus/setup/ssr';
 * server.use(getOriginValidationMiddleware({ allowedOrigins }));
 * ```
 */
export function getOriginValidationMiddleware(
  options: OriginValidationOptions
): RequestHandler {
  const { allowedOrigins } = options;
  if (!allowedOrigins?.length) {
    return (_req, _res, next) => next();
  }
  const canonicalHost = new URL(allowedOrigins[0]).host;
  return (req, _res, next) => {
    const origin = getRequestOrigin(req);
    if (!isAllowedOrigin(origin, allowedOrigins)) {
      req.headers['host'] = canonicalHost;
      req.headers['x-forwarded-host'] = canonicalHost;
    }
    next();
  };
}

function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
  const normalized = origin.toLowerCase();
  return allowedOrigins.some((allowed) => {
    const normalizedAllowed = allowed.toLowerCase();
    if (normalizedAllowed.includes('*')) {
      const pattern = normalizedAllowed
        .split('*')
        .map((segment) =>
          segment.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
        )
        .join('[^.]+');
      return new RegExp(`^${pattern}$`).test(normalized);
    }
    return normalizedAllowed === normalized;
  });
}
