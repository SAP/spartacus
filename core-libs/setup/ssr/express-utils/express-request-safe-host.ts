/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';

/**
 * Returns a safe host from the request object.
 *
 * It checks the `X-Forwarded-Host` header and validates it against the `allowedHosts` list.
 * If the header is missing, invalid, or not in the allowlist, it falls back to the `Host` header.
 *
 * @param req - Express Request object
 * @param allowedHosts - Optional list of allowed hosts
 */
export function getSafeHost(req: Request, allowedHosts?: string[]): string | undefined {
  const normalize = (h: string): string =>
    h.toLowerCase().split(':')[0].replace(/\.$/, '').trim();

  const isValidHost = (h: string): boolean =>
    h.length > 0 &&
    h.length <= 255 &&
    /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/.test(h);

  const normalizedAllowedHosts = allowedHosts?.map(normalize);

  const isAllowed = (host: string, normalizedAllowed?: string[]): boolean => {
    return (
      normalizedAllowed?.some(
        (allowed) => host === allowed || host.endsWith(`.${allowed}`)
      ) ?? false
    );
  };

  const extractFirst = (value?: string | string[]): string | undefined => {
    if (!value) {
      return undefined;
    }
    const v = Array.isArray(value) ? value[0] : value;
    return v.split(',')[0].trim();
  };

  const xfHostRaw = extractFirst(req.headers['x-forwarded-host']);
  const hostRaw = extractFirst(req.headers.host);

  const xfHost = xfHostRaw ? normalize(xfHostRaw) : undefined;
  const host = hostRaw ? normalize(hostRaw) : undefined;

  // Validate X-Forwarded-Host
  if (
    xfHost &&
    isValidHost(xfHost) &&
    isAllowed(xfHost, normalizedAllowedHosts)
  ) {
    return xfHost;
  }

  // Validate Host
  if (host && isValidHost(host) && isAllowed(host, normalizedAllowedHosts)) {
    return host;
  }

  return undefined;
}
