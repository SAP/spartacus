import * as fromProduct from '../actions/product.action';
import { ProductState } from '../product-state';

export const initialState: ProductState = {};

export function reducer(
  state = initialState,
  action: fromProduct.ProductAction
): ProductState {
  switch (action.type) {
    case fromProduct.LOAD_PRODUCT: {
      const code = action.payload;
      const newState: any = {
        loading: true
      };
      if (state[code]) {
        newState.value = state[code].value;
      }
      return {
        ...state,
        [code]: newState
      };
    }

    case fromProduct.LOAD_PRODUCT_SUCCESS: {
      const detail = action.payload;

      return {
        ...state,
        [detail.code]: { loading: false, value: detail }
      };
    }
    case fromProduct.LOAD_PRODUCT_FAIL: {
      return {
        ...state,
        [action.payload.code]: { loading: false, value: null }
      };
    }
  }
  return state;
}

