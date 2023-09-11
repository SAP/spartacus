/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { randomUUID } from 'crypto';
import { Request } from 'express';
import { ExpressServerLogger, ExpressServerLoggerContext } from '../logger';
import { parseTraceparent } from '../logger/loggers/w3c-trace-context/parse-traceparent';

const getRequestContext = (request: Request): ExpressServerLoggerContext => {
  return request.res?.locals?.cx?.request;
};

const setRequestContext = (
  request: Request,
  context: ExpressServerLoggerContext
) => {
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
 * Adds the initial request context to the request object.
 * @param request - the request object
 */
const addInitialRequestContext = (request: Request): void => {
  const requestContext: ExpressServerLoggerContext = {
    uuid: randomUUID(),
    timeReceived: new Date().toISOString(),
  };
  setRequestContext(request, requestContext);
};

/**
 * Parses the `traceparent` header and adds the trace context to the request context.
 * In case of an error, the error is logged with the initial request context.
 * @param request - the request object
 * @param logger - the logger object
 *
 */
const addTraceContext = (request: Request, logger: ExpressServerLogger) => {
  const context = getRequestContext(request);
  try {
    const traceContext = parseTraceparent(request.get('traceparent'));
    if (traceContext) {
      context.traceContext = traceContext;
      setRequestContext(request, context);
    }
  } catch (e) {
    const error =
      e instanceof Error
        ? e
        : new Error('Unexpected error during parsing traceparent header');
    logger.error(error.message, context);
  }
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
  addInitialRequestContext(request);
  addTraceContext(request, logger);
};

declare module 'express' {
  export interface Locals {
    cx: {
      request: ExpressServerLoggerContext;
    };
  }
}
