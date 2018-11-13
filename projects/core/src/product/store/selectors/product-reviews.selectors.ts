import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import { ProductReviewsState, ProductsState } from '../product-state';

export const getProductReviewsState: MemoizedSelector<
  any,
  ProductReviewsState
> = createSelector(
  fromFeature.getProductsState,
  (state: ProductsState) => state.reviews
);

export const getSelectedProductReviewsFactory = (
  productCode
): MemoizedSelector<any, any> => {
  return createSelector(getProductReviewsState, reviewData => {
    if (reviewData.productCode === productCode) {
      return reviewData.list;
    }
  });
};
