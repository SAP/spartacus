/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';

/**
 * Resolves the origin (`protocol://host`) of the incoming request.
 *
 * The host is taken from the `X-Forwarded-Host` header only when Express is
 * configured to trust the proxy that delivered the request (`trust proxy`),
 * which in a CCv2 deployment is the platform reverse proxy. Otherwise it falls
 * back to the `Host` header.
 *
 * When `allowedOrigins` is provided, the resolved origin is validated against
 * it as a defense-in-depth measure (see {@link getRequestOrigin}).
 */
export function getRequestOrigin(
  req: Request,
  allowedOrigins?: string[]
): string {
  const resolvedOrigin = resolveOriginFromRequest(req);

  // Defense-in-depth: only when the operator opted in by providing an
  // allowlist. Spartacus does NOT know the valid hosts otherwise, so with no
  // allowlist we trust the (trusted) reverse proxy as before.
  if (allowedOrigins?.length) {
    return isAllowedOrigin(resolvedOrigin, allowedOrigins)
      ? resolvedOrigin
      : allowedOrigins[0];
  }

  return resolvedOrigin;
}

/**
 * Resolves the origin from the request headers, honoring Express' `trust proxy`
 * setting for `X-Forwarded-Host`. This preserves the original Spartacus behavior.
 */
function resolveOriginFromRequest(req: Request): string {
  // If express is resolving and trusting X-Forwarded-Host, we want to take it
  // into an account to properly generate request origin.
  const trustProxyFn = req.app.get('trust proxy fn');
  let forwardedHost = req.get('X-Forwarded-Host');
  if (forwardedHost && trustProxyFn(req.connection.remoteAddress, 0)) {
    if (forwardedHost.indexOf(',') !== -1) {
      // Note: X-Forwarded-Host is normally only ever a single value (the
      //       trusted reverse proxy sets it), but to be safe we take the
      //       left-most entry, which by convention is the original
      //       public-facing host.
      forwardedHost = forwardedHost
        .substring(0, forwardedHost.indexOf(','))
        .trimRight();
    }
    return `${req.protocol}://${forwardedHost}`;
  } else {
    return `${req.protocol}://${req.get('host')}`;
  }
}

/**
 * Checks whether the given origin matches any entry in the allowlist.
 *
 * Entries are compared case-insensitively and may use a single leading-label
 * wildcard to match subdomains, e.g. `https://*.my.domain.com` matches
 * `https://shop.my.domain.com` but not `https://my.domain.com` itself.
 */
function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
  const normalizedOrigin = origin.toLowerCase();
  return allowedOrigins.some((allowed) => {
    const normalizedAllowed = allowed.toLowerCase();
    if (normalizedAllowed.includes('*')) {
      // Turn the wildcard pattern into a strict, anchored regex. Only `*` is
      // treated specially; every other character is escaped so it can't be
      // interpreted as a regex metacharacter.
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
