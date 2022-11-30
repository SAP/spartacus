/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { serverRequestUrlFactory } from './server-request-url';
import { initTest } from './test-utils';

const mockExpressOrigin = 'https://express.origin.com';
const mockUrlPath = '/home';
const mockExpressUrl = mockExpressOrigin + mockUrlPath;
const mockOverrideOrigin = 'https://override.origin.com';

describe('serverRequestUrlFactory', () => {
  afterEach(() => {
    TestBed.resetTestEnvironment();
  });

  let resolvedUrl: string;
  describe('when the express server provides origin and url', () => {
    describe('when options.serverRequestOrigin is NOT provided', () => {
      beforeEach(() => {
        initTest([
          { provide: SERVER_REQUEST_ORIGIN, useValue: mockExpressOrigin },
          {
            provide: SERVER_REQUEST_URL,
            useValue: mockExpressUrl,
          },
        ]);
        TestBed.configureTestingModule({
          providers: [
            {
              provide: INITIAL_CONFIG,
              useValue: {},
            },
            {
              provide: SERVER_REQUEST_URL,
              useFactory: serverRequestUrlFactory(),
            },
          ],
        });

        resolvedUrl = TestBed.inject(SERVER_REQUEST_URL);
      });

      it('should return the provided options.serverRequestOrigin', () => {
        expect(resolvedUrl).toEqual(mockExpressUrl);
      });
    });

    describe('when options.serverRequestOrigin is provided', () => {
      beforeEach(() => {
        initTest([
          { provide: SERVER_REQUEST_ORIGIN, useValue: mockExpressOrigin },
          {
            provide: SERVER_REQUEST_URL,
            useValue: mockExpressUrl,
          },
        ]);
        TestBed.configureTestingModule({
          providers: [
            {
              provide: INITIAL_CONFIG,
              useValue: {},
            },
            {
              provide: SERVER_REQUEST_URL,
              useFactory: serverRequestUrlFactory({
                serverRequestOrigin: mockOverrideOrigin,
              }),
            },
          ],
        });

        resolvedUrl = TestBed.inject(SERVER_REQUEST_URL);
      });

      it('should return the provided options.serverRequestOrigin', () => {
        expect(resolvedUrl).toEqual(mockOverrideOrigin + mockUrlPath);
      });
    });
  });

  describe('when there is no express server', () => {
    beforeEach(() => {
      initTest();
      TestBed.configureTestingModule({
        providers: [
          {
            provide: SERVER_REQUEST_ORIGIN,
            useValue: mockOverrideOrigin,
          },
          {
            provide: INITIAL_CONFIG,
            useValue: {
              url: mockUrlPath,
            },
          },
          {
            provide: SERVER_REQUEST_URL,
            useFactory: serverRequestUrlFactory({
              serverRequestOrigin: mockOverrideOrigin,
            }),
          },
        ],
      });

      resolvedUrl = TestBed.inject(SERVER_REQUEST_URL);
    });

    it('should use the provided SERVER_REQUEST_ORIGIN and INITIAL_CONFIG', () => {
      expect(resolvedUrl).toEqual(mockOverrideOrigin + mockUrlPath);
    });
  });
});
