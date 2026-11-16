/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getServerRuntimeEnvironment } from './get-server-runtime-environment';

function stubFetch(response: Partial<Response>): jest.Mock {
  const mock = jest.fn().mockResolvedValue(response as Response);
  (globalThis as any).fetch = mock;
  return mock;
}

function okJson(body: object): Partial<Response> {
  return {
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
  };
}

describe('getServerRuntimeEnvironment', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete (globalThis as any).fetch;
  });

  it('should fetch configuration from the provided URL', async () => {
    const fetchSpy = stubFetch(
      okJson({
        OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
        MEDIA_BASE_URL: { value: 'https://api.commerce.sap.com/medias' },
      })
    );

    const result = await getServerRuntimeEnvironment({
      url: 'https://config-server/config.json',
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://config-server/config.json',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
    expect(result).toEqual({
      OCC_BASE_URL: 'https://api.commerce.sap.com',
      MEDIA_BASE_URL: 'https://api.commerce.sap.com/medias',
    });
  });

  it('should return empty object when url is absent (graceful fallback)', async () => {
    const result = await getServerRuntimeEnvironment({ url: undefined });

    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should return empty object when url is empty string (graceful fallback)', async () => {
    const result = await getServerRuntimeEnvironment({ url: '' });

    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should filter out secret entries from SSR runtime environment', async () => {
    stubFetch(
      okJson({
        OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
        API_KEY: { value: 'sk-abc123', secret: 'true' },
      })
    );

    const result = await getServerRuntimeEnvironment({
      url: 'https://config-server/config.json',
    });

    expect(result).toEqual({ OCC_BASE_URL: 'https://api.commerce.sap.com' });
    expect(result).not.toHaveProperty('API_KEY');
  });

  it('should return empty object on non-ok response', async () => {
    stubFetch({ ok: false, status: 500, statusText: 'Internal Server Error' });

    const result = await getServerRuntimeEnvironment({
      url: 'https://config-server/config.json',
    });

    expect(result).toEqual({});
  });

  it('should return empty object and warn on network error', async () => {
    (globalThis as any).fetch = jest
      .fn()
      .mockRejectedValue(new TypeError('fetch failed'));

    const result = await getServerRuntimeEnvironment({
      url: 'https://config-server/config.json',
    });

    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should return empty object and warn when HTTP fetch times out (AbortError)', async () => {
    const abortError = Object.assign(new Error('The operation was aborted'), {
      name: 'AbortError',
    });
    (globalThis as any).fetch = jest.fn().mockRejectedValue(abortError);

    const result = await getServerRuntimeEnvironment({
      url: 'https://config-server/config.json',
    });

    expect(result).toEqual({});
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Timed out'),
      expect.anything()
    );
  });

  describe('file:// scheme', () => {
    let tmpFile: string;

    afterEach(() => {
      if (tmpFile && fs.existsSync(tmpFile)) {
        fs.unlinkSync(tmpFile);
      }
    });

    it('should read config from disk when url uses file:// scheme', async () => {
      tmpFile = path.join(os.tmpdir(), 'spartacus-test-config.json');
      fs.writeFileSync(
        tmpFile,
        JSON.stringify({
          OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
        })
      );

      const result = await getServerRuntimeEnvironment({
        url: pathToFileURL(tmpFile).href,
      });

      expect(result).toEqual({ OCC_BASE_URL: 'https://api.commerce.sap.com' });
    });

    it('should filter secrets when reading from file:// scheme', async () => {
      tmpFile = path.join(os.tmpdir(), 'spartacus-test-secrets.json');
      fs.writeFileSync(
        tmpFile,
        JSON.stringify({
          OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
          API_KEY: { value: 'sk-secret', secret: 'true' },
        })
      );

      const result = await getServerRuntimeEnvironment({
        url: pathToFileURL(tmpFile).href,
      });

      expect(result).toEqual({ OCC_BASE_URL: 'https://api.commerce.sap.com' });
      expect(result).not.toHaveProperty('API_KEY');
    });

    it('should return empty object and warn when file:// file does not exist', async () => {
      const result = await getServerRuntimeEnvironment({
        url: 'file:///nonexistent/path/config.json',
      });

      expect(result).toEqual({});
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should return empty object and warn when file:// file contains invalid JSON', async () => {
      tmpFile = path.join(os.tmpdir(), 'spartacus-test-invalid.json');
      fs.writeFileSync(tmpFile, 'NOT_VALID_JSON');

      const result = await getServerRuntimeEnvironment({
        url: pathToFileURL(tmpFile).href,
      });

      expect(result).toEqual({});
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});
