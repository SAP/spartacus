import { Request, Response } from 'express';
import { NgExpressEngineInstance } from '../engine-decorator/ng-express-engine-decorator';
import { getRequestUrl } from '../express-utils/express-request-url';
import { ExpressServerLoggerContext } from '../logger';
import { RenderingCache } from './rendering-cache';
import { RenderingStrategy, SsrOptimizationOptions } from './ssr-optimization-options';
/**
 * Returns the full url for the given SSR Request.
 */
export declare const getDefaultRenderKey: typeof getRequestUrl;
export type SsrCallbackFn = (
/**
 * Error that might've occurred while rendering.
 */
err?: Error | null | undefined, 
/**
 * HTML response.
 */
html?: string | undefined) => void;
/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
export declare class OptimizedSsrEngine {
    protected expressEngine: NgExpressEngineInstance;
    protected ssrOptions?: SsrOptimizationOptions | undefined;
    protected currentConcurrency: number;
    protected renderingCache: RenderingCache;
    private logger;
    private templateCache;
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
    private renderCallbacks;
    get engineInstance(): NgExpressEngineInstance;
    constructor(expressEngine: NgExpressEngineInstance, ssrOptions?: SsrOptimizationOptions | undefined);
    protected logOptions(): void;
    /**
     * When SSR page can not be returned in time, we're returning index.html of
     * the CSR application.
     * The CSR application is returned with the "Cache-Control: no-store" response-header. This notifies external cache systems to not use the CSR application for the subsequent request.
     */
    protected fallbackToCsr(response: Response, filePath: string, callback: SsrCallbackFn): void;
    protected getRenderingKey(request: Request): string;
    protected getRenderingStrategy(request: Request): RenderingStrategy;
    /**
     * When returns true, the server side rendering should be performed.
     * When returns false, the CSR fallback should be returned.
     *
     * We should not render, when there is already
     * a pending rendering for the same rendering key
     * (unless the `reuseCurrentRendering` config option is enabled)
     * OR when the concurrency limit is exceeded.
     */
    protected shouldRender(request: Request): boolean;
    /**
     * Checks for the concurrency limit
     *
     * @returns true if rendering this request would exceed the concurrency limit
     */
    private isConcurrencyLimitExceeded;
    /**
     * Returns true, when the `timeout` option has been configured to non-zero value OR
     * when the rendering strategy for the given request is ALWAYS_SSR.
     * Otherwise, it returns false.
     */
    protected shouldTimeout(request: Request): boolean;
    /**
     * Returns the timeout value.
     *
     * In case of the rendering strategy ALWAYS_SSR, it returns the config `forcedSsrTimeout`.
     * Otherwise, it returns the config `timeout`.
     */
    protected getTimeout(request: Request): number;
    /**
     * If there is an available cached response for this rendering key,
     * it invokes the given render callback with the response and returns true.
     *
     * Otherwise, it returns false.
     */
    protected returnCachedRender(request: Request, callback: SsrCallbackFn): boolean;
    /**
     * Handles the request and invokes the given `callback` with the result html / error.
     *
     * The result might be ether:
     * - a CSR fallback with a basic `index.html` content
     * - a result rendered by the original Angular Universal express engine
     * - a result from the in-memory cache (which was previously rendered by Angular Universal express engine).
     */
    protected renderResponse(filePath: string, options: any, callback: SsrCallbackFn): void;
    protected log(message: string, debug?: boolean, context?: ExpressServerLoggerContext): void;
    /** Retrieve the document from the cache or the filesystem */
    protected getDocument(filePath: string): string;
    /**
     * Delegates the render to the original _Angular Universal express engine_.
     *
     * In case when the config `reuseCurrentRendering` is enabled and **if there is already a pending
     * render task for the same rendering key**, it doesn't delegate a new render to Angular Universal.
     * Instead, it waits for the current rendering to complete and then reuse the result for all waiting requests.
     */
    private handleRender;
    /**
     * Delegates the render to the original _Angular Universal express engine_.
     *
     * There is no way to abort the running render of Angular Universal.
     * So if the render doesn't complete in the configured `maxRenderTime`,
     * we just consider the render task as hanging (note: it's a potential memory leak!).
     * Later on, even if the render completes somewhen in the future, we will ignore
     * its result.
     */
    private startRender;
    private initLogger;
}
