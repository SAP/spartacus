import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

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

export const getSelectedProductFactory = code => {
  return createSelector(getProductEntities, details => {
    return details.entities[code];
  });
};

export const getAllProductCodes = createSelector(
  getProductEntities,
  details => {
    return Object.keys(details.entities);
  }
);
