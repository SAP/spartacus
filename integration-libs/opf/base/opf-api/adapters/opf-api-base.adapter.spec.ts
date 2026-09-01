/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpErrorResponse,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, LoggerService } from '@spartacus/core';
import { OpfEndpointsService } from '@spartacus/opf/base/core';
import {
  OPF_CC_ACCESS_CODE_HEADER,
  OPF_CC_PUBLIC_KEY_HEADER,
  OpfActiveConfiguration,
  OpfActiveConfigurationsPagination,
  OpfActiveConfigurationsResponse,
  OpfConfig,
  OpfMetadataStatePersistanceService,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import { map, of } from 'rxjs';
import { OpfApiBaseAdapter } from './opf-api-base.adapter';
import {
  ActiveCartFacade,
  CartAccessCodeFacade,
} from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';

const mockActiveConfigurationsPagination: OpfActiveConfigurationsPagination = {
  totalPages: 1,
  number: 1,
  totalElements: 2,
  size: 2,
};

const mockActiveConfigurations: OpfActiveConfiguration[] = [
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

const mockActiveConfigurationsResponse: OpfActiveConfigurationsResponse = {
  value: mockActiveConfigurations,
  page: mockActiveConfigurationsPagination,
};

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

class MockOpfMetadataStatePersistanceService
  implements Partial<OpfMetadataStatePersistanceService>
{
  getActiveLanguage(): string {
    return 'en-us';
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
      providers: [
        OpfApiBaseAdapter,
        ConverterService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: OpfEndpointsService, useClass: MockOpfEndpointsService },
        {
          provide: OpfMetadataStatePersistanceService,
          useClass: MockOpfMetadataStatePersistanceService,
        },
        { provide: OpfConfig, useValue: mockOpfConfig },
        { provide: UserIdService, useValue: { takeUserId: () => of('') } },
        {
          provide: ActiveCartFacade,
          useValue: { takeActiveCartId: () => of('') },
        },
        {
          provide: CartAccessCodeFacade,
          useValue: { getCartAccessCode: () => of(null) },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OpfApiBaseAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    opfEndpointsService = TestBed.inject(OpfEndpointsService);
    logger = TestBed.inject(LoggerService);

    spyOn(converter, 'pipeable').and.returnValue(
      map(() => mockActiveConfigurationsResponse)
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
      expect(result).toEqual(mockActiveConfigurationsResponse);
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

describe('OpfApiBaseAdapter - enableGetActiveConfigurationsAccessCodeHeader', () => {
  let service: OpfApiBaseAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let userIdServiceMock: jasmine.SpyObj<UserIdService>;
  let activeCartFacadeMock: jasmine.SpyObj<ActiveCartFacade>;
  let cartAccessCodeFacadeMock: jasmine.SpyObj<CartAccessCodeFacade>;

  beforeEach(() => {
    userIdServiceMock = jasmine.createSpyObj('UserIdService', ['takeUserId']);
    activeCartFacadeMock = jasmine.createSpyObj('ActiveCartFacade', [
      'takeActiveCartId',
    ]);
    cartAccessCodeFacadeMock = jasmine.createSpyObj('CartAccessCodeFacade', [
      'getCartAccessCode',
    ]);
    userIdServiceMock.takeUserId.and.returnValue(of('user1'));
    activeCartFacadeMock.takeActiveCartId.and.returnValue(of('cart1'));
    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(
      of({ accessCode: 'test-access-code' })
    );

    TestBed.configureTestingModule({
      providers: [
        OpfApiBaseAdapter,
        ConverterService,
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: OpfEndpointsService, useClass: MockOpfEndpointsService },
        {
          provide: OpfMetadataStatePersistanceService,
          useClass: MockOpfMetadataStatePersistanceService,
        },
        {
          provide: OpfConfig,
          useValue: {
            opf: {
              commerceCloudPublicKey: 'test-public-key',
              enableGetActiveConfigurationsAccessCodeHeader: true,
            },
          },
        },
        { provide: UserIdService, useValue: userIdServiceMock },
        { provide: ActiveCartFacade, useValue: activeCartFacadeMock },
        { provide: CartAccessCodeFacade, useValue: cartAccessCodeFacadeMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OpfApiBaseAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    spyOn(converter, 'pipeable').and.returnValue(
      map(() => mockActiveConfigurationsResponse)
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should include access code header', () => {
    service.getActiveConfigurations().subscribe();

    const req = httpMock.expectOne('test-url/getActiveConfigurations');
    expect(req.request.headers.get(OPF_CC_PUBLIC_KEY_HEADER)).toBe(
      'test-public-key'
    );
    expect(req.request.headers.get(OPF_CC_ACCESS_CODE_HEADER)).toBe(
      'test-access-code'
    );
    req.flush(mockActiveConfigurations);
  });

  it('should call getCartAccessCode with userId and cartId', () => {
    service.getActiveConfigurations().subscribe();

    httpMock.expectOne('test-url/getActiveConfigurations').flush([]);

    expect(cartAccessCodeFacadeMock.getCartAccessCode).toHaveBeenCalledWith(
      'user1',
      'cart1'
    );
  });

  it('should send empty string when getCartAccessCode returns null', () => {
    cartAccessCodeFacadeMock.getCartAccessCode.and.returnValue(of(null));

    service.getActiveConfigurations().subscribe();

    const req = httpMock.expectOne('test-url/getActiveConfigurations');
    expect(req.request.headers.get(OPF_CC_ACCESS_CODE_HEADER)).toBe('');
    req.flush([]);
  });
});
