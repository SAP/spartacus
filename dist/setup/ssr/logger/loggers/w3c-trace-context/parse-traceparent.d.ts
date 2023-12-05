import { W3cTraceContext } from './w3c-trace-context.model';
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
export declare function parseTraceparent(traceparent: string | undefined | null): W3cTraceContext | undefined;
