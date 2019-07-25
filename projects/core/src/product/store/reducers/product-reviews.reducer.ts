import { Review } from '../../../model/product.model';
import { ProductActions } from '../actions/index';
import { ProductReviewsState } from '../product-state';

export const initialState: ProductReviewsState = {
  productCode: '',
  list: [],
};

export function reducer(
  state = initialState,
  action: ProductActions.ProductReviewsAction
): ProductReviewsState {
  switch (action.type) {
    case ProductActions.LOAD_PRODUCT_REVIEWS_SUCCESS: {
      const productCode = action.payload.productCode;
      const list = action.payload.list;

      return {
        ...state,
        productCode,
        list,
      };
    }
  }

  return state;
}

export const getReviewList = (state: ProductReviewsState): Review[] =>
  state.list;
export const getReviewProductCode = (state: ProductReviewsState): string =>
  state.productCode;
