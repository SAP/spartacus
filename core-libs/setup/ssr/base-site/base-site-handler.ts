/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getRequestUrl } from '../express-utils/express-request-url';
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

/** An Express route accepted by the base-site middleware. */
export type BaseSiteRouteMatcher = string | RegExp;

/** Values passed to an application handler after base-site resolution. */
export interface BaseSiteMiddlewareContext {
  req: Request;
  res: Response;
  next: NextFunction;
  baseSite: string | null;
}

/** Application handler invoked with the resolved base site. */
export type BaseSiteAwareHandler = (
  context: BaseSiteMiddlewareContext
) => void | Promise<void>;

/** Options for {@link setBaseSiteHandler}. */
export interface SetBaseSiteHandlerOptions {
  /** Route passed directly to Express registration. */
  route: BaseSiteRouteMatcher;
  /** Selects path-segment or OCC-backed domain resolution. */
  resolveMode: 'path' | 'domain';
  /** Application handler invoked once the base site has been resolved. */
  handler: BaseSiteAwareHandler;
  /** Retry delays returned for recoverable resolver failures. */
  retryAfterSeconds?: {
    /** Delay for cold-cache load shedding. Default: `3`. */
    concurrencyLimit?: number;
    /** Delay for OCC failures. Default: `25`. */
    occUnavailable?: number;
  };
}

/**
 * Builds an Express router that resolves the base site on the configured route
 * and passes it to the application handler without mutating the request.
 *
 * Domain mode requires a resolver configured for OCC resolution. Recoverable
 * resolver failures are mapped to `503` with `Retry-After`; all other errors
 * are forwarded to Express. A `null` base site still invokes the handler so
 * the application can decide how to respond.
 */
export function setBaseSiteHandler(
  resolver: BaseSiteResolver,
  options: SetBaseSiteHandlerOptions
): RequestHandler {
  const { route, resolveMode, handler, retryAfterSeconds } = options;

  if (resolveMode === 'domain' && !resolver.supportsOccResolution) {
    throw new Error(
      'setBaseSiteHandler domain mode requires a resolver that supports OCC resolution. Configure the resolver with an occBaseUrl, or use resolveMode: path.'
    );
  }

  const resolveBaseSite = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const requestUrl = getRequestUrl(req);

    let baseSite: string | null;
    try {
      baseSite =
        resolveMode === 'path'
          ? resolver.resolveFromPath(requestUrl)
          : await resolver.resolveFromOcc(requestUrl);
    } catch (error) {
      if (error instanceof ConcurrencyLimitError) {
        res.setHeader(
          'Retry-After',
          String(retryAfterSeconds?.concurrencyLimit ?? 3)
        );
        res.status(503).send('Service Unavailable');
        return;
      }
      if (error instanceof OccUnavailableError) {
        res.setHeader(
          'Retry-After',
          String(retryAfterSeconds?.occUnavailable ?? 25)
        );
        res.status(503).send('Service Unavailable');
        return;
      }
      next(error);
      return;
    }

    try {
      await handler({ req, res, next, baseSite });
    } catch (error) {
      next(error);
    }
  };

  const router = Router();
  router.all(route, (req, res, next) => {
    void resolveBaseSite(req, res, next).catch(next);
  });
  return router;
}
