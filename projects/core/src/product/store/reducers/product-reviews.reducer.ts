import * as fromProductReviews from './../actions/product-reviews.action';
import { ProductReviewsState } from '../product-state';
import { Review } from '../../../occ/occ-models';

export const initialState: ProductReviewsState = {
  productCode: '',
  list: []
};

export function reducer(
  state = initialState,
  action: fromProductReviews.ProductReviewsAction
): ProductReviewsState {
  switch (action.type) {
    case fromProductReviews.LOAD_PRODUCT_REVIEWS_SUCCESS: {
      const productCode = action.payload.productCode;
      const list = action.payload.list;

      return {
        ...state,
        productCode,
        list
      };
    }
  }

  return state;
}

export const getReviewList = (state: ProductReviewsState): Review[] =>
  state.list;
export const getReviewProductCode = (state: ProductReviewsState) =>
  state.productCode;
