import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, PAYMENT_DETAILS_NORMALIZER } from '@spartacus/core';
import { PaymentDetails } from '../../../model/cart.model';
import { OccConfig } from '../../config/occ-config';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';

const username = 'mockUsername';

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

class MockOccEndpointsService {
  getUrl(endpointKey: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpointKey);
  }
  getEndpoint(endpoint: string) {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return endpoint;
  }
  getBaseEndpoint() {
    return '';
  }
}

describe('OccUserPaymentAdapter', () => {
  let service: OccUserPaymentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserPaymentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.get(OccUserPaymentAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    occEnpointsService = TestBed.get(OccEndpointsService);
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load user payment methods', () => {
    it('should load user payment methods for a given user id', () => {
      const mockPayment1: PaymentDetails = {
        accountHolderName: 'mockAccountHolderName1',
      };
      const mockPayment2: PaymentDetails = {
        accountHolderName: 'mockAccountHolderName2',
      };
      const mockUserPaymentMethods: Occ.PaymentDetailsList = {
        payments: [mockPayment1, mockPayment2],
      };

      service.loadAll(username).subscribe(result => {
        expect(result).toEqual(mockUserPaymentMethods.payments);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'paymentDetailsAll',
        {
          userId: username,
        }
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockUserPaymentMethods);
    });

    it('should use converter', () => {
      service.loadAll(username).subscribe();
      httpMock
        .expectOne(req => {
          return req.method === 'GET';
        })
        .flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        PAYMENT_DETAILS_NORMALIZER
      );
    });
  });

  describe('set default user payment method', () => {
    it('should set default payment method for given user', () => {
      const mockPayment: PaymentDetails = {
        defaultPayment: true,
        id: '123',
      };

      service.setDefault(username, mockPayment.id).subscribe(result => {
        expect(result).toEqual('');
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'PATCH' && req.body.defaultPayment === true;
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('paymentDetail', {
        userId: username,
        paymentDetailId: mockPayment.id,
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('');
    });
  });

  describe('delete user payment method', () => {
    it('should delete payment method for given user', () => {
      const mockPayment: PaymentDetails = {
        id: '123',
      };

      service
        .delete(username, mockPayment.id)
        .subscribe(result => expect(result).toEqual(''));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'DELETE';
      });

      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('paymentDetail', {
        userId: username,
        paymentDetailId: mockPayment.id,
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('');
    });
  });
});
