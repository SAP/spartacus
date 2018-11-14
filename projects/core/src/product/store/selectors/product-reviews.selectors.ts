import { createSelector, MemoizedSelector } from '@ngrx/store';

import { ProductReviewsState, ProductsState } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductReviewsState: MemoizedSelector<
  any,
  ProductReviewsState
> = createSelector(getProductsState, (state: ProductsState) => state.reviews);

export const getSelectedProductReviewsFactory = (
  productCode
): MemoizedSelector<any, any> => {
  return createSelector(getProductReviewsState, reviewData => {
    if (reviewData.productCode === productCode) {
      return reviewData.list;
    }
  });
};
