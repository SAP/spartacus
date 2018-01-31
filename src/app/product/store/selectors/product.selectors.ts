import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProduct from '../reducers/product.reducer';

export const getProductEntities = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.details
);

export const getSelectedProductsFactory = codes => {
  return createSelector(getProductEntities, details => {
    return codes
      .map(code => details.entities[code])
      .filter(product => product !== undefined);
  });
};

export const getAllProductCodes = createSelector(
  getProductEntities,
  details => {
    return Object.keys(details.entities);
  }
);
