/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { SERVER_REQUEST_ORIGIN } from '@spartacus/core';
import { reinitializeTestEnvironment } from '../../init-test-environment';
import { serverRequestOriginFactory } from './server-request-origin';

describe('serverRequestOriginFactory', () => {
  afterEach(() => {
    reinitializeTestEnvironment();
  });

  const mockOrigin = 'https://express.origin.com';

  describe('when SERVER_REQUEST_ORIGIN is provided in the platform injector', () => {
    beforeEach(() => {
      reinitializeTestEnvironment({
        platformProviders: [
          {
            provide: SERVER_REQUEST_ORIGIN,
            useValue: mockOrigin,
          },
        ],
      });
    });

    describe('and when options.serverRequestOrigin is NOT present', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            {
              provide: SERVER_REQUEST_ORIGIN,
              useFactory: serverRequestOriginFactory({
                serverRequestOrigin: undefined,
              }),
            },
          ],
        });
      });

      it('should return SERVER_REQUEST_ORIGIN provided in the platform injector', () => {
        const result = TestBed.inject(SERVER_REQUEST_ORIGIN);
        expect(result).toEqual(mockOrigin);
      });
    });

    describe('and when options.serverRequestOrigin is present', () => {
      const configuredStaticOrigin = 'https://configured.origin.com';

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            {
              provide: SERVER_REQUEST_ORIGIN,
              useFactory: serverRequestOriginFactory({
                serverRequestOrigin: configuredStaticOrigin,
              }),
            },
          ],
        });
      });

      it('should return options.serverRequestOrigin', () => {
        const result = TestBed.inject(SERVER_REQUEST_ORIGIN);
        expect(result).toEqual(configuredStaticOrigin);
      });
    });

    describe('when SERVER_REQUEST_ORIGIN is NOT present', () => {
      beforeEach(() => {
        reinitializeTestEnvironment({
          platformProviders: [
            // Note: no providers for SERVER_REQUEST_ORIGIN,
          ],
        });
      });

      describe('and when options.serverRequestOrigin is present', () => {
        const configuredStaticOrigin = 'https://configured.origin.com';

        beforeEach(() => {
          TestBed.configureTestingModule({
            providers: [
              {
                provide: SERVER_REQUEST_ORIGIN,
                useFactory: serverRequestOriginFactory({
                  serverRequestOrigin: configuredStaticOrigin,
                }),
              },
            ],
          });
        });

        it('should return options.serverRequestOrigin', () => {
          const result = TestBed.inject(SERVER_REQUEST_ORIGIN);
          expect(result).toEqual(configuredStaticOrigin);
        });
      });

      describe('and when options.serverRequestOrigin is NOT present', () => {
        beforeEach(() => {
          TestBed.configureTestingModule({
            providers: [
              {
                provide: SERVER_REQUEST_ORIGIN,
                useFactory: serverRequestOriginFactory({
                  serverRequestOrigin: undefined,
                }),
              },
            ],
          });
        });

        it('should throw an error', () => {
          expect(() =>
            TestBed.inject(SERVER_REQUEST_ORIGIN)
          ).toThrowErrorMatchingSnapshot();
        });
      });
    });
  });
});
