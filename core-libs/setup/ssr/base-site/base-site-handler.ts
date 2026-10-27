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
  BaseSiteResolverOptions,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import { DefaultBaseSiteResolver } from './default-base-site-resolver';

/** An Express route accepted by the base-site middleware. */
export type BaseSiteRouteMatcher = string | RegExp;

/** Express objects and the resolved base site passed to the application callback. */
export interface BaseSiteHandlerContext {
  req: Request;
  res: Response;
  next: NextFunction;
  /** Resolved uid, or null when no base site matches. */
  baseSite: string | null;
}

/** Application callback invoked after base-site resolution. */
export type BaseSiteAwareRequestHandler = (context: BaseSiteHandlerContext) => unknown;

/** Options for {@link setBaseSiteHandler}. */
export interface SetBaseSiteHandlerOptions {
  /** Route without a base-site prefix, for example `/llms.txt`. */
  route: BaseSiteRouteMatcher;
  /** Receives the original Express objects and the resolved base site. */
  handler: BaseSiteAwareRequestHandler;
  /** Retry delays returned for recoverable resolver failures. */
  retryAfterSeconds?: {
    /** Delay for cold-cache load shedding. Default: `3`. */
    concurrencyLimit?: number;
    /** Delay for OCC failures. Default: `25`. */
    occUnavailable?: number;
  };
}

/** Configures one shared default resolver for all handlers created by the factory. */
export function createBaseSiteAwareRoute(
  options: BaseSiteResolverOptions
): (options: SetBaseSiteHandlerOptions) => RequestHandler {
  const resolver = new DefaultBaseSiteResolver(options);
  return (handlerOptions) => setBaseSiteHandler(resolver, handlerOptions);
}

/**
 * Builds an Express router that resolves the base site on the configured route
 * and passes it in the context of the application callback.
 *
 * Mount at the application root with `server.use(...)` so the leading segment
 * used for routing also leads the full request URL used for resolution.
 *
 * The resolver selects path mode through `supportsPathResolution`; otherwise
 * routes use OCC resolution. Recoverable resolver failures are mapped to
 * `503` with `Retry-After`; all other errors are forwarded to Express. A `null`
 * base site still invokes the handler so the application can decide how to respond.
 */
export function setBaseSiteHandler(
  resolver: BaseSiteResolver,
  options: SetBaseSiteHandlerOptions
): RequestHandler {
  const { route, handler, retryAfterSeconds } = options;
  const pathMode = resolver.supportsPathResolution;

  if (!pathMode && !resolver.supportsOccResolution) {
    throw new Error(
      'Base-site route requires pathBaseSiteIds or an OCC base URL.'
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
        pathMode
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
  return pathMode ? Router().use('/:baseSite', router) : router;
}
