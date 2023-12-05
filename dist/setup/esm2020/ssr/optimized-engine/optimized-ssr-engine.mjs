/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'fs';
import { getRequestUrl } from '../express-utils/express-request-url';
import { DefaultExpressServerLogger, EXPRESS_SERVER_LOGGER, LegacyExpressServerLogger, } from '../logger';
import { getLoggableSsrOptimizationOptions } from './get-loggable-ssr-optimization-options';
import { RenderingCache } from './rendering-cache';
import { preprocessRequestForLogger } from './request-context';
import { RenderingStrategy, defaultSsrOptimizationOptions, } from './ssr-optimization-options';
/**
 * Returns the full url for the given SSR Request.
 */
export const getDefaultRenderKey = getRequestUrl;
/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
export class OptimizedSsrEngine {
    get engineInstance() {
        return this.renderResponse.bind(this);
    }
    constructor(expressEngine, ssrOptions) {
        this.expressEngine = expressEngine;
        this.ssrOptions = ssrOptions;
        this.currentConcurrency = 0;
        this.renderingCache = new RenderingCache(this.ssrOptions);
        this.templateCache = new Map();
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
        this.renderCallbacks = new Map();
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
    logOptions() {
        if (!this.ssrOptions) {
            return;
        }
        const loggableSsrOptions = getLoggableSsrOptimizationOptions(this.ssrOptions);
        // This check has been introduced to avoid breaking changes. Remove it in Spartacus version 7.0
        if (this.ssrOptions.logger) {
            this.log(`[spartacus] SSR optimization engine initialized`, true, {
                options: loggableSsrOptions,
            });
        }
        else {
            const stringifiedOptions = JSON.stringify(loggableSsrOptions, null, 2);
            this.log(`[spartacus] SSR optimization engine initialized with the following options: ${stringifiedOptions}`, true);
        }
    }
    /**
     * When SSR page can not be returned in time, we're returning index.html of
     * the CSR application.
     * The CSR application is returned with the "Cache-Control: no-store" response-header. This notifies external cache systems to not use the CSR application for the subsequent request.
     */
    fallbackToCsr(response, filePath, callback) {
        response.set('Cache-Control', 'no-store');
        callback(undefined, this.getDocument(filePath));
    }
    getRenderingKey(request) {
        return this.ssrOptions?.renderKeyResolver
            ? this.ssrOptions.renderKeyResolver(request)
            : getDefaultRenderKey(request);
    }
    getRenderingStrategy(request) {
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
    shouldRender(request) {
        const renderingKey = this.getRenderingKey(request);
        const concurrencyLimitExceeded = this.isConcurrencyLimitExceeded(renderingKey);
        const fallBack = this.renderingCache.isRendering(renderingKey) &&
            !this.ssrOptions?.reuseCurrentRendering;
        if (fallBack) {
            this.log(`CSR fallback: rendering in progress (${request?.originalUrl})`, true, { request });
        }
        else if (concurrencyLimitExceeded) {
            this.log(`CSR fallback: Concurrency limit exceeded (${this.ssrOptions?.concurrency})`, true, { request });
        }
        return ((!fallBack &&
            !concurrencyLimitExceeded &&
            this.getRenderingStrategy(request) !== RenderingStrategy.ALWAYS_CSR) ||
            this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR);
    }
    /**
     * Checks for the concurrency limit
     *
     * @returns true if rendering this request would exceed the concurrency limit
     */
    isConcurrencyLimitExceeded(renderingKey) {
        // If we can reuse a pending render for this request, we don't take up a new concurrency slot.
        // In that case we don't exceed the concurrency limit even if the `currentConcurrency`
        // already reaches the limit.
        if (this.ssrOptions?.reuseCurrentRendering &&
            this.renderingCache.isRendering(renderingKey)) {
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
    shouldTimeout(request) {
        return (!!this.ssrOptions?.timeout ||
            this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR);
    }
    /**
     * Returns the timeout value.
     *
     * In case of the rendering strategy ALWAYS_SSR, it returns the config `forcedSsrTimeout`.
     * Otherwise, it returns the config `timeout`.
     */
    getTimeout(request) {
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
    returnCachedRender(request, callback) {
        const key = this.getRenderingKey(request);
        if (this.renderingCache.isReady(key)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    /**
     * Handles the request and invokes the given `callback` with the result html / error.
     *
     * The result might be ether:
     * - a CSR fallback with a basic `index.html` content
     * - a result rendered by the original Angular Universal express engine
     * - a result from the in-memory cache (which was previously rendered by Angular Universal express engine).
     */
    renderResponse(filePath, options, callback) {
        preprocessRequestForLogger(options.req, this.logger);
        const request = options.req;
        const response = options.req.res;
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
        let requestTimeout;
        if (this.shouldTimeout(request)) {
            // establish timeout for rendering
            const timeout = this.getTimeout(request);
            requestTimeout = setTimeout(() => {
                requestTimeout = undefined;
                this.fallbackToCsr(response, filePath, callback);
                this.log(`SSR rendering exceeded timeout ${timeout}, fallbacking to CSR for ${request?.originalUrl}`, false, { request });
            }, timeout);
        }
        else {
            // Here we respond with the fallback to CSR, but we don't `return`.
            // We let the actual rendering task to happen in the background
            // to eventually store the rendered result in the cache.
            this.fallbackToCsr(response, filePath, callback);
        }
        const renderingKey = this.getRenderingKey(request);
        const renderCallback = (err, html) => {
            if (requestTimeout) {
                // if request is still waiting for render, return it
                clearTimeout(requestTimeout);
                callback(err, html);
                this.log(`Request is resolved with the SSR rendering result (${request?.originalUrl})`, true, { request });
                // store the render only if caching is enabled
                if (this.ssrOptions?.cache) {
                    this.renderingCache.store(renderingKey, err, html);
                }
                else {
                    this.renderingCache.clear(renderingKey);
                }
            }
            else {
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
    log(message, debug = true, 
    //CXSPA-3680 - in a new major, let's make this argument required
    context) {
        if (debug || this.ssrOptions?.debug) {
            this.logger.log(message, context || {});
        }
    }
    /** Retrieve the document from the cache or the filesystem */
    getDocument(filePath) {
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
    handleRender({ filePath, options, renderCallback, request, }) {
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
        this.log(`Request is waiting for the SSR rendering to complete (${request?.originalUrl})`, true, { request });
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
    startRender({ filePath, options, renderCallback, request, }) {
        const renderingKey = this.getRenderingKey(request);
        // Setting the timeout for hanging renders that might not ever finish due to various reasons.
        // After the configured `maxRenderTime` passes, we consider the rendering task as hanging,
        // and release the concurrency slot and forget all callbacks waiting for the render's result.
        let maxRenderTimeout = setTimeout(() => {
            this.renderingCache.clear(renderingKey);
            maxRenderTimeout = undefined;
            this.currentConcurrency--;
            if (this.ssrOptions?.reuseCurrentRendering) {
                this.renderCallbacks.delete(renderingKey);
            }
            this.log(`Rendering of ${request?.originalUrl} was not able to complete. This might cause memory leaks!`, false, { request });
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
                this.log(`Rendering of ${request.originalUrl} completed after the specified maxRenderTime, therefore it was ignored.`, false, { request });
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
    initLogger(ssrOptions) {
        if (ssrOptions?.logger === true) {
            return new DefaultExpressServerLogger();
        }
        return ssrOptions?.logger || new LegacyExpressServerLogger();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW1pemVkLXNzci1lbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlLWxpYnMvc2V0dXAvc3NyL29wdGltaXplZC1lbmdpbmUvb3B0aW1pemVkLXNzci1lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLHFCQUFxQixFQUdyQix5QkFBeUIsR0FDMUIsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDNUYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsNkJBQTZCLEdBQzlCLE1BQU0sNEJBQTRCLENBQUM7QUFFcEM7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLENBQUM7QUFhakQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLGtCQUFrQjtJQWtCN0IsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFlBQ1ksYUFBc0MsRUFDdEMsVUFBbUM7UUFEbkMsa0JBQWEsR0FBYixhQUFhLENBQXlCO1FBQ3RDLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBdkJyQyx1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsbUJBQWMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkQsa0JBQWEsR0FBRyxJQUFJLEdBQUcsRUFB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O1lBQ1YsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTtpQkFDdEI7YUFDRjtTQUNGLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNyQixtRUFBbUU7Z0JBQ25FLElBQUksQ0FBQyxHQUFHLENBQ04sZ0JBQWdCLE9BQU8sQ0FBQyxXQUFXLHlFQUF5RSxFQUM1RyxLQUFLLEVBQ0wsRUFBRSxPQUFPLEVBQUUsQ0FDWixDQUFDO2dCQUNGLE9BQU87YUFDUjtZQUNELFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRS9CLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLE9BQU8sRUFBRSxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUU7Z0JBQzlELE9BQU87YUFDUixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUUxQixjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHdDQUF3QztJQUNoQyxVQUFVLENBQUMsVUFBOEM7UUFDL0QsSUFBSSxVQUFVLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRTtZQUMvQixPQUFPLElBQUksMEJBQTBCLEVBQUUsQ0FBQztTQUN6QztRQUNELE9BQU8sVUFBVSxFQUFFLE1BQU0sSUFBSSxJQUFJLHlCQUF5QixFQUFFLENBQUM7SUFDL0QsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqL1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IE5nRXhwcmVzc0VuZ2luZUluc3RhbmNlIH0gZnJvbSAnLi4vZW5naW5lLWRlY29yYXRvci9uZy1leHByZXNzLWVuZ2luZS1kZWNvcmF0b3InO1xuaW1wb3J0IHsgZ2V0UmVxdWVzdFVybCB9IGZyb20gJy4uL2V4cHJlc3MtdXRpbHMvZXhwcmVzcy1yZXF1ZXN0LXVybCc7XG5pbXBvcnQge1xuICBEZWZhdWx0RXhwcmVzc1NlcnZlckxvZ2dlcixcbiAgRVhQUkVTU19TRVJWRVJfTE9HR0VSLFxuICBFeHByZXNzU2VydmVyTG9nZ2VyLFxuICBFeHByZXNzU2VydmVyTG9nZ2VyQ29udGV4dCxcbiAgTGVnYWN5RXhwcmVzc1NlcnZlckxvZ2dlcixcbn0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IGdldExvZ2dhYmxlU3NyT3B0aW1pemF0aW9uT3B0aW9ucyB9IGZyb20gJy4vZ2V0LWxvZ2dhYmxlLXNzci1vcHRpbWl6YXRpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDYWNoZSB9IGZyb20gJy4vcmVuZGVyaW5nLWNhY2hlJztcbmltcG9ydCB7IHByZXByb2Nlc3NSZXF1ZXN0Rm9yTG9nZ2VyIH0gZnJvbSAnLi9yZXF1ZXN0LWNvbnRleHQnO1xuaW1wb3J0IHtcbiAgUmVuZGVyaW5nU3RyYXRlZ3ksXG4gIFNzck9wdGltaXphdGlvbk9wdGlvbnMsXG4gIGRlZmF1bHRTc3JPcHRpbWl6YXRpb25PcHRpb25zLFxufSBmcm9tICcuL3Nzci1vcHRpbWl6YXRpb24tb3B0aW9ucyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZnVsbCB1cmwgZm9yIHRoZSBnaXZlbiBTU1IgUmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRSZW5kZXJLZXkgPSBnZXRSZXF1ZXN0VXJsO1xuXG5leHBvcnQgdHlwZSBTc3JDYWxsYmFja0ZuID0gKFxuICAvKipcbiAgICogRXJyb3IgdGhhdCBtaWdodCd2ZSBvY2N1cnJlZCB3aGlsZSByZW5kZXJpbmcuXG4gICAqL1xuICBlcnI/OiBFcnJvciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIC8qKlxuICAgKiBIVE1MIHJlc3BvbnNlLlxuICAgKi9cbiAgaHRtbD86IHN0cmluZyB8IHVuZGVmaW5lZFxuKSA9PiB2b2lkO1xuXG4vKipcbiAqIFRoZSByZW5kZXJlZCBwYWdlcyBhcmUga2VwdCBpbiBtZW1vcnkgdG8gYmUgc2VydmVkIG9uIG5leHQgcmVxdWVzdC4gSWYgdGhlIGBjYWNoZWAgaXMgc2V0IHRvIGBmYWxzZWAsIHRoZVxuICogcmVzcG9uc2UgaXMgZXZpY3RlZCBhcyBzb29uIGFzIHRoZSBmaXJzdCBzdWNjZXNzZnVsIHJlc3BvbnNlIGlzIHN1Y2Nlc3NmdWxseSByZXR1cm5lZC5cbiAqL1xuZXhwb3J0IGNsYXNzIE9wdGltaXplZFNzckVuZ2luZSB7XG4gIHByb3RlY3RlZCBjdXJyZW50Q29uY3VycmVuY3kgPSAwO1xuICBwcm90ZWN0ZWQgcmVuZGVyaW5nQ2FjaGUgPSBuZXcgUmVuZGVyaW5nQ2FjaGUodGhpcy5zc3JPcHRpb25zKTtcbiAgcHJpdmF0ZSBsb2dnZXI6IEV4cHJlc3NTZXJ2ZXJMb2dnZXI7XG4gIHByaXZhdGUgdGVtcGxhdGVDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGNvbmZpZyBgcmV1c2VDdXJyZW50UmVuZGVyaW5nYCBpcyBlbmFibGVkLCB3ZSB3YW50IHBlcmZvcm1cbiAgICogb25seSBvbmUgcmVuZGVyIGZvciBvbmUgcmVuZGVyaW5nIGtleSBhbmQgcmV1c2UgdGhlIGh0bWwgcmVzdWx0XG4gICAqIGZvciBhbGwgdGhlIHBlbmRpbmcgcmVxdWVzdHMgZm9yIHRoZSBzYW1lIHJlbmRlcmluZyBrZXkuXG4gICAqIFRoZXJlZm9yZSB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBjYWxsYmFja3MgZm9yIGFsbCB0aGUgcGVuZGluZyByZXF1ZXN0c1xuICAgKiBhbmQgaW52b2tlIHRoZW0gd2l0aCB0aGUgaHRtbCBhZnRlciB0aGUgcmVuZGVyIGNvbXBsZXRlcy5cbiAgICpcbiAgICogVGhpcyBNYXAgc2hvdWxkIGJlIHVzZWQgb25seSB3aGVuIGByZXVzZUN1cnJlbnRSZW5kZXJpbmdgIGNvbmZpZyBpcyBlbmFibGVkLlxuICAgKiBJdCdzIGluZGV4ZWQgYnkgdGhlIHJlbmRlcmluZyBrZXlzLlxuICAgKi9cbiAgcHJpdmF0ZSByZW5kZXJDYWxsYmFja3MgPSBuZXcgTWFwPHN0cmluZywgU3NyQ2FsbGJhY2tGbltdPigpO1xuXG4gIGdldCBlbmdpbmVJbnN0YW5jZSgpOiBOZ0V4cHJlc3NFbmdpbmVJbnN0YW5jZSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyUmVzcG9uc2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBleHByZXNzRW5naW5lOiBOZ0V4cHJlc3NFbmdpbmVJbnN0YW5jZSxcbiAgICBwcm90ZWN0ZWQgc3NyT3B0aW9ucz86IFNzck9wdGltaXphdGlvbk9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5zc3JPcHRpb25zID0gc3NyT3B0aW9uc1xuICAgICAgPyB7XG4gICAgICAgICAgLi4uZGVmYXVsdFNzck9wdGltaXphdGlvbk9wdGlvbnMsXG4gICAgICAgICAgLy8gb3ZlcnJpZGVzIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAgICAgICAgICAuLi5zc3JPcHRpb25zLFxuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvZ2dlciA9IHRoaXMuaW5pdExvZ2dlcih0aGlzLnNzck9wdGlvbnMpO1xuICAgIHRoaXMubG9nT3B0aW9ucygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvZ09wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNzck9wdGlvbnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dnYWJsZVNzck9wdGlvbnMgPSBnZXRMb2dnYWJsZVNzck9wdGltaXphdGlvbk9wdGlvbnMoXG4gICAgICB0aGlzLnNzck9wdGlvbnNcbiAgICApO1xuXG4gICAgLy8gVGhpcyBjaGVjayBoYXMgYmVlbiBpbnRyb2R1Y2VkIHRvIGF2b2lkIGJyZWFraW5nIGNoYW5nZXMuIFJlbW92ZSBpdCBpbiBTcGFydGFjdXMgdmVyc2lvbiA3LjBcbiAgICBpZiAodGhpcy5zc3JPcHRpb25zLmxvZ2dlcikge1xuICAgICAgdGhpcy5sb2coYFtzcGFydGFjdXNdIFNTUiBvcHRpbWl6YXRpb24gZW5naW5lIGluaXRpYWxpemVkYCwgdHJ1ZSwge1xuICAgICAgICBvcHRpb25zOiBsb2dnYWJsZVNzck9wdGlvbnMsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gSlNPTi5zdHJpbmdpZnkobG9nZ2FibGVTc3JPcHRpb25zLCBudWxsLCAyKTtcbiAgICAgIHRoaXMubG9nKFxuICAgICAgICBgW3NwYXJ0YWN1c10gU1NSIG9wdGltaXphdGlvbiBlbmdpbmUgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZm9sbG93aW5nIG9wdGlvbnM6ICR7c3RyaW5naWZpZWRPcHRpb25zfWAsXG4gICAgICAgIHRydWVcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gU1NSIHBhZ2UgY2FuIG5vdCBiZSByZXR1cm5lZCBpbiB0aW1lLCB3ZSdyZSByZXR1cm5pbmcgaW5kZXguaHRtbCBvZlxuICAgKiB0aGUgQ1NSIGFwcGxpY2F0aW9uLlxuICAgKiBUaGUgQ1NSIGFwcGxpY2F0aW9uIGlzIHJldHVybmVkIHdpdGggdGhlIFwiQ2FjaGUtQ29udHJvbDogbm8tc3RvcmVcIiByZXNwb25zZS1oZWFkZXIuIFRoaXMgbm90aWZpZXMgZXh0ZXJuYWwgY2FjaGUgc3lzdGVtcyB0byBub3QgdXNlIHRoZSBDU1IgYXBwbGljYXRpb24gZm9yIHRoZSBzdWJzZXF1ZW50IHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgZmFsbGJhY2tUb0NzcihcbiAgICByZXNwb25zZTogUmVzcG9uc2UsXG4gICAgZmlsZVBhdGg6IHN0cmluZyxcbiAgICBjYWxsYmFjazogU3NyQ2FsbGJhY2tGblxuICApOiB2b2lkIHtcbiAgICByZXNwb25zZS5zZXQoJ0NhY2hlLUNvbnRyb2wnLCAnbm8tc3RvcmUnKTtcbiAgICBjYWxsYmFjayh1bmRlZmluZWQsIHRoaXMuZ2V0RG9jdW1lbnQoZmlsZVBhdGgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRSZW5kZXJpbmdLZXkocmVxdWVzdDogUmVxdWVzdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3NyT3B0aW9ucz8ucmVuZGVyS2V5UmVzb2x2ZXJcbiAgICAgID8gdGhpcy5zc3JPcHRpb25zLnJlbmRlcktleVJlc29sdmVyKHJlcXVlc3QpXG4gICAgICA6IGdldERlZmF1bHRSZW5kZXJLZXkocmVxdWVzdCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UmVuZGVyaW5nU3RyYXRlZ3kocmVxdWVzdDogUmVxdWVzdCk6IFJlbmRlcmluZ1N0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5zc3JPcHRpb25zPy5yZW5kZXJpbmdTdHJhdGVneVJlc29sdmVyXG4gICAgICA/IHRoaXMuc3NyT3B0aW9ucy5yZW5kZXJpbmdTdHJhdGVneVJlc29sdmVyKHJlcXVlc3QpXG4gICAgICA6IFJlbmRlcmluZ1N0cmF0ZWd5LkRFRkFVTFQ7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiByZXR1cm5zIHRydWUsIHRoZSBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcgc2hvdWxkIGJlIHBlcmZvcm1lZC5cbiAgICogV2hlbiByZXR1cm5zIGZhbHNlLCB0aGUgQ1NSIGZhbGxiYWNrIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICpcbiAgICogV2Ugc2hvdWxkIG5vdCByZW5kZXIsIHdoZW4gdGhlcmUgaXMgYWxyZWFkeVxuICAgKiBhIHBlbmRpbmcgcmVuZGVyaW5nIGZvciB0aGUgc2FtZSByZW5kZXJpbmcga2V5XG4gICAqICh1bmxlc3MgdGhlIGByZXVzZUN1cnJlbnRSZW5kZXJpbmdgIGNvbmZpZyBvcHRpb24gaXMgZW5hYmxlZClcbiAgICogT1Igd2hlbiB0aGUgY29uY3VycmVuY3kgbGltaXQgaXMgZXhjZWVkZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgc2hvdWxkUmVuZGVyKHJlcXVlc3Q6IFJlcXVlc3QpOiBib29sZWFuIHtcbiAgICBjb25zdCByZW5kZXJpbmdLZXkgPSB0aGlzLmdldFJlbmRlcmluZ0tleShyZXF1ZXN0KTtcbiAgICBjb25zdCBjb25jdXJyZW5jeUxpbWl0RXhjZWVkZWQgPVxuICAgICAgdGhpcy5pc0NvbmN1cnJlbmN5TGltaXRFeGNlZWRlZChyZW5kZXJpbmdLZXkpO1xuICAgIGNvbnN0IGZhbGxCYWNrID1cbiAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuaXNSZW5kZXJpbmcocmVuZGVyaW5nS2V5KSAmJlxuICAgICAgIXRoaXMuc3NyT3B0aW9ucz8ucmV1c2VDdXJyZW50UmVuZGVyaW5nO1xuXG4gICAgaWYgKGZhbGxCYWNrKSB7XG4gICAgICB0aGlzLmxvZyhcbiAgICAgICAgYENTUiBmYWxsYmFjazogcmVuZGVyaW5nIGluIHByb2dyZXNzICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgLFxuICAgICAgICB0cnVlLFxuICAgICAgICB7IHJlcXVlc3QgfVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGNvbmN1cnJlbmN5TGltaXRFeGNlZWRlZCkge1xuICAgICAgdGhpcy5sb2coXG4gICAgICAgIGBDU1IgZmFsbGJhY2s6IENvbmN1cnJlbmN5IGxpbWl0IGV4Y2VlZGVkICgke3RoaXMuc3NyT3B0aW9ucz8uY29uY3VycmVuY3l9KWAsXG4gICAgICAgIHRydWUsXG4gICAgICAgIHsgcmVxdWVzdCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAoIWZhbGxCYWNrICYmXG4gICAgICAgICFjb25jdXJyZW5jeUxpbWl0RXhjZWVkZWQgJiZcbiAgICAgICAgdGhpcy5nZXRSZW5kZXJpbmdTdHJhdGVneShyZXF1ZXN0KSAhPT0gUmVuZGVyaW5nU3RyYXRlZ3kuQUxXQVlTX0NTUikgfHxcbiAgICAgIHRoaXMuZ2V0UmVuZGVyaW5nU3RyYXRlZ3kocmVxdWVzdCkgPT09IFJlbmRlcmluZ1N0cmF0ZWd5LkFMV0FZU19TU1JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBmb3IgdGhlIGNvbmN1cnJlbmN5IGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIHRydWUgaWYgcmVuZGVyaW5nIHRoaXMgcmVxdWVzdCB3b3VsZCBleGNlZWQgdGhlIGNvbmN1cnJlbmN5IGxpbWl0XG4gICAqL1xuICBwcml2YXRlIGlzQ29uY3VycmVuY3lMaW1pdEV4Y2VlZGVkKHJlbmRlcmluZ0tleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gSWYgd2UgY2FuIHJldXNlIGEgcGVuZGluZyByZW5kZXIgZm9yIHRoaXMgcmVxdWVzdCwgd2UgZG9uJ3QgdGFrZSB1cCBhIG5ldyBjb25jdXJyZW5jeSBzbG90LlxuICAgIC8vIEluIHRoYXQgY2FzZSB3ZSBkb24ndCBleGNlZWQgdGhlIGNvbmN1cnJlbmN5IGxpbWl0IGV2ZW4gaWYgdGhlIGBjdXJyZW50Q29uY3VycmVuY3lgXG4gICAgLy8gYWxyZWFkeSByZWFjaGVzIHRoZSBsaW1pdC5cbiAgICBpZiAoXG4gICAgICB0aGlzLnNzck9wdGlvbnM/LnJldXNlQ3VycmVudFJlbmRlcmluZyAmJlxuICAgICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5pc1JlbmRlcmluZyhyZW5kZXJpbmdLZXkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3NyT3B0aW9ucz8uY29uY3VycmVuY3lcbiAgICAgID8gdGhpcy5jdXJyZW50Q29uY3VycmVuY3kgPj0gdGhpcy5zc3JPcHRpb25zLmNvbmN1cnJlbmN5XG4gICAgICA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSwgd2hlbiB0aGUgYHRpbWVvdXRgIG9wdGlvbiBoYXMgYmVlbiBjb25maWd1cmVkIHRvIG5vbi16ZXJvIHZhbHVlIE9SXG4gICAqIHdoZW4gdGhlIHJlbmRlcmluZyBzdHJhdGVneSBmb3IgdGhlIGdpdmVuIHJlcXVlc3QgaXMgQUxXQVlTX1NTUi5cbiAgICogT3RoZXJ3aXNlLCBpdCByZXR1cm5zIGZhbHNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHNob3VsZFRpbWVvdXQocmVxdWVzdDogUmVxdWVzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhIXRoaXMuc3NyT3B0aW9ucz8udGltZW91dCB8fFxuICAgICAgdGhpcy5nZXRSZW5kZXJpbmdTdHJhdGVneShyZXF1ZXN0KSA9PT0gUmVuZGVyaW5nU3RyYXRlZ3kuQUxXQVlTX1NTUlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGltZW91dCB2YWx1ZS5cbiAgICpcbiAgICogSW4gY2FzZSBvZiB0aGUgcmVuZGVyaW5nIHN0cmF0ZWd5IEFMV0FZU19TU1IsIGl0IHJldHVybnMgdGhlIGNvbmZpZyBgZm9yY2VkU3NyVGltZW91dGAuXG4gICAqIE90aGVyd2lzZSwgaXQgcmV0dXJucyB0aGUgY29uZmlnIGB0aW1lb3V0YC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRUaW1lb3V0KHJlcXVlc3Q6IFJlcXVlc3QpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldFJlbmRlcmluZ1N0cmF0ZWd5KHJlcXVlc3QpID09PSBSZW5kZXJpbmdTdHJhdGVneS5BTFdBWVNfU1NSXG4gICAgICA/IHRoaXMuc3NyT3B0aW9ucz8uZm9yY2VkU3NyVGltZW91dCA/PyA2MDAwMFxuICAgICAgOiB0aGlzLnNzck9wdGlvbnM/LnRpbWVvdXQgPz8gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGVyZSBpcyBhbiBhdmFpbGFibGUgY2FjaGVkIHJlc3BvbnNlIGZvciB0aGlzIHJlbmRlcmluZyBrZXksXG4gICAqIGl0IGludm9rZXMgdGhlIGdpdmVuIHJlbmRlciBjYWxsYmFjayB3aXRoIHRoZSByZXNwb25zZSBhbmQgcmV0dXJucyB0cnVlLlxuICAgKlxuICAgKiBPdGhlcndpc2UsIGl0IHJldHVybnMgZmFsc2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmV0dXJuQ2FjaGVkUmVuZGVyKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgY2FsbGJhY2s6IFNzckNhbGxiYWNrRm5cbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5nZXRSZW5kZXJpbmdLZXkocmVxdWVzdCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJpbmdDYWNoZS5pc1JlYWR5KGtleSkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBjb25zdCBjYWNoZWQgPSB0aGlzLnJlbmRlcmluZ0NhY2hlLmdldChrZXkpITtcbiAgICAgIGNhbGxiYWNrKGNhY2hlZC5lcnIsIGNhY2hlZC5odG1sKTtcblxuICAgICAgaWYgKCF0aGlzLnNzck9wdGlvbnM/LmNhY2hlKSB7XG4gICAgICAgIC8vIHdlIGRyb3AgY2FjaGVkIHJlbmRlcmluZyBpZiBjYWNoaW5nIGlzIGRpc2FibGVkXG4gICAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuY2xlYXIoa2V5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgcmVxdWVzdCBhbmQgaW52b2tlcyB0aGUgZ2l2ZW4gYGNhbGxiYWNrYCB3aXRoIHRoZSByZXN1bHQgaHRtbCAvIGVycm9yLlxuICAgKlxuICAgKiBUaGUgcmVzdWx0IG1pZ2h0IGJlIGV0aGVyOlxuICAgKiAtIGEgQ1NSIGZhbGxiYWNrIHdpdGggYSBiYXNpYyBgaW5kZXguaHRtbGAgY29udGVudFxuICAgKiAtIGEgcmVzdWx0IHJlbmRlcmVkIGJ5IHRoZSBvcmlnaW5hbCBBbmd1bGFyIFVuaXZlcnNhbCBleHByZXNzIGVuZ2luZVxuICAgKiAtIGEgcmVzdWx0IGZyb20gdGhlIGluLW1lbW9yeSBjYWNoZSAod2hpY2ggd2FzIHByZXZpb3VzbHkgcmVuZGVyZWQgYnkgQW5ndWxhciBVbml2ZXJzYWwgZXhwcmVzcyBlbmdpbmUpLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlbmRlclJlc3BvbnNlKFxuICAgIGZpbGVQYXRoOiBzdHJpbmcsXG4gICAgb3B0aW9uczogYW55LFxuICAgIGNhbGxiYWNrOiBTc3JDYWxsYmFja0ZuXG4gICk6IHZvaWQge1xuICAgIHByZXByb2Nlc3NSZXF1ZXN0Rm9yTG9nZ2VyKG9wdGlvbnMucmVxLCB0aGlzLmxvZ2dlcik7XG5cbiAgICBjb25zdCByZXF1ZXN0OiBSZXF1ZXN0ID0gb3B0aW9ucy5yZXE7XG4gICAgY29uc3QgcmVzcG9uc2U6IFJlc3BvbnNlID0gb3B0aW9ucy5yZXEucmVzO1xuXG4gICAgaWYgKHRoaXMucmV0dXJuQ2FjaGVkUmVuZGVyKHJlcXVlc3QsIGNhbGxiYWNrKSkge1xuICAgICAgdGhpcy5sb2coYFJlbmRlciBmcm9tIGNhY2hlICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgLCB0cnVlLCB7XG4gICAgICAgIHJlcXVlc3QsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcihyZXF1ZXN0KSkge1xuICAgICAgdGhpcy5mYWxsYmFja1RvQ3NyKHJlc3BvbnNlLCBmaWxlUGF0aCwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCByZXF1ZXN0VGltZW91dDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuc2hvdWxkVGltZW91dChyZXF1ZXN0KSkge1xuICAgICAgLy8gZXN0YWJsaXNoIHRpbWVvdXQgZm9yIHJlbmRlcmluZ1xuICAgICAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dChyZXF1ZXN0KTtcbiAgICAgIHJlcXVlc3RUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlcXVlc3RUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmZhbGxiYWNrVG9Dc3IocmVzcG9uc2UsIGZpbGVQYXRoLCBjYWxsYmFjayk7XG4gICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgIGBTU1IgcmVuZGVyaW5nIGV4Y2VlZGVkIHRpbWVvdXQgJHt0aW1lb3V0fSwgZmFsbGJhY2tpbmcgdG8gQ1NSIGZvciAke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfWAsXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgeyByZXF1ZXN0IH1cbiAgICAgICAgKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIZXJlIHdlIHJlc3BvbmQgd2l0aCB0aGUgZmFsbGJhY2sgdG8gQ1NSLCBidXQgd2UgZG9uJ3QgYHJldHVybmAuXG4gICAgICAvLyBXZSBsZXQgdGhlIGFjdHVhbCByZW5kZXJpbmcgdGFzayB0byBoYXBwZW4gaW4gdGhlIGJhY2tncm91bmRcblxuICAgICAgLy8gdG8gZXZlbnR1YWxseSBzdG9yZSB0aGUgcmVuZGVyZWQgcmVzdWx0IGluIHRoZSBjYWNoZS5cbiAgICAgIHRoaXMuZmFsbGJhY2tUb0NzcihyZXNwb25zZSwgZmlsZVBhdGgsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJpbmdLZXkgPSB0aGlzLmdldFJlbmRlcmluZ0tleShyZXF1ZXN0KTtcbiAgICBjb25zdCByZW5kZXJDYWxsYmFjazogU3NyQ2FsbGJhY2tGbiA9IChlcnIsIGh0bWwpOiB2b2lkID0+IHtcbiAgICAgIGlmIChyZXF1ZXN0VGltZW91dCkge1xuICAgICAgICAvLyBpZiByZXF1ZXN0IGlzIHN0aWxsIHdhaXRpbmcgZm9yIHJlbmRlciwgcmV0dXJuIGl0XG4gICAgICAgIGNsZWFyVGltZW91dChyZXF1ZXN0VGltZW91dCk7XG4gICAgICAgIGNhbGxiYWNrKGVyciwgaHRtbCk7XG5cbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgYFJlcXVlc3QgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgU1NSIHJlbmRlcmluZyByZXN1bHQgKCR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9KWAsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICB7IHJlcXVlc3QgfVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHN0b3JlIHRoZSByZW5kZXIgb25seSBpZiBjYWNoaW5nIGlzIGVuYWJsZWRcbiAgICAgICAgaWYgKHRoaXMuc3NyT3B0aW9ucz8uY2FjaGUpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmluZ0NhY2hlLnN0b3JlKHJlbmRlcmluZ0tleSwgZXJyLCBodG1sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmluZ0NhY2hlLmNsZWFyKHJlbmRlcmluZ0tleSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN0b3JlIHRoZSByZW5kZXIgZm9yIGZ1dHVyZSB1c2VcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5zdG9yZShyZW5kZXJpbmdLZXksIGVyciwgaHRtbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlUmVuZGVyKHtcbiAgICAgIGZpbGVQYXRoLFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHJlbmRlckNhbGxiYWNrLFxuICAgICAgcmVxdWVzdCxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2coXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGRlYnVnID0gdHJ1ZSxcbiAgICAvL0NYU1BBLTM2ODAgLSBpbiBhIG5ldyBtYWpvciwgbGV0J3MgbWFrZSB0aGlzIGFyZ3VtZW50IHJlcXVpcmVkXG4gICAgY29udGV4dD86IEV4cHJlc3NTZXJ2ZXJMb2dnZXJDb250ZXh0XG4gICk6IHZvaWQge1xuICAgIGlmIChkZWJ1ZyB8fCB0aGlzLnNzck9wdGlvbnM/LmRlYnVnKSB7XG4gICAgICB0aGlzLmxvZ2dlci5sb2cobWVzc2FnZSwgY29udGV4dCB8fCB7fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJldHJpZXZlIHRoZSBkb2N1bWVudCBmcm9tIHRoZSBjYWNoZSBvciB0aGUgZmlsZXN5c3RlbSAqL1xuICBwcm90ZWN0ZWQgZ2V0RG9jdW1lbnQoZmlsZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IGRvYyA9IHRoaXMudGVtcGxhdGVDYWNoZS5nZXQoZmlsZVBhdGgpO1xuXG4gICAgaWYgKCFkb2MpIHtcbiAgICAgIGRvYyA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgJ3V0Zi04Jyk7XG4gICAgICB0aGlzLnRlbXBsYXRlQ2FjaGUuc2V0KGZpbGVQYXRoLCBkb2MpO1xuICAgIH1cblxuICAgIHJldHVybiBkb2M7XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGVzIHRoZSByZW5kZXIgdG8gdGhlIG9yaWdpbmFsIF9Bbmd1bGFyIFVuaXZlcnNhbCBleHByZXNzIGVuZ2luZV8uXG4gICAqXG4gICAqIEluIGNhc2Ugd2hlbiB0aGUgY29uZmlnIGByZXVzZUN1cnJlbnRSZW5kZXJpbmdgIGlzIGVuYWJsZWQgYW5kICoqaWYgdGhlcmUgaXMgYWxyZWFkeSBhIHBlbmRpbmdcbiAgICogcmVuZGVyIHRhc2sgZm9yIHRoZSBzYW1lIHJlbmRlcmluZyBrZXkqKiwgaXQgZG9lc24ndCBkZWxlZ2F0ZSBhIG5ldyByZW5kZXIgdG8gQW5ndWxhciBVbml2ZXJzYWwuXG4gICAqIEluc3RlYWQsIGl0IHdhaXRzIGZvciB0aGUgY3VycmVudCByZW5kZXJpbmcgdG8gY29tcGxldGUgYW5kIHRoZW4gcmV1c2UgdGhlIHJlc3VsdCBmb3IgYWxsIHdhaXRpbmcgcmVxdWVzdHMuXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZVJlbmRlcih7XG4gICAgZmlsZVBhdGgsXG4gICAgb3B0aW9ucyxcbiAgICByZW5kZXJDYWxsYmFjayxcbiAgICByZXF1ZXN0LFxuICB9OiB7XG4gICAgZmlsZVBhdGg6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnk7XG4gICAgcmVuZGVyQ2FsbGJhY2s6IFNzckNhbGxiYWNrRm47XG4gICAgcmVxdWVzdDogUmVxdWVzdDtcbiAgfSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zc3JPcHRpb25zPy5yZXVzZUN1cnJlbnRSZW5kZXJpbmcpIHtcbiAgICAgIHRoaXMuc3RhcnRSZW5kZXIoe1xuICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcmVuZGVyQ2FsbGJhY2ssXG4gICAgICAgIHJlcXVlc3QsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJpbmdLZXkgPSB0aGlzLmdldFJlbmRlcmluZ0tleShyZXF1ZXN0KTtcbiAgICBpZiAoIXRoaXMucmVuZGVyQ2FsbGJhY2tzLmhhcyhyZW5kZXJpbmdLZXkpKSB7XG4gICAgICB0aGlzLnJlbmRlckNhbGxiYWNrcy5zZXQocmVuZGVyaW5nS2V5LCBbXSk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyQ2FsbGJhY2tzLmdldChyZW5kZXJpbmdLZXkpPy5wdXNoKHJlbmRlckNhbGxiYWNrKTtcblxuICAgIGlmICghdGhpcy5yZW5kZXJpbmdDYWNoZS5pc1JlbmRlcmluZyhyZW5kZXJpbmdLZXkpKSB7XG4gICAgICB0aGlzLnN0YXJ0UmVuZGVyKHtcbiAgICAgICAgZmlsZVBhdGgsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHJlcXVlc3QsXG4gICAgICAgIHJlbmRlckNhbGxiYWNrOiAoZXJyLCBodG1sKSA9PiB7XG4gICAgICAgICAgLy8gU2hhcmUgdGhlIHJlc3VsdCBvZiB0aGUgcmVuZGVyIHdpdGggYWxsIGF3YWl0aW5nIHJlcXVlc3RzIGZvciB0aGUgc2FtZSBrZXk6XG5cbiAgICAgICAgICAvLyBOb3RlOiB3ZSBhY2Nlc3MgdGhlIE1hcCBhdCB0aGUgbW9tZW50IG9mIHRoZSByZW5kZXIgZmluaXNoZWQgKGRvbid0IHN0b3JlIHZhbHVlIGluIGEgbG9jYWwgdmFyaWFibGUpLFxuICAgICAgICAgIC8vICAgICAgIGJlY2F1c2UgaW4gdGhlIG1lYW50aW1lIHNvbWV0aGluZyBtaWdodCBoYXZlIGRlbGV0ZWQgdGhlIHZhbHVlIChpLmUuIHdoZW4gYG1heFJlbmRlclRpbWVgIHBhc3NlZCkuXG4gICAgICAgICAgdGhpcy5yZW5kZXJDYWxsYmFja3NcbiAgICAgICAgICAgIC5nZXQocmVuZGVyaW5nS2V5KVxuICAgICAgICAgICAgPy5mb3JFYWNoKChjYikgPT4gY2IoZXJyLCBodG1sKSk7IC8vIHBhc3MgdGhlIHNoYXJlZCByZXN1bHQgdG8gYWxsIHdhaXRpbmcgcmVuZGVyaW5nIGNhbGxiYWNrc1xuICAgICAgICAgIHRoaXMucmVuZGVyQ2FsbGJhY2tzLmRlbGV0ZShyZW5kZXJpbmdLZXkpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2coXG4gICAgICBgUmVxdWVzdCBpcyB3YWl0aW5nIGZvciB0aGUgU1NSIHJlbmRlcmluZyB0byBjb21wbGV0ZSAoJHtyZXF1ZXN0Py5vcmlnaW5hbFVybH0pYCxcbiAgICAgIHRydWUsXG4gICAgICB7IHJlcXVlc3QgfVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZWdhdGVzIHRoZSByZW5kZXIgdG8gdGhlIG9yaWdpbmFsIF9Bbmd1bGFyIFVuaXZlcnNhbCBleHByZXNzIGVuZ2luZV8uXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIHdheSB0byBhYm9ydCB0aGUgcnVubmluZyByZW5kZXIgb2YgQW5ndWxhciBVbml2ZXJzYWwuXG4gICAqIFNvIGlmIHRoZSByZW5kZXIgZG9lc24ndCBjb21wbGV0ZSBpbiB0aGUgY29uZmlndXJlZCBgbWF4UmVuZGVyVGltZWAsXG4gICAqIHdlIGp1c3QgY29uc2lkZXIgdGhlIHJlbmRlciB0YXNrIGFzIGhhbmdpbmcgKG5vdGU6IGl0J3MgYSBwb3RlbnRpYWwgbWVtb3J5IGxlYWshKS5cbiAgICogTGF0ZXIgb24sIGV2ZW4gaWYgdGhlIHJlbmRlciBjb21wbGV0ZXMgc29tZXdoZW4gaW4gdGhlIGZ1dHVyZSwgd2Ugd2lsbCBpZ25vcmVcbiAgICogaXRzIHJlc3VsdC5cbiAgICovXG4gIHByaXZhdGUgc3RhcnRSZW5kZXIoe1xuICAgIGZpbGVQYXRoLFxuICAgIG9wdGlvbnMsXG4gICAgcmVuZGVyQ2FsbGJhY2ssXG4gICAgcmVxdWVzdCxcbiAgfToge1xuICAgIGZpbGVQYXRoOiBzdHJpbmc7XG4gICAgb3B0aW9uczogYW55O1xuICAgIHJlbmRlckNhbGxiYWNrOiBTc3JDYWxsYmFja0ZuO1xuICAgIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIH0pOiB2b2lkIHtcbiAgICBjb25zdCByZW5kZXJpbmdLZXkgPSB0aGlzLmdldFJlbmRlcmluZ0tleShyZXF1ZXN0KTtcblxuICAgIC8vIFNldHRpbmcgdGhlIHRpbWVvdXQgZm9yIGhhbmdpbmcgcmVuZGVycyB0aGF0IG1pZ2h0IG5vdCBldmVyIGZpbmlzaCBkdWUgdG8gdmFyaW91cyByZWFzb25zLlxuICAgIC8vIEFmdGVyIHRoZSBjb25maWd1cmVkIGBtYXhSZW5kZXJUaW1lYCBwYXNzZXMsIHdlIGNvbnNpZGVyIHRoZSByZW5kZXJpbmcgdGFzayBhcyBoYW5naW5nLFxuICAgIC8vIGFuZCByZWxlYXNlIHRoZSBjb25jdXJyZW5jeSBzbG90IGFuZCBmb3JnZXQgYWxsIGNhbGxiYWNrcyB3YWl0aW5nIGZvciB0aGUgcmVuZGVyJ3MgcmVzdWx0LlxuICAgIGxldCBtYXhSZW5kZXJUaW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZCA9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5jbGVhcihyZW5kZXJpbmdLZXkpO1xuICAgICAgICBtYXhSZW5kZXJUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmN1cnJlbnRDb25jdXJyZW5jeS0tO1xuICAgICAgICBpZiAodGhpcy5zc3JPcHRpb25zPy5yZXVzZUN1cnJlbnRSZW5kZXJpbmcpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlckNhbGxiYWNrcy5kZWxldGUocmVuZGVyaW5nS2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICBgUmVuZGVyaW5nIG9mICR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9IHdhcyBub3QgYWJsZSB0byBjb21wbGV0ZS4gVGhpcyBtaWdodCBjYXVzZSBtZW1vcnkgbGVha3MhYCxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICB7IHJlcXVlc3QgfVxuICAgICAgICApO1xuICAgICAgfSwgdGhpcy5zc3JPcHRpb25zPy5tYXhSZW5kZXJUaW1lID8/IDMwMDAwMCk7IC8vIDMwMDAwMG1zID09IDUgbWludXRlc1xuXG4gICAgdGhpcy5sb2coYFJlbmRlcmluZyBzdGFydGVkICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgLCB0cnVlLCB7IHJlcXVlc3QgfSk7XG4gICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5zZXRBc1JlbmRlcmluZyhyZW5kZXJpbmdLZXkpO1xuICAgIHRoaXMuY3VycmVudENvbmN1cnJlbmN5Kys7XG5cbiAgICBvcHRpb25zID0ge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRVhQUkVTU19TRVJWRVJfTE9HR0VSLFxuICAgICAgICAgIHVzZVZhbHVlOiB0aGlzLmxvZ2dlcixcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcblxuICAgIHRoaXMuZXhwcmVzc0VuZ2luZShmaWxlUGF0aCwgb3B0aW9ucywgKGVyciwgaHRtbCkgPT4ge1xuICAgICAgaWYgKCFtYXhSZW5kZXJUaW1lb3V0KSB7XG4gICAgICAgIC8vIGlnbm9yZSB0aGlzIHJlbmRlcidzIHJlc3VsdCBiZWNhdXNlIGl0IGV4Y2VlZGVkIG1heFJlbmRlclRpbWVvdXRcbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgYFJlbmRlcmluZyBvZiAke3JlcXVlc3Qub3JpZ2luYWxVcmx9IGNvbXBsZXRlZCBhZnRlciB0aGUgc3BlY2lmaWVkIG1heFJlbmRlclRpbWUsIHRoZXJlZm9yZSBpdCB3YXMgaWdub3JlZC5gLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgIHsgcmVxdWVzdCB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNsZWFyVGltZW91dChtYXhSZW5kZXJUaW1lb3V0KTtcblxuICAgICAgdGhpcy5sb2coYFJlbmRlcmluZyBjb21wbGV0ZWQgKCR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9KWAsIHRydWUsIHtcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jdXJyZW50Q29uY3VycmVuY3ktLTtcblxuICAgICAgcmVuZGVyQ2FsbGJhY2soZXJyLCBodG1sKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vQ1hTUEEtMzY4MCAtIHJlbW92ZSB0aGlzIG1ldGhvZCBpbiA3LjBcbiAgcHJpdmF0ZSBpbml0TG9nZ2VyKHNzck9wdGlvbnM6IFNzck9wdGltaXphdGlvbk9wdGlvbnMgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAoc3NyT3B0aW9ucz8ubG9nZ2VyID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbmV3IERlZmF1bHRFeHByZXNzU2VydmVyTG9nZ2VyKCk7XG4gICAgfVxuICAgIHJldHVybiBzc3JPcHRpb25zPy5sb2dnZXIgfHwgbmV3IExlZ2FjeUV4cHJlc3NTZXJ2ZXJMb2dnZXIoKTtcbiAgfVxufVxuIl19