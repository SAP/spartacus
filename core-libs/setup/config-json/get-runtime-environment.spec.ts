/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  getRuntimeEnvironment,
  isTransferStateAvailable,
} from './get-runtime-environment';

const TEST_URL = '/config.json';

describe('get-runtime-environment', () => {
  describe('isTransferStateAvailable', () => {
    it('should return true when ng-state element exists', () => {
      const script = document.createElement('script');
      script.id = 'ng-state';
      document.body.appendChild(script);

      expect(isTransferStateAvailable()).toBe(true);

      document.body.removeChild(script);
    });

    it('should return false when ng-state element does not exist', () => {
      expect(isTransferStateAvailable()).toBe(false);
    });
  });

  describe('getRuntimeEnvironment', () => {
    let fetchMock: jest.Mock;

    beforeEach(() => {
      fetchMock = jest.fn();
      (globalThis as any).fetch = fetchMock;
    });

    afterEach(() => {
      delete (globalThis as any).fetch;
    });

    it('should return empty runtimeEnvironment when TransferState is available', async () => {
      const script = document.createElement('script');
      script.id = 'ng-state';
      document.body.appendChild(script);

      const result = await getRuntimeEnvironment({ url: TEST_URL });

      expect(result.runtimeEnvironment).toEqual({});
      expect(fetchMock).not.toHaveBeenCalled();

      document.body.removeChild(script);
    });

    it('should fetch the default URL when called without arguments', async () => {
      const mockConfig = {
        OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
        MEDIA_BASE_URL: { value: 'https://api.commerce.sap.com/medias' },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      } as unknown as Response);

      const result = await getRuntimeEnvironment();

      expect(fetchMock).toHaveBeenCalledWith('/config.json');
      expect(result.runtimeEnvironment).toEqual({
        OCC_BASE_URL: 'https://api.commerce.sap.com',
        MEDIA_BASE_URL: 'https://api.commerce.sap.com/medias',
      });
    });

    it('should fetch the provided URL when an explicit url override is given', async () => {
      const mockConfig = {
        OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      } as unknown as Response);

      const result = await getRuntimeEnvironment({ url: TEST_URL });

      expect(fetchMock).toHaveBeenCalledWith(TEST_URL);
      expect(result.runtimeEnvironment).toEqual({
        OCC_BASE_URL: 'https://api.commerce.sap.com',
      });
    });

    it('should filter out secret entries from CSR runtime environment', async () => {
      const mockConfig = {
        OCC_BASE_URL: { value: 'https://api.commerce.sap.com' },
        API_KEY: { value: 'sk-abc123', secret: 'true' },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockConfig),
      } as unknown as Response);

      const result = await getRuntimeEnvironment({ url: TEST_URL });

      expect(result.runtimeEnvironment).toEqual({
        OCC_BASE_URL: 'https://api.commerce.sap.com',
      });
      expect(result.runtimeEnvironment).not.toHaveProperty('API_KEY');
    });

    it('should return empty runtimeEnvironment on fetch failure (non-ok response)', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as unknown as Response);

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const result = await getRuntimeEnvironment({ url: TEST_URL });

      expect(result.runtimeEnvironment).toEqual({});
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should return empty runtimeEnvironment on network error', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const result = await getRuntimeEnvironment({ url: TEST_URL });

      expect(result.runtimeEnvironment).toEqual({});
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
