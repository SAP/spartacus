import { OccProductReviewsAdapter } from './occ-product-reviews.adapter';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import createSpy = jasmine.createSpy;
import { ReviewList } from '@spartacus/core';

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

describe('OccProductReviewsAdapter', () => {
  let service: OccProductReviewsAdapter;
  let httpMock: HttpTestingController;
  let endpoints: OccEndpointsService;

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

    service = TestBed.get(OccProductReviewsAdapter);
    endpoints = TestBed.get(OccEndpointsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadList', () => {
    it('sohuld load review list', () => {
      let loadResult;
      service.loadList(productCode).subscribe(res => (loadResult = res));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(productReviews);

      expect(loadResult).toEqual(productReviews);
    });

    it('should use reviews endpoint', () => {
      service.loadList(productCode, maxCount).subscribe();
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
  });

  describe('post', () => {
    it('sohuld post review', () => {
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
      const mockReq = httpMock.expectOne(endpoint);
      mockReq.flush('');
      expect(endpoints.getUrl).toHaveBeenCalledWith(
        'productReviews',
        {
          productCode,
        },
        { maxCount: undefined }
      );
    });
  });
});
