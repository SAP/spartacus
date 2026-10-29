/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpResponseStatus } from '@spartacus/core';
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

const DEFAULT_CONCURRENCY_LIMIT_RETRY_AFTER_SECONDS = 3;
const DEFAULT_OCC_UNAVAILABLE_RETRY_AFTER_SECONDS = 25;
const HTTP_STATUS_SERVICE_UNAVAILABLE = 503;

/** An Express route accepted by the base-site middleware. */
export type BaseSiteRouteMatcher = string | RegExp;

/** Express objects and the resolved base site passed to the application callback. */
export interface BaseSiteHandlerContext {
  req: Request;
  res: Response;
  next: NextFunction;
  /** Resolved uid matching the leading base-site segment. */
  baseSite: string;
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
 * Every route uses a leading base-site segment. The resolver selects OCC
 * resolution through `supportsOccResolution`; otherwise it uses supplied IDs.
 * Recoverable resolver failures are mapped to
 * `503` with `Retry-After`; all other errors are forwarded to Express. Unknown
 * or mismatched base-site prefixes receive `404` without invoking the handler.
 */
export function setBaseSiteHandler(
  resolver: BaseSiteResolver,
  options: SetBaseSiteHandlerOptions
): RequestHandler {
  const { route, handler, retryAfterSeconds } = options;

  const resolveBaseSite = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const requestUrl = getRequestUrl(req);
    const pathBaseSiteId = new URL(requestUrl).pathname
      .split('/')
      .find((segment) => segment.length > 0);

    let baseSite: string | null;
    try {
      baseSite =
        resolver.supportsOccResolution
          ? await resolver.resolveFromOcc(requestUrl, pathBaseSiteId)
          : resolver.resolveFromPath(requestUrl);
    } catch (error) {
      if (error instanceof ConcurrencyLimitError) {
        res.setHeader(
          'Retry-After',
          String(
            retryAfterSeconds?.concurrencyLimit ??
              DEFAULT_CONCURRENCY_LIMIT_RETRY_AFTER_SECONDS
          )
        );
        res.status(HTTP_STATUS_SERVICE_UNAVAILABLE).send('Service Unavailable');
        return;
      }
      if (error instanceof OccUnavailableError) {
        res.setHeader(
          'Retry-After',
          String(
            retryAfterSeconds?.occUnavailable ??
              DEFAULT_OCC_UNAVAILABLE_RETRY_AFTER_SECONDS
          )
        );
        res.status(HTTP_STATUS_SERVICE_UNAVAILABLE).send('Service Unavailable');
        return;
      }
      next(error);
      return;
    }

    if (baseSite === null || baseSite !== pathBaseSiteId) {
      res.status(HttpResponseStatus.NOT_FOUND).send('Not Found');
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
  return Router().use('/:baseSite', router);
}
