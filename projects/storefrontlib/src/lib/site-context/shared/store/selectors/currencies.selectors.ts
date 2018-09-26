import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCurrencies from '../reducers/currencies.reducer';

export const getCurrenciesState: MemoizedSelector<
  any,
  fromCurrencies.CurrenciesState
> = createSelector(
  fromFeature.getSiteContextState,
  (state: fromFeature.SiteContextState) => state.currencies
);

export const getCurrenciesEntities: MemoizedSelector<any, any> = createSelector(
  getCurrenciesState,
  fromCurrencies.getCurrenciesEntities
);

export const getActiveCurrency: MemoizedSelector<any, string> = createSelector(
  getCurrenciesState,
  fromCurrencies.getActiveCurrency
);

export const getAllCurrencies: MemoizedSelector<any, any> = createSelector(
  getCurrenciesEntities,
  entities => {
    return Object.keys(entities).map(isocode => entities[isocode]);
  }
);

export const getCurrenciesLoadAttempted: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getCurrenciesState,
  fromCurrencies.getCurrenciesLoadAttempted
);

export const getCurrenciesLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(getCurrenciesState, fromCurrencies.getCurrenciesLoading);

export const getCurrenciesLoaded: MemoizedSelector<
  any,
  boolean
> = createSelector(getCurrenciesState, fromCurrencies.getCurrenciesLoaded);
