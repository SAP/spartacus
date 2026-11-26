/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpResponseStatus } from '@spartacus/core';
import { getRequestUrl } from '@spartacus/setup/ssr';
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
export interface BaseSiteHandlerContext<
  BaseSite extends string | null = string,
> {
  req: Request;
  res: Response;
  next: NextFunction;
  /** Resolved base-site uid, or `null` for an unmatched domain-root route. */
  baseSite: BaseSite;
}

/** Application callback invoked after base-site resolution. */
export type BaseSiteAwareRequestHandler<
  BaseSite extends string | null = string,
> = (context: BaseSiteHandlerContext<BaseSite>) => unknown;

/** Options for {@link createBaseSiteAwareRouteWithResolver}. */
export type CreateBaseSiteAwareRouteOptions = {
  /** Route without a base-site prefix, for example `/llms.txt`. */
  route: BaseSiteRouteMatcher;
  /** Retry delays returned for recoverable resolver failures. */
  retryAfterSeconds?: {
    /** Delay for cold-cache load shedding. Default: `3`. */
    concurrencyLimit?: number;
    /** Delay for OCC failures. Default: `25`. */
    occUnavailable?: number;
  };
} & (
  | {
      /** Adds a leading `/:baseSite` segment to the route. Default: `true`. */
      withBaseSiteInPath?: true;
      /** Receives the original Express objects and the validated base-site uid. */
      handler: BaseSiteAwareRequestHandler;
    }
  | {
      /**
       * Resolves the full URL through OCC without a UID prefix.
       * Requires a resolver with `supportsOccResolution`.
       */
      withBaseSiteInPath: false;
      /** Receives the resolved uid, or `null` when no OCC site matches. */
      handler: BaseSiteAwareRequestHandler<string | null>;
    }
);

/** Configures one shared default resolver and returns a factory for Express routes. */
export function configureBaseSiteAwareRoutes(
  options: BaseSiteResolverOptions
): {
  createBaseSiteAwareRoute: (
    options: CreateBaseSiteAwareRouteOptions
  ) => RequestHandler;
} {
  const resolver = new DefaultBaseSiteResolver(options);
  return {
    createBaseSiteAwareRoute: (handlerOptions) =>
      createBaseSiteAwareRouteWithResolver(resolver, handlerOptions),
  };
}

/**
 * Builds an Express router that resolves the base site on the configured route
 * and passes it in the context of the application callback.
 *
 * Mount at the application root with `server.use(...)` so routing and
 * resolution use the same request path.
 *
 * Routes use a leading base-site segment by default. Set `withBaseSiteInPath`
 * to `false` to match the configured route without a prefix and resolve the
 * full URL through OCC. The resolver selects OCC resolution through
 * `supportsOccResolution`; otherwise it uses supplied IDs and requires a prefix.
 * Recoverable resolver failures are mapped to
 * `503` with `Retry-After`; all other errors are forwarded to Express. Unknown
 * or mismatched prefixes receive `404` without invoking the handler. Routes
 * without a prefix invoke the handler with `baseSite: null` when no site matches.
 */
export function createBaseSiteAwareRouteWithResolver(
  resolver: BaseSiteResolver,
  options: CreateBaseSiteAwareRouteOptions
): RequestHandler {
  if (options.withBaseSiteInPath === false) {
    return createDomainRootRoute(resolver, options);
  }
  return createPrefixedRoute(resolver, options);
}

type DomainRootRouteOptions = Extract<
  CreateBaseSiteAwareRouteOptions,
  { withBaseSiteInPath: false }
>;

type PrefixedRouteOptions = Exclude<
  CreateBaseSiteAwareRouteOptions,
  { withBaseSiteInPath: false }
>;

type ResolutionParams = {
  requestUrl: string;
  pathBaseSiteId?: string;
  res: Response;
  next: NextFunction;
  retryAfterSeconds: CreateBaseSiteAwareRouteOptions['retryAfterSeconds'];
};

function createDomainRootRoute(
  resolver: BaseSiteResolver,
  options: DomainRootRouteOptions
): RequestHandler {
  if (!resolver.supportsOccResolution) {
    throw new Error('withBaseSiteInPath: false requires OCC resolution');
  }

  return createRouter(options.route, async (req, res, next) => {
    const resolved = await resolveBaseSite(resolver, {
      requestUrl: getRequestUrl(req),
      res,
      next,
      retryAfterSeconds: options.retryAfterSeconds,
    });
    if (!resolved) {
      return;
    }

    try {
      await options.handler({ req, res, next, baseSite: resolved.baseSite });
    } catch (error) {
      next(error);
    }
  });
}

function createPrefixedRoute(
  resolver: BaseSiteResolver,
  options: PrefixedRouteOptions
): RequestHandler {
  const router = createRouter(options.route, async (req, res, next) => {
    const requestUrl = getRequestUrl(req);
    const pathBaseSiteId = new URL(requestUrl).pathname
      .split('/')
      .find((segment) => segment.length > 0);
    const resolved = await resolveBaseSite(resolver, {
      requestUrl,
      pathBaseSiteId,
      res,
      next,
      retryAfterSeconds: options.retryAfterSeconds,
    });
    if (!resolved) {
      return;
    }

    const { baseSite } = resolved;
    if (baseSite === null || baseSite !== pathBaseSiteId) {
      res.status(HttpResponseStatus.NOT_FOUND).send('Not Found');
      return;
    }

    try {
      await options.handler({ req, res, next, baseSite });
    } catch (error) {
      next(error);
    }
  });

  return Router().use('/:baseSite', router);
}

function createRouter(
  route: BaseSiteRouteMatcher,
  handleRequest: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
): Router {
  const router = Router();
  router.all(route, (req, res, next) => {
    void handleRequest(req, res, next).catch(next);
  });
  return router;
}

/**
 * Resolves the base site. Returns `undefined` when a response was already sent
 * or the error was forwarded to `next`.
 */
async function resolveBaseSite(
  resolver: BaseSiteResolver,
  { requestUrl, pathBaseSiteId, res, next, retryAfterSeconds }: ResolutionParams
): Promise<{ baseSite: string | null } | undefined> {
  try {
    const baseSite = resolver.supportsOccResolution
      ? await resolver.resolveFromOcc(requestUrl, pathBaseSiteId)
      : resolver.resolveFromPath(requestUrl);
    return { baseSite };
  } catch (error) {
    if (error instanceof ConcurrencyLimitError) {
      sendServiceUnavailable(
        res,
        retryAfterSeconds?.concurrencyLimit ??
          DEFAULT_CONCURRENCY_LIMIT_RETRY_AFTER_SECONDS
      );
    } else if (error instanceof OccUnavailableError) {
      sendServiceUnavailable(
        res,
        retryAfterSeconds?.occUnavailable ??
          DEFAULT_OCC_UNAVAILABLE_RETRY_AFTER_SECONDS
      );
    } else {
      next(error);
    }
    return undefined;
  }
}

function sendServiceUnavailable(
  res: Response,
  retryAfterSeconds: number
): void {
  res.setHeader('Retry-After', String(retryAfterSeconds));
  res.status(HTTP_STATUS_SERVICE_UNAVAILABLE).send('Service Unavailable');
}
