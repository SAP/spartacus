import * as fromProductReviews from './../actions/product-reviews.action';

export interface ProductReviewsState {
  list: any[];
}

export const initialState: ProductReviewsState = {
  list: []
};

export function reducer(
  state = initialState,
  action: fromProductReviews.ProductReviewsAction
): ProductReviewsState {
  switch (action.type) {
    case fromProductReviews.LOAD_REVIEWS_SUCCESS: {
      const list = action.payload.reviews;

      return {
        ...state,
        list
      };
    }
    case fromProductReviews.LOAD_REVIEWS_FAIL: {
      // TODO[249] what to return in this case?
      console.log(`FAIL REDUCER: ${action.payload}`);
    }
  }

  return state;
}
