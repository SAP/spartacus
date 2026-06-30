import { vi } from 'vitest';
import { inject, TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, of } from 'rxjs';
import { Review } from '../../model/product.model';
import { ProductActions } from '../store/actions/index';
import { PRODUCT_FEATURE, ProductsState } from '../store/product-state';
import * as fromStoreReducers from '../store/reducers/index';
import { ProductReviewService } from './product-review.service';

const mockReview: Review = { id: 'testId' };
vi.mock('@ngrx/store', async(importOriginal) => {
  const actual = await importOriginal<typeof import('@ngrx/store')>();
  return {
    ...actual,
    select: vi.fn()
  };
});

describe('ReviewService', () => {
  let service: ProductReviewService;
  let store: Store<ProductsState>;
  let dispatchSpy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          PRODUCT_FEATURE,
          fromStoreReducers.getReducers()
        ),
      ],
      providers: [ProductReviewService],
    });
    store = TestBed.inject(Store);
    service = TestBed.inject(ProductReviewService);

    dispatchSpy = vi.spyOn(store, 'dispatch');
  });

  it('should ReviewService is injected', inject(
    [ProductReviewService],
    (reviewService: ProductReviewService) => {
      expect(reviewService).toBeTruthy();
    }
  ));

  describe('getByProductCode(productCode)', () => {
    it('should be able to get product reviews if reviews exist',async () => {
      vi.mocked(select).mockReturnValue(() => of([mockReview]));
      let result: Review[];
      const productByCode = await firstValueFrom(service.getByProductCode('testId'));
      service.getByProductCode('testId').subscribe((reviews) => {
        result = reviews;
      });
      expect(productByCode).toEqual([mockReview]);
    });

    it('should be able to load product reviews if reviews not exist', async () => {
      vi.mocked(select).mockReturnValue(() => of(undefined));
      await firstValueFrom(service.getByProductCode('testId'));

      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.LoadProductReviews('testId')
      );
    });
  });

  describe('add(productCode, review)', () => {
    it('should be able to add review for product', () => {
      const productCode = 'testId';
      const review: Review = { id: '123', comment: 'test review' };
      service.add(productCode, review);
      expect(store.dispatch).toHaveBeenCalledWith(
        new ProductActions.PostProductReview({ productCode, review })
      );
    });
  });
});

