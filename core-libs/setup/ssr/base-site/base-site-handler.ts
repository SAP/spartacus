/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getRequestUrl } from '../express-utils/express-request-url';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import { getConfiguredBaseSiteResolver } from './base-site-resolver-registry';

/**
 * Request after base-site resolution. Locally extends Express `Request` so the
 * resolved value is typed inside the handler without a global augmentation.
 */
export interface BaseSiteRequest extends Request {
  baseSite: string | null;
}

/** Application handler invoked with the resolved base site on the request. */
export type BaseSiteHandler = (
  request: BaseSiteRequest,
  response: Response,
  next: NextFunction
) => void | Promise<void>;

/** Options for {@link setBaseSiteHandler}. */
export interface BaseSiteHandlerOptions {
  /**
   * Endpoint path segment to match, for example `llms.txt`. Regex metacharacters
   * (such as the `.`) are matched literally.
   */
  endpoint: string;
  /**
   * When `true`, the base site is taken from the leading path segment and the
   * route matches `/<baseSite>/<endpoint>` (path mode). When `false` or omitted,
   * the route matches `/<endpoint>` and the base site is resolved from OCC by the
   * request origin (domain mode).
   */
  withBaseSiteInPath?: boolean;
  /** Application handler invoked once the base site has been resolved. */
  handler: BaseSiteHandler;
  /** Retry delays returned for recoverable resolver failures. */
  retryAfterSeconds?: {
    /** Delay for cold-cache load shedding. Default: `3`. */
    concurrencyLimit?: number;
    /** Delay for OCC failures. Default: `25`. */
    occUnavailable?: number;
  };
}

/** Escapes regex metacharacters so `endpoint` is matched as a literal string. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Builds an Express middleware that resolves the base site for requests to a
 * configured `endpoint` and exposes it to `handler` as `request.baseSite`.
 *
 * The process-wide resolver (see `configureBaseSiteResolver`) is read once at
 * registration. In domain mode (`withBaseSiteInPath` false/omitted) a resolver
 * that cannot resolve via OCC is a configuration error, so registration throws
 * immediately rather than failing on every matching request.
 *
 * Requests whose pathname does not match the endpoint are passed through with
 * `next()`. On a match the base site is resolved (synchronously from the path in
 * path mode, or from OCC in domain mode); recoverable resolver failures are
 * mapped to `503` with a `Retry-After` header, and any other error is forwarded
 * to Express via `next(error)`. A `null` base site still invokes the handler:
 * the application owns the response.
 *
 * The returned middleware must be mounted at the application root (e.g.
 * `server.use(...)` with no path prefix), because route matching reads
 * `request.path` while resolution reads the full request URL; under a sub-mount
 * the mount prefix would be stripped from `request.path` but remain in the full
 * URL, causing the leading base-site segment to be mis-read.
 */
export function setBaseSiteHandler(
  options: BaseSiteHandlerOptions
): RequestHandler {
  const {
    endpoint,
    withBaseSiteInPath = false,
    handler,
    retryAfterSeconds,
  } = options;
  const resolver = getConfiguredBaseSiteResolver();

  if (!withBaseSiteInPath && !resolver.supportsOccResolution) {
    throw new Error(
      'setBaseSiteHandler domain mode (withBaseSiteInPath: false) requires a resolver that supports OCC resolution. Configure the resolver with an occBaseUrl, or use withBaseSiteInPath: true.'
    );
  }

  const escapedEndpoint = escapeRegExp(endpoint);
  const matcher = withBaseSiteInPath
    ? new RegExp(`^/[^/]+/${escapedEndpoint}$`)
    : new RegExp(`^/${escapedEndpoint}$`);

  return async (request, response, next) => {
    if (!matcher.test(request.path)) {
      next();
      return;
    }

    const requestUrl = getRequestUrl(request);

    let baseSite: string | null;
    try {
      baseSite = withBaseSiteInPath
        ? resolver.resolveFromPath(requestUrl)
        : await resolver.resolveFromOcc(requestUrl);
    } catch (error) {
      if (error instanceof ConcurrencyLimitError) {
        response.setHeader(
          'Retry-After',
          String(retryAfterSeconds?.concurrencyLimit ?? 3)
        );
        response.status(503).send('Service Unavailable');
        return;
      }
      if (error instanceof OccUnavailableError) {
        response.setHeader(
          'Retry-After',
          String(retryAfterSeconds?.occUnavailable ?? 25)
        );
        response.status(503).send('Service Unavailable');
        return;
      }
      next(error);
      return;
    }

    const baseSiteRequest = request as BaseSiteRequest;
    baseSiteRequest.baseSite = baseSite;
    try {
      await handler(baseSiteRequest, response, next);
    } catch (error) {
      next(error);
    }
  };
}
