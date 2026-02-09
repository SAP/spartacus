/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { serverRequestOriginFactory } from './server-request-origin';

jest.mock('@angular/core', () => {
  return {
    ...jest.requireActual('@angular/core'),
    inject: jest.fn(),
  };
});

import { inject } from '@angular/core';

describe('serverRequestOriginFactory', () => {
  // Save and restore process.env
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env['SERVER_REQUEST_ORIGIN'];
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('when options.serverRequestOrigin is present', () => {
    it('should return options.serverRequestOrigin (takes precedence)', () => {
      const optionsOrigin = 'https://options.origin.com';
      const injectedOrigin = 'https://injected.origin.com';
      (inject as jest.Mock).mockReturnValue(injectedOrigin);

      const result = serverRequestOriginFactory({
        serverRequestOrigin: optionsOrigin,
      })();

      expect(result).toEqual(optionsOrigin);
    });
  });

  describe('when options.serverRequestOrigin is NOT present', () => {
    describe('and when SERVER_REQUEST_ORIGIN token is present', () => {
      it('should return the injected SERVER_REQUEST_ORIGIN', () => {
        const mockOrigin = 'https://express.origin.com';
        (inject as jest.Mock).mockReturnValue(mockOrigin);

        const result = serverRequestOriginFactory()();

        expect(result).toEqual(mockOrigin);
      });
    });

    describe('and when SERVER_REQUEST_ORIGIN token is NOT present', () => {
      beforeEach(() => {
        (inject as jest.Mock).mockReturnValue(null);
      });

      describe('and when SERVER_REQUEST_ORIGIN env variable is present', () => {
        it('should return the environment variable value', () => {
          process.env['SERVER_REQUEST_ORIGIN'] = 'https://env.origin.com';

          const result = serverRequestOriginFactory()();

          expect(result).toEqual('https://env.origin.com');
        });
      });

      describe('and when SERVER_REQUEST_ORIGIN env variable is NOT present', () => {
        it('should return the default fallback origin', () => {
          const consoleSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});

          const result = serverRequestOriginFactory()();

          expect(result).toEqual('http://localhost:4200');
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('[Spartacus] SERVER_REQUEST_ORIGIN is not set')
          );

          consoleSpy.mockRestore();
        });

        it('should log a warning message', () => {
          const consoleSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});

          serverRequestOriginFactory()();

          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Using fallback origin')
          );
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('build-time route extraction')
          );

          consoleSpy.mockRestore();
        });
      });
    });
  });
});
