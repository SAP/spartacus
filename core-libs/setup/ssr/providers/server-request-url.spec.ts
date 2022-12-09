/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { reinitializeTestEnvironment } from '../../init-test-environment';
import { serverRequestUrlFactory } from './server-request-url';

describe('serverRequestUrlFactory', () => {
  afterEach(() => {
    reinitializeTestEnvironment();
  });

  const mockOrigin = 'https://some.origin.com';
  const mockPath = '/some/url';

  describe('when SERVER_REQUEST_URL was provided in the platform injector', () => {
    beforeEach(() => {
      reinitializeTestEnvironment({
        platformProviders: [
          {
            provide: SERVER_REQUEST_ORIGIN,
            useValue: mockOrigin,
          },
          {
            provide: SERVER_REQUEST_URL,
            useValue: mockOrigin + mockPath,
          },
          { provide: INITIAL_CONFIG, useValue: {} },
        ],
      });
    });

    describe('when `serverRequestOrigin` was NOT passed in the options', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            {
              provide: SERVER_REQUEST_URL,
              useFactory: serverRequestUrlFactory({
                serverRequestOrigin: undefined,
              }),
            },
          ],
        });
      });

      it('should return SERVER_REQUEST_URL provided in the platform injector', () => {
        const result = TestBed.inject(SERVER_REQUEST_URL);
        expect(result).toEqual(mockOrigin + mockPath);
      });
    });

    describe('when `serverRequestOrigin` was passed in the options', () => {
      const configuredStaticOrigin = 'https://configured.origin.com';

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            {
              provide: SERVER_REQUEST_URL,
              useFactory: serverRequestUrlFactory({
                serverRequestOrigin: configuredStaticOrigin,
              }),
            },
          ],
        });
      });

      it('should return SERVER_REQUEST_URL, but with the origin part replaced to value of `serverRequestOrigin`', () => {
        const result = TestBed.inject(SERVER_REQUEST_URL);
        expect(result).toEqual(configuredStaticOrigin + mockPath);
      });
    });
  });

  describe('when SERVER_REQUEST_URL was NOT provided in the platform injector', () => {
    beforeEach(() => {
      reinitializeTestEnvironment({
        platformProviders: [
          { provide: INITIAL_CONFIG, useValue: { url: mockPath } },
          // Note: no providers for SERVER_REQUEST_URL
        ],
      });
      TestBed.configureTestingModule({
        providers: [
          {
            provide: SERVER_REQUEST_ORIGIN,
            useValue: mockOrigin,
          },
          {
            provide: SERVER_REQUEST_URL,
            useFactory: serverRequestUrlFactory(),
          },
        ],
      });
    });

    it('should use SERVER_REQUEST_ORIGIN and INITIAL_CONFIG.url to build the url', () => {
      const result = TestBed.inject(SERVER_REQUEST_URL);
      expect(result).toEqual(mockOrigin + mockPath);
    });
  });
});
