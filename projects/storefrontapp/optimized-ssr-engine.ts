import * as fs from 'fs';

export enum RenderingStrategy {
  ALWAYS_CSR = -1,
  DEFAULT = 0,
  ALWAYS_SSR = 1,
}

export interface OptimizedSsrOptions {
  /**
   * Time in milliseconds to wait for SSR rendering to happen.
   */
  timeout?: number;

  /**
   * Enable in-memory cache for pre-rendered urls.
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

class RenderingCache {
  renderedUrls: {
    [filePath: string]: {
      html?: any;
      err?: any;
      time?: number;
      rendering?: boolean;
    };
  } = {};

  constructor(private options: OptimizedSsrOptions) {}

  setRendering(key) {
    this.renderedUrls[key] = { rendering: true };
  }

  store(key, err, html) {
    this.renderedUrls[key] = { err, html };
    if (this.options.ttl) {
      this.renderedUrls[key].time = Date.now();
    }
  }

  isRendering(key): boolean {
    return this.renderedUrls[key]?.rendering;
  }

  get(key) {
    return this.renderedUrls[key];
  }

  isReady(key) {
    const renderIsPresent =
      this.renderedUrls[key]?.html || this.renderedUrls[key]?.err;
    return renderIsPresent && this.isFresh(key);
  }

  isFresh(key) {
    if (!this.options.ttl) {
      return true;
    }

    return Date.now() - this.renderedUrls[key]?.time ?? 0 < this.options.ttl;
  }

  remove(key) {
    delete this.renderedUrls[key];
  }
}

export function optimizedSsrEngine(
  expressEngine,
  ssrOptions?: OptimizedSsrOptions
) {
  // The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
  // response is evicted as soon as the first successful response is successfully returned.
  const renderingCache = new RenderingCache(ssrOptions);

  let currentConcurrency = 0;

  return function wrappedEngine(
    filePath: string,
    options: any,
    callback: (err?: Error | null, html?: string) => void
  ) {
    const res = options.res || options.req.res;

    const renderingKey = ssrOptions.renderKeyResolver
      ? ssrOptions.renderKeyResolver(options.req)
      : options.req.originalUrl;

    /**
     * When SSR page can not be returned in time, we're returning index.html of
     * the CSR application.
     * The CSR application is returned with the "Cache-Control: no-store" response-header. This notifies external cache systems to not use the CSR application for the subsequent request.
     */
    function fallbackToCsr() {
      res.set('Cache-Control', 'no-store');
      callback(undefined, getDocument(filePath));
    }

    if (renderingCache.isReady(renderingKey)) {
      callback(
        renderingCache.get(renderingKey).err,
        renderingCache.get(renderingKey).html
      );

      if (!ssrOptions?.cache) {
        // we drop cached rendering if caching is disabled
        renderingCache.remove(renderingKey);
      }
    } else {
      let waitingForRender;

      const concurrencyLimitExceed = ssrOptions.concurrency
        ? currentConcurrency > ssrOptions.concurrency
        : false;

      const renderingStrategy = ssrOptions.renderingStrategyResolver
        ? ssrOptions.renderingStrategyResolver(options.req)
        : RenderingStrategy.DEFAULT;

      if (
        (!renderingCache.isRendering(renderingKey) &&
          !concurrencyLimitExceed &&
          renderingStrategy !== RenderingStrategy.ALWAYS_CSR) ||
        renderingStrategy === RenderingStrategy.ALWAYS_SSR
      ) {
        currentConcurrency++;

        if (
          ssrOptions?.timeout ||
          renderingStrategy === RenderingStrategy.ALWAYS_SSR
        ) {
          const timeout =
            renderingStrategy === RenderingStrategy.ALWAYS_SSR
              ? ssrOptions.forcedSsrTimeout ?? 60000
              : ssrOptions.timeout;

          waitingForRender = setTimeout(() => {
            waitingForRender = undefined;
            fallbackToCsr();
            console.log(
              `SSR rendering exceeded timeout, fallbacking to CSR for ${options.req?.url}`
            );
          }, timeout);
        } else {
          fallbackToCsr();
        }

        renderingCache.setRendering(renderingKey);
        expressEngine(filePath, options, (err, html) => {
          currentConcurrency--;
          if (waitingForRender) {
            // if request is still waiting for render, return it
            clearTimeout(waitingForRender);
            callback(err, html);

            if (ssrOptions?.cache) {
              renderingCache.store(renderingKey, err, html);
            } else {
              renderingCache.remove(renderingKey);
            }
          } else {
            // store the rendering for future use
            renderingCache.store(renderingKey, err, html);
          }
        });
      } else {
        // if there is already rendering in progress, return the fallback
        fallbackToCsr();
      }
    }
  };
}

const templateCache = {};

/**
 * Get the document at the file path
 */
function getDocument(filePath: string): string {
  return (templateCache[filePath] =
    templateCache[filePath] || fs.readFileSync(filePath).toString());
}
