import * as fromProductReviews from './../actions/product-reviews.action';

export interface ProductReviewsState {
  list: any[];
  error: any; // TODO[249] ?
}

export const initialState: ProductReviewsState = {
  list: [],
  error: {}
};

export function reducer(
  state = initialState,
  action: fromProductReviews.ProductReviewsAction
): ProductReviewsState {
  switch (action.type) {
    case fromProductReviews.LOAD_PRODUCT_REVIEWS_SUCCESS: {
      const list = action.payload.reviews;

      return {
        ...state,
        list
      };
    }
    case fromProductReviews.LOAD_PRODUCT_REVIEWS_FAIL: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }
  }

  return state;
}
