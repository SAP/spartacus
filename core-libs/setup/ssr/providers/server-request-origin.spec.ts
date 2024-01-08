/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as injectFn from '@angular/core';
import { serverRequestOriginFactory } from './server-request-origin';

describe('serverRequestOriginFactory', () => {
  describe('when SERVER_REQUEST_ORIGIN is present', () => {
    it('should return SERVER_REQUEST_ORIGIN', () => {
      const mockOrigin = 'https://express.origin.com';
      jest.spyOn(injectFn, 'inject').mockReturnValue(mockOrigin);

      const result = serverRequestOriginFactory()();
      expect(result).toEqual(mockOrigin);
    });
  });
  describe('when SERVER_REQUEST_ORIGIN is NOT present', () => {
    beforeEach(() => {
      jest.spyOn(injectFn, 'inject').mockReturnValue(null);
    });

    describe('and when options.serverRequestOrigin is present', () => {
      it('should return options.serverRequestOrigin', () => {
        const optionsOrigin = 'https://express.origin.com';
        const result = serverRequestOriginFactory({
          serverRequestOrigin: optionsOrigin,
        })();
        expect(result).toEqual(optionsOrigin);
      });
    });
    describe('and when options.serverRequestOrigin is NOT present', () => {
      it('should throw an error if ', () => {
        expect(() => {
          serverRequestOriginFactory()();
        }).toThrowError();
      });
    });
  });
});
