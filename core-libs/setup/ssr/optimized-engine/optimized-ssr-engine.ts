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
  html?: string | undefined,
  /**
   * An indicator if `this.waitingRenderCallbacks` is being processed.
   * Mitigates the infinite loop.
   */
  waitingRendersProcessing?: boolean
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
   * When the config `reuseCurrentRendering` is true,
   * we want to reuse the html result
   * for all the subsequent requests for the same URL.
   * Therefore we need to store the callbacks
   * for all those received requests
   * and invoke them with the html after
   * the initial render outputs the html.
   */
  private waitingRenderCallbacks: Record<string, SsrCallbackFn[] | null> = {};

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

  protected shouldRender(request: Request): boolean {
    const concurrencyLimitExceeded = this.isConcurrencyLimitExceeded(request);

    // if the option is enabled, we shouldn't fall back
    const fallBack = this.ssrOptions?.reuseCurrentRendering
      ? false
      : this.isRendering(request);
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
   * Checks for the concurrency limit with `reuseCurrentRendering` in mind.
   *
   * @param request
   * @returns true if the concurrency limit has been exceeded
   */
  protected isConcurrencyLimitExceeded(request: Request): boolean {
    // we don't take up a concurrency slot if the request should just wait for the render
    if (this.isRendering(request) && this.ssrOptions?.reuseCurrentRendering) {
      return false;
    }
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

    if (!this.returnCachedRender(request, callback)) {
      if (this.shouldRender(request)) {
        if (
          !this.ssrOptions?.reuseCurrentRendering ||
          // if the wait for render options is enabled,
          // take up only one concurrency slot for the first render
          !this.isRendering(request)
        ) {
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
          if (
            !this.ssrOptions?.reuseCurrentRendering ||
            // if the wait for render option is enabled,
            // release the concurrency slot only for the first render,
            // as other waiting renders didn't take up a slot
            this.isRendering(request)
          ) {
            this.currentConcurrency--;
          }

          this.renderingCache.clear(renderingKey);
          maxRenderTimeout = undefined;

          this.log(
            `Rendering of ${request?.originalUrl} was not able to complete. This might cause memory leaks!`,
            false
          );
        }, this.ssrOptions?.maxRenderTime ?? 300000); // 300000ms == 5 minutes

        this.log(`Rendering started (${request?.originalUrl})`);

        const renderCallback: SsrCallbackFn = (
          err,
          html,
          waitingRendersProcessing
        ) => {
          if (!maxRenderTimeout) {
            // ignore this render's result because it exceeded maxRenderTimeout
            this.log(
              `Rendering of ${request.originalUrl} completed after the specified maxRenderTime, therefore it was ignored.`
            );
            return;
          }
          clearTimeout(maxRenderTimeout);
          // we've taken only one slot for the first request which triggered the render.
          // therefore, all subsequent requests waiting for the same render should not decrease the concurrency slots.
          if (!waitingRendersProcessing) {
            this.currentConcurrency--;
          }

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

          if (
            this.ssrOptions?.reuseCurrentRendering &&
            !waitingRendersProcessing
          ) {
            this.log(
              `Processing waiting SSR requests for ${request.originalUrl}...`
            );
            this.waitingRenderCallbacks[renderingKey]?.forEach((cb) =>
              cb(err, html, true)
            );
            this.waitingRenderCallbacks[renderingKey] = null;
          }
        };

        if (
          this.ssrOptions?.reuseCurrentRendering &&
          this.waitingRenderCallbacks[renderingKey]
        ) {
          this.waitingRenderCallbacks[renderingKey]?.push(renderCallback);
        } else {
          this.waitingRenderCallbacks[renderingKey] = [];
          this.expressEngine(filePath, options, renderCallback);
        }
      } else {
        // if there is already rendering in progress, return the fallback
        this.fallbackToCsr(response, filePath, callback);
      }
    } else {
      this.log(`Render from cache (${request?.originalUrl})`);
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
