/* webpackIgnore: true */
import { Request, Response } from 'express';
import * as fs from 'fs';
import { NgExpressEngineInstance } from '../engine-decorator/ng-express-engine-decorator';
import { RenderingCache } from './rendering-cache';
import {
  RenderingStrategy,
  SsrOptimizationOptions,
} from './ssr-optimization-options';

export type SsrCallbackFn = (
  /**
   * Error that might've occurred while rendering.
   */
  err?: Error | null | undefined,
  /**
   * HTML response.
   */
  html?: string | undefined
) => void;

/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
export class OptimizedSsrEngine {
  protected currentConcurrency = 0;
  protected renderingCache = new RenderingCache(this.ssrOptions);
  private templateCache = new Map<string, string>();

  /**
   * When the config `reuseCurrentRendering` is true, we want to reuse the html result
   * for all the subsequent pending requests for the same rendering key.
   * Therefore we need to store the callbacks for all the subsequent requests
   * and invoke them with the html after the initial render outputs the html.
   *
   * For a given rendering key, it can have the following values:
   * - undefined          = there are no pending requests for the rendering key
   * - empty array        = there is only one main pending request for the rendering key, which is being rendered,
   *                          but no other requests are waiting to reuse the result.
   * - elements in array  = there is one main pending request which is being rendered, and the elements of the array
   *                          are the render callbacks for the requests waiting to reuse the result
   */
  private waitingRenderCallbacks = new Map<string, SsrCallbackFn[]>();

  get engineInstance(): NgExpressEngineInstance {
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
  protected fallbackToCsr(
    response: Response,
    filePath: string,
    callback: SsrCallbackFn
  ): void {
    response.set('Cache-Control', 'no-store');
    callback(undefined, this.getDocument(filePath));
  }

  protected getRenderingKey(request: Request): string {
    return this.ssrOptions?.renderKeyResolver
      ? this.ssrOptions.renderKeyResolver(request)
      : request.originalUrl;
  }

  protected getRenderingStrategy(request: Request): RenderingStrategy {
    return this.ssrOptions?.renderingStrategyResolver
      ? this.ssrOptions.renderingStrategyResolver(request)
      : RenderingStrategy.DEFAULT;
  }

  /**
   * When returns true, the server side rendering should be performed.
   * When returns false, the CSR fallback should be returned.
   *
   * The CSR fallback should happen, when there is already
   * a pending rendering for the same rendering key
   * (unless the reuseCurrentRendering config option is enabled)
   * OR when the concurrency limit for rendering various URLs is exceeded.
   */
  protected shouldRender(request: Request): boolean {
    const concurrencyLimitExceeded = this.isConcurrencyLimitExceeded();

    const fallBack =
      this.isRendering(request) && !this.ssrOptions?.reuseCurrentRendering;
    if (fallBack) {
      this.log(`CSR fallback: rendering in progress (${request?.originalUrl})`);
    } else if (concurrencyLimitExceeded) {
      this.log(
        `CSR fallback: Concurrency limit exceeded (${this.ssrOptions?.concurrency})`
      );
    }

    return (
      (!fallBack &&
        !concurrencyLimitExceeded &&
        this.getRenderingStrategy(request) !== RenderingStrategy.ALWAYS_CSR) ||
      this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR
    );
  }

  protected isRendering(request: Request): boolean {
    return this.renderingCache.isRendering(this.getRenderingKey(request));
  }

  /**
   * Checks for the concurrency limit
   *
   * @returns true if the concurrency limit has been exceeded
   */
  protected isConcurrencyLimitExceeded(): boolean {
    return this.ssrOptions?.concurrency
      ? this.currentConcurrency >= this.ssrOptions.concurrency
      : false;
  }

  protected shouldTimeout(request: Request): boolean {
    return (
      !!this.ssrOptions?.timeout ||
      this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR
    );
  }

  protected getTimeout(request: Request): number {
    return this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR
      ? this.ssrOptions?.forcedSsrTimeout ?? 60000
      : this.ssrOptions?.timeout ?? 0;
  }

  protected returnCachedRender(
    request: Request,
    callback: SsrCallbackFn
  ): boolean {
    const key = this.getRenderingKey(request);

    if (this.renderingCache.isReady(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const cached = this.renderingCache.get(key)!;
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
    callback: SsrCallbackFn
  ): void {
    const request: Request = options.req;
    const response: Response = options.res || options.req.res;

    const renderingKey = this.getRenderingKey(request);

    if (this.returnCachedRender(request, callback)) {
      this.log(`Render from cache (${request?.originalUrl})`);
      return;
    }

    if (!this.shouldRender(request)) {
      this.fallbackToCsr(response, filePath, callback);
      return;
    }

    /**
     * Tells whether this is the first pending request for the given rendering key.
     */
    const isFirstRequestForKey = !this.renderingCache.isRendering(renderingKey);

    if (isFirstRequestForKey) {
      // Callbacks for any subsequent pending requests for the same rendering key
      // will be stored in the array. Finally they will be invoked only when the first request's
      // render finishes and shares the html result with them:
      this.waitingRenderCallbacks.set(renderingKey, []);

      // Take up one concurrency slot for one rendering key.
      // The subsequent pending requests for the same key should not take the concurrency slot, as they
      // are just passively waiting for the first request's render to finish and share the HTML result.
      this.currentConcurrency++;
    }

    let waitingForRender: NodeJS.Timeout | undefined;
    if (this.shouldTimeout(request)) {
      // establish timeout for rendering
      const timeout = this.getTimeout(request);
      waitingForRender = setTimeout(() => {
        waitingForRender = undefined;
        this.fallbackToCsr(response, filePath, callback);
        this.log(
          `SSR rendering exceeded timeout ${timeout}, fallbacking to CSR for ${request?.originalUrl}`,
          false
        );
      }, timeout);
    } else {
      this.fallbackToCsr(response, filePath, callback);
    }

    // start rendering
    this.renderingCache.setAsRendering(renderingKey);

    // setting the timeout for hanging renders that might not ever finish due to various reasons
    // releasing concurrency slots by decreasing the `this.currentConcurrency--`.
    let maxRenderTimeout: NodeJS.Timeout | undefined = setTimeout(() => {
      if (isFirstRequestForKey) {
        // we release the concurrency slot only for the first request for the rendering key,
        // as other waiting requests for the same key didn't take up a slot
        this.currentConcurrency--;

        // forget the callbacks that waiting for the result of the first request's render
        this.waitingRenderCallbacks.delete(renderingKey);
      }

      this.renderingCache.clear(renderingKey);
      maxRenderTimeout = undefined;

      this.log(
        `Rendering of ${request?.originalUrl} was not able to complete. This might cause memory leaks!`,
        false
      );
    }, this.ssrOptions?.maxRenderTime ?? 300000); // 300000ms == 5 minutes

    this.log(`Rendering started (${request?.originalUrl})`);

    const renderCallback: SsrCallbackFn = (err, html) => {
      if (!maxRenderTimeout) {
        // ignore this render's result because it exceeded maxRenderTimeout
        this.log(
          `Rendering of ${request.originalUrl} completed after the specified maxRenderTime, therefore it was ignored.`
        );
        return;
      }
      clearTimeout(maxRenderTimeout);

      this.log(`Rendering completed (${request?.originalUrl})`);

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

      if (isFirstRequestForKey) {
        // share the rendering result of the first request with other pending requests of the same key
        if (this.waitingRenderCallbacks.get(renderingKey)?.length) {
          this.log(
            `Processing ${
              this.waitingRenderCallbacks.get(renderingKey)?.length
            } waiting SSR requests for ${request.originalUrl}...`
          );
        }
        this.waitingRenderCallbacks
          .get(renderingKey)
          ?.forEach((cb) => cb(err, html));

        this.waitingRenderCallbacks.delete(renderingKey);

        // we release the concurrency slot only for the first request for the rendering key,
        // as other waiting requests for the same key didn't take up a slot
        this.currentConcurrency--;
      }
    };

    if (isFirstRequestForKey) {
      this.expressEngine(filePath, options, renderCallback);
    } else {
      this.waitingRenderCallbacks.get(renderingKey)?.push(renderCallback);
    }
  }

  protected log(message: string, debug = true): void {
    if (!debug || this.ssrOptions?.debug) {
      console.log(message);
    }
  }

  /** Retrieve the document from the cache or the filesystem */
  protected getDocument(filePath: string): string {
    let doc = this.templateCache.get(filePath);

    if (!doc) {
      // fs.readFileSync could be missing in a browser, specifically
      // in a unit tests with { node: { fs: 'empty' } } webpack configuration
      doc = fs?.readFileSync ? fs.readFileSync(filePath, 'utf-8') : '';
      this.templateCache.set(filePath, doc);
    }

    return doc;
  }
}
