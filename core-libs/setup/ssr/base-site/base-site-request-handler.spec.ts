/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { NextFunction, Request, Response } from 'express';
import {
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import {
  createBaseSiteRequestHandler,
  setDefaultBaseSiteResolver,
} from './base-site-request-handler';

function createRequest({
  host = 'internal.example',
  forwardedHost,
  forwardedProto,
  trustProxy = false,
  originalUrl = '/llm.txt',
  path = '/llm.txt',
}: {
  host?: string;
  forwardedHost?: string;
  forwardedProto?: string;
  trustProxy?: boolean;
  originalUrl?: string;
  path?: string;
} = {}): Request {
  const headers: Record<string, string | undefined> = {
    host,
    'x-forwarded-host': forwardedHost,
    'x-forwarded-proto': forwardedProto,
  };

  const request = {
    originalUrl,
    path,
    connection: { remoteAddress: '127.0.0.1' },
    socket: { encrypted: true, remoteAddress: '127.0.0.1' },
    app: {
      get: (name: string) =>
        name === 'trust proxy fn' ? () => trustProxy : undefined,
    },
    get: (name: string) => headers[name.toLowerCase()],
  } as unknown as Request;
  const protocolGetter = Object.getOwnPropertyDescriptor(
    express.request,
    'protocol'
  )?.get;
  if (!protocolGetter) {
    throw new Error('Express request protocol getter is unavailable');
  }
  Object.defineProperty(request, 'protocol', {
    get: () => protocolGetter.call(request),
  });
  return request;
}

function createResponse(): Response {
  const response = {
    send: jest.fn(),
    setHeader: jest.fn(),
  } as Partial<Response>;
  response.status = jest
    .fn()
    .mockReturnValue(response) as unknown as Response['status'];
  response.type = jest
    .fn()
    .mockReturnValue(response) as unknown as Response['type'];
  return response as Response;
}

function createNext(): NextFunction {
  return jest.fn() as unknown as NextFunction;
}

describe('createBaseSiteRequestHandler', () => {
  afterEach(() => setDefaultBaseSiteResolver(undefined));

  it('exposes the resolved base site on request.baseSite', async () => {
    let seen: string | null | undefined;
    const handler = createBaseSiteRequestHandler(
      (request) => {
        seen = request.baseSite;
      },
      { resolver: { resolve: async () => 'electronics-spa' } }
    );

    await handler(createRequest(), createResponse(), createNext());

    expect(seen).toBe('electronics-spa');
  });

  it('exposes a null base site when nothing matched', async () => {
    let seen: string | null | undefined = 'unset';
    const handler = createBaseSiteRequestHandler(
      (request) => {
        seen = request.baseSite;
      },
      { resolver: { resolve: async () => null } }
    );

    await handler(createRequest(), createResponse(), createNext());

    expect(seen).toBeNull();
  });

  it('resolves from the trust-proxy-aware request URL', async () => {
    const handler = createBaseSiteRequestHandler(
      (request, response) => {
        response.send(request.baseSite ?? '');
      },
      { resolver: { resolve: async (requestUrl) => requestUrl } }
    );
    const response = createResponse();

    await handler(
      createRequest({
        forwardedHost: 'public.example',
        forwardedProto: 'http',
        trustProxy: true,
      }),
      response,
      createNext()
    );

    expect(response.send).toHaveBeenCalledWith('http://public.example/llm.txt');
  });

  it('awaits an asynchronous handler', async () => {
    let finish: (() => void) | undefined;
    const done = new Promise<void>((resolve) => {
      finish = resolve;
    });
    const response = createResponse();
    const handler = createBaseSiteRequestHandler(
      async () => {
        await done;
        response.send('late');
      },
      { resolver: { resolve: async () => 'electronics' } }
    );

    const handling = handler(createRequest(), response, createNext());
    expect(response.send).not.toHaveBeenCalled();
    finish?.();
    await handling;

    expect(response.send).toHaveBeenCalledWith('late');
  });

  it('uses the process-wide default resolver when none is passed', async () => {
    setDefaultBaseSiteResolver({ resolve: async () => 'from-default' });
    let seen: string | null | undefined;
    const handler = createBaseSiteRequestHandler((request) => {
      seen = request.baseSite;
    });

    await handler(createRequest(), createResponse(), createNext());

    expect(seen).toBe('from-default');
  });

  it('throws when no resolver is available', () => {
    expect(() => createBaseSiteRequestHandler(() => undefined)).toThrow();
  });

  it.each([
    {
      error: new ConcurrencyLimitError(),
      retryAfter: '3',
      name: 'concurrency limit',
    },
    {
      error: new OccUnavailableError(),
      retryAfter: '25',
      name: 'OCC unavailability',
    },
  ])(
    'returns 503 with the default Retry-After for $name',
    async ({ error, retryAfter }) => {
      const next = createNext();
      const response = createResponse();
      const handler = createBaseSiteRequestHandler(() => undefined, {
        resolver: { resolve: async () => Promise.reject(error) },
      });

      await handler(createRequest(), response, next);

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', retryAfter);
      expect(response.status).toHaveBeenCalledWith(503);
      expect(response.send).toHaveBeenCalledWith('Service Unavailable');
      expect(next).not.toHaveBeenCalled();
    }
  );

  it.each([
    {
      error: new ConcurrencyLimitError(),
      retryAfterSeconds: { concurrencyLimit: 7 },
      retryAfter: '7',
      name: 'concurrency limit',
    },
    {
      error: new OccUnavailableError(),
      retryAfterSeconds: { occUnavailable: 40 },
      retryAfter: '40',
      name: 'OCC unavailability',
    },
  ])(
    'returns 503 with the configured Retry-After for $name',
    async ({ error, retryAfterSeconds, retryAfter }) => {
      const response = createResponse();
      const handler = createBaseSiteRequestHandler(() => undefined, {
        resolver: { resolve: async () => Promise.reject(error) },
        retryAfterSeconds,
      });

      await handler(createRequest(), response, createNext());

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', retryAfter);
      expect(response.status).toHaveBeenCalledWith(503);
    }
  );

  it('forwards unknown resolver errors to Express error handling', async () => {
    const error = new Error('unexpected resolver failure');
    const next = createNext();
    const handler = createBaseSiteRequestHandler(() => undefined, {
      resolver: { resolve: async () => Promise.reject(error) },
    });

    await handler(createRequest(), createResponse(), next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('forwards handler errors to Express error handling', async () => {
    const error = new Error('handler failure');
    const next = createNext();
    const handler = createBaseSiteRequestHandler(
      () => {
        throw error;
      },
      { resolver: { resolve: async () => 'electronics' } }
    );

    await handler(createRequest(), createResponse(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
