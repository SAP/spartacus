import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductReviewsAdapter } from './product-reviews.adapter';
import { ProductReviewsConnector } from './product-reviews.connector';
import createSpy = jasmine.createSpy;

class MockProductReviewsAdapter implements ProductReviewsAdapter {
  load = createSpy('ProductReviewsAdapter.loadList').and.callFake((code) =>
    of('product' + code)
  );
  post = createSpy('ProductReviewsAdapter.post').and.returnValue(of(''));
}

describe('ProductReviewsConnector', () => {
  let service: ProductReviewsConnector;
  let adapter: ProductReviewsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductReviewsAdapter, useClass: MockProductReviewsAdapter },
      ],
    });

    service = TestBed.inject(ProductReviewsConnector);
    adapter = TestBed.inject(ProductReviewsAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call adapter', () => {
      let result;
      service.get('333').subscribe((res) => (result = res));
      expect(result).toBe('product333');
      expect(adapter.load).toHaveBeenCalledWith('333', undefined);
    });
  });

  describe('add', () => {
    it('should call adapter', () => {
      service.add('333', 'review').subscribe();
      expect(adapter.post).toHaveBeenCalledWith('333', 'review');
    });
  });
});
