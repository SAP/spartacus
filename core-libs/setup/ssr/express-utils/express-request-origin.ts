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
 */
export function getRequestOrigin(req: Request): string {
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
