import * as fromProduct from '../actions/product.action';
import { Product } from '../../../occ-models/occ.models';

export const initialState: Product = {};

export function reducer(
  state = initialState,
  _action: fromProduct.ProductAction
): Product {
  return state;
}

