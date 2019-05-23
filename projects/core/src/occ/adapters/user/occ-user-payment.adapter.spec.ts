import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';
import { PaymentDetails } from '../../../model/cart.model';
import { Occ } from '../../occ-models/occ.models';
import { OccUserPaymentAdapter } from './occ-user-payment.adapter';
import {
  ConverterService,
  COUNTRY_NORMALIZER,
  PAYMENT_DETAILS_NORMALIZER,
  REGION_NORMALIZER,
} from '@spartacus/core';

const username = 'mockUsername';

const endpoint = '/users';
const paymentDetailsEndpoint = '/paymentdetails';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  site: {
    baseSite: '',
  },
};

describe('OccUserPaymentAdapter', () => {
  let service: OccUserPaymentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserPaymentAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccUserPaymentAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'pipeableMany').and.callThrough();
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
        return (
          req.method === 'GET' &&
          req.url ===
            `${endpoint}/${username}${paymentDetailsEndpoint}?saved=true`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockUserPaymentMethods);
    });

    it('should use converter', () => {
      service.loadAll(username).subscribe();
      httpMock
        .expectOne(
          `${endpoint}/${username}${paymentDetailsEndpoint}?saved=true`
        )
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
        return (
          req.method === 'PATCH' &&
          req.body.defaultPayment === true &&
          req.url ===
            `${endpoint}/${username}${paymentDetailsEndpoint}/${mockPayment.id}`
        );
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
        return (
          req.method === 'DELETE' &&
          req.url ===
            `${endpoint}/${username}${paymentDetailsEndpoint}/${mockPayment.id}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush('');
    });
  });

  describe('loadDeliveryCountries', () => {
    it('should return delivery countries list', () => {
      const countryList: Occ.CountryList = {
        countries: [
          {
            isocode: 'AL',
            name: 'Albania',
          },
          {
            isocode: 'AD',
            name: 'Andorra',
          },
        ],
      };

      service.loadDeliveryCountries().subscribe(result => {
        expect(result).toEqual(countryList.countries);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === '/countries';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(countryList);
    });

    it('should use converter', () => {
      service.loadDeliveryCountries().subscribe();
      httpMock
        .expectOne(req => {
          return req.method === 'GET' && req.url === '/countries';
        })
        .flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(COUNTRY_NORMALIZER);
    });
  });

  describe('loadRegions', () => {
    it('should return regions', () => {
      const regions: Occ.RegionList = {
        regions: [
          {
            isocode: 'CA-AB',
            name: 'Alberta',
          },
          {
            isocode: 'CA-BC',
            name: 'British Columbia',
          },
          {
            isocode: 'CA-MB',
            name: 'Manitoba',
          },
        ],
      };

      service.loadRegions('CA').subscribe(result => {
        expect(result).toEqual(regions.regions);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === '/countries/CA/regions';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(regions);
    });

    it('should use converter', () => {
      service.loadRegions('CA').subscribe();
      httpMock
        .expectOne(req => {
          return req.method === 'GET' && req.url === '/countries/CA/regions';
        })
        .flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(REGION_NORMALIZER);
    });
  });
});
