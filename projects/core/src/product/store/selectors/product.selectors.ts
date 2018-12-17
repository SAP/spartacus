import { createSelector, MemoizedSelector } from '@ngrx/store';

import {
  ProductsState,
  ProductState,
  StateWithProduct
} from '../product-state';
import { Product } from '../../../occ/occ-models';

import { getProductsState } from './feature.selector';

export const getProductState: MemoizedSelector<
  StateWithProduct,
  ProductState
> = createSelector(
  getProductsState,
  (state: ProductsState) => state.details
);

export const getSelectedProductsFactory = (
  codes: string[]
): MemoizedSelector<StateWithProduct, Product[]> => {
  return createSelector(
    getProductState,
    (details: ProductState) => {
      return codes
        .map(code => details.entities[code])
        .filter(product => product !== undefined);
    }
  );
};

export const getSelectedProductFactory = (
  code: string
): MemoizedSelector<StateWithProduct, Product> => {
  return createSelector(
    getProductState,
    details => {
      return details.entities[code];
    }
  );
};

export const getAllProductCodes: MemoizedSelector<
  StateWithProduct,
  string[]
> = createSelector(
  getProductState,
  details => {
    return Object.keys(details.entities);
  }
);
