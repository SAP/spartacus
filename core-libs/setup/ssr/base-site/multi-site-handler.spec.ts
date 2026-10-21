/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextFunction, Request, Response } from 'express';
import {
  BaseSiteResolver,
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import { BaseSiteRequest, getMultiSiteHandler } from './multi-site-handler';

jest.mock('./base-site-resolver-registry', () => {
  const actual = jest.requireActual('./base-site-resolver-registry');
  return { ...actual, getConfiguredBaseSiteResolver: jest.fn() };
});

// Imported after the mock declaration; both are resolved to the mocked module.
import {
  getConfiguredBaseSiteResolver,
  resetBaseSiteResolver,
} from './base-site-resolver-registry';

const mockGetResolver =
  getConfiguredBaseSiteResolver as jest.MockedFunction<
    typeof getConfiguredBaseSiteResolver
  >;

/** Installs a fake resolver as the configured singleton for the test. */
function useResolver(overrides: Partial<BaseSiteResolver> = {}): BaseSiteResolver {
  const resolver: BaseSiteResolver = {
    supportsOccResolution: true,
    resolveFromPath: jest.fn().mockReturnValue(null),
    resolveFromOcc: jest.fn().mockResolvedValue(null),
    ...overrides,
  };
  mockGetResolver.mockReturnValue(resolver);
  return resolver;
}

function createRequest({
  host = 'internal.example',
  originalUrl = '/llms.txt',
  path = '/llms.txt',
}: {
  host?: string;
  originalUrl?: string;
  path?: string;
} = {}): Request {
  const headers: Record<string, string | undefined> = { host };
  const request = {
    originalUrl,
    path,
    protocol: 'http',
    connection: { remoteAddress: '127.0.0.1' },
    socket: { remoteAddress: '127.0.0.1' },
    app: {
      get: (name: string) =>
        name === 'trust proxy fn' ? () => false : undefined,
    },
    get: (name: string) => headers[name.toLowerCase()],
  } as unknown as Request;
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

describe('getMultiSiteHandler', () => {
  afterEach(() => {
    resetBaseSiteResolver();
    mockGetResolver.mockReset();
  });

  describe('path mode', () => {
    it('matches a site-prefixed endpoint, sets baseSite, and invokes the handler', async () => {
      const resolver = useResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        withBaseSiteInPath: true,
        handler,
      });
      const request = createRequest({
        originalUrl: '/electronics-spa/llms.txt',
        path: '/electronics-spa/llms.txt',
      });
      const next = createNext();

      await middleware(request, createResponse(), next);

      expect(resolver.resolveFromPath).toHaveBeenCalledWith(
        'http://internal.example/electronics-spa/llms.txt'
      );
      expect((request as BaseSiteRequest).baseSite).toBe('electronics-spa');
      expect(handler).toHaveBeenCalledTimes(1);
      expect(next).not.toHaveBeenCalled();
    });

    it('calls next() and skips the handler for an unrelated path', async () => {
      const resolver = useResolver({ supportsOccResolution: false });
      const handler = jest.fn();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        withBaseSiteInPath: true,
        handler,
      });
      const next = createNext();

      await middleware(
        createRequest({ originalUrl: '/other', path: '/other' }),
        createResponse(),
        next
      );

      expect(next).toHaveBeenCalledWith();
      expect(handler).not.toHaveBeenCalled();
      expect(resolver.resolveFromPath).not.toHaveBeenCalled();
    });

    it('calls next() when the endpoint has no leading site segment', async () => {
      useResolver({ supportsOccResolution: false });
      const handler = jest.fn();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        withBaseSiteInPath: true,
        handler,
      });
      const next = createNext();

      await middleware(
        createRequest({ originalUrl: '/llms.txt', path: '/llms.txt' }),
        createResponse(),
        next
      );

      expect(next).toHaveBeenCalledWith();
      expect(handler).not.toHaveBeenCalled();
    });

    it('invokes the handler with a null base site when the segment is unknown', async () => {
      const resolver = useResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue(null),
      });
      const handler = jest.fn();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        withBaseSiteInPath: true,
        handler,
      });
      const request = createRequest({
        originalUrl: '/unknown/llms.txt',
        path: '/unknown/llms.txt',
      });

      await middleware(request, createResponse(), createNext());

      expect(resolver.resolveFromPath).toHaveBeenCalled();
      expect((request as BaseSiteRequest).baseSite).toBeNull();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('treats the dot in the endpoint as a literal (does not match llmsXtxt)', async () => {
      const resolver = useResolver({ supportsOccResolution: false });
      const handler = jest.fn();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        withBaseSiteInPath: true,
        handler,
      });
      const next = createNext();

      await middleware(
        createRequest({
          originalUrl: '/electronics-spa/llmsXtxt',
          path: '/electronics-spa/llmsXtxt',
        }),
        createResponse(),
        next
      );

      expect(next).toHaveBeenCalledWith();
      expect(handler).not.toHaveBeenCalled();
      expect(resolver.resolveFromPath).not.toHaveBeenCalled();
    });
  });

  describe('domain mode', () => {
    it('matches the bare endpoint and resolves via resolveFromOcc', async () => {
      const resolver = useResolver({
        supportsOccResolution: true,
        resolveFromOcc: jest.fn().mockResolvedValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        handler,
      });
      const request = createRequest({
        originalUrl: '/llms.txt',
        path: '/llms.txt',
      });

      await middleware(request, createResponse(), createNext());

      expect(resolver.resolveFromOcc).toHaveBeenCalledWith(
        'http://internal.example/llms.txt'
      );
      expect((request as BaseSiteRequest).baseSite).toBe('electronics-spa');
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('throws at registration when the resolver cannot resolve via OCC', () => {
      useResolver({ supportsOccResolution: false });

      expect(() =>
        getMultiSiteHandler({ endpoint: 'llms.txt', handler: jest.fn() })
      ).toThrow();
    });
  });

  describe('failure mapping', () => {
    it('maps ConcurrencyLimitError to 503 with the default Retry-After', async () => {
      useResolver({
        resolveFromOcc: jest
          .fn()
          .mockRejectedValue(new ConcurrencyLimitError()),
      });
      const response = createResponse();
      const next = createNext();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        handler: jest.fn(),
      });

      await middleware(createRequest(), response, next);

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '3');
      expect(response.status).toHaveBeenCalledWith(503);
      expect(response.send).toHaveBeenCalledWith('Service Unavailable');
      expect(next).not.toHaveBeenCalled();
    });

    it('maps OccUnavailableError to 503 with the default Retry-After', async () => {
      useResolver({
        resolveFromOcc: jest.fn().mockRejectedValue(new OccUnavailableError()),
      });
      const response = createResponse();
      const next = createNext();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        handler: jest.fn(),
      });

      await middleware(createRequest(), response, next);

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '25');
      expect(response.status).toHaveBeenCalledWith(503);
      expect(response.send).toHaveBeenCalledWith('Service Unavailable');
      expect(next).not.toHaveBeenCalled();
    });

    it('honors custom retryAfterSeconds values', async () => {
      useResolver({
        resolveFromOcc: jest
          .fn()
          .mockRejectedValue(new ConcurrencyLimitError()),
      });
      const response = createResponse();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        handler: jest.fn(),
        retryAfterSeconds: { concurrencyLimit: 7, occUnavailable: 40 },
      });

      await middleware(createRequest(), response, createNext());

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '7');
      expect(response.status).toHaveBeenCalledWith(503);
    });

    it('forwards a thrown handler error to next()', async () => {
      const error = new Error('handler failure');
      useResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue('electronics-spa'),
      });
      const next = createNext();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        withBaseSiteInPath: true,
        handler: () => {
          throw error;
        },
      });

      await middleware(
        createRequest({
          originalUrl: '/electronics-spa/llms.txt',
          path: '/electronics-spa/llms.txt',
        }),
        createResponse(),
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    it('forwards any other resolver error to next()', async () => {
      const error = new Error('unexpected resolver failure');
      useResolver({
        resolveFromOcc: jest.fn().mockRejectedValue(error),
      });
      const next = createNext();
      const middleware = getMultiSiteHandler({
        endpoint: 'llms.txt',
        handler: jest.fn(),
      });

      await middleware(createRequest(), createResponse(), next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
