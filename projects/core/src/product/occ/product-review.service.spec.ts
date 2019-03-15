import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ReviewList } from '../../occ/occ-models/occ.models';
import { OccConfig } from '../../occ/config/occ-config';

import { OccProductConfig, defaultOccProductConfig } from './product-config';
import { OccProductReviewsService } from './product-reviews.service';

const productCode = 'testCode';
const maxCount = 2;
const productReviews: ReviewList = {
  reviews: [{ id: '1', comment: 'Review 1' }, { id: '2', comment: 'Review 2' }]
};

const endpoint = '/products';

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

describe('OccProductReviewsService', () => {
  let service: OccProductReviewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductReviewsService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: OccProductConfig, useValue: defaultOccProductConfig }
      ]
    });

    service = TestBed.get(OccProductReviewsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
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
