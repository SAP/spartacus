/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { randomUUID } from 'crypto';
import { Request } from 'express';
import { ExpressServerLogger } from '../logger';
import { parseTraceparent } from '../logger/loggers/w3c-trace-context/parse-traceparent';
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
export const getRequestContext = (request: Request): RequestContext => {
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
export const preprocessRequestForLogger = (
  request: Request,
  logger: ExpressServerLogger
) => {
  const requestContext: RequestContext = {
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
const setRequestContext = (request: Request, context: RequestContext) => {
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
const createInitialRequestContext = (): RequestContext => {
  const requestContext: RequestContext = {
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
const getTraceContext = (
  request: Request,
  logger: ExpressServerLogger
): W3cTraceContext | undefined => {
  try {
    return parseTraceparent(request.get('traceparent')) ?? undefined;
  } catch (e) {
    const error =
      e instanceof Error
        ? e
        : new Error('Unexpected error during parsing traceparent header');
    logger.error(error.message, { request });
  }
};

declare module 'express' {
  export interface Locals {
    cx: {
      request: RequestContext;
    };
  }
}
