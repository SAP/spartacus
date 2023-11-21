/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* webpackIgnore: true */
import { Request, Response } from 'express';
import * as fs from 'fs';
import { NgExpressEngineInstance } from '../engine-decorator/ng-express-engine-decorator';
import { getRequestUrl } from '../express-utils/express-request-url';
import {
  DefaultExpressServerLogger,
  EXPRESS_SERVER_LOGGER,
  ExpressServerLogger,
  ExpressServerLoggerContext,
  LegacyExpressServerLogger,
} from '../logger';
import { getLoggableSsrOptimizationOptions } from './get-loggable-ssr-optimization-options';
import { RenderingCache } from './rendering-cache';
import { preprocessRequestForLogger } from './request-context';
import {
  RenderingStrategy,
  SsrOptimizationOptions,
  defaultSsrOptimizationOptions,
} from './ssr-optimization-options';

/**
 * Returns the full url for the given SSR Request.
 */
export const getDefaultRenderKey = getRequestUrl;

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
  private logger: ExpressServerLogger;
  private templateCache = new Map<string, string>();

  /**
   * When the config `reuseCurrentRendering` is enabled, we want perform
   * only one render for one rendering key and reuse the html result
   * for all the pending requests for the same rendering key.
   * Therefore we need to store the callbacks for all the pending requests
   * and invoke them with the html after the render completes.
   *
   * This Map should be used only when `reuseCurrentRendering` config is enabled.
   * It's indexed by the rendering keys.
   */
  private renderCallbacks = new Map<string, SsrCallbackFn[]>();

  get engineInstance(): NgExpressEngineInstance {
    return this.renderResponse.bind(this);
  }

  constructor(
    protected expressEngine: NgExpressEngineInstance,
    protected ssrOptions?: SsrOptimizationOptions
  ) {
    this.ssrOptions = ssrOptions
      ? {
          ...defaultSsrOptimizationOptions,
          // overrides the default options
          ...ssrOptions,
        }
      : undefined;
    this.logger = this.initLogger(this.ssrOptions);
    this.logOptions();
  }

  protected logOptions(): void {
    if (!this.ssrOptions) {
      return;
    }

    const loggableSsrOptions = getLoggableSsrOptimizationOptions(
      this.ssrOptions
    );

    // This check has been introduced to avoid breaking changes. Remove it in Spartacus version 7.0
    if (this.ssrOptions.logger) {
      this.log(`[spartacus] SSR optimization engine initialized`, true, {
        options: loggableSsrOptions,
      });
    } else {
      const stringifiedOptions = JSON.stringify(loggableSsrOptions, null, 2);
      this.log(
        `[spartacus] SSR optimization engine initialized with the following options: ${stringifiedOptions}`,
        true
      );
    }
  }

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
      : getDefaultRenderKey(request);
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
   * We should not render, when there is already
   * a pending rendering for the same rendering key
   * (unless the `reuseCurrentRendering` config option is enabled)
   * OR when the concurrency limit is exceeded.
   */
  protected shouldRender(request: Request): boolean {
    const renderingKey = this.getRenderingKey(request);
    const concurrencyLimitExceeded =
      this.isConcurrencyLimitExceeded(renderingKey);
    const fallBack =
      this.renderingCache.isRendering(renderingKey) &&
      !this.ssrOptions?.reuseCurrentRendering;

    if (fallBack) {
      this.log(
        `CSR fallback: rendering in progress (${request?.originalUrl})`,
        true,
        { request }
      );
    } else if (concurrencyLimitExceeded) {
      this.log(
        `CSR fallback: Concurrency limit exceeded (${this.ssrOptions?.concurrency})`,
        true,
        { request }
      );
    }

    return (
      (!fallBack &&
        !concurrencyLimitExceeded &&
        this.getRenderingStrategy(request) !== RenderingStrategy.ALWAYS_CSR) ||
      this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR
    );
  }

  /**
   * Checks for the concurrency limit
   *
   * @returns true if rendering this request would exceed the concurrency limit
   */
  private isConcurrencyLimitExceeded(renderingKey: string): boolean {
    // If we can reuse a pending render for this request, we don't take up a new concurrency slot.
    // In that case we don't exceed the concurrency limit even if the `currentConcurrency`
    // already reaches the limit.
    if (
      this.ssrOptions?.reuseCurrentRendering &&
      this.renderingCache.isRendering(renderingKey)
    ) {
      return false;
    }

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

  /**
   * Returns the timeout value.
   *
   * In case of the rendering strategy ALWAYS_SSR, it returns the config `forcedSsrTimeout`.
   * Otherwise, it returns the config `timeout`.
   */
  protected getTimeout(request: Request): number {
    return this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR
      ? this.ssrOptions?.forcedSsrTimeout ?? 60000
      : this.ssrOptions?.timeout ?? 0;
  }

  /**
   * If there is an available cached response for this rendering key,
   * it invokes the given render callback with the response and returns true.
   *
   * Otherwise, it returns false.
   */
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
    preprocessRequestForLogger(options.req, this.logger);

    const request: Request = options.req;
    const response: Response = options.req.res;

    if (this.returnCachedRender(request, callback)) {
      this.log(`Render from cache (${request?.originalUrl})`, true, {
        request,
      });
      return;
    }
    if (!this.shouldRender(request)) {
      this.fallbackToCsr(response, filePath, callback);
      return;
    }

    let requestTimeout: ReturnType<typeof setTimeout> | undefined;
    if (this.shouldTimeout(request)) {
      // establish timeout for rendering
      const timeout = this.getTimeout(request);
      requestTimeout = setTimeout(() => {
        requestTimeout = undefined;
        this.fallbackToCsr(response, filePath, callback);
        this.log(
          `SSR rendering exceeded timeout ${timeout}, fallbacking to CSR for ${request?.originalUrl}`,
          false,
          { request }
        );
      }, timeout);
    } else {
      // Here we respond with the fallback to CSR, but we don't `return`.
      // We let the actual rendering task to happen in the background

      // to eventually store the rendered result in the cache.
      this.fallbackToCsr(response, filePath, callback);
    }

    const renderingKey = this.getRenderingKey(request);
    const renderCallback: SsrCallbackFn = (err, html): void => {
      if (requestTimeout) {
        // if request is still waiting for render, return it
        clearTimeout(requestTimeout);
        callback(err, html);

        this.log(
          `Request is resolved with the SSR rendering result (${request?.originalUrl})`,
          true,
          { request }
        );

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
    };

    this.handleRender({
      filePath,
      options,
      renderCallback,
      request,
    });
  }

  protected log(
    message: string,
    debug = true,
    //CXSPA-3680 - in a new major, let's make this argument required
    context?: ExpressServerLoggerContext
  ): void {
    if (debug || this.ssrOptions?.debug) {
      this.logger.log(message, context || {});
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

  /**
   * Delegates the render to the original _Angular Universal express engine_.
   *
   * In case when the config `reuseCurrentRendering` is enabled and **if there is already a pending
   * render task for the same rendering key**, it doesn't delegate a new render to Angular Universal.
   * Instead, it waits for the current rendering to complete and then reuse the result for all waiting requests.
   */
  private handleRender({
    filePath,
    options,
    renderCallback,
    request,
  }: {
    filePath: string;
    options: any;
    renderCallback: SsrCallbackFn;
    request: Request;
  }): void {
    if (!this.ssrOptions?.reuseCurrentRendering) {
      this.startRender({
        filePath,
        options,
        renderCallback,
        request,
      });
      return;
    }

    const renderingKey = this.getRenderingKey(request);
    if (!this.renderCallbacks.has(renderingKey)) {
      this.renderCallbacks.set(renderingKey, []);
    }
    this.renderCallbacks.get(renderingKey)?.push(renderCallback);

    if (!this.renderingCache.isRendering(renderingKey)) {
      this.startRender({
        filePath,
        options,
        request,
        renderCallback: (err, html) => {
          // Share the result of the render with all awaiting requests for the same key:

          // Note: we access the Map at the moment of the render finished (don't store value in a local variable),
          //       because in the meantime something might have deleted the value (i.e. when `maxRenderTime` passed).
          this.renderCallbacks
            .get(renderingKey)
            ?.forEach((cb) => cb(err, html)); // pass the shared result to all waiting rendering callbacks
          this.renderCallbacks.delete(renderingKey);
        },
      });
    }

    this.log(
      `Request is waiting for the SSR rendering to complete (${request?.originalUrl})`,
      true,
      { request }
    );
  }

  /**
   * Delegates the render to the original _Angular Universal express engine_.
   *
   * There is no way to abort the running render of Angular Universal.
   * So if the render doesn't complete in the configured `maxRenderTime`,
   * we just consider the render task as hanging (note: it's a potential memory leak!).
   * Later on, even if the render completes somewhen in the future, we will ignore
   * its result.
   */
  private startRender({
    filePath,
    options,
    renderCallback,
    request,
  }: {
    filePath: string;
    options: any;
    renderCallback: SsrCallbackFn;
    request: Request;
  }): void {
    const renderingKey = this.getRenderingKey(request);

    // Setting the timeout for hanging renders that might not ever finish due to various reasons.
    // After the configured `maxRenderTime` passes, we consider the rendering task as hanging,
    // and release the concurrency slot and forget all callbacks waiting for the render's result.
    let maxRenderTimeout: ReturnType<typeof setTimeout> | undefined =
      setTimeout(() => {
        this.renderingCache.clear(renderingKey);
        maxRenderTimeout = undefined;
        this.currentConcurrency--;
        if (this.ssrOptions?.reuseCurrentRendering) {
          this.renderCallbacks.delete(renderingKey);
        }
        this.log(
          `Rendering of ${request?.originalUrl} was not able to complete. This might cause memory leaks!`,
          false,
          { request }
        );
      }, this.ssrOptions?.maxRenderTime ?? 300000); // 300000ms == 5 minutes

    this.log(`Rendering started (${request?.originalUrl})`, true, { request });
    this.renderingCache.setAsRendering(renderingKey);
    this.currentConcurrency++;

    options = {
      ...options,
      providers: [
        {
          provide: EXPRESS_SERVER_LOGGER,
          useValue: this.logger,
        },
      ],
    };

    this.expressEngine(filePath, options, (err, html) => {
      if (!maxRenderTimeout) {
        // ignore this render's result because it exceeded maxRenderTimeout
        this.log(
          `Rendering of ${request.originalUrl} completed after the specified maxRenderTime, therefore it was ignored.`,
          false,
          { request }
        );
        return;
      }
      clearTimeout(maxRenderTimeout);

      this.log(`Rendering completed (${request?.originalUrl})`, true, {
        request,
      });
      this.currentConcurrency--;

      renderCallback(err, html);
    });
  }

  //CXSPA-3680 - remove this method in 7.0
  private initLogger(ssrOptions: SsrOptimizationOptions | undefined) {
    if (ssrOptions?.logger === true) {
      return new DefaultExpressServerLogger();
    }
    return ssrOptions?.logger || new LegacyExpressServerLogger();
  }
}
