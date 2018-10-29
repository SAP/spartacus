import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromLanguages from './languages.reducer';
import * as fromCurrencies from './currencies.reducer';
import { SiteContextState } from '../state';

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
