import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ReviewList } from '../../occ/occ-models/occ.models';

import {
  OccProductConfig,
  defaultOccProductConfig
} from '../config/product-config';
import { ProductReviewsLoaderService } from './product-reviews.service';

const productCode = 'testCode';
const maxCount = 2;
const productReviews: ReviewList = {
  reviews: [{ id: '1', comment: 'Review 1' }, { id: '2', comment: 'Review 2' }]
};

const endpoint = '/products';

const MockOccModuleConfig: OccProductConfig = {
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

describe('ProductReviewsLoaderService', () => {
  let service: ProductReviewsLoaderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductReviewsLoaderService,
        {
          provide: OccProductConfig,
          useValue: Object.assign(MockOccModuleConfig, defaultOccProductConfig)
        }
      ]
    });

    service = TestBed.get(ProductReviewsLoaderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load product reviews', () => {
    it('should load reviews for given product code', () => {
      service.load(productCode).subscribe(result => {
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

  it('should load reviews with maxCount parameter set', () => {
    service.load(productCode, maxCount).subscribe(result => {
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
