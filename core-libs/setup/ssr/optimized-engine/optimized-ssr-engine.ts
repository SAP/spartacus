/* webpackIgnore: true */
import * as fs from 'fs';
import {
  RenderingStrategy,
  SsrOptimizationOptions,
} from './ssr-optimization-options';
import { RenderingCache } from './rendering-cache';
import { NgExpressEngineInstance } from '../engine-decorator/ng-express-engine-decorator';

/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
export class OptimizedSsrEngine {
  protected currentConcurrency = 0;
  protected renderingCache = new RenderingCache(this.ssrOptions);
  private templateCache = new Map<string, string>();

  get engineInstance() {
    return this.renderResponse.bind(this);
  }

  constructor(
    protected expressEngine: NgExpressEngineInstance,
    protected ssrOptions?: SsrOptimizationOptions
  ) {}

  /**
   * When SSR page can not be returned in time, we're returning index.html of
   * the CSR application.
   * The CSR application is returned with the "Cache-Control: no-store" response-header. This notifies external cache systems to not use the CSR application for the subsequent request.
   */
  protected fallbackToCsr(res, filePath, callback) {
    res.set('Cache-Control', 'no-store');
    callback(undefined, this.getDocument(filePath));
  }

  protected getRenderingKey(req) {
    return this.ssrOptions.renderKeyResolver
      ? this.ssrOptions.renderKeyResolver(req)
      : req.originalUrl;
  }

  protected getRenderingStrategy(req) {
    return this.ssrOptions.renderingStrategyResolver
      ? this.ssrOptions.renderingStrategyResolver(req)
      : RenderingStrategy.DEFAULT;
  }

  protected shouldRender(req): boolean {
    const concurrencyLimitExceed = this.ssrOptions.concurrency
      ? this.currentConcurrency > this.ssrOptions.concurrency
      : false;

    return (
      (!this.renderingCache.isRendering(this.getRenderingKey(req)) &&
        !concurrencyLimitExceed &&
        this.getRenderingStrategy(req) !== RenderingStrategy.ALWAYS_CSR) ||
      this.getRenderingStrategy(req) === RenderingStrategy.ALWAYS_SSR
    );
  }

  protected shouldTimeout(req): boolean {
    return (
      !!this.ssrOptions?.timeout ||
      this.getRenderingStrategy(req) === RenderingStrategy.ALWAYS_SSR
    );
  }

  protected getTimeout(req): number {
    return this.getRenderingStrategy(req) === RenderingStrategy.ALWAYS_SSR
      ? this.ssrOptions.forcedSsrTimeout ?? 60000
      : this.ssrOptions.timeout;
  }

  protected returnCachedRender(request, callback): boolean {
    const key = this.getRenderingKey(request);

    if (this.renderingCache.isReady(key)) {
      const cached = this.renderingCache.get(key);
      callback(cached.err, cached.html);

      if (!this.ssrOptions?.cache) {
        // we drop cached rendering if caching is disabled
        this.renderingCache.clear(key);
      }
      return true;
    }
    return false;
  }

  protected renderResponse(
    filePath: string,
    options: any,
    callback: (err?: Error | null, html?: string) => void
  ) {
    const request = options.req;
    const res = options.res || options.req.res;

    const renderingKey = this.getRenderingKey(request);

    if (!this.returnCachedRender(request, callback)) {
      if (this.shouldRender(request)) {
        this.currentConcurrency++;
        let waitingForRender;

        if (this.shouldTimeout(request)) {
          // establish timeout for rendering
          waitingForRender = setTimeout(() => {
            waitingForRender = undefined;
            this.fallbackToCsr(res, filePath, callback);
            console.log(
              `SSR rendering exceeded timeout, fallbacking to CSR for ${options.req?.url}`
            );
          }, this.getTimeout(options.req));
        } else {
          this.fallbackToCsr(res, filePath, callback);
        }

        // start rendering
        this.renderingCache.setAsRendering(renderingKey);
        this.expressEngine(filePath, options, (err, html) => {
          this.currentConcurrency--;

          if (waitingForRender) {
            // if request is still waiting for render, return it
            clearTimeout(waitingForRender);
            callback(err, html);

            // store the render only if caching is enabled
            if (this.ssrOptions?.cache) {
              this.renderingCache.store(renderingKey, err, html);
            } else {
              this.renderingCache.clear(renderingKey);
            }
          } else {
            // store the render for future use
            this.renderingCache.store(renderingKey, err, html);
          }
        });
      } else {
        // if there is already rendering in progress, return the fallback
        this.fallbackToCsr(res, filePath, callback);
      }
    }
  }

  /** Retrieve the document from the cache or the filesystem */
  protected getDocument(filePath: string): string {
    let doc = this.templateCache.get(filePath);

    if (!doc) {
      doc = fs.readFileSync(filePath, 'utf-8');
      this.templateCache.set(filePath, doc);
    }

    return doc;
  }
}
