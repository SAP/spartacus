import * as fromProductReviews from './../actions/product-reviews.action';

export interface ProductReviewsState {
  productCode: string;
  list: any[];
  error: any;
}

export const initialState: ProductReviewsState = {
  productCode: '',
  list: [],
  error: {}
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

export const getReviewList = (state: ProductReviewsState) => state.list;
export const getReviewProductCode = (state: ProductReviewsState) =>
  state.productCode;
