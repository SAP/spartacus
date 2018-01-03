import { createSelector } from "@ngrx/store";

import * as fromFeature from "../reducers";
import * as fromCurrencies from "../reducers/currencies.reducer";

export const getCurrenciesState = createSelector(
  fromFeature.getSiteContextState,
  (state: fromFeature.SiteContextState) => state.currencies
);

export const getCurrenciesEntities = createSelector(
  getCurrenciesState,
  fromCurrencies.getCurrenciesEntities
);

export const getActiveCurrency = createSelector(
  getCurrenciesState,
  fromCurrencies.getActiveCurrency
);

export const getAllCurrencies = createSelector(
  getCurrenciesEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);

export const getCurrenciesLoaded = createSelector(
  getCurrenciesState,
  fromCurrencies.getCurrenciesLoaded
);
