/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request } from 'express';
import { ExpressServerLogger } from '../logger';
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
   */
  cacheSize?: number;

  /**
   * Limit number of concurrent rendering
   */
  concurrency?: number;

  /**
   * Time in milliseconds after prerendered page is becoming stale and should
   * be rendered again.
   */
  ttl?: number;

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
   * Enable detailed logs for troubleshooting problems
   */
  debug?: boolean;

  /**
   * Config for improving logged messages with context and JSON structure.
   *
   * It enhances the logs in SSR by adding context, including the request's details,
   * and structuring them as JSON.
   *
   * The `logger` property is optional and accepts two values:
   * - `true`:         Enables the default logger and enhances the logs.
   * - `ExpressServerLogger`: Interprets the given `ExpressServerLogger` as a custom logger
   *
   * By default, the logger is disabled, meaning that logs in SSR are not enhanced.
   */
  logger?: true | ExpressServerLogger; //CXSPA-3680 - allow only providing ExpressServerLogger implementations
}

export enum RenderingStrategy {
  ALWAYS_CSR = -1,
  DEFAULT = 0,
  ALWAYS_SSR = 1,
}

export const defaultSsrOptimizationOptions: SsrOptimizationOptions = {
  concurrency: 10,
  timeout: 3_000,
  forcedSsrTimeout: 60_000,
  maxRenderTime: 300_000,
  reuseCurrentRendering: true,
  debug: false,
  renderingStrategyResolver: defaultRenderingStrategyResolver(
    defaultRenderingStrategyResolverOptions
  ),
  //CXSPA-3680 - set ExpressServerLogger as default
  //logger: new ExpressServerLogger(),
};
