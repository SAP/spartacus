import * as fromProduct from '../actions/product.action';

export interface ProductState {
  entities: { [productCode: string]: any };
  error: any; // TODO[249] ?
}

export const initialState: ProductState = {
  entities: {},
  error: {}
};

export function reducer(
  state = initialState,
  action: fromProduct.ProductAction
): ProductState {
  switch (action.type) {
    case fromProduct.LOAD_PRODUCT_SUCCESS: {
      const detail = action.payload;

      const entities = {
        ...state.entities,
        [detail.code]: detail
      };

      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

export const getProductEntities = (state: ProductState) => state.entities;
