import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as ngrxStore from '@ngrx/store';
import { of } from 'rxjs';

import * as fromStore from '../store';

import { ProductReviewService } from './product-review.service';
import { Review } from '../../occ-models';

describe('ReviewService', () => {
  let service: ProductReviewService;
  let store: Store<fromStore.ProductsState>;
  const mockReview = { id: 'testId' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', fromStore.getReducers())
      ],
      providers: [ProductReviewService]
    });

    store = TestBed.get(Store);
    service = TestBed.get(ProductReviewService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ReviewService is injected', inject(
    [ProductReviewService],
    (reviewService: ProductReviewService) => {
      expect(reviewService).toBeTruthy();
    }
  ));

  describe('getByProductCode(productCode)', () => {
    it('should be able to get product reviews if reviews exist', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of([mockReview])
      );
      service.getByProductCode('testId').subscribe(reviews => {
        expect(reviews).toBe([mockReview]);
      });
    });

    it('should be able to load product reviews if reviews not exist', () => {
      spyOnProperty(ngrxStore, 'select').and.returnValue(() => () =>
        of(undefined)
      );
      service.getByProductCode('testId').subscribe(() => {
        expect(store.dispatch).toHaveBeenCalledWith(
          new fromStore.LoadProductReviews('testId')
        );
      });
    });
  });

  describe('add(productCode, review)', () => {
    it('should be able to add review for product', () => {
      const productCode = 'testId';
      const review: Review = { id: '123', comment: 'test review' };
      service.add(productCode, review);
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.PostProductReview({ productCode, review })
      );
    });
  });
});
