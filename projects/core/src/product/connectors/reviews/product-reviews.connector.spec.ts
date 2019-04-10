import { TestBed } from '@angular/core/testing';

import { ProductReviewsConnector } from './product-reviews.connector';
import { ProductReviewsAdapter } from './product-reviews.adapter';
import createSpy = jasmine.createSpy;
import {
  ConverterService,
  PRODUCT_REVIEW_ADD_SERIALIZE,
  PRODUCT_REVIEWS_LIST_NORMALIZE,
} from '@spartacus/core';
import { of } from 'rxjs';

class MockProductReviewsAdapter implements ProductReviewsAdapter {
  loadList = createSpy('ProductReviewsAdapter.loadList').and.callFake(code =>
    of('product' + code)
  );
  post = createSpy('ProductReviewsAdapter.post').and.returnValue(of(''));
}

class MockNormalizerService {
  normalize = createSpy().and.callFake(x => x);
  pipeable = createSpy().and.returnValue(x => x);
}

describe('ProductReviewsConnector', () => {
  let service: ProductReviewsConnector;
  let adapter: ProductReviewsAdapter;
  let normalizers: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductReviewsAdapter, useClass: MockProductReviewsAdapter },
        { provide: ConverterService, useClass: MockNormalizerService },
      ],
    });

    service = TestBed.get(ProductReviewsConnector);
    adapter = TestBed.get(ProductReviewsAdapter);
    normalizers = TestBed.get(ConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList', () => {
    it('should call adapter', () => {
      let result;
      service.getList('333').subscribe(res => (result = res));
      expect(result).toBe('product333');
      expect(adapter.loadList).toHaveBeenCalledWith('333', undefined);
    });

    it('should use normalizer', () => {
      service.getList('333').subscribe();
      expect(normalizers.pipeable).toHaveBeenCalledWith(
        PRODUCT_REVIEWS_LIST_NORMALIZE
      );
    });
  });

  describe('add', () => {
    it('should call adapter', () => {
      service.add('333', 'review').subscribe();
      expect(adapter.post).toHaveBeenCalledWith('333', 'review');
    });
    it('should use normalizer', () => {
      service.add('333', 'review').subscribe();
      expect(normalizers.convert).toHaveBeenCalledWith(
        'review',
        PRODUCT_REVIEW_ADD_SERIALIZE
      );
    });
  });
});
