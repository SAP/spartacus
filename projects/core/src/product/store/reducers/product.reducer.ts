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
    case fromProduct.LOAD_PRODUCT_START: {
      const code = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [code]: {
            loading: true,
            value: state.entities[code] ? state.entities[code].value : null
          }
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
