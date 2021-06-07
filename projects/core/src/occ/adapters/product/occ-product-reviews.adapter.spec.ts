import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  PRODUCT_REVIEW_NORMALIZER,
  PRODUCT_REVIEW_SERIALIZER,
} from '@spartacus/core';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccProductReviewsAdapter } from './occ-product-reviews.adapter';
import createSpy = jasmine.createSpy;

const productCode = 'testCode';
const maxCount = 2;
const productReviews: Occ.ReviewList = {
  reviews: [
    { id: '1', comment: 'Review 1' },
    { id: '2', comment: 'Review 2' },
  ],
};
const endpoint = '/productReviews';

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.getEndpoint').and.returnValue(
    endpoint
  );
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
      ],
    });
    service = TestBed.inject(OccProductReviewsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    endpoints = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'convert').and.callThrough();
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
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
      service.load(productCode).subscribe((res) => (loadResult = res));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === endpoint;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(productReviews);

      expect(loadResult).toEqual(productReviews.reviews);
    });

    it('should use reviews endpoint', () => {
      service.load(productCode, maxCount).subscribe();
      const mockReq = httpMock.expectOne(endpoint);
      mockReq.flush(productReviews);
      expect(endpoints.buildUrl).toHaveBeenCalledWith('productReviews', {
        urlParams: { productCode },
        queryParams: { maxCount },
      });
    });

    it('should use converter', () => {
      service.load('333').subscribe();
      httpMock.expectOne(endpoint).flush(productReviews);

      expect(converter.pipeableMany).toHaveBeenCalledWith(
        PRODUCT_REVIEW_NORMALIZER
      );
    });
  });

  describe('post', () => {
    it('should post review', () => {
      let postResult;

      service
        .post(productCode, { rating: 3 })
        .subscribe((res) => (postResult = res));

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST' && req.url === endpoint;
      });
      mockReq.flush('posted');

      expect(postResult).toEqual('posted');
    });

    it('should use reviews endpoint', () => {
      service.post(productCode, { rating: 3 }).subscribe();
      httpMock.expectOne(endpoint).flush('');
      expect(endpoints.buildUrl).toHaveBeenCalledWith('productReviews', {
        urlParams: { productCode },
        queryParams: { maxCount: undefined },
      });
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
