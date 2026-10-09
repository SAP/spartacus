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
      occBaseUrl: 'https://api.example',
    });

    await expect(
      resolver.resolve('https://shop.example/electronics/en/USD')
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
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'valid'
    );
  });

  it('returns the configured default when no pattern matches', async () => {
    fetchSpy.mockResolvedValue(
      occResponse([{ uid: 'other', urlPatterns: ['^https://other'] }])
    );
    const resolver = new DefaultBaseSiteResolver({
      occBaseUrl: 'https://api.example',
      defaultBaseSite: 'fallback',
    });

    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'fallback'
    );
  });

  it('returns null when no pattern matches and no default is configured', async () => {
    fetchSpy.mockResolvedValue(occResponse([]));
    const resolver = new DefaultBaseSiteResolver({
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolve('https://shop.example/')).resolves.toBeNull();
  });

  it('uses the configured default without caching an omitted baseSites payload', async () => {
    fetchSpy
      .mockResolvedValueOnce(occResponse())
      .mockResolvedValueOnce(
        occResponse([{ uid: 'site', urlPatterns: ['shop\\.example'] }])
      );
    const resolver = new DefaultBaseSiteResolver({
      occBaseUrl: 'https://api.example',
      defaultBaseSite: 'fallback',
    });

    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'fallback'
    );
    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
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
      occBaseUrl: 'https://api.example',
    });

    await expect(
      resolver.resolve('https://shop.example/')
    ).rejects.toBeInstanceOf(OccUnavailableError);
    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'site'
    );
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['https://api.example', undefined],
    ['https://api.example/', undefined],
    ['https://api.example', '/custom/v3/'],
    ['https://api.example/', 'custom/v3'],
    ['https://api.example/', '/custom/v3/'],
  ])(
    'normalizes OCC URL parts for base %s and prefix %s',
    async (occBaseUrl, occApiPrefix) => {
      fetchSpy.mockResolvedValue(occResponse([]));
      const resolver = new DefaultBaseSiteResolver({
        occBaseUrl,
        occApiPrefix,
      });

      await resolver.resolve('https://shop.example/');

      const expectedPrefix = occApiPrefix ? '/custom/v3' : '/occ/v2';
      expect(fetchSpy).toHaveBeenCalledWith(
        `https://api.example${expectedPrefix}/basesites?fields=FULL`,
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
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'site'
    );
    await expect(resolver.resolve('https://shop.example/again')).resolves.toBe(
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
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'first'
    );
    now = 60_999;
    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'first'
    );
    now = 61_000;
    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'second'
    );

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('deduplicates ten cold-cache callers and sheds the eleventh', async () => {
    const pendingResponse = deferred<Response>();
    fetchSpy.mockReturnValue(pendingResponse.promise);
    const resolver = new DefaultBaseSiteResolver({
      occBaseUrl: 'https://api.example',
    });

    const accepted = Array.from({ length: 10 }, () =>
      resolver.resolve('https://shop.example/')
    );
    const shed = resolver.resolve('https://shop.example/');
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
      occBaseUrl: 'https://api.example',
      cacheTtlMs: 0,
      concurrencyLimit: 1,
    });

    const first = resolver.resolve('https://shop.example/');
    const shed = resolver.resolve('https://shop.example/');
    firstResponse.resolve(occResponse([]));

    await expect(shed).rejects.toBeInstanceOf(ConcurrencyLimitError);
    await expect(first).resolves.toBeNull();
    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
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
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolve('https://shop.example/')).rejects.toEqual(
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
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolve('https://shop.example/')).rejects.toEqual(
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
      occBaseUrl: 'https://api.example',
    });

    await expect(resolver.resolve('https://shop.example/')).rejects.toEqual(
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
      occBaseUrl: 'https://api.example',
      concurrencyLimit: 1,
    });

    const result = resolver.resolve('https://shop.example/');
    const shed = resolver.resolve('https://shop.example/');
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
    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'site'
    );
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('clears the timeout after a successful OCC response', async () => {
    jest.useFakeTimers();
    fetchSpy.mockResolvedValue(occResponse([]));
    const resolver = new DefaultBaseSiteResolver({
      occBaseUrl: 'https://api.example',
    });

    await resolver.resolve('https://shop.example/');

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
      occBaseUrl: 'https://api.example',
      concurrencyLimit: 2,
    });

    const accepted = [
      resolver.resolve('https://shop.example/'),
      resolver.resolve('https://shop.example/'),
    ];
    const shed = resolver.resolve('https://shop.example/');
    const expectedFailures = accepted.map((result) =>
      expect(result).rejects.toBeInstanceOf(OccUnavailableError)
    );
    const expectedShed = expect(shed).rejects.toBeInstanceOf(
      ConcurrencyLimitError
    );
    failedResponse.reject(new Error('temporary failure'));

    await Promise.all(expectedFailures);
    await expectedShed;
    await expect(resolver.resolve('https://shop.example/')).resolves.toBe(
      'site'
    );
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
