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
 * When `allowedOrigins` is non-empty, the resolved origin is validated against
 * it as a defense-in-depth measure: if it matches no entry, the first entry is
 * returned instead of the (potentially spoofed) resolved origin.
 */
export function getRequestOrigin(
  req: Request,
  allowedOrigins?: string[]
): string {
  const resolvedOrigin = resolveOriginFromRequest(req);

  // Defense-in-depth: only when the operator opted in by providing an
  // allowlist. Spartacus does NOT know the valid hosts otherwise, so with no
  // allowlist we trust the (trusted) reverse proxy as before.
  /* eslint-disable-next-line no-console */
  console.log('allowedOrigins size: ' + allowedOrigins?.length);
  if (allowedOrigins?.length) {
    const ret = isAllowedOrigin(resolvedOrigin, allowedOrigins)
      ? resolvedOrigin
      : allowedOrigins[0];

    /* eslint-disable-next-line no-console */
    console.log('ben2-resolved origin: ' + ret);
    return ret;
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
 * Entries are compared case-insensitively. A `*` wildcard matches exactly one
 * host label: it never crosses a dot and never matches the apex domain. One or
 * more wildcards are allowed, e.g. `https://*.my.domain.com` matches
 * `https://shop.my.domain.com` but neither `https://my.domain.com` (apex) nor
 * `https://a.b.my.domain.com` (two labels).
 */
function isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
  const normalizedOrigin = origin.toLowerCase();
  return allowedOrigins.some((allowed) => {
    const normalizedAllowed = allowed.toLowerCase();
    if (normalizedAllowed.includes('*')) {
      // Turn the wildcard pattern into a strict, anchored regex. Only `*` is
      // treated specially; every other character is escaped so it can't be
      // interpreted as a regex metacharacter.
      //
      // NOTE: a matching origin is reflected verbatim (see `getRequestOrigin`),
      // so a wildcard entry does NOT bound the host dimension of the SSR cache
      // key. An attacker able to spoof `X-Forwarded-Host` can cycle through
      // arbitrary labels (e.g. `a.shop.com`, `b.shop.com`, ...) that all match
      // `*.shop.com`, each producing a distinct cache key. This preserves
      // cache-poisoning protection (every reflected host is a domain the
      // operator controls) but reopens the cache fragmentation/exhaustion
      // vector. Operators who need exhaustion resistance should prefer exact
      // entries.
      const pattern = normalizedAllowed
        .split('*')
        .map((segment) =>
          segment.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
        )
        .join('[^.]+');
      return new RegExp(`^${pattern}$`).test(normalizedOrigin);
    }

    /* eslint-disable-next-line no-console */
    console.log('ben1-normalizedOrigin: ' + normalizedOrigin);
    return normalizedAllowed === normalizedOrigin;
  });
}
