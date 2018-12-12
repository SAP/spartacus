import * as fromProduct from '../actions/product.action';
import { ProductState } from '../product-state';

export const initialState: ProductState = {
  entities: {}
};

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
      if (state.entities[code]) {
        newState.value = state.entities[code].value;
      }
      return {
        ...state,
        entities: {
          ...state.entities,
          [code]: newState
        }
      };
    }

    case fromProduct.LOAD_PRODUCT_SUCCESS: {
      const detail = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [detail.code]: { loading: false, value: detail }
        }
      };
    }
    case fromProduct.LOAD_PRODUCT_FAIL: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.code]: { loading: false, value: null }
        }
      };
    }
  }
  return state;
}

export const getProductEntities = (state: ProductState) => state.entities;
