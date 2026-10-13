/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getRequestUrl } from '@spartacus/setup/ssr';
import { Request, RequestHandler } from 'express';
import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

/** Decision taken when the resolver did not match a base site. */
export type BaseSiteFallbackResult =
  | { type: 'serve'; baseSite: string | null }
  | { type: 'redirect'; location: string; status?: 307 | 308 };

/** Context passed to a no-match fallback callback. */
export interface BaseSiteFallbackContext {
  /** Full, trust-proxy-aware request URL. */
  requestUrl: string;
  /** Request path, for example `/electronics-spa/llm.txt`. */
  path: string;
  /** Configured canonical root path, for example `/llm.txt`. */
  canonicalPath: string;
  /** Whether the path carries a prefix before the canonical path. */
  hasPrefix: boolean;
  /** Request query string without the leading `?` (empty when absent). */
  queryString: string;
}

/** Options for an Express handler backed by a base-site resolver. */
export interface BaseSiteRequestHandlerOptions {
  /**
   * Resolver used to match the request URL to a base site. When omitted, the
   * process-wide resolver set via `setDefaultBaseSiteResolver` is used.
   */
  resolver?: BaseSiteResolver;
  render: (baseSite: string | null) => string | Promise<string>;
  /**
   * Canonical root path of the handler, for example `/llm.txt`. When set, the
   * handler applies no-match routing: a prefixed URL redirects to the canonical
   * path, the canonical path itself is served with a `null` base site.
   */
  canonicalPath?: string;
  /** Overrides the default no-match routing. */
  fallback?: (context: BaseSiteFallbackContext) => BaseSiteFallbackResult;
  /** Response content type. Default: `text/plain`. */
  contentType?: string;
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

/** Default no-match routing: redirect prefixed URLs, serve the canonical root. */
function defaultFallback(
  context: BaseSiteFallbackContext
): BaseSiteFallbackResult {
  if (context.hasPrefix) {
    const location =
      context.canonicalPath +
      (context.queryString ? `?${context.queryString}` : '');
    return { type: 'redirect', location, status: 308 };
  }
  return { type: 'serve', baseSite: null };
}

/** Decides how to handle the request once the resolver has run. */
function resolveOutcome(
  options: BaseSiteRequestHandlerOptions,
  request: Request,
  requestUrl: string,
  baseSite: string | null
): BaseSiteFallbackResult {
  // Match, or legacy mode without canonical-path routing: serve as resolved.
  if (baseSite !== null || options.canonicalPath === undefined) {
    return { type: 'serve', baseSite };
  }

  const canonicalPath = options.canonicalPath;
  const path = request.path;
  const context: BaseSiteFallbackContext = {
    requestUrl,
    path,
    canonicalPath,
    hasPrefix: path !== canonicalPath,
    queryString: request.originalUrl.split('?')[1] ?? '',
  };

  return (options.fallback ?? defaultFallback)(context);
}

/** Creates an Express handler that renders the resolved base-site. */
export function createBaseSiteRequestHandler(
  options: BaseSiteRequestHandlerOptions
): RequestHandler {
  const resolver = options.resolver ?? defaultResolver;
  if (!resolver) {
    throw new Error(
      'createBaseSiteRequestHandler requires a resolver: pass options.resolver or call setDefaultBaseSiteResolver() first.'
    );
  }

  return async (request, response, next) => {
    try {
      const requestUrl = getRequestUrl(request);
      const baseSite = await resolver.resolve(requestUrl);
      const outcome = resolveOutcome(options, request, requestUrl, baseSite);

      if (outcome.type === 'redirect') {
        response.redirect(outcome.status ?? 308, outcome.location);
        return;
      }

      const output = await options.render(outcome.baseSite);
      response.type(options.contentType ?? 'text/plain').send(output);
    } catch (error) {
      let retryAfterSeconds: number;

      if (error instanceof ConcurrencyLimitError) {
        retryAfterSeconds = options.retryAfterSeconds?.concurrencyLimit ?? 3;
      } else if (error instanceof OccUnavailableError) {
        retryAfterSeconds = options.retryAfterSeconds?.occUnavailable ?? 25;
      } else {
        next(error);
        return;
      }

      response.setHeader('Retry-After', String(retryAfterSeconds));
      response.status(503).send('Service Unavailable');
    }
  };
}
