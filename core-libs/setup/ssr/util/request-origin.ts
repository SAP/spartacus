import { Request } from 'express';

export function getRequestOrigin(req: Request): string {
  // If express is resolving and trusting X-Forwarded-Host, we want to take it
  // into an account to properly generate request origin.
  const trustProxyFn = req.app.get('trust proxy fn');
  let forwardedHost = req.get('X-Forwarded-Host');
  if (forwardedHost && trustProxyFn(req.connection.remoteAddress, 0)) {
    if (forwardedHost.indexOf(',') !== -1) {
      // Note: X-Forwarded-Host is normally only ever a
      //       single value, but this is to be safe.
      forwardedHost = forwardedHost
        .substring(0, forwardedHost.indexOf(','))
        .trimRight();
    }
    return req.protocol + '://' + forwardedHost;
  } else {
    return req.protocol + '://' + req.get('host');
  }
}
