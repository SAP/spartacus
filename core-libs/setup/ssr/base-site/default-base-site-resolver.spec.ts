/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ConcurrencyLimitError,
  OccUnavailableError,
} from './base-site-resolver';
import { DefaultBaseSiteResolver } from './default-base-site-resolver';

interface OccBaseSiteFixture {
  uid?: string;
  urlPatterns?: string[];
}

function occResponse(baseSites?: OccBaseSiteFixture[]): Response {
  return {
    ok: true,
    status: 200,
    json: jest
      .fn()
      .mockResolvedValue(baseSites === undefined ? {} : { baseSites }),
  } as unknown as Response;
}

function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
} {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

describe('DefaultBaseSiteResolver.resolveFromPath', () => {
  const resolver = new DefaultBaseSiteResolver({
    pathBaseSiteIds: ['electronics-spa', 'apparel-uk'],
    indexHtml: '<html></html>',
  });
  it('returns the leading path segment when it is a known uid', () => {
    expect(resolver.resolveFromPath('https://host/electronics-spa/llms.txt')).toBe('electronics-spa');
  });
  it('returns null when the leading segment is not a known uid', () => {
    expect(resolver.resolveFromPath('https://host/unknown-site/llms.txt')).toBeNull();
  });
  it('ignores query string and trailing slash', () => {
    expect(resolver.resolveFromPath('https://host/apparel-uk/llms.txt?x=1')).toBe('apparel-uk');
  });
  it('returns null when there is no leading segment', () => {
    expect(resolver.resolveFromPath('https://host/llms.txt')).toBeNull();
  });
});

describe('DefaultBaseSiteResolver', () => {
  const originalFetch = globalThis.fetch;
  let fetchSpy: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    fetchSpy = jest.fn();
    globalThis.fetch = fetchSpy;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('resolves dynamic sites without a static uid list and prefers HTML over an explicit fallback', async () => {
    fetchSpy.mockResolvedValue(
      occResponse([
        { uid: 'electronics-spa', urlPatterns: ['^https://shop\\.example/'] },
      ])
    );
    const resolver = new DefaultBaseSiteResolver({
      indexHtml:
        '<meta name="occ-backend-base-url" content="https://html-api.example">',
      occBaseUrl: 'https://fallback-api.example',
    });

    await expect(
      resolver.resolveFromOcc('https://shop.example/example.txt')
    ).resolves.toBe('electronics-spa');
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://html-api.example/occ/v2/basesites?fields=FULL',
      expect.objectContaining({ headers: { Accept: 'application/json' } })
    );
    expect(
      resolver.resolveFromPath(
        'https://shop.example/electronics-spa/example.txt'
      )
    ).toBeNull();
  });

  it('uses the explicit fallback for dynamic sites when the HTML contains a placeholder', async () => {
    fetchSpy.mockResolvedValue(
      occResponse([
        { uid: 'electronics-spa', urlPatterns: ['^https://shop\\.example/'] },
      ])
    );
    const resolver = new DefaultBaseSiteResolver({
      indexHtml:
        '<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE">',
      occBaseUrl: 'https://fallback-api.example',
    });

    await expect(
      resolver.resolveFromOcc('https://shop.example/example.txt')
    ).resolves.toBe('electronics-spa');
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://fallback-api.example/occ/v2/basesites?fields=FULL',
      expect.anything()
    );
  });

  it('returns the first base site whose converted URL pattern matches', async () => {
    fetchSpy.mockResolvedValue(
      occResponse([
        { uid: 'wrong', urlPatterns: ['^https://wrong\\.example'] },
        {
          uid: 'electronics-spa',
          urlPatterns: ['(?i)^https://shop\\.example/electronics'],
        },
        { uid: 'later', urlPatterns: ['^https://shop\\.example'] },
      ])
    );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(
      resolver.resolveFromOcc('https://shop.example/electronics/en/USD')
    ).resolves.toBe('electronics-spa');
  });

  it('skips invalid patterns and continues matching later base sites', async () => {
    fetchSpy.mockResolvedValue(
      occResponse([
        { uid: 'invalid', urlPatterns: ['(unclosed'] },
        { uid: 'valid', urlPatterns: ['^https://shop\\.example'] },
      ])
    );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'valid'
    );
  });

  it('returns null when no pattern matches', async () => {
    fetchSpy.mockResolvedValue(
      occResponse([{ uid: 'other', urlPatterns: ['^https://other'] }])
    );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBeNull();
  });

  it('returns null for an empty base-sites payload', async () => {
    fetchSpy.mockResolvedValue(occResponse([]));
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBeNull();
  });

  it('does not cache an omitted baseSites payload', async () => {
    fetchSpy
      .mockResolvedValueOnce(occResponse())
      .mockResolvedValueOnce(
        occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
      );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(
      resolver.resolveFromOcc('https://shop.example/')
    ).resolves.toBeNull();
    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'site'
    );
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('rejects a malformed payload without poisoning the cache', async () => {
    fetchSpy
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({
          baseSites: [{ uid: 'site', urlPatterns: 'shop.example' }],
        }),
      } as unknown as Response)
      .mockResolvedValueOnce(
        occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
      );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(
      resolver.resolveFromOcc('https://shop.example/')
    ).rejects.toBeInstanceOf(OccUnavailableError);
    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'site'
    );
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['https://api.example'],
    ['https://api.example/'],
  ])(
    'normalizes OCC URL trailing slash for base %s',
    async (occBaseUrl) => {
      fetchSpy.mockResolvedValue(occResponse([]));
      const resolver = new DefaultBaseSiteResolver({
        pathBaseSiteIds: [],
        indexHtml: '<html></html>',
        occBaseUrl,
      });

      await resolver.resolveFromOcc('https://shop.example/');

      expect(fetchSpy).toHaveBeenCalledWith(
        `https://api.example/occ/v2/basesites?fields=FULL`,
        expect.objectContaining({
          headers: { Accept: 'application/json' },
        })
      );
    }
  );

  it('serves repeated resolves from the warm cache', async () => {
    fetchSpy.mockResolvedValue(
      occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
    );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'site'
    );
    await expect(resolver.resolveFromOcc('https://shop.example/again')).resolves.toBe(
      'site'
    );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('refreshes the cache when the 60 second default TTL expires', async () => {
    let now = 1_000;
    jest.spyOn(Date, 'now').mockImplementation(() => now);
    fetchSpy
      .mockResolvedValueOnce(
        occResponse([{ uid: 'first', urlPatterns: ['shop\\.example'] }])
      )
      .mockResolvedValueOnce(
        occResponse([{ uid: 'second', urlPatterns: ['shop\\.example'] }])
      );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'first'
    );
    now = 60_999;
    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'first'
    );
    now = 61_000;
    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'second'
    );

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('deduplicates ten cold-cache callers and sheds the eleventh', async () => {
    const pendingResponse = deferred<Response>();
    fetchSpy.mockReturnValue(pendingResponse.promise);
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    const accepted = Array.from({ length: 10 }, () =>
      resolver.resolveFromOcc('https://shop.example/')
    );
    const shed = resolver.resolveFromOcc('https://shop.example/');
    pendingResponse.resolve(
      occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
    );

    await expect(shed).rejects.toBeInstanceOf(ConcurrencyLimitError);
    await expect(Promise.all(accepted)).resolves.toEqual(
      Array.from({ length: 10 }, () => 'site')
    );
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('releases cold-cache capacity after callers settle', async () => {
    const firstResponse = deferred<Response>();
    fetchSpy
      .mockReturnValueOnce(firstResponse.promise)
      .mockResolvedValueOnce(
        occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
      );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
      cacheTtlMs: 0,
      concurrencyLimit: 1,
    });

    const first = resolver.resolveFromOcc('https://shop.example/');
    const shed = resolver.resolveFromOcc('https://shop.example/');
    firstResponse.resolve(occResponse([]));

    await expect(shed).rejects.toBeInstanceOf(ConcurrencyLimitError);
    await expect(first).resolves.toBeNull();
    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'site'
    );
  });

  it('maps a non-success OCC response to OccUnavailableError', async () => {
    const cancel = jest.fn().mockResolvedValue(undefined);
    fetchSpy.mockResolvedValue({
      ok: false,
      status: 503,
      body: { cancel },
    } as unknown as Response);
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).rejects.toEqual(
      expect.objectContaining({
        name: 'OccUnavailableError',
        message: 'OCC base-sites request failed with status 503',
      })
    );
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it('preserves a network failure as the cause of OccUnavailableError', async () => {
    const networkError = new Error('connection refused');
    fetchSpy.mockRejectedValue(networkError);
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).rejects.toEqual(
      expect.objectContaining({
        name: 'OccUnavailableError',
        cause: networkError,
      })
    );
  });

  it('maps invalid OCC JSON to OccUnavailableError', async () => {
    const parseError = new SyntaxError('invalid JSON');
    fetchSpy.mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockRejectedValue(parseError),
    } as unknown as Response);
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolveFromOcc('https://shop.example/')).rejects.toEqual(
      expect.objectContaining({
        name: 'OccUnavailableError',
        cause: parseError,
      })
    );
  });

  it('releases the timer, shared initialization and capacity after timeout', async () => {
    jest.useFakeTimers();
    const abortError = Object.assign(new Error('aborted'), {
      name: 'AbortError',
    });
    let receivedSignal: AbortSignal | undefined;
    fetchSpy
      .mockImplementationOnce((_input, init) => {
        receivedSignal = init?.signal ?? undefined;
        return new Promise<Response>((_resolve, reject) => {
          receivedSignal?.addEventListener('abort', () => reject(abortError));
        });
      })
      .mockResolvedValueOnce(
        occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
      );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
      concurrencyLimit: 1,
    });

    const result = resolver.resolveFromOcc('https://shop.example/');
    const shed = resolver.resolveFromOcc('https://shop.example/');
    const expectedTimeout = expect(result).rejects.toEqual(
      expect.objectContaining({
        name: 'OccUnavailableError',
        message: 'OCC base-sites request timed out after 3000 ms',
        cause: abortError,
      })
    );
    const expectedShed = expect(shed).rejects.toBeInstanceOf(
      ConcurrencyLimitError
    );
    await jest.advanceTimersByTimeAsync(2_999);
    expect(receivedSignal?.aborted).toBe(false);
    await jest.advanceTimersByTimeAsync(1);

    await expectedTimeout;
    await expectedShed;
    expect(jest.getTimerCount()).toBe(0);
    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'site'
    );
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('clears the timeout after a successful OCC response', async () => {
    jest.useFakeTimers();
    fetchSpy.mockResolvedValue(occResponse([]));
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
    });

    await resolver.resolveFromOcc('https://shop.example/');

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(jest.getTimerCount()).toBe(0);
  });

  it('releases every waiter after a failed shared initialization', async () => {
    const failedResponse = deferred<Response>();
    fetchSpy
      .mockReturnValueOnce(failedResponse.promise)
      .mockResolvedValueOnce(
        occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
      );
    const resolver = new DefaultBaseSiteResolver({
      pathBaseSiteIds: [],
      indexHtml: '<html></html>',
      occBaseUrl: 'https://api.example',
      concurrencyLimit: 2,
    });

    const accepted = [
      resolver.resolveFromOcc('https://shop.example/'),
      resolver.resolveFromOcc('https://shop.example/'),
    ];
    const shed = resolver.resolveFromOcc('https://shop.example/');
    const expectedFailures = accepted.map((result) =>
      expect(result).rejects.toBeInstanceOf(OccUnavailableError)
    );
    const expectedShed = expect(shed).rejects.toBeInstanceOf(
      ConcurrencyLimitError
    );
    failedResponse.reject(new Error('temporary failure'));

    await Promise.all(expectedFailures);
    await expectedShed;
    await expect(resolver.resolveFromOcc('https://shop.example/')).resolves.toBe(
      'site'
    );
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
