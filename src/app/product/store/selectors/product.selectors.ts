import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getProductState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.details
);

export const getSelectedProductsFactory = codes => {
  return createSelector(getProductState, details => {
    return codes
      .map(code => details.entities[code])
      .filter(product => product !== undefined);
  });
};

export const getSelectedProductFactory = code => {
  return createSelector(getProductState, details => {
    return details.entities[code];
  });
};

export const getAllProductCodes = createSelector(getProductState, details => {
  return Object.keys(details.entities);
});
