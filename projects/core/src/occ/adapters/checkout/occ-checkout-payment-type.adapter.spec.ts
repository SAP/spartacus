import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, PAYMENT_TYPE_NORMALIZER } from '@spartacus/core';
import { Occ, OccConfig } from '../../index';
import { OccCheckoutPaymentTypeAdapter } from './occ-checkout-payment-type.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
  context: {
    baseSite: [''],
  },
};

describe('OccCheckoutPaymentTypeAdapter', () => {
  let service: OccCheckoutPaymentTypeAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCheckoutPaymentTypeAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccCheckoutPaymentTypeAdapter as Type<
      OccCheckoutPaymentTypeAdapter
    >);
    httpMock = TestBed.inject(HttpTestingController as Type<
      HttpTestingController
    >);
    converter = TestBed.inject(ConverterService as Type<ConverterService>);

    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('loadPaymentypes', () => {
    it('should return paymentTypes', () => {
      const paymentTypesList: Occ.PaymentTypeList = {
        paymentTypes: [
          {
            code: 'card',
            displayName: 'card',
          },
          {
            code: 'account',
            displayName: 'account',
          },
        ],
      };

      service.loadPaymentTypes().subscribe(result => {
        expect(result).toEqual(paymentTypesList.paymentTypes);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === '/paymenttypes';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(paymentTypesList);
    });

    it('should use converter', () => {
      service.loadPaymentTypes().subscribe();
      httpMock.expectOne('/paymenttypes').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        PAYMENT_TYPE_NORMALIZER
      );
    });
  });
});
