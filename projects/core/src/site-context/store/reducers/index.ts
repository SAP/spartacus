import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromLanguages from './languages.reducer';
import * as fromCurrencies from './currencies.reducer';
import { CurrenciesState, SiteContextState } from '../state';
import { loaderReducer } from '../../../store-entities/loader.reducer';

export const CURRENCIES_ENTITY = 'CURRENCIES';

export function getReducers(): ActionReducerMap<SiteContextState> {
  return {
    languages: fromLanguages.reducer,
    currencies: loaderReducer<CurrenciesState>(CURRENCIES_ENTITY, fromCurrencies.reducer)
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
