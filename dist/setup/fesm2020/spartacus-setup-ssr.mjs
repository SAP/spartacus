import * as fs from 'fs';
import * as i0 from '@angular/core';
import { isDevMode, InjectionToken, inject, Injectable } from '@angular/core';
import { randomUUID } from 'crypto';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { formatWithOptions } from 'util';
import { LoggerService, SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { INITIAL_CONFIG } from '@angular/platform-server';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getRequestOrigin(req) {
    // If express is resolving and trusting X-Forwarded-Host, we want to take it
    // into an account to properly generate request origin.
    const trustProxyFn = req.app.get('trust proxy fn');
    let forwardedHost = req.get('X-Forwarded-Host');
    if (forwardedHost && trustProxyFn(req.connection.remoteAddress, 0)) {
        if (forwardedHost.indexOf(',') !== -1) {
            // Note: X-Forwarded-Host is normally only ever a
            //       single value, but this is to be safe.
            forwardedHost = forwardedHost
                .substring(0, forwardedHost.indexOf(','))
                .trimRight();
        }
        return `${req.protocol}://${forwardedHost}`;
    }
    else {
        return `${req.protocol}://${req.get('host')}`;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getRequestUrl(req) {
    return getRequestOrigin(req) + req.originalUrl;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Error thrown when the traceparent header has an invalid format.
 */
class InvalidTraceparentFormatError extends Error {
    constructor() {
        super('Traceparent header has invalid format.');
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Error thrown when the traceparent header has an invalid length.
 * @param traceparentLength The length of the traceparent header.
 */
class InvalidTraceparentLengthError extends Error {
    constructor(traceparentLength) {
        super(`Traceparent header has invalid length: ${traceparentLength}. Expected 55 characters.`);
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const HEXDIGLC = '[0-9a-f]'; // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
const VERSION = HEXDIGLC + '{2}'; // 2 HEXDIGLC
const TRACE_ID = HEXDIGLC + '{32}'; // 32 HEXDIGLC
const PARENT_ID = HEXDIGLC + '{16}'; // 16 HEXDIGLC
const TRACE_FLAGS = HEXDIGLC + '{2}'; // 2 HEXDIGLC
const TRACEPARENT = [VERSION, TRACE_ID, PARENT_ID, TRACE_FLAGS].join('-'); // separated by dashes
const traceparentPattern = new RegExp('^' + TRACEPARENT + '$');
/**
 * Maps traceparent header to object with properties version, traceId, spanId and traceFlags.
 * Since `traceparent` header may be not attached to the request, the function returns undefined if the header is not provided.
 * If the header is provided but has invalid format or length, the function throws an error.
 *
 * @param traceparent
 * @returns Params of the traceparent header.
 *
 * @see https://www.w3.org/TR/trace-context/#traceparent-header-field-values
 */
function parseTraceparent(traceparent) {
    if (typeof traceparent !== 'string') {
        return undefined;
    }
    if (traceparent.length !== 55) {
        throw new InvalidTraceparentLengthError(traceparent.length);
    }
    if (!traceparentPattern.test(traceparent)) {
        throw new InvalidTraceparentFormatError();
    }
    const [version, traceId, parentId, traceFlags] = traceparent.split('-');
    return { version, traceId, parentId, traceFlags };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns the request context from the request object.
 * @param request - the request object
 * @returns the context of the request
 */
const getRequestContext = (request) => {
    return request.res?.locals?.cx?.request;
};
/**
 * Prepares and updates a request with the context object, which is used to enrich the logs.
 * It contains the random request's UUID, time of receiving the context and the W3C Trace Context (if available).
 * The trace context is parsed from the `traceparent` header, which is specified in
 * the "W3C TraceContext" document. See https://www.w3.org/TR/trace-context/#traceparent-header
 * for more details.
 * @param request - the request object
 * @param logger - the ExpressServerLogger object. It is used to log the error if occurred during parsing traceparent header
 * @returns the context of the request and error if occurred during parsing traceparent header
 */
const preprocessRequestForLogger = (request, logger) => {
    const requestContext = {
        ...createInitialRequestContext(),
        traceContext: getTraceContext(request, logger),
    };
    setRequestContext(request, requestContext);
};
/**
 * Updates the request object with the request context.
 * @param request - the request object
 * @param context - the context of the request
 */
const setRequestContext = (request, context) => {
    if (request.res) {
        request.res.locals = {
            ...request.res.locals,
            cx: {
                ...request.res.locals.cx,
                request: context,
            },
        };
    }
};
/**
 * Creates the initial request context to the request object.
 * @param request - the request object
 * @returns object with a randomly generated UUID and the current time
 */
const createInitialRequestContext = () => {
    const requestContext = {
        uuid: randomUUID(),
        timeReceived: new Date().toISOString(),
    };
    return requestContext;
};
/**
 * Parses the `traceparent` header and returns an object with the W3C TraceContext.
 * In case when the `traceparent` header is absent or invalid, `undefined` value is returned.
 * @param request - the request object
 * @param logger - the logger object
 *
 */
const getTraceContext = (request, logger) => {
    try {
        return parseTraceparent(request.get('traceparent')) ?? undefined;
    }
    catch (e) {
        const error = e instanceof Error
            ? e
            : new Error('Unexpected error during parsing traceparent header');
        logger.error(error.message, { request });
    }
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 *
 * Default logger used in SSR (ExpressJS) to enhance logs visible e.g. in monitoring tools e.g. Kibana.
 * It outputs a JSON with properties "message" and "context",
 * which contains a "timestamp" and details of the "request" ("url", "uuid", "timeReceived")
 *
 * The output "context" JSON will contain also a property "traceContext"
 * with "traceId", "parentId", "version" and "traceFlags",
 * if only the given request has the special header "traceparent" (specifed in
 * the "W3C TraceContext" document. See https://www.w3.org/TR/trace-context/#traceparent-header ).
 */
class DefaultExpressServerLogger {
    log(message, context) {
        /* eslint-disable-next-line no-console */
        console.log(this.stringifyWithContext(message, context));
    }
    warn(message, context) {
        /* eslint-disable-next-line no-console */
        console.warn(this.stringifyWithContext(message, context));
    }
    error(message, context) {
        /* eslint-disable-next-line no-console */
        console.error(this.stringifyWithContext(message, context));
    }
    info(message, context) {
        /* eslint-disable-next-line no-console */
        console.info(this.stringifyWithContext(message, context));
    }
    debug(message, context) {
        /* eslint-disable-next-line no-console */
        console.debug(this.stringifyWithContext(message, context));
    }
    /**
     * Converts a message and an ExpressServerLoggerContext object into a single JSON string containing both pieces of information, which can be used for logging purposes.
     *
     * @protected
     * @param message - The message to be included in the log entry.
     * @param context - The context object associated with the log entry.
     * @returns A JSON string containing both the message and context information, suitable for logging.
     */
    stringifyWithContext(message, context) {
        const logObject = { message, context: this.mapContext(context) };
        return isDevMode()
            ? JSON.stringify(logObject, null, 2)
            : JSON.stringify(logObject);
    }
    /**
     * Map the context for the ExpressServerLogger
     *
     * @protected
     * @param context - The logging context object to be mapped
     * @returns - The mapped context with timestamp and request (if available)
     */
    mapContext(context) {
        const timestamp = new Date().toISOString();
        const outputContext = { timestamp, ...context };
        if (context.request) {
            Object.assign(outputContext, {
                request: this.mapRequest(context.request),
            });
        }
        return outputContext;
    }
    /**
     * Maps a Request object into a JavaScript object with specific properties.
     *
     * @protected
     * @param request - An Express Request object.
     * @returns - A mapped request object. By default, it contains only "url", a random "uuid" and "timeReceived" of the request.
     */
    mapRequest(request) {
        return {
            url: request.originalUrl,
            ...getRequestContext(request),
        };
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Injection token for ExpressServerLogger used for log message in server side rendering.
 * EXPRESS_SERVER_LOGGER is used to provide proper logger to LoggerService instance.
 *
 * Spartacus is providing two types of server loggers:
 * - DefaultExpressServerLogger - default implementation used for logging contextual messages in SSR.
 * - LegacyExpressServerLogger - used for logging if contextual logging is disabled
 *
 */
const EXPRESS_SERVER_LOGGER = new InjectionToken('EXPRESS_SERVER_LOGGER');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @deprecated since 6.2, will be removed in a new major version, as contextual logging will be enabled by default.
 * Default implementation of `ExpressServerLogger` that just delegates log messages to the native `console` object without providing any context.
 * It's used when contextual logging is disabled.
 *
 *
 */
//CXSPA-3680 - remove this class in 7.0
class LegacyExpressServerLogger {
    log(message, _context) {
        /* eslint-disable-next-line no-console */
        console.log(message);
    }
    warn(message, _context) {
        /* eslint-disable-next-line no-console */
        console.warn(message);
    }
    error(message, _context) {
        /* eslint-disable-next-line no-console */
        console.error(message);
    }
    info(message, _context) {
        /* eslint-disable-next-line no-console */
        console.info(message);
    }
    debug(message, _context) {
        /* eslint-disable-next-line no-console */
        console.debug(message);
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Custom `LoggerService` used in ExpressJS.
 *
 * It converts the input arguments to a final string message similar as the native `console`
 * does (using the native function `format` from `node:util`) and passes this message
 * to a concrete server logger, used in ExpressJS.
 *
 * Besides the message, it also passes the current `request` of ExpressJS as an additional
 * context to the concrete server logger.
 */
class ExpressLoggerService {
    constructor() {
        this.request = inject(REQUEST);
        this.serverLogger = inject(EXPRESS_SERVER_LOGGER);
    }
    log(...args) {
        this.serverLogger.log(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    warn(...args) {
        this.serverLogger.warn(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    error(...args) {
        this.serverLogger.error(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    info(...args) {
        this.serverLogger.info(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    debug(...args) {
        this.serverLogger.debug(this.formatLogMessage(...args), {
            request: this.request,
        });
    }
    formatLogMessage(message, ...optionalParams) {
        return formatWithOptions(
        // Prevent automatically breaking a long string message into multiple lines.
        // Otherwise, multi-line logs would be treated on the server as separate log
        { breakLength: Infinity }, message, ...optionalParams);
    }
}
ExpressLoggerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExpressLoggerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ExpressLoggerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExpressLoggerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExpressLoggerService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Custom `LoggerService` used in pre-rendering in the server environment.
 *
 * It simply forwards the arguments to the native `console` methods.
 */
class PrerenderingLoggerService extends LoggerService {
    log(...args) {
        /* eslint-disable-next-line no-console */
        console.log(...args);
    }
    warn(...args) {
        /* eslint-disable-next-line no-console */
        console.warn(...args);
    }
    error(...args) {
        /* eslint-disable-next-line no-console */
        console.error(...args);
    }
    info(...args) {
        /* eslint-disable-next-line no-console */
        console.info(...args);
    }
    debug(...args) {
        /* eslint-disable-next-line no-console */
        console.debug(...args);
    }
}
PrerenderingLoggerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PrerenderingLoggerService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
PrerenderingLoggerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PrerenderingLoggerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PrerenderingLoggerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const serverLoggerServiceFactory = () => {
    const isExpress = inject(REQUEST, { optional: true }) !== null;
    return isExpress
        ? inject(ExpressLoggerService)
        : inject(PrerenderingLoggerService);
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Helper function that maps optimization options to primitive values.
 * This is useful for logging and monitoring purposes.
 *
 * @param value optimization options that should be logged
 * @returns options containing only primitive values that are easier to read by developers and monitoring tools
 */
const getLoggableSsrOptimizationOptions = (value) => {
    const newValue = { ...value };
    Object.keys(value).forEach((key) => {
        if (isClassInstance(newValue[key])) {
            newValue[key] = newValue[key].constructor?.name;
        }
        if (typeof newValue[key] === 'function') {
            newValue[key] = newValue[key].toString();
        }
    });
    return newValue;
};
/**
 * Checks if the given value is a class instance,
 * but not a plain Object.
 *
 * @private
 */
const isClassInstance = (value) => {
    return typeof value === 'object' && value.constructor !== Object;
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RenderingCache {
    constructor(options) {
        this.options = options;
        this.renders = new Map();
    }
    setAsRendering(key) {
        this.renders.set(key, { rendering: true });
    }
    isRendering(key) {
        return !!this.renders.get(key)?.rendering;
    }
    store(key, err, html) {
        const entry = { err, html };
        if (this.options?.ttl) {
            entry.time = Date.now();
        }
        if (this.options?.cacheSize) {
            this.renders.delete(key);
            if (this.renders.size >= this.options.cacheSize) {
                this.renders.delete(this.renders.keys().next().value);
            }
        }
        this.renders.set(key, entry);
    }
    get(key) {
        return this.renders.get(key);
    }
    clear(key) {
        this.renders.delete(key);
    }
    isReady(key) {
        const entry = this.renders.get(key);
        const isRenderPresent = entry?.html || entry?.err;
        return isRenderPresent && this.isFresh(key);
    }
    isFresh(key) {
        if (!this.options?.ttl) {
            return true;
        }
        return Date.now() - (this.renders.get(key)?.time ?? 0) < this.options?.ttl;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const hasExcludedParams = (request, excludedParams) => {
    const params = request.query
        ? Object.getOwnPropertyNames(request.query)
        : [];
    if (!excludedParams) {
        return false;
    }
    return excludedParams.some((excludedParam) => params.some((param) => excludedParam === param));
};
const hasExcludedUrl = (request, excludedUrls) => {
    return request.url && excludedUrls
        ? excludedUrls.some((url) => request.url.search(url) > -1)
        : false;
};
const shouldFallbackToCsr = (request, { excludedParams, excludedUrls }) => {
    return (hasExcludedParams(request, excludedParams) ||
        hasExcludedUrl(request, excludedUrls));
};
/**
 * Creates a rendering strategy resolver function with the specified options.
 *
 * @function
 * @param  options - The options to configure the rendering strategy resolver.
 * @param [options.excludedUrls] - An optional array of URLs for which server-side rendering (SSR) should be disabled.
 * @param [options.excludedParams] - An optional array of Query parameters for which SSR should be disabled.
 * @returns A rendering strategy resolver function that takes a Request object
 * as a parameter and returns the rendering strategy to be applied for the request, which can be either
 * `RenderingStrategy.ALWAYS_CSR` or `RenderingStrategy.DEFAULT`.
 */
const defaultRenderingStrategyResolver = (options) => (request) => {
    return shouldFallbackToCsr(request, options)
        ? RenderingStrategy.ALWAYS_CSR
        : RenderingStrategy.DEFAULT;
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultRenderingStrategyResolverOptions = {
    excludedUrls: ['checkout', 'my-account', 'cx-preview'],
    excludedParams: ['asm'],
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var RenderingStrategy;
(function (RenderingStrategy) {
    RenderingStrategy[RenderingStrategy["ALWAYS_CSR"] = -1] = "ALWAYS_CSR";
    RenderingStrategy[RenderingStrategy["DEFAULT"] = 0] = "DEFAULT";
    RenderingStrategy[RenderingStrategy["ALWAYS_SSR"] = 1] = "ALWAYS_SSR";
})(RenderingStrategy || (RenderingStrategy = {}));
const defaultSsrOptimizationOptions = {
    concurrency: 10,
    timeout: 3000,
    forcedSsrTimeout: 60000,
    maxRenderTime: 300000,
    reuseCurrentRendering: true,
    debug: false,
    renderingStrategyResolver: defaultRenderingStrategyResolver(defaultRenderingStrategyResolverOptions),
    //CXSPA-3680 - set ExpressServerLogger as default
    //logger: new ExpressServerLogger(),
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns the full url for the given SSR Request.
 */
const getDefaultRenderKey = getRequestUrl;
/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
class OptimizedSsrEngine {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns a factory function which resolves the server request origin.
 */
function serverRequestOriginFactory(options) {
    return () => {
        const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN, {
            optional: true,
            skipSelf: true,
        });
        // usually prerendering mode, but can be SSR
        if (options?.serverRequestOrigin) {
            return options.serverRequestOrigin;
        }
        // SSR mode, from express engine
        if (serverRequestOrigin) {
            return serverRequestOrigin;
        }
        throw new Error(`The request origin is not set. 
    If you are using the default environment variable, please specify it when initiating the process.
    
    E.g.
    > SERVER_REQUEST_ORIGIN=https://my.domain.com yarn prerender
    > SERVER_REQUEST_ORIGIN=http://localhost:4200 yarn serve:ssr
    
    
    Alternatively, you can pass it as an argument to provideServer
    function, but beware it will be used for server-side rendering as well.
    
    E.g.
    @NgModule({
      // ...
      providers: [
        provideServer({
          serverRequestOrigin: 'https://my.domain.com',
        }),
      ],
    })
    export class AppServerModule {}`);
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns a factory function which resolves the server request URL.
 */
function serverRequestUrlFactory(options) {
    return () => {
        const platformConfig = inject(INITIAL_CONFIG);
        const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN);
        const serverRequestUrl = inject(SERVER_REQUEST_URL, {
            optional: true,
            skipSelf: true,
        });
        // SSR mode
        if (serverRequestUrl) {
            // should override the automatically recognized origin
            if (options?.serverRequestOrigin) {
                return serverRequestUrl.replace(serverRequestOrigin, options.serverRequestOrigin);
            }
            return serverRequestUrl;
        }
        // prerendering mode (no express server)
        return serverRequestOrigin + platformConfig.url;
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
function provideServer(options) {
    return [
        {
            provide: SERVER_REQUEST_ORIGIN,
            useFactory: serverRequestOriginFactory(options),
        },
        {
            provide: SERVER_REQUEST_URL,
            useFactory: serverRequestUrlFactory(options),
        },
        {
            provide: LoggerService,
            useFactory: serverLoggerServiceFactory,
        },
    ];
}
/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
function getServerRequestProviders() {
    return [
        {
            provide: SERVER_REQUEST_ORIGIN,
            useFactory: getRequestOrigin,
            deps: [REQUEST],
        },
        {
            provide: SERVER_REQUEST_URL,
            useFactory: getRequestUrl,
            deps: [REQUEST],
        },
    ];
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The wrapper over the standard ngExpressEngine, that provides tokens for Spartacus
 * @param ngExpressEngine
 */
class NgExpressEngineDecorator {
    /**
     * Returns the higher order ngExpressEngine with provided tokens for Spartacus
     *
     * @param ngExpressEngine
     */
    static get(ngExpressEngine, optimizationOptions) {
        return decorateExpressEngine(ngExpressEngine, optimizationOptions);
    }
}
function decorateExpressEngine(ngExpressEngine, optimizationOptions = defaultSsrOptimizationOptions) {
    return function (setupOptions) {
        const engineInstance = ngExpressEngine({
            ...setupOptions,
            providers: [
                // add spartacus related providers
                ...getServerRequestProviders(),
                ...(setupOptions.providers ?? []),
            ],
        });
        // apply optimization wrapper if optimization options were defined
        return optimizationOptions
            ? new OptimizedSsrEngine(engineInstance, optimizationOptions)
                .engineInstance
            : engineInstance;
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultExpressServerLogger, EXPRESS_SERVER_LOGGER, ExpressLoggerService, LegacyExpressServerLogger, NgExpressEngineDecorator, OptimizedSsrEngine, PrerenderingLoggerService, RenderingCache, RenderingStrategy, defaultRenderingStrategyResolver, defaultRenderingStrategyResolverOptions, defaultSsrOptimizationOptions, getDefaultRenderKey, getRequestContext, getServerRequestProviders, provideServer, serverLoggerServiceFactory };
//# sourceMappingURL=spartacus-setup-ssr.mjs.map
