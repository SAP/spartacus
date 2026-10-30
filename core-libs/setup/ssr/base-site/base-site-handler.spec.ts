/** @jest-environment node */

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NextFunction, Request, Response } from 'express';
import {
  createBaseSiteAwareRoute,
  setBaseSiteHandler,
} from './base-site-handler';
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
    resolveFromPath: jest.fn().mockReturnValue('electronics-spa'),
    resolveFromOcc: jest.fn().mockResolvedValue('electronics-spa'),
    ...overrides,
  };
}

function createRequest({
  host = 'internal.example',
  method = 'GET',
  originalUrl = '/electronics-spa/llms.txt',
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

function dispatchToNext(
  middleware: ReturnType<typeof setBaseSiteHandler>,
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  return new Promise<void>((resolve) => {
    middleware(request, response, (forwardedError) => {
      next(forwardedError);
      resolve();
    });
  });
}

describe('createBaseSiteAwareRoute', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates a prefixed handler without requiring a resolver instance', async () => {
    const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
      pathBaseSiteIds: ['electronics-spa'],
      indexHtml: '<html></html>',
    });
    const handler = jest.fn();
    const middleware = registerBaseSiteAwareRoute({
      route: '/llms.txt',

      handler,
    });
    const request = createRequest({
      originalUrl: '/electronics-spa/llms.txt',
    });
    const response = createResponse();

    await dispatch(middleware, request, response, createNext());

    expect(handler).toHaveBeenCalledWith({
      req: request,
      res: response,
      next: expect.any(Function),
      baseSite: 'electronics-spa',
    });
    expect(request).not.toHaveProperty('baseSite');
  });

  it('shares the OCC cache between handlers created by the same factory', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new globalThis.Response(
        JSON.stringify({
          baseSites: [
            {
              uid: 'electronics-spa',
              urlPatterns: ['^http://internal\\.example/'],
            },
          ],
        })
      )
    );
    const registerBaseSiteAwareRoute = createBaseSiteAwareRoute({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });
    const llmsHandler = jest.fn();
    const robotsHandler = jest.fn();
    const llmsRequest = createRequest();
    const robotsRequest = createRequest({
      originalUrl: '/electronics-spa/robots.txt',
    });

    await dispatch(
      registerBaseSiteAwareRoute({
        route: '/llms.txt',
        handler: llmsHandler,
      }),
      llmsRequest,
      createResponse(),
      createNext()
    );
    await dispatch(
      registerBaseSiteAwareRoute({
        route: '/robots.txt',
        handler: robotsHandler,
      }),
      robotsRequest,
      createResponse(),
      createNext()
    );

    expect(llmsHandler).toHaveBeenCalledWith(
      expect.objectContaining({ baseSite: 'electronics-spa' })
    );
    expect(robotsHandler).toHaveBeenCalledWith(
      expect.objectContaining({ baseSite: 'electronics-spa' })
    );
    expect(llmsRequest).not.toHaveProperty('baseSite');
    expect(robotsRequest).not.toHaveProperty('baseSite');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
  it.each([undefined, [], ['electronics-spa']])(
    'leaves the unprefixed route to ordinary handlers with IDs %j',
    async (pathBaseSiteIds) => {
      const register = createBaseSiteAwareRoute({
        pathBaseSiteIds,
        indexHtml: '<html></html>',
      });
      const handler = jest.fn();
      const next = createNext();
      await dispatchToNext(
        register({ route: '/llms.txt', handler }),
        createRequest({ originalUrl: '/llms.txt' }),
        createResponse(),
        next
      );
      expect(handler).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledTimes(1);
    }
  );

  it.each([undefined, []])(
    'uses OCC for omitted or empty path IDs (%j)',
    async (pathBaseSiteIds) => {
      jest.spyOn(globalThis, 'fetch').mockResolvedValue(
        new globalThis.Response(
          JSON.stringify({
            baseSites: [
              {
                uid: 'electronics-spa',
                urlPatterns: ['^http://internal\\.example/'],
              },
            ],
          })
        )
      );
      const register = createBaseSiteAwareRoute({
        pathBaseSiteIds,
        indexHtml: '<html></html>',
        occBaseUrl: 'https://api.example',
      });
      const response = createResponse();
      await dispatch(
        register({
          route: '/llms.txt',
          handler: ({ res, baseSite }) => {
            res.send(baseSite);
          },
        }),
        createRequest(),
        response,
        createNext()
      );
      expect(response.send).toHaveBeenCalledWith('electronics-spa');
    }
  );

  it.each([undefined, []])(
    'handles a base-site-prefixed route using OCC when path IDs are %j',
    async (pathBaseSiteIds) => {
      const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
        new globalThis.Response(
          JSON.stringify({
            baseSites: [
              {
                uid: 'apparel-uk',
                urlPatterns: ['^http://internal\\.example/apparel-uk/'],
              },
              {
                uid: 'electronics-spa',
                urlPatterns: ['^http://internal\\.example/electronics-spa/'],
              },
            ],
          })
        )
      );
      const register = createBaseSiteAwareRoute({
        pathBaseSiteIds,
        indexHtml:
          '<meta name="occ-backend-base-url" content="https://api.example">',
      });
      const response = createResponse();
      const next = createNext();

      await dispatch(
        register({
          route: '/example.txt',
          handler: ({ res, baseSite }) => res.send(baseSite),
        }),
        createRequest({ originalUrl: '/electronics-spa/example.txt' }),
        response,
        next
      );

      expect(response.send).toHaveBeenCalledWith('electronics-spa');
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(next).not.toHaveBeenCalled();
    }
  );

  it('maps missing OCC configuration to 503 on the prefixed route when no IDs are supplied', async () => {
    const register = createBaseSiteAwareRoute({ indexHtml: '<html></html>' });
    const response = createResponse();
    const next = createNext();

    await dispatch(
      register({
        route: '/example.txt',
        handler: ({ res }) => res.send('unexpected'),
      }),
      createRequest({ originalUrl: '/electronics-spa/example.txt' }),
      response,
      next
    );

    expect(response.status).toHaveBeenCalledWith(503);
    expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '25');
    expect(response.send).toHaveBeenCalledWith('Service Unavailable');
    expect(next).not.toHaveBeenCalled();
  });

  it('prefers configured path IDs even when OCC is available', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch');
    const register = createBaseSiteAwareRoute({
      pathBaseSiteIds: ['electronics-spa'],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });
    const response = createResponse();
    await dispatch(
      register({
        route: '/llms.txt',
        handler: ({ res, baseSite }) => {
          res.send(baseSite);
        },
      }),
      createRequest({ originalUrl: '/electronics-spa/llms.txt' }),
      response,
      createNext()
    );
    expect(response.send).toHaveBeenCalledWith('electronics-spa');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each([undefined, [], ['electronics-spa']])(
    'rejects an unknown prefix before invoking the handler with IDs %j',
    async (pathBaseSiteIds) => {
      jest.spyOn(globalThis, 'fetch').mockResolvedValue(
        new globalThis.Response(
          JSON.stringify({
            baseSites: [
              {
                uid: 'electronics-spa',
                urlPatterns: ['^http://internal\\.example/'],
              },
            ],
          })
        )
      );
      const register = createBaseSiteAwareRoute({
        pathBaseSiteIds,
        indexHtml: '<html></html>',
        occBaseUrl: 'https://api.example',
      });
      const handler = jest.fn();
      const response = createResponse();
      const next = createNext();

      await dispatch(
        register({ route: '/example.txt', handler }),
        createRequest({ originalUrl: '/janusz-grazyna/example.txt' }),
        response,
        next
      );

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.send).toHaveBeenCalledWith('Not Found');
      expect(handler).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    }
  );

  it('resolves the known prefix even when another OCC site has a broad matching URL pattern', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new globalThis.Response(
        JSON.stringify({
          baseSites: [
            { uid: 'apparel-uk', urlPatterns: ['^http://internal\\.example/'] },
            {
              uid: 'electronics-spa',
              urlPatterns: ['^http://internal\\.example/'],
            },
          ],
        })
      )
    );
    const register = createBaseSiteAwareRoute({
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });
    const response = createResponse();
    const next = createNext();

    await dispatch(
      register({
        route: '/example.txt',
        handler: ({ res, baseSite }) => res.send(baseSite),
      }),
      createRequest({ originalUrl: '/electronics-spa/example.txt' }),
      response,
      next
    );

    expect(response.send).toHaveBeenCalledWith('electronics-spa');
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects a known prefix when its OCC URL patterns do not match', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new globalThis.Response(
        JSON.stringify({
          baseSites: [
            { uid: 'apparel-uk', urlPatterns: ['^http://internal\\.example/'] },
            {
              uid: 'electronics-spa',
              urlPatterns: ['^https://other\\.example/'],
            },
          ],
        })
      )
    );
    const register = createBaseSiteAwareRoute({
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });
    const handler = jest.fn();
    const response = createResponse();

    await dispatch(
      register({ route: '/example.txt', handler }),
      createRequest({ originalUrl: '/electronics-spa/example.txt' }),
      response,
      createNext()
    );

    expect(response.status).toHaveBeenCalledWith(404);
    expect(handler).not.toHaveBeenCalled();
  });
});

describe('setBaseSiteHandler', () => {
  describe('local resolution', () => {
    it('passes the base site in the callback context without extending the request', async () => {
      const resolver = createResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',

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
      expect(handler).toHaveBeenCalledWith({
        req: request,
        res: response,
        next: expect.any(Function),
        baseSite: 'electronics-spa',
      });
      expect(request).not.toHaveProperty('baseSite');
      expect(resolver.resolveFromOcc).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

    it('returns 404 without invoking the handler when the path is unknown', async () => {
      const resolver = createResolver({
        supportsOccResolution: false,
        resolveFromPath: jest.fn().mockReturnValue(null),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',

        handler,
      });
      const request = createRequest({ originalUrl: '/unknown/llms.txt' });
      const response = createResponse();
      const next = createNext();

      await dispatch(middleware, request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(handler).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(request).not.toHaveProperty('baseSite');
    });

    it('accepts a callback that ignores the base site', async () => {
      const resolver = createResolver({ supportsOccResolution: false });
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',

        handler: ({ res }) => {
          res.send('Shared guidance');
        },
      });
      const response = createResponse();

      await dispatch(
        middleware,
        createRequest({ originalUrl: '/electronics-spa/llms.txt' }),
        response,
        createNext()
      );

      expect(response.send).toHaveBeenCalledWith('Shared guidance');
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

    it.each([false, true])(
      'adds the base-site prefix to a RegExp route with OCC resolution %j',
      async (supportsOccResolution) => {
        const resolver = createResolver({
          supportsOccResolution,
          resolveFromPath: jest.fn().mockReturnValue('electronics-spa'),
          resolveFromOcc: jest.fn().mockResolvedValue('electronics-spa'),
        });
        const handler = jest.fn();
        const middleware = setBaseSiteHandler(resolver, {
          route: /^\/llms\.txt$/,

          handler,
        });

        await dispatch(
          middleware,
          createRequest({ originalUrl: '/electronics-spa/llms.txt' }),
          createResponse(),
          createNext()
        );

        expect(handler).toHaveBeenCalledTimes(1);
      }
    );

    it.each([
      '/llms.txt',
      '/electronics-spa/other.txt',
      '/electronics-spa/llmsXtxt',
      '/electronics-spa/nested/llms.txt',
    ])(
      'falls through without resolving when %s does not match the prefixed route',
      async (originalUrl) => {
        const resolver = createResolver({ supportsOccResolution: false });
        const handler = jest.fn();
        const next = createNext();
        const middleware = setBaseSiteHandler(resolver, {
          route: '/llms.txt',

          handler,
        });

        await dispatchToNext(
          middleware,
          createRequest({ originalUrl }),
          createResponse(),
          next
        );

        expect(next).toHaveBeenCalledTimes(1);
        expect(handler).not.toHaveBeenCalled();
        expect(resolver.resolveFromPath).not.toHaveBeenCalled();
        expect(resolver.resolveFromOcc).not.toHaveBeenCalled();
      }
    );
  });

  describe('OCC resolution', () => {
    it.each([null, 'apparel-uk'])(
      'rejects a resolver result %j that does not identify the requested prefix',
      async (baseSite) => {
        const resolver = createResolver({
          resolveFromOcc: jest.fn().mockResolvedValue(baseSite),
        });
        const handler = jest.fn();
        const response = createResponse();
        const next = createNext();

        await dispatch(
          setBaseSiteHandler(resolver, { route: '/llms.txt', handler }),
          createRequest(),
          response,
          next
        );

        expect(response.status).toHaveBeenCalledWith(404);
        expect(handler).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
      }
    );

    it('resolves prefixed routes through OCC when IDs come from OCC', async () => {
      const resolver = createResolver({
        resolveFromOcc: jest.fn().mockResolvedValue('electronics-spa'),
      });
      const handler = jest.fn();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',
        handler,
      });
      const request = createRequest();

      await dispatch(middleware, request, createResponse(), createNext());

      expect(resolver.resolveFromOcc).toHaveBeenCalledWith(
        'http://internal.example/electronics-spa/llms.txt',
        'electronics-spa'
      );
      expect(handler).toHaveBeenCalledWith({
        req: request,
        res: expect.anything(),
        next: expect.any(Function),
        baseSite: 'electronics-spa',
      });
      expect(request).not.toHaveProperty('baseSite');
      expect(resolver.resolveFromPath).not.toHaveBeenCalled();
    });
  });

  describe('failure mapping', () => {
    it('adapts an ordinary handler and preserves the Express objects and next(error)', async () => {
      const request = createRequest();
      const response = createResponse();
      const error = new Error('ordinary handler error');
      const next = createNext();
      const ordinaryHandler = (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        expect(req).toBe(request);
        expect(res).toBe(response);
        res.send('ordinary response');
        next(error);
      };
      const middleware = setBaseSiteHandler(createResolver(), {
        route: '/llms.txt',
        handler: ({ req, res, next }) => ordinaryHandler(req, res, next),
      });
      await dispatchToNext(middleware, request, response, next);
      expect(response.send).toHaveBeenCalledWith('ordinary response');
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });

    it.each([undefined, 'route'])(
      'preserves callback next(%j)',
      async (signal) => {
        const next = createNext();
        const middleware = setBaseSiteHandler(createResolver(), {
          route: '/llms.txt',
          handler: ({ next }) => next(signal),
        });
        await dispatchToNext(
          middleware,
          createRequest(),
          createResponse(),
          next
        );
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalledWith('route');
      }
    );

    it('forwards a rejected callback promise to next()', async () => {
      const error = new Error('async callback error');
      const next = createNext();
      const middleware = setBaseSiteHandler(createResolver(), {
        route: '/llms.txt',
        handler: async ({ req }) => {
          expect(req.originalUrl).toBe('/electronics-spa/llms.txt');
          throw error;
        },
      });
      await dispatchToNext(middleware, createRequest(), createResponse(), next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
    });

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
        handler: jest.fn(),
        retryAfterSeconds: { concurrencyLimit: 7, occUnavailable: 40 },
      });

      await dispatch(middleware, createRequest(), response, createNext());

      expect(response.setHeader).toHaveBeenCalledWith('Retry-After', '7');
      expect(response.status).toHaveBeenCalledWith(503);
    });

    it('forwards a thrown handler error to next()', async () => {
      const error = new Error('handler failure');
      const resolver = createResolver({ supportsOccResolution: false });
      const next = createNext();
      const middleware = setBaseSiteHandler(resolver, {
        route: '/llms.txt',

        handler: () => {
          throw error;
        },
      });

      await dispatchToNext(
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
        handler: jest.fn(),
      });

      await dispatchToNext(middleware, createRequest(), createResponse(), next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
