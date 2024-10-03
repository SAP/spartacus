import crypto from 'crypto';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import {
  DefaultExpressServerLogger,
  ExpressServerLogger,
  ExpressServerLoggerContext,
} from '../logger';
import * as parser from '../logger/loggers/w3c-trace-context/parse-traceparent';
import { preprocessRequestForLogger } from './request-context';

describe('RequestContext', () => {
  let request: Request;
  let headers: IncomingHttpHeaders;
  let logger: ExpressServerLogger;
  let dateSpy: jest.SpyInstance;
  let randomUUIDSpy: jest.SpyInstance;
  const mockDate = new Date('2023-09-07');

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
    dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    randomUUIDSpy = jest
      .spyOn(crypto, 'randomUUID')
      .mockReturnValue('ad90db04-a501-4dc5-9b4e-2cc2ab10d49c');

    headers = {};
    request = {
      res: {
        locals: {
          cx: { request: {} as ExpressServerLoggerContext },
        },
      },
      get: (header: string): string | string[] | undefined => {
        return headers[header];
      },
      headers,
    } as unknown as Request;
    logger = new DefaultExpressServerLogger();
  });

  afterEach(() => {
    dateSpy.mockRestore();
    randomUUIDSpy.mockRestore();
  });

  it('should add initial request context', () => {
    preprocessRequestForLogger(request, logger);
    expect(request.res?.locals.cx.request).toMatchInlineSnapshot(`
      {
        "timeReceived": "2023-09-07T00:00:00.000Z",
        "traceContext": undefined,
        "uuid": "ad90db04-a501-4dc5-9b4e-2cc2ab10d49c",
      }
    `);
  });

  it('should add trace context', () => {
    request.headers.traceparent =
      '00-0af7651916cd43dd8448eb211c80319c-b7ad6b7169203331-01';

    preprocessRequestForLogger(request, logger);
    expect(request.res?.locals.cx.request).toMatchInlineSnapshot(`
      {
        "timeReceived": "2023-09-07T00:00:00.000Z",
        "traceContext": {
          "parentId": "b7ad6b7169203331",
          "traceFlags": "01",
          "traceId": "0af7651916cd43dd8448eb211c80319c",
          "version": "00",
        },
        "uuid": "ad90db04-a501-4dc5-9b4e-2cc2ab10d49c",
      }
    `);
  });

  it('should add only initial context and log an error if traceparent is invalid', () => {
    const invalidTraceparent = 'invalid';
    const loggerErrorSpy = jest.spyOn(logger, 'error');

    request.headers.traceparent = invalidTraceparent;
    preprocessRequestForLogger(request, logger);
    expect(request.res?.locals.cx.request).toMatchInlineSnapshot(`
      {
        "timeReceived": "2023-09-07T00:00:00.000Z",
        "traceContext": undefined,
        "uuid": "ad90db04-a501-4dc5-9b4e-2cc2ab10d49c",
      }
    `);
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      `Traceparent header has invalid length: ${invalidTraceparent.length}. Expected 55 characters.`,
      { request }
    );
  });

  it('should add only initial context and log unexpected error if parsing failed for unknown reason', () => {
    const invalidTraceparent = 'invalid';
    const loggerErrorSpy = jest.spyOn(logger, 'error');

    jest.spyOn(parser, 'parseTraceparent').mockImplementationOnce(() => {
      // eslint-disable-next-line no-throw-literal
      throw { message: 'Unexpected error' };
    });
    request.headers.traceparent = invalidTraceparent;
    preprocessRequestForLogger(request, logger);
    expect(request.res?.locals.cx.request).toMatchInlineSnapshot(`
      {
        "timeReceived": "2023-09-07T00:00:00.000Z",
        "traceContext": undefined,
        "uuid": "ad90db04-a501-4dc5-9b4e-2cc2ab10d49c",
      }
    `);
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      'Unexpected error during parsing traceparent header',
      { request }
    );
  });
});
