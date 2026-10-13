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
  originalUrl = '/base-site?language=en',
  path = '/base-site',
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
    redirect: jest.fn(),
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
  it('resolves trusted forwarded host and protocol values', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async (requestUrl) => requestUrl },
      render: (baseSite) => baseSite ?? '',
    });
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

    expect(response.send).toHaveBeenCalledWith(
      'http://public.example/base-site?language=en'
    );
  });

  it('ignores untrusted forwarded host and protocol values', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async (requestUrl) => requestUrl },
      render: (baseSite) => baseSite ?? '',
    });
    const response = createResponse();

    await handler(
      createRequest({
        host: 'storefront.example',
        forwardedHost: 'spoofed.example',
        forwardedProto: 'http',
        trustProxy: false,
      }),
      response,
      createNext()
    );

    expect(response.send).toHaveBeenCalledWith(
      'https://storefront.example/base-site?language=en'
    );
  });

  it('awaits asynchronous rendering before sending the response', async () => {
    let finishRendering: ((output: string) => void) | undefined;
    const output = new Promise<string>((resolve) => {
      finishRendering = resolve;
    });
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => 'electronics' },
      render: () => output,
    });
    const response = createResponse();
    const handling = handler(createRequest(), response, createNext());

    expect(response.send).not.toHaveBeenCalled();
    finishRendering?.('rendered electronics');
    await handling;

    expect(response.send).toHaveBeenCalledWith('rendered electronics');
  });

  it('uses text/plain by default', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => 'electronics' },
      render: (baseSite) => baseSite ?? '',
    });
    const response = createResponse();

    await handler(createRequest(), response, createNext());

    expect(response.type).toHaveBeenCalledWith('text/plain');
  });

  it('uses the configured content type', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => 'electronics' },
      render: (baseSite) => JSON.stringify({ baseSite }),
      contentType: 'application/json',
    });
    const response = createResponse();

    await handler(createRequest(), response, createNext());

    expect(response.type).toHaveBeenCalledWith('application/json');
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
      const handler = createBaseSiteRequestHandler({
        resolver: { resolve: async () => Promise.reject(error) },
        render: (baseSite) => baseSite ?? '',
      });
      const response = createResponse();
      const next = createNext();

      await handler(createRequest(), response, next);

      expect(response.setHeader).toHaveBeenCalledWith(
        'Retry-After',
        retryAfter
      );
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
      const handler = createBaseSiteRequestHandler({
        resolver: { resolve: async () => Promise.reject(error) },
        render: (baseSite) => baseSite ?? '',
        retryAfterSeconds,
      });
      const response = createResponse();

      await handler(createRequest(), response, createNext());

      expect(response.setHeader).toHaveBeenCalledWith(
        'Retry-After',
        retryAfter
      );
      expect(response.status).toHaveBeenCalledWith(503);
      expect(response.send).toHaveBeenCalledWith('Service Unavailable');
    }
  );

  it('forwards unknown resolver errors to Express error handling', async () => {
    const error = new Error('unexpected resolver failure');
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => Promise.reject(error) },
      render: (baseSite) => baseSite ?? '',
    });
    const response = createResponse();
    const next = createNext();

    await handler(createRequest(), response, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(response.send).not.toHaveBeenCalled();
  });

  it('forwards render errors to Express error handling', async () => {
    const error = new Error('render failure');
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => 'electronics' },
      render: async () => Promise.reject(error),
    });
    const response = createResponse();
    const next = createNext();

    await handler(createRequest(), response, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(response.send).not.toHaveBeenCalled();
  });
});

describe('createBaseSiteRequestHandler canonical-path routing', () => {
  it('serves a matched base site under the original URL', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => 'electronics-spa' },
      render: (baseSite) => `site:${baseSite}`,
      canonicalPath: '/llm.txt',
    });
    const response = createResponse();

    await handler(
      createRequest({
        path: '/electronics-spa/llm.txt',
        originalUrl: '/electronics-spa/llm.txt',
      }),
      response,
      createNext()
    );

    expect(response.send).toHaveBeenCalledWith('site:electronics-spa');
    expect(response.redirect).not.toHaveBeenCalled();
  });

  it('redirects an unmatched prefixed URL to the canonical path, preserving the query', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => null },
      render: (baseSite) => baseSite ?? '',
      canonicalPath: '/llm.txt',
    });
    const response = createResponse();

    await handler(
      createRequest({
        path: '/unknown/llm.txt',
        originalUrl: '/unknown/llm.txt?x=1',
      }),
      response,
      createNext()
    );

    expect(response.redirect).toHaveBeenCalledWith(308, '/llm.txt?x=1');
    expect(response.send).not.toHaveBeenCalled();
  });

  it('serves a null base site at the canonical root without redirecting', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => null },
      render: (baseSite) => (baseSite === null ? 'general' : baseSite),
      canonicalPath: '/llm.txt',
    });
    const response = createResponse();

    await handler(
      createRequest({ path: '/llm.txt', originalUrl: '/llm.txt' }),
      response,
      createNext()
    );

    expect(response.send).toHaveBeenCalledWith('general');
    expect(response.redirect).not.toHaveBeenCalled();
  });

  it('lets a custom fallback override the default routing', async () => {
    const handler = createBaseSiteRequestHandler({
      resolver: { resolve: async () => null },
      render: (baseSite) => `served:${baseSite}`,
      canonicalPath: '/llm.txt',
      fallback: () => ({ type: 'serve', baseSite: 'forced' }),
    });
    const response = createResponse();

    await handler(
      createRequest({
        path: '/unknown/llm.txt',
        originalUrl: '/unknown/llm.txt',
      }),
      response,
      createNext()
    );

    expect(response.send).toHaveBeenCalledWith('served:forced');
    expect(response.redirect).not.toHaveBeenCalled();
  });
});

describe('createBaseSiteRequestHandler resolver resolution', () => {
  afterEach(() => setDefaultBaseSiteResolver(undefined));

  it('uses the process-wide default resolver when none is passed', async () => {
    setDefaultBaseSiteResolver({ resolve: async () => 'from-default' });
    const handler = createBaseSiteRequestHandler({
      render: (baseSite) => baseSite ?? '',
    });
    const response = createResponse();

    await handler(createRequest(), response, createNext());

    expect(response.send).toHaveBeenCalledWith('from-default');
  });

  it('throws when no resolver is available', () => {
    expect(() =>
      createBaseSiteRequestHandler({ render: (baseSite) => baseSite ?? '' })
    ).toThrow();
  });
});
