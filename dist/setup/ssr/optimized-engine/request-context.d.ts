import { Request } from 'express';
import { ExpressServerLogger } from '../logger';
import { W3cTraceContext } from '../logger/loggers/w3c-trace-context/w3c-trace-context.model';
/**
 * RequestContext is used for log message in server side rendering.
 * It contains request's UUID, time of receiving the request and the W3C Trace Context if `traceparent` header is available and valid.
 */
export interface RequestContext {
    uuid: string;
    timeReceived: string;
    traceContext?: W3cTraceContext;
}
/**
 * Returns the request context from the request object.
 * @param request - the request object
 * @returns the context of the request
 */
export declare const getRequestContext: (request: Request) => RequestContext;
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
export declare const preprocessRequestForLogger: (request: Request, logger: ExpressServerLogger) => void;
declare module 'express' {
    interface Locals {
        cx: {
            request: RequestContext;
        };
    }
}
