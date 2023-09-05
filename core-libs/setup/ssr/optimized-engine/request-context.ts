/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { randomUUID } from 'crypto';
import { Request } from 'express';
import { ExpressServerLogger, ExpressServerLoggerContext } from '../logger';
import { parseTraceparent } from '../logger/loggers/w3c-trace-context/parse-traceparent';

/**
 * Returns the request context object, which is used to enrich the logs.
 * It contains the random request's UUID, time of receiving the context and the W3C Trace Context (if available).
 * The trace context is parsed from the `traceparent` header, which is specified in
 * the "W3C TraceContext" document. See https://www.w3.org/TR/trace-context/#traceparent-header
 * for more details.
 * @param request - the request object
 * @returns the context of the request and error if occurred during parsing traceparent header
 */
export const getRequestContext = (
  request: Request,
  logger: ExpressServerLogger
): ExpressServerLoggerContext => {
  const requestContext: ExpressServerLoggerContext = {
    uuid: randomUUID(),
    timeReceived: new Date().toISOString(),
  };

  try {
    const traceContext = parseTraceparent(request.get('traceparent'));
    if (traceContext) {
      requestContext.traceContext = traceContext;
    }
  } catch (e) {
    const error =
      e instanceof Error
        ? e
        : new Error('Unexpected error during parsing traceparent header');

    logger.error(error.message, {
      request: {
        ...request,
        res: { locals: { cx: { request: requestContext } } },
      } as Request,
    });
  }

  return requestContext;
};

declare module 'express' {
  export interface Request {
    res: {
      locals: {
        cx: {
          request: ExpressServerLoggerContext;
        };
      };
    };
  }
}
