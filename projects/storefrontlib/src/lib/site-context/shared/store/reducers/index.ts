import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromLanguages from './languages.reducer';
import * as fromCurrencies from './currencies.reducer';

export interface SiteContextState {
  languages: fromLanguages.LanguagesState;
  currencies: fromCurrencies.CurrenciesState;
}

export function getReducers(): ActionReducerMap<SiteContextState> {
  return {
    languages: fromLanguages.reducer,
    currencies: fromCurrencies.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<SiteContextState>
> = new InjectionToken<ActionReducerMap<SiteContextState>>(
  'SiteContextReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getSiteContextState: MemoizedSelector<
  any,
  any
> = createFeatureSelector<SiteContextState>('siteContext');
