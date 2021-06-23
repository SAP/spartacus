import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { SiteContextState } from '../state';
import * as fromBaseSite from './base-site.reducer';
import * as fromCurrencies from './currencies.reducer';
import * as fromLanguages from './languages.reducer';

export function getReducers(): ActionReducerMap<SiteContextState> {
  return {
    languages: fromLanguages.reducer,
    currencies: fromCurrencies.reducer,
    baseSite: fromBaseSite.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<SiteContextState>> =
  new InjectionToken<ActionReducerMap<SiteContextState>>('SiteContextReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
