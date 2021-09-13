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

  /**
   * Returns true, when the `timeout` option has been configured to non-zero value OR
   * when the rendering strategy for the given request is ALWAYS_SSR.
   * Otherwise, it returns false.
   */
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

  /**
   * Handles the request and invokes the given `callback` with the result html / error.
   *
   * The result might be ether:
   * - a CSR fallback with a basic `index.html` content
   * - a result rendered by the original Angular Universal express engine
   * - a result from the in-memory cache (which was previously rendered by Angular Universal express engine).
   */
  protected renderResponse(
    filePath: string,
    options: any,
    callback: SsrCallbackFn
  ): void {
    const request: Request = options.req;
    const response: Response = options.res || options.req.res;

    if (this.returnCachedRender(request, callback)) {
      this.log(`Render from cache (${request?.originalUrl})`);
      return;
    }
    if (!this.shouldRender(request)) {
      this.fallbackToCsr(response, filePath, callback);
      return;
    }

    const renderingKey = this.getRenderingKey(request);

    /**
     * Tells whether this is the first pending request for the given rendering key.
     */
    const isFirstRequestForKey = !this.renderingCache.isRendering(renderingKey);

    this.incrementCurrentConcurrency({ isFirstRequestForKey });

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
      // Here we respond with the fallback to CSR, but we don't `return`.
      // We let the actual rendering task to happen in the background
      // to eventually store the rendered result in the cache.
      this.fallbackToCsr(response, filePath, callback);
    }

    // start rendering
    this.renderingCache.setAsRendering(renderingKey);

    // Setting the timeout for hanging renders that might not ever finish due to various reasons.
    // After the configured `maxRenderTime` passes, we consider the rendering task as hanged,
    // and release the concurrency slot.
    // Even if the rendering task completes in the future in the background, we will ignore its result.
    let maxRenderTimeout: NodeJS.Timeout | undefined = setTimeout(() => {
      this.renderingCache.clear(renderingKey);
      maxRenderTimeout = undefined;

      this.log(
        `Rendering of ${request?.originalUrl} was not able to complete. This might cause memory leaks!`,
        false
      );

      if (this.ssrOptions?.reuseCurrentRendering) {
        this.waitingRenderCallbacks.delete(renderingKey);
      }

      this.decrementCurrentConcurrency({ isFirstRequestForKey });
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

      this.decrementCurrentConcurrency({ isFirstRequestForKey });
    };

    this.startRender({
      filePath,
      options,
      renderCallback,
      request,
      isFirstRequestForKey,
    });
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

  /**
   * Delegates the render to the original _Angular Universal express engine_.
   *
   * In case when the config `reuseCurrentRendering` is enabled and **if there is already a pending
   * render task for the same key**, it doesn't delegate a new render to Angular Universal.
   * Instead, it waits for the current rendering to complete and then reuse the result for all waiting requests.
   */
  private startRender({
    filePath,
    options,
    renderCallback,
    request,
    isFirstRequestForKey,
  }: {
    filePath: string;
    options: any;
    renderCallback: SsrCallbackFn;
    request: Request;
    isFirstRequestForKey: boolean;
  }) {
    const renderingKey = this.getRenderingKey(request);

    if (!this.ssrOptions?.reuseCurrentRendering) {
      this.expressEngine(filePath, options, renderCallback);
      return;
    }

    if (!this.waitingRenderCallbacks.has(renderingKey)) {
      this.waitingRenderCallbacks.set(renderingKey, []);
    }
    this.waitingRenderCallbacks.get(renderingKey)?.push(renderCallback);

    if (isFirstRequestForKey) {
      this.expressEngine(filePath, options, (err, html) => {
        // Share the result of the render with all awaiting requests for the same key:

        // Note: we access the Map's array at the moment of the render finished (don't store the array it in a local variable),
        //       because in the meantime something might have deleted the array (i.e. when `maxRenderTime` passed).
        if (this.waitingRenderCallbacks.get(renderingKey)?.length) {
          this.log(
            `Processing ${
              this.waitingRenderCallbacks.get(renderingKey)?.length
            } waiting SSR requests for ${request.originalUrl}...`
          );
        }
        this.waitingRenderCallbacks
          .get(renderingKey)
          ?.forEach((cb) => cb(err, html)); // pass the shared result to all waiting rendering callbacks for this rendering key
        this.waitingRenderCallbacks.delete(renderingKey);
      });
    }
  }

  /**
   * Updates the state of the concurrency before starting the render.
   */
  private incrementCurrentConcurrency({
    isFirstRequestForKey,
  }: {
    isFirstRequestForKey: boolean;
  }): void {
    if (!this.ssrOptions?.reuseCurrentRendering) {
      this.currentConcurrency++;
      return;
    }

    if (isFirstRequestForKey) {
      // When config `reuseCurrentRendering` is enabled, we take up one concurrency slot for one rendering key.
      // The subsequent pending requests for the same key should not take the concurrency slot. It makes sense,
      // because they are just passively waiting for the first request's render to finish and share the HTML result,
      // so those requests they don't take up the CPU.
      this.currentConcurrency++;
    }
  }

  /**
   * Updates the state of the concurrency after the render is considered finished.
   */
  private decrementCurrentConcurrency({
    isFirstRequestForKey,
  }: {
    isFirstRequestForKey: boolean;
  }) {
    if (!this.ssrOptions?.reuseCurrentRendering) {
      this.currentConcurrency--;
      return;
    }

    if (isFirstRequestForKey) {
      // When config `reuseCurrentRendering` is enabled, we release the concurrency slot only for the first request
      // for the rendering key, as other waiting requests for the same key didn't take up a slot.
      this.currentConcurrency--;
    }
  }
}
