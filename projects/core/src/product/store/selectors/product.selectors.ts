import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ProductsState, ProductState, StateWithProduct } from '../product-state';
import { getProductsState } from './feature.selector';

export const getProductState: MemoizedSelector<StateWithProduct, ProductState> = createSelector(
  getProductsState,
  (state: ProductsState) => state.details
);

export const getSelectedProductsFactory = (
  codes
): MemoizedSelector<StateWithProduct, any[]> => {
  return createSelector(
    getProductState,
    details => {
      return codes
        .map(code => details.entities[code])
        .filter(product => product !== undefined);
    }
  );
};

export const getSelectedProductFactory = (code): MemoizedSelector<StateWithProduct, any> => {
  return createSelector(
    getProductState,
    details => {
      return details.entities[code];
    }
  );
};

export const getAllProductCodes: MemoizedSelector<
  any,
  string[]
> = createSelector(
  getProductState,
  details => {
    return Object.keys(details.entities);
  }
);
