import * as fromProduct from '../actions/product.action';
import { ProductState } from '../product-state';

export const initialState: ProductState = {};

export function reducer(
  state = initialState,
  action: fromProduct.ProductAction
): ProductState {
  switch (action.type) {
  }
  return state;
}

