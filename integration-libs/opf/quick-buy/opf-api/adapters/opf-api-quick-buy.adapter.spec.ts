/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ConverterService, LoggerService } from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OPF_CC_ACCESS_CODE_HEADER,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
} from '@spartacus/opf/base/root';
import { OpfApiQuickBuyAdapter } from './opf-api-quick-buy.adapter';
import { ApplePaySessionVerificationRequest } from '@spartacus/opf/quick-buy/root';
import { catchError, Observable, throwError } from 'rxjs';

describe('OpfApiQuickBuyAdapter', () => {
  let service: OpfApiQuickBuyAdapter;
  let httpMock: HttpTestingController;
  let mockConverter: jasmine.SpyObj<ConverterService>;
  let mockOpfEndpointsService: jasmine.SpyObj<OpfEndpointsService>;
  let mockOpfConfig: OpfConfig;
  let mockLogger: jasmine.SpyObj<LoggerService>;

  const applePaySessionRequest: ApplePaySessionVerificationRequest = {
    validationUrl: 'https://example.com',
    cartId: 'test',
    initiative: 'web',
    initiativeContext: 'test',
  };

  const accessCode = 'test-access-code';
  const mockResponse = {
    epochTimestamp: 1625230000000,
    expiresAt: 1625233600000,
    merchantSessionIdentifier: 'merchant-session-id',
    nonce: 'test-nonce',
    merchantIdentifier: 'merchant.com.example',
    domainName: 'example.com',
    displayName: 'Example Merchant',
    signature: 'test-signature',
  };

  beforeEach(() => {
    mockConverter = jasmine.createSpyObj('ConverterService', ['pipeable']);
    mockOpfEndpointsService = jasmine.createSpyObj('OpfEndpointsService', [
      'buildUrl',
    ]);
    mockLogger = jasmine.createSpyObj('LoggerService', ['warn', 'error']);
    mockOpfConfig = { opf: { commerceCloudPublicKey: 'public-key' } };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OpfApiQuickBuyAdapter,
        { provide: ConverterService, useValue: mockConverter },
        { provide: OpfEndpointsService, useValue: mockOpfEndpointsService },
        { provide: OpfConfig, useValue: mockOpfConfig },
        { provide: LoggerService, useValue: mockLogger },
      ],
    });

    service = TestBed.inject(OpfApiQuickBuyAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct URL and return the correct response', () => {
    mockOpfEndpointsService.buildUrl.and.returnValue('/test-url');
    mockConverter.pipeable.and.callFake(() => {
      return (source: Observable<any>) => source;
    });
    service
      .getApplePayWebSession(applePaySessionRequest, accessCode)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpMock.expectOne('/test-url');
    expect(req.request.method).toBe('POST');

    const headers = req.request.headers;
    expect(headers.get('Content-Language')).toBe('en-us');
    expect(headers.get(OPF_CC_PUBLIC_KEY_HEADER)).toBe('public-key');
    expect(headers.get(OPF_CC_ACCESS_CODE_HEADER)).toBe(accessCode);

    req.flush(mockResponse);
  });

  it('should handle error and log it', () => {
    mockOpfEndpointsService.buildUrl.and.returnValue('/test-url');
    const mockError = { status: 500, message: 'Server Error' };
    mockConverter.pipeable.and.callFake(() => {
      return (source: Observable<any>) => source;
    });

    service
      .getApplePayWebSession(applePaySessionRequest, accessCode)
      .pipe(
        catchError((error) => {
          expect(mockLogger.error).toHaveBeenCalled();
          return throwError(() => error);
        })
      )
      .subscribe({
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

    const req = httpMock.expectOne('/test-url');
    req.flush(mockError, { status: 500, statusText: 'Server Error' });
  });
});
