import { OccProductReviewsAdapter } from './occ-product-reviews.adapter';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import {
  ConverterService,
  PRODUCT_REVIEW_SERIALIZER,
  PRODUCT_REVIEWS_NORMALIZER,
  ReviewList,
} from '@spartacus/core';
import createSpy = jasmine.createSpy;

const productCode = 'testCode';
const maxCount = 2;
const productReviews: ReviewList = {
  reviews: [{ id: '1', comment: 'Review 1' }, { id: '2', comment: 'Review 2' }],
};
const endpoint = '/productReviews';

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.returnValue(
    endpoint
  );
}

class MockConvertService {
  convert = createSpy().and.callFake(x => x);
  pipeable = createSpy().and.returnValue(x => x);
}

describe('OccProductReviewsAdapter', () => {
  let service: OccProductReviewsAdapter;
  let httpMock: HttpTestingController;
  let endpoints: OccEndpointsService;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductReviewsAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        { provide: ConverterService, useClass: MockConvertService },
      ],
    });

    service = TestBed.get(OccProductReviewsAdapter);
    endpoints = TestBed.get(OccEndpointsService);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('should load review list', () => {
      let loadResult;
      service.load(productCode).subscribe(res => (loadResult = res));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(productReviews);

      expect(loadResult).toEqual(productReviews);
    });

    it('should use reviews endpoint', () => {
      service.load(productCode, maxCount).subscribe();
      const mockReq = httpMock.expectOne(endpoint);
      mockReq.flush(productReviews);
      expect(endpoints.getUrl).toHaveBeenCalledWith(
        'productReviews',
        {
          productCode,
        },
        { maxCount }
      );
    });

    it('should use converter', () => {
      service.load('333').subscribe();
      httpMock.expectOne(endpoint).flush(productReviews);

      expect(converter.pipeable).toHaveBeenCalledWith(
        PRODUCT_REVIEWS_NORMALIZER
      );
    });
  });

  describe('post', () => {
    it('should post review', () => {
      let postResult;

      service
        .post(productCode, { rating: 3 })
        .subscribe(res => (postResult = res));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === endpoint;
      });
      mockReq.flush('posted');

      expect(postResult).toEqual('posted');
    });

    it('should use reviews endpoint', () => {
      service.post(productCode, { rating: 3 }).subscribe();
      httpMock.expectOne(endpoint).flush('');
      expect(endpoints.getUrl).toHaveBeenCalledWith(
        'productReviews',
        {
          productCode,
        },
        { maxCount: undefined }
      );
    });

    it('should use converter', () => {
      const review = { rating: 3 };
      service.post('333', review).subscribe();
      httpMock.expectOne(endpoint).flush({});
      expect(converter.convert).toHaveBeenCalledWith(
        review,
        PRODUCT_REVIEW_SERIALIZER
      );
    });
  });
});
