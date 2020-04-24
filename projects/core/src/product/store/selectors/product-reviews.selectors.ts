import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Review } from '../../../model/product.model';
import {
  ProductReviewsState,
  ProductsState,
  StateWithProduct,
} from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductReviewsState: MemoizedSelector<
  StateWithProduct,
  ProductReviewsState
> = createSelector(getProductsState, (state: ProductsState) => state.reviews);

export const getSelectedProductReviewsFactory = (
  productCode
): MemoizedSelector<StateWithProduct, Review[]> => {
  return createSelector(getProductReviewsState, (reviewData) => {
    if (reviewData.productCode === productCode) {
      return reviewData.list;
    }
  });
};
