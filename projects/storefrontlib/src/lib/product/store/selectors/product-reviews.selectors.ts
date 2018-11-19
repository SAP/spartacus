import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromReview from '../reducers/product-reviews.reducer';
import { ReviewList } from '@spartacus/core';

export const getProductReviewsState: MemoizedSelector<
  any,
  fromReview.ProductReviewsState
> = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.reviews
);

export const getSelectedProductReviewsFactory = (
  productCode
): MemoizedSelector<any, ReviewList> => {
  return createSelector(getProductReviewsState, reviewData => {
    if (reviewData.productCode === productCode) {
      return reviewData.list;
    }
  });
};
