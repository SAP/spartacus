import { createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';

export const getProductReviewsEntities = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.reviews
);
