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
  renderKeyResolver?: (req) => string;

  /**
   * Allows defining custom rendering strategy per request
   *
   * @param req
   */
  renderingStrategyResolver?: (req) => RenderingStrategy;

  /**
   * Time in milliseconds to wait for rendering when SSR_ALWAYS render strategy is set for the request.
   * Default value is 60 seconds.
   */
  forcedSsrTimeout?: number;
}

export enum RenderingStrategy {
  ALWAYS_CSR = -1,
  DEFAULT = 0,
  ALWAYS_SSR = 1,
}
