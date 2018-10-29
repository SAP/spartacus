import { createSelector, MemoizedSelector } from '@ngrx/store';

import { CurrenciesState, SiteContextState } from '../state';
import { getSiteContextState } from './site-context.selector';

const activeCurrencySelector = (state: CurrenciesState) => state.activeCurrency;
const currenciesEntitiesSelector = (state: CurrenciesState) => state.entities;
export const currenciesLoadAttemptedSelector = (state: CurrenciesState) =>
  state.loadAttempted;
const currenciesLoadingSelector = (state: CurrenciesState) => state.loading;

export const getCurrenciesState: MemoizedSelector<
  any,
  CurrenciesState
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.currencies
);

export const getCurrenciesEntities: MemoizedSelector<any, any> = createSelector(
  getCurrenciesState,
  currenciesEntitiesSelector
);

export const getActiveCurrency: MemoizedSelector<any, string> = createSelector(
  getCurrenciesState,
  activeCurrencySelector
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
> = createSelector(getCurrenciesState, currenciesLoadAttemptedSelector);

export const getCurrenciesLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(getCurrenciesState, currenciesLoadingSelector);
