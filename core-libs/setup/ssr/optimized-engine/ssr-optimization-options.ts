import { Request } from 'express';

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
   * between rendered pages. By default it uses req.originalUrl
   *
   * @param req
   */
  renderKeyResolver?: (req: Request) => string;

  /**
   * Allows defining custom rendering strategy per request
   *
   * @param req
   */
  renderingStrategyResolver?: (req: Request) => RenderingStrategy;

  /**
   * Time in milliseconds to wait for rendering when SSR_ALWAYS render strategy is set for the request.
   * Default value is 60 seconds.
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
   * Default value is 300 seconds (5 minutes).
   */
  maxRenderTime?: number;

  /**
   * Enable detailed logs for troubleshooting problems
   */
  debug?: boolean;
}

export enum RenderingStrategy {
  ALWAYS_CSR = -1,
  DEFAULT = 0,
  ALWAYS_SSR = 1,
}
