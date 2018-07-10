import * as fromProductReviews from './../actions/product-reviews.action';

export interface ProductReviewsState {
  productCode: string;
  list: any[];
}

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
    // TODO: post product review success, save in store if review needs approval?
    // case fromProductReviews.POST_PRODUCT_REVIEW_SUCCESS: {
    //   const reviewResponse = action.payload;
    //   const list = [...state.list];
    //   list.unshift(reviewResponse);

    //   return {
    //     ...state,
    //     list
    //   };
    // }
  }

  return state;
}

export const getReviewList = (state: ProductReviewsState) => state.list;
export const getReviewProductCode = (state: ProductReviewsState) =>
  state.productCode;
