import { createSelector, MemoizedSelector } from '@ngrx/store';

import {
  ProductReviewsState,
  ProductsState,
  StateWithProduct
} from '../product-state';
import { Review } from '../../../occ/occ-models';

import { getProductsState } from './feature.selector';

export const getProductReviewsState: MemoizedSelector<
  StateWithProduct,
  ProductReviewsState
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.reviews
);

export const getSelectedProductReviewsFactory = (
  productCode: string
): MemoizedSelector<any, Review[]> => {
  return createSelector(
    getProductReviewsState,
    reviewData => {
      if (reviewData.productCode === productCode) {
        return reviewData.list;
      }
    }
  );
};
