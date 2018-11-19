import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccProductService } from './product.service';
import { OccConfig } from '@spartacus/core';

const productCode = 'testCode';
const product = {
  code: 'testCode',
  name: 'testProduct'
};

const maxCount = 2;
const productReviews = [
  { id: 1, text: 'Review 1' },
  { id: 2, text: 'Review 2' }
];

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: '',
    language: '',
    currency: ''
  }
};
const endpoint = '/products';

describe('OccProductService', () => {
  let service: OccProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load product details', () => {
    it('should load product details for given product code', () => {
      service.loadProduct(productCode).subscribe(result => {
        expect(result).toEqual(product);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + `/${productCode}`;
      });

      expect(mockReq.request.params.get('fields')).toEqual(
        'DEFAULT,averageRating,images(FULL),classifications,numberOfReviews'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(product);
    });
  });

  describe('load product reviews', () => {
    it('should load reviews for given product code', () => {
      service.loadProductReviews(productCode).subscribe(result => {
        expect(result).toEqual(productReviews);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/${productCode}/reviews`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(productReviews);
    });
  });

  it('shoud load reviews with maxCount parameter set', () => {
    service.loadProductReviews(productCode, maxCount).subscribe(result => {
      expect(result).toEqual(productReviews);
    });

    const mockReq = httpMock.expectOne(req => {
      return (
        req.method === 'GET' &&
        req.url === endpoint + `/${productCode}/reviews?maxCount=${maxCount}`
      );
    });
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(productReviews);
  });
});
