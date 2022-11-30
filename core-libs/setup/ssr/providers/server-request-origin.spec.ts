/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { SERVER_REQUEST_ORIGIN } from '@spartacus/core';
import { serverRequestOriginFactory } from './server-request-origin';
import { initTest } from './test-utils';

const mockExpressOrigin = 'https://express.origin.com';
const mockOptionsOrigin = 'https://override.origin.com';

describe('serverRequestOriginFactory', () => {
  afterEach(() => {
    TestBed.resetTestEnvironment();
  });

  let resolvedOrigin: string;
  describe('when the express server provides origin', () => {
    describe('when options.serverRequestOrigin is provided', () => {
      beforeEach(() => {
        initTest([
          { provide: SERVER_REQUEST_ORIGIN, useValue: mockExpressOrigin },
        ]);
        TestBed.configureTestingModule({
          providers: [
            {
              provide: SERVER_REQUEST_ORIGIN,
              useFactory: serverRequestOriginFactory({
                serverRequestOrigin: mockOptionsOrigin,
              }),
            },
          ],
        });

        resolvedOrigin = TestBed.inject(SERVER_REQUEST_ORIGIN);
      });

      it('should return the provided options.serverRequestOrigin', () => {
        expect(resolvedOrigin).toEqual(mockOptionsOrigin);
      });
    });

    describe('when options.serverRequestOrigin is NOT provided', () => {
      beforeEach(() => {
        initTest([
          { provide: SERVER_REQUEST_ORIGIN, useValue: mockExpressOrigin },
        ]);
        TestBed.configureTestingModule({
          providers: [
            {
              provide: SERVER_REQUEST_ORIGIN,
              useFactory: serverRequestOriginFactory(),
            },
          ],
        });

        resolvedOrigin = TestBed.inject(SERVER_REQUEST_ORIGIN);
      });

      it('should fall back to express server provider', () => {
        expect(resolvedOrigin).toEqual(mockExpressOrigin);
      });
    });
  });

  describe('when there is no express server', () => {
    describe('when options.serverRequestOrigin is provided', () => {
      beforeEach(() => {
        initTest();
        TestBed.configureTestingModule({
          providers: [
            {
              provide: SERVER_REQUEST_ORIGIN,
              useFactory: serverRequestOriginFactory({
                serverRequestOrigin: mockOptionsOrigin,
              }),
            },
          ],
        });

        resolvedOrigin = TestBed.inject(SERVER_REQUEST_ORIGIN);
      });

      it('should return the provided options.serverRequestOrigin', () => {
        expect(resolvedOrigin).toEqual(mockOptionsOrigin);
      });
    });

    describe('when options.serverRequestOrigin is NOT provided', () => {
      it('should throw an error', () => {
        initTest();
        expect(() => {
          TestBed.resetTestEnvironment();
          TestBed.inject(SERVER_REQUEST_ORIGIN);
        }).toThrow();
      });
    });
  });
});
