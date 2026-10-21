/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getRequestUrl } from '@spartacus/setup/ssr';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

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

/** Options for `createBaseSiteRequestHandler`. */
export interface BaseSiteRequestHandlerOptions {
  /**
   * Resolver used to match the request URL to a base site. When omitted, the
   * process-wide resolver set via `setDefaultBaseSiteResolver` is used.
   */
  resolver?: BaseSiteResolver;
  /** Retry delays returned for recoverable resolver failures. */
  retryAfterSeconds?: {
    /** Delay for cold-cache load shedding. Default: `3`. */
    concurrencyLimit?: number;
    /** Delay for OCC failures. Default: `25`. */
    occUnavailable?: number;
  };
}

let defaultResolver: BaseSiteResolver | undefined;

/**
 * Sets the process-wide base-site resolver used by handlers that omit their
 * own `resolver`. Pass `undefined` to clear it.
 */
export function setDefaultBaseSiteResolver(
  resolver: BaseSiteResolver | undefined
): void {
  defaultResolver = resolver;
}

/**
 * Wraps an application handler so it runs with the base site resolved for the
 * request exposed as `request.baseSite`. The framework resolves the base site
 * and maps resolver failures to `503`; everything else (status, headers, body,
 * any routing or redirect) is the handler's responsibility.
 */
export function createBaseSiteRequestHandler(
  handler: BaseSiteHandler,
  options: BaseSiteRequestHandlerOptions = {}
): RequestHandler {
  const resolver = options.resolver ?? defaultResolver;
  if (!resolver) {
    throw new Error(
      'createBaseSiteRequestHandler requires a resolver: pass options.resolver or call setDefaultBaseSiteResolver() first.'
    );
  }

  return async (request, response, next) => {
    let baseSite: string | null;
    try {
      baseSite = await resolver.resolveFromOcc(getRequestUrl(request));
    } catch (error) {
      if (error instanceof ConcurrencyLimitError) {
        response.setHeader(
          'Retry-After',
          String(options.retryAfterSeconds?.concurrencyLimit ?? 3)
        );
        response.status(503).send('Service Unavailable');
        return;
      }
      if (error instanceof OccUnavailableError) {
        response.setHeader(
          'Retry-After',
          String(options.retryAfterSeconds?.occUnavailable ?? 25)
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
