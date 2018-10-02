import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromReview from '../reducers/product-reviews.reducer';

export const getProductReviewsState: MemoizedSelector<
  any,
  fromReview.ProductReviewsState
> = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.reviews
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
