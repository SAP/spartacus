/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="jest" />
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  normalizeHttpError,
} from '@spartacus/core';
import { OccOpfAdapter } from './occ-opf.adapter';
import {
  OPF_ACTIVE_CONFIGURATION_NORMALIZER,
  OPF_PAYMENT_CONFIG_SERIALIZER,
  OpfEndpointsService,
} from '@spartacus/opf/checkout/core';
import {
  ActiveConfiguration,
  OPF_CC_PUBLIC_KEY,
  OpfConfig,
  PaymentInitiationConfig,
  PaymentSessionData,
} from '@spartacus/opf/checkout/root';
import { OPF_CC_OTP_KEY } from '@spartacus/opf/base/root';
import { HttpErrorResponse } from '@angular/common/http';

const mockResponse: ActiveConfiguration[] = [
  {
    description: 'Sample description',
    id: 1,
    merchantId: 'sampleMerchantId',
  },
];

const commerceCloudPublicKey = 'testKey';
const mockOpfConfig: OpfConfig = {
  opf: {
    baseUrl: 'testUrl',
    commerceCloudPublicKey,
  },
};

const mockPaymentSessionData: PaymentSessionData = {
  paymentSessionId: '1234567890',
};

const mockPaymentConfig: PaymentInitiationConfig = {
  otpKey: 'testOtpKey',
};

export class MockOpfEndpointsService implements Partial<OpfEndpointsService> {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return this.getEndpoint(endpoint);
  }

  getEndpoint(endpoint: string) {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return endpoint;
  }

  getBaseUrl() {
    return '';
  }

  isConfigured() {
    return true;
  }
}

describe('OccOpfAdapter', () => {
  let occOpfAdapter: OccOpfAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let opfEndpointsService: OpfEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOpfAdapter,
        {
          provide: OpfEndpointsService,
          useClass: MockOpfEndpointsService,
        },
        {
          provide: OpfConfig,
          useValue: mockOpfConfig,
        },
      ],
    });

    occOpfAdapter = TestBed.inject(OccOpfAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    opfEndpointsService = TestBed.inject(OpfEndpointsService);
    spyOn(converter, 'convert').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(opfEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('initiatePayment -', () => {
    afterEach(() => {
      mockOpfConfig.opf.commerceCloudPublicKey = commerceCloudPublicKey;
    });

    it('should set commerceCloudPublicKey to empty string', () => {
      mockOpfConfig.opf.commerceCloudPublicKey = null;
      occOpfAdapter.initiatePayment(mockPaymentConfig).subscribe();
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });
      expect(mockReq.request.headers.get(OPF_CC_PUBLIC_KEY)).toEqual('');
      mockReq.flush(mockPaymentSessionData);
    });

    it('should return a test URL for payment initiation', () => {
      const testUrl = 'testUrl';
      spyOn(occOpfAdapter as any, 'getInitiatePaymentEndpoint').and.returnValue(
        testUrl
      );

      occOpfAdapter.initiatePayment(mockPaymentConfig).subscribe();
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === testUrl;
      });
      mockReq.flush(mockPaymentSessionData);
    });

    it('should initiate payment with correct headers', (done) => {
      const testUrl = 'testUrl';
      spyOn(occOpfAdapter as any, 'getInitiatePaymentEndpoint').and.returnValue(
        testUrl
      );

      occOpfAdapter.initiatePayment(mockPaymentConfig).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === testUrl;
      });

      expect(mockReq.request.headers.get('Accept-Language')).toEqual('en-us');
      expect(mockReq.request.headers.get(OPF_CC_PUBLIC_KEY)).toEqual(
        commerceCloudPublicKey
      );
      expect(mockReq.request.headers.get(OPF_CC_OTP_KEY)).toEqual(
        mockPaymentConfig.otpKey
      );

      done();
    });

    it('should not cancel the HTTP request', (done) => {
      const testUrl = 'testUrl';

      spyOn(occOpfAdapter as any, 'getInitiatePaymentEndpoint').and.returnValue(
        testUrl
      );

      const mockPaymentConfig: PaymentInitiationConfig = {
        otpKey: '',
      };

      occOpfAdapter.initiatePayment(mockPaymentConfig).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === testUrl;
      });

      expect(mockReq.cancelled).toBeFalsy();

      done();
    });

    it('should set the response type to JSON', (done) => {
      occOpfAdapter.initiatePayment(mockPaymentConfig).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });

      expect(mockReq.request.responseType).toEqual('json');

      done();
    });

    it('should use converter for PaymentInitiationConfig', () => {
      const mockPaymentConfig: PaymentInitiationConfig = {
        otpKey: 'testOtpKey',
      };

      occOpfAdapter.initiatePayment(mockPaymentConfig).subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'POST';
        })
        .flush(mockPaymentSessionData); // Provide mock data for PaymentSessionData

      expect(converter.convert).toHaveBeenCalledWith(
        mockPaymentConfig,
        OPF_PAYMENT_CONFIG_SERIALIZER
      );
    });

    it('should handle errors', (done) => {
      const mockError = new HttpErrorResponse({ error: 'error' });
      const normalizedError = normalizeHttpError(mockError);

      occOpfAdapter.initiatePayment(mockPaymentConfig).subscribe((error) => {
        expect(error).toEqual(normalizedError);
      });

      httpMock
        .expectOne((req) => {
          return req.method === 'POST';
        })
        .flush(normalizedError);

      done();
    });
  });

  describe('getActiveConfigurations -', () => {
    it('should return cart modification list based on provided params', () => {
      occOpfAdapter.getActiveConfigurations().subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(opfEndpointsService.buildUrl).toHaveBeenCalled();
      expect(
        mockReq.request.headers.get('sap-commerce-cloud-public-key')
      ).toEqual(commerceCloudPublicKey);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockResponse);
    });

    it('should use converter', () => {
      occOpfAdapter.getActiveConfigurations().subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'GET';
        })
        .flush(mockResponse);
      expect(converter.pipeable).toHaveBeenCalledWith(
        OPF_ACTIVE_CONFIGURATION_NORMALIZER
      );
    });

    it('should handle errors', (done) => {
      const mockError = new HttpErrorResponse({ error: 'error' });
      const normalizedError = normalizeHttpError(mockError);

      occOpfAdapter.getActiveConfigurations().subscribe((error) => {
        expect(error).toEqual(normalizedError);
      });

      httpMock
        .expectOne((req) => {
          return req.method === 'GET';
        })
        .flush(normalizedError);

      done();
    });

    it('should set commerceCloudPublicKey to empty string', () => {
      mockOpfConfig.opf.commerceCloudPublicKey = null;
      occOpfAdapter.getActiveConfigurations().subscribe();
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      expect(mockReq.request.headers.get(OPF_CC_PUBLIC_KEY)).toEqual('');
      mockReq.flush(mockPaymentSessionData);
      mockOpfConfig.opf.commerceCloudPublicKey = commerceCloudPublicKey;
    });
  });
});
