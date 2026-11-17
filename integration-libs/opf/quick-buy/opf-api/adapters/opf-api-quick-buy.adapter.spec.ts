/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ConverterService, LoggerService } from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OPF_CC_ACCESS_CODE_HEADER,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
  OpfMetadataStatePersistanceService,
} from '@spartacus/opf/base/root';
import { ApplePaySessionVerificationRequest } from '@spartacus/opf/quick-buy/root';
import { firstValueFrom, Observable } from 'rxjs';
import { OpfApiQuickBuyAdapter } from './opf-api-quick-buy.adapter';

class MockOpfMetadataStatePersistanceService
  implements Partial<OpfMetadataStatePersistanceService>
{
  getActiveLanguage(): string {
    return 'en-us';
  }
}

describe('OpfApiQuickBuyAdapter', () => {
  let service: OpfApiQuickBuyAdapter;
  let httpMock: HttpTestingController;
  let mockConverter: any;
  let mockOpfEndpointsService: any;
  let mockOpfConfig: OpfConfig;
  let mockLogger: any;

  const applePaySessionRequest: ApplePaySessionVerificationRequest = {
    validationUrl: 'https://example.com',
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
    mockConverter = { pipeable: vi.fn() };
    mockOpfEndpointsService = { buildUrl: vi.fn() };
    mockLogger = { warn: vi.fn(), error: vi.fn() };
    mockOpfConfig = { opf: { commerceCloudPublicKey: 'public-key' } };

    TestBed.configureTestingModule({
      providers: [
        OpfApiQuickBuyAdapter,
        { provide: ConverterService, useValue: mockConverter },
        { provide: OpfEndpointsService, useValue: mockOpfEndpointsService },
        { provide: OpfConfig, useValue: mockOpfConfig },
        { provide: LoggerService, useValue: mockLogger },
        {
          provide: OpfMetadataStatePersistanceService,
          useClass: MockOpfMetadataStatePersistanceService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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

  it('should call the correct URL and return the correct response', async () => {
    mockOpfEndpointsService.buildUrl.mockReturnValue('/test-url');
    mockConverter.pipeable.mockImplementation(() => {
      return (source: Observable<any>) => source;
    });

    const promise = firstValueFrom(service.getApplePayWebSession(applePaySessionRequest, accessCode));

    const req = httpMock.expectOne('/test-url');
    expect(req.request.method).toBe('POST');

    const headers = req.request.headers;
    expect(headers.get('Content-Language')).toBe('en-us');
    expect(headers.get(OPF_CC_PUBLIC_KEY_HEADER)).toBe('public-key');
    expect(headers.get(OPF_CC_ACCESS_CODE_HEADER)).toBe(accessCode);

    req.flush(mockResponse);

    const response = await promise;
    expect(response).toEqual(mockResponse);
  });

  it('should handle error and log it', async () => {
    vi.useFakeTimers();
    mockOpfEndpointsService.buildUrl.mockReturnValue('/test-url');
    const mockError = { status: 500, message: 'Server Error' };
    mockConverter.pipeable.mockImplementation(() => {
      return (source: Observable<any>) => source;
    });

    const promise = firstValueFrom(
      service.getApplePayWebSession(applePaySessionRequest, accessCode)
    ).catch((error) => {
      expect(error.status).toBe(500);
    });

    // backOff retries server errors up to 2 times with a timer delay;
    // flush initial request then advance clock + flush each retry
    httpMock.expectOne('/test-url').flush(mockError, { status: 500, statusText: 'Server Error' });
    await vi.runAllTimersAsync();
    httpMock.expectOne('/test-url').flush(mockError, { status: 500, statusText: 'Server Error' });
    await vi.runAllTimersAsync();
    httpMock.expectOne('/test-url').flush(mockError, { status: 500, statusText: 'Server Error' });
    await vi.runAllTimersAsync();

    await promise;
    vi.useRealTimers();
  });
});
