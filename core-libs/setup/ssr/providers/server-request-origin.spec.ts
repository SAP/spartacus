/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
  describe('when SERVER_REQUEST_ORIGIN is present', () => {
    it('should return SERVER_REQUEST_ORIGIN', () => {
      const mockOrigin = 'https://express.origin.com';
      (inject as jest.Mock).mockReturnValue(mockOrigin);

      const result = serverRequestOriginFactory()();

      expect(result).toEqual(mockOrigin);
    });
  });
  describe('when SERVER_REQUEST_ORIGIN is NOT present', () => {
    beforeEach(() => {
      (inject as jest.Mock).mockReturnValue(null);
    });

    describe('and when options.serverRequestOrigin is present', () => {
      it('should return options.serverRequestOrigin', (done) => {
        const optionsOrigin = 'https://express.origin.com';
        const result = serverRequestOriginFactory({
          serverRequestOrigin: optionsOrigin,
        })();
        done();
        expect(result).toEqual(optionsOrigin);
      });
    });
    describe('and when options.serverRequestOrigin is NOT present', () => {
      it('should throw an error if ', () => {
        expect(() => {
          serverRequestOriginFactory()();
        }).toThrowError('');
      });
    });
  });
});
