/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { DefaultExpressServerLogger, ExpressServerLogger } from '../logger';
import { DefaultCacheEntrySizeCalculator } from './rendering-cache/default-cache-entry-size-calculator';
import {
  CacheEntrySizeCalculator,
  RenderingEntry,
} from './rendering-cache/rendering-cache.model';
import { defaultRenderingStrategyResolver } from './rendering-strategy-resolver';
import { defaultRenderingStrategyResolverOptions } from './rendering-strategy-resolver-options';

export interface SsrOptimizationOptions {
  /**
   * Time in milliseconds to wait for SSR rendering to happen.
   */
  timeout?: number;

  /**
   * Enable in-memory cache for pre-rendered urls.
   *
   * If disabled, the cache will still be used to temporarily store
   * renders finished after csr fallback in order to serve them with
   * next request only.
   */
  cache?: boolean;

  /**
   * Limit the cache size
   *
   * Specified number of entries that will be kept in cache, allows to keep
   * memory usage under control.
   *
   * Can also be use when `cache` option is set to false. It will then limit the
   * number of renders that timeouts and are kept in temporary cache, waiting
   * to be served with next request.
   *
   * Default value is set to 3000.
   *
   * @deprecated since v2211.42. Use `cacheSizeBytes` option instead.
   *             The `cacheSize` option will be removed eventually together with the feature toggle `ssrFeatureToggles.limitCacheByMemory`.
   */
  cacheSize?: number;

  /**
   * Limits the cache size memory in bytes.
   *
   * Specifies the maximum memory (in bytes) allocated for cached entries,
   * helping to keep memory usage under control.
   *
   * The default value is set to 800 MB (meaning 800 000 000 in International System of Units).
   *
   * **IMPORTANT**: Your server should have much more available memory than the configured `cacheSizeMemory`,
   *            because the NodeJS process needs a lot of operational memory also for the rendering activities,
   *            such as creating instances of the Angular applications for each incoming requests.
   *            The more parallel requests are allowed (which can be limited with the `concurrency` option),
   *            the more operational memory is needed.
   *
   * *Note*: for calculating the size of the cache entry, the `cacheEntrySizeCalculator` option is used.
   */
  cacheSizeMemory?: number;

  /**
   * Strategy for calculating the size of a cache entry. It's needed to keep track of the used cache size,
   * so the oldest entries can be removed when the cache size memory limit is reached.
   *
   * *Note*: This config option is used only when the `ssrFeatureToggles.limitCacheByMemory` is set to true.
   *
   * For details on how each entry's size is calculated by default, see {@link DefaultCacheEntrySizeCalculator}.
   */
  cacheEntrySizeCalculator?: CacheEntrySizeCalculator;

  /**
   * Limit number of concurrent rendering
   */
  concurrency?: number;

  /**
   * Time in milliseconds after prerendered page is becoming stale and should
   * be rendered again.
   */
  ttl?: number | undefined;

  /**
   * Allows overriding default key generator for custom differentiating
   * between rendered pages. By default it uses the full request URL.
   *
   * @param req
   */
  renderKeyResolver?: (req: Request) => string;

  /**
   * This function allows for the definition of a custom rendering strategy on a per-request basis.
   * By default, we provide a defaultRenderingStrategyResolver,
   * which has a default parameter defaultRenderingStrategyResolverOptions.
   * This default option disables server-side rendering (SSR) on pages such as 'checkout' and 'my-account'.
   *
   * @param req
   */
  renderingStrategyResolver?: (req: Request) => RenderingStrategy;

  /**
   * Time in milliseconds to wait for rendering when SSR_ALWAYS render strategy is set for the request.
   * Default value is 60000 milliseconds (1 minute).
   */
  forcedSsrTimeout?: number;

  /**
   * The time for how long the render is expected to finish in.
   * Exceeding this timeout will decrease the concurrency limit
   * and allow for the new request to be server-side rendered.
   * However, this may not release the rendering resources for the hanging render,
   * which may cause additional memory usage on the server.
   *
   * It will log which render is exceeding the render time,
   * which is useful for debugging issues.
   *
   * The value should always be higher than `timeout` and `forcedSsrTimeout`.
   *
   * Default value is 300000 milliseconds (5 minutes).
   */
  maxRenderTime?: number;

  /**
   * Instead of immediately falling back to CSR
   * while a render for the same key is in progress, this option will make
   * the subsequent requests for this key wait for the current render.
   *
   * All pending requests that for the same rendering key will
   * take up only _one_ concurrency slot, because there is only
   * one actual rendering task being performed.
   *
   * Each request independently honors the `timeout` option.
   * E.g., consider the following setup where `timeout` option
   * is set to 3s, and the given request takes 4s to render.
   * The flow is as follows:
   *
   * - 1st request arrives and triggers the SSR.
   * - 2nd request for the same URL arrives 2s after the 1st one.
   *    Instead of falling back to CSR, it waits (with its own timeout)
   *    for the render of the first request.
   * - 1st request times out after 3s, and falls back to CSR.
   * - one second after the timeout, the current render finishes.
   * - the 2nd request returns SSR after only 2s of waiting.
   */
  reuseCurrentRendering?: boolean;

  /**
   * @deprecated - This flag is not used anymore since v2211.27.
   *
   * Now all the information about the traffic and rendering is logged unconditionally:
   * - receiving requests
   * - responding to requests (either with HTML result, error or fallback to CSR)
   * - start and end of renders
   * - timeout of renders (due to passing `maxRenderTime`)
   */
  debug?: boolean;

  /**
   * Config for improving logged messages with context and JSON structure.
   *
   * It enhances the logs in SSR by adding context, including the request's details,
   * and structuring them as JSON.
   *
   * The `logger` property is optional and accepts:
   * - `ExpressServerLogger`: Interprets the given `ExpressServerLogger` as a custom logger
   *
   * By default, the DefaultExpressServerLogger is used.
   */
  logger?: ExpressServerLogger;

  /**
   * When caching is enabled, this function tells whether the given rendering result
   * (html or error) should be cached.
   *
   * By default, all html rendering results are cached. By default, errors are not cached.
   */
  shouldCacheRenderingResult?: ({
    options,
    entry,
  }: {
    options: SsrOptimizationOptions;
    entry: Pick<RenderingEntry, 'err' | 'html'>;
  }) => boolean;

  /**
   * Toggles providing granular adaptation to breaking changes in OptimizedSsrEngine.
   * They are temporary and will be removed in the future.
   * Each toggle has its own lifespan.
   *
   * Note: They are related only to the `OptimizedSsrEngine`. In particular, they
   * are different from Spartacus's regular feature toggles provided in the Angular app.
   */
  ssrFeatureToggles?: {
    /**
     * When true, the cache size will be limited by memory defined via the `cacheSizeMemory` option.
     * When false, the cache size will be limited by number of entries defined via the deprecated `cacheSize` option.
     */
    limitCacheByMemory?: boolean;
  };
}

export enum RenderingStrategy {
  ALWAYS_CSR = -1,
  DEFAULT = 0,
  ALWAYS_SSR = 1,
}

/**
 * Deeply required type for `featureToggles` property.
 */
type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};

/**
 * Returns the request path (with query string) for use as the SSR cache key.
 *
 * Note: This intentionally excludes the host to prevent cache poisoning
 * via attacker-controlled headers like X-Forwarded-Host.
 */
export function getDefaultRenderKey(req: Request): string {
  return req.originalUrl;
}

/**
 * The type of `defaultSsrOptimizationOptions` ensures that all properties are set to a default value.
 * Thanks to this, all options are well-defined and can be printed to logs on the SSR server start.
 */
type DefaultSsrOptimizationOptions = Omit<
  Required<SsrOptimizationOptions>,
  | 'debug' // debug is deprecated and not used anymore
  | 'ttl' // ttl is required but its default value is `undefined`
> & {
  ttl: number | undefined; // needed, otherwise we could not set the value `ttl: undefined` value (due to the Required<...>)
} & DeepRequired<
    // all nested properties of `ssrFeatureToggles` are required too
    Pick<
      SsrOptimizationOptions,
      //
      'ssrFeatureToggles'
    >
  >;

export const defaultSsrOptimizationOptions: DefaultSsrOptimizationOptions = {
  cache: false,
  cacheSize: 3000,
  cacheSizeMemory: 800_000_000,
  cacheEntrySizeCalculator: new DefaultCacheEntrySizeCalculator(),
  ttl: undefined,
  concurrency: 10,
  timeout: 3_000,
  forcedSsrTimeout: 60_000,
  maxRenderTime: 300_000,
  reuseCurrentRendering: true,
  renderingStrategyResolver: defaultRenderingStrategyResolver(
    defaultRenderingStrategyResolverOptions
  ),
  logger: new DefaultExpressServerLogger(),
  shouldCacheRenderingResult: ({ entry: { err } }) => !err,
  renderKeyResolver: getDefaultRenderKey,
  ssrFeatureToggles: {
    limitCacheByMemory: true,
  },
};
