/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, LoggerService } from '@spartacus/core';
import { OpfApiBaseAdapter } from './opf-api-base.adapter';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  ActiveConfiguration,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfConfig,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { map } from 'rxjs';

const mockActiveConfigurations: ActiveConfiguration[] = [
  {
    id: 1,
    description: 'First active configuration',
    merchantId: 'merchant-123',
    providerType: OpfPaymentProviderType.PAYMENT_GATEWAY,
    displayName: 'Payment Gateway 1',
    acquirerCountryCode: 'US',
  },
  {
    id: 2,
    description: 'Second active configuration',
    merchantId: 'merchant-456',
    providerType: OpfPaymentProviderType.PAYMENT_METHOD,
    displayName: 'Payment Method 2',
    acquirerCountryCode: 'CA',
  },
];

const mockErrorResponse = new HttpErrorResponse({
  error: 'test 404 error',
  status: 404,
  statusText: 'Not Found',
});

class MockLoggerService implements Partial<LoggerService> {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

const mockOpfConfig: OpfConfig = {
  opf: {
    commerceCloudPublicKey: 'test-public-key',
  },
};

class MockOpfEndpointsService implements Partial<OpfEndpointsService> {
  buildUrl(endpoint: string): string {
    return `test-url/${endpoint}`;
  }
}

describe('OpfApiBaseAdapter', () => {
  let service: OpfApiBaseAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let opfEndpointsService: OpfEndpointsService;
  let logger: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OpfApiBaseAdapter,
        ConverterService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: OpfEndpointsService, useClass: MockOpfEndpointsService },
        { provide: OpfConfig, useValue: mockOpfConfig },
      ],
    });

    service = TestBed.inject(OpfApiBaseAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    opfEndpointsService = TestBed.inject(OpfEndpointsService);
    logger = TestBed.inject(LoggerService);

    spyOn(converter, 'pipeable').and.returnValue(
      map(() => mockActiveConfigurations)
    );
    spyOn(logger, 'error').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    if (opfEndpointsService) {
    }
    expect(service).toBeTruthy();
  });

  it('should fetch active configurations successfully', () => {
    service.getActiveConfigurations().subscribe((result) => {
      expect(result).toEqual(mockActiveConfigurations);
    });

    const req = httpMock.expectOne('test-url/getActiveConfigurations');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Accept-Language')).toBe('en-us');
    expect(req.request.headers.get(OPF_CC_PUBLIC_KEY_HEADER)).toBe(
      'test-public-key'
    );

    req.flush(mockActiveConfigurations);
  });

  it('should handle http errors when fetching active configurations', () => {
    service.getActiveConfigurations().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('test-url/getActiveConfigurations');
    req.flush(mockErrorResponse, { status: 404, statusText: 'Not Found' });
  });
});
