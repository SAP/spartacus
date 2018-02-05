import { createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromReview from '../reducers/product-reviews.reducer';

export const getProductReviewsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.reviews
);

export const getSelectedProductReviewsFactory = productCode => {
  return createSelector(getProductReviewsState, reviewData => {
    if (reviewData.productCode === productCode) {
      return reviewData.list;
    }
  });
};

export const getProductCode = createSelector(
  getProductReviewsState,
  fromReview.getReviewProductCode
);
