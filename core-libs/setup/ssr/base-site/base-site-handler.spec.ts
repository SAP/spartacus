/** @jest-environment node */

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextFunction, Request, Response } from 'express';
import { setBaseSiteHandler } from './base-site-handler';
import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';

function createResolver(
  overrides: Partial<BaseSiteResolver> = {}
): BaseSiteResolver {
  return {
    supportsOccResolution: true,
    resolveFromPath: jest.fn().mockReturnValue(null),
    resolveFromOcc: jest.fn().mockResolvedValue(null),
    ...overrides,
  };
}

function createRequest({
  host = 'internal.example',
  method = 'GET',
  originalUrl = '/llms.txt',
}: {
  host?: string;
  method?: string;
  originalUrl?: string;
} = {}): Request {
  const headers: Record<string, string | undefined> = { host };
  return {
    app: {
      get: (name: string) =>
        name === 'trust proxy fn' ? () => false : undefined,
    },
    baseUrl: '',
    connection: { remoteAddress: '127.0.0.1' },
    get: (name: string) => headers[name.toLowerCase()],
    method,
    originalUrl,
    params: {},
    protocol: 'http',
    socket: { remoteAddress: '127.0.0.1' },
    url: originalUrl,
  } as unknown as Request;
}

function createResponse(): Response {
  const response = {
    send: jest.fn(),
    setHeader: jest.fn(),
  } as Partial<Response>;
  response.status = jest
    .fn()
    .mockReturnValue(response) as unknown as Response['status'];
  return response as Response;
}

function createNext(): NextFunction {
  return jest.fn() as unknown as NextFunction;
}

async function dispatch(
  middleware: ReturnType<typeof setBaseSiteHandler>,
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  middleware(request, response, next);
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
}

describe('setBaseSiteHandler', () => {
  describe('path mode', () => {
    it('passes the resolved base site through an explicit context without mutating the request', async () => {
      const resolver = createResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/:baseSite/llms.txt',
        resolveMode: 'path',
        handler,
      });
      const request = createRequest({
        originalUrl: '/electronics-spa/llms.txt',
      });
      const response = createResponse();
      const next = createNext();

      await dispatch(middleware, request, response, next);

      expect(resolver.resolveFromPath).toHaveBeenCalledWith(
        'http://internal.example/electronics-spa/llms.txt'
      );
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          req: request,
          res: response,
          next: expect.any(Function),
          baseSite: 'electronics-spa',
        })
      );
      expect(request).not.toHaveProperty('baseSite');
      expect(next).not.toHaveBeenCalled();
    });

    it('passes a null base site to the handler when the path is unknown', async () => {
      const resolver = createResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue(null),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/:baseSite/llms.txt',
        resolveMode: 'path',
        handler,
      });
      const request = createRequest({ originalUrl: '/unknown/llms.txt' });

      await dispatch(
        middleware,
        request,
        createResponse(),
        createNext()
      );

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ baseSite: null, req: request })
      );
      expect(request).not.toHaveProperty('baseSite');
    });
  });

  describe('Express route matching', () => {
    it('matches a simple string route for every HTTP method', async () => {
      const resolver = createResolver({
        resolveFromOcc: jest.fn().mockResolvedValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',
        resolveMode: 'domain',
        handler,
      });

      await dispatch(
        middleware,
        createRequest({ method: 'POST' }),
        createResponse(),
        createNext()
      );

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('passes a RegExp route directly to Express', async () => {
      const resolver = createResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: /^\/(?:[^/]+\/)*llms\.txt$/,
        resolveMode: 'path',
        handler,
      });

      await dispatch(
        middleware,
        createRequest({ originalUrl: '/nested/electronics-spa/llms.txt' }),
        createResponse(),
        createNext()
      );

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('falls through without resolving when the Express route does not match', async () => {
      const resolver = createResolver({ supportsOccResolution: false });
      const handler = jest.fn();
      const next = createNext();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/:baseSite/llms.txt',
        resolveMode: 'path',
        handler,
      });

      await dispatch(
        middleware,
        createRequest({ originalUrl: '/electronics-spa/other.txt' }),
        createResponse(),
        next
      );

      expect(next).toHaveBeenCalledTimes(1);
      expect(handler).not.toHaveBeenCalled();
      expect(resolver.resolveFromPath).not.toHaveBeenCalled();
    });
  });

  describe('domain mode', () => {
    it('resolves the request URL through OCC', async () => {
      const resolver = createResolver({
        resolveFromOcc: jest.fn().mockResolvedValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',
        resolveMode: 'domain',
        handler,
      });
      const request = createRequest();

      await dispatch(
        middleware,
        request,
        createResponse(),
        createNext()
      );

      expect(resolver.resolveFromOcc).toHaveBeenCalledWith(
        'http://internal.example/llms.txt'
      );
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ baseSite: 'electronics-spa', req: request })
      );
    });

    it('throws at registration when the resolver cannot resolve through OCC', () => {
      const resolver = createResolver({ supportsOccResolution: false });

      expect(() =>
        setBaseSiteHandler(resolver, {
          route: '/llms.txt',
          resolveMode: 'domain',
          handler: jest.fn(),
        })
      ).toThrow();
    });
  });

  describe('failure mapping', () => {
    it('maps ConcurrencyLimitError to 503 with the default Retry-After', async () => {
      const resolver = createResolver({
        resolveFromOcc: jest
          .fn()
          .mockRejectedValue(new ConcurrencyLimitError()),
      });
      const response = createResponse();
      const next = createNext();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',
        resolveMode: 'domain',
        handler: jest.fn(),
      });

      await dispatch(middleware, createRequest(), response, next);

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '3');
      expect(response.status).toHaveBeenCalledWith(503);
      expect(response.send).toHaveBeenCalledWith('Service Unavailable');
      expect(next).not.toHaveBeenCalled();
    });

    it('maps OccUnavailableError to 503 with the default Retry-After', async () => {
      const resolver = createResolver({
        resolveFromOcc: jest.fn().mockRejectedValue(new OccUnavailableError()),
      });
      const response = createResponse();
      const next = createNext();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',
        resolveMode: 'domain',
        handler: jest.fn(),
      });

      await dispatch(middleware, createRequest(), response, next);

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '25');
      expect(response.status).toHaveBeenCalledWith(503);
      expect(response.send).toHaveBeenCalledWith('Service Unavailable');
      expect(next).not.toHaveBeenCalled();
    });

    it('honors custom Retry-After values', async () => {
      const resolver = createResolver({
        resolveFromOcc: jest
          .fn()
          .mockRejectedValue(new ConcurrencyLimitError()),
      });
      const response = createResponse();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',
        resolveMode: 'domain',
        handler: jest.fn(),
        retryAfterSeconds: { concurrencyLimit: 7, occUnavailable: 40 },
      });

      await dispatch(
        middleware,
        createRequest(),
        response,
        createNext()
      );

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '7');
      expect(response.status).toHaveBeenCalledWith(503);
    });

    it('forwards a thrown handler error to next()', async () => {
      const error = new Error('handler failure');
      const resolver = createResolver({ supportsOccResolution: false });
      const next = createNext();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/:baseSite/llms.txt',
        resolveMode: 'path',
        handler: () => {
          throw error;
        },
      });

      await dispatch(
        middleware,
        createRequest({ originalUrl: '/electronics-spa/llms.txt' }),
        createResponse(),
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    it('forwards any other resolver error to next()', async () => {
      const error = new Error('unexpected resolver failure');
      const resolver = createResolver({
        resolveFromOcc: jest.fn().mockRejectedValue(error),
      });
      const next = createNext();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',
        resolveMode: 'domain',
        handler: jest.fn(),
      });

      await dispatch(middleware, createRequest(), createResponse(), next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
