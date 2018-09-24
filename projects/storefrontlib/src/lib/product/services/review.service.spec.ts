import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromRoot from '../../routing/store';
import * as fromStore from '../store';

import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let store: Store<fromStore.ProductsState>;
  const mockReview = { code: 'testId' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers()
        })
      ],
      providers: [ReviewService]
    });

    store = TestBed.get(Store);
    service = TestBed.get(ReviewService);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should ReviewService is injected', inject(
    [ReviewService],
    (reviewService: ReviewService) => {
      expect(reviewService).toBeTruthy();
    }
  ));

  describe('getByProductCode(productCode)', () => {
    it('should be able to get product reviews if reviews exist', () => {
      spyOn(store, 'select').and.returnValue(of(mockReview));
      service.getByProductCode('testId').subscribe(reviews => {
        expect(reviews).toBe(mockReview);
      });
    });

    it('should be able to load product reviews if reviews not exist', () => {
      spyOn(store, 'select').and.returnValue(of());
      service.getByProductCode('testId').subscribe(() => {
        expect(store.dispatch).toHaveBeenCalledWith(
          new fromStore.LoadProductReviews('testId')
        );
      });
    });
  });

  describe('add(productCode, review)', () => {
    it('should be able to add review for product', () => {
      service.add('testId', 'test review');
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromStore.PostProductReview({
          productCode: 'testId',
          review: 'test review'
        })
      );
    });
  });
});
