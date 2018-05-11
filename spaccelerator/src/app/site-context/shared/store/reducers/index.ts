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

export const reducers: ActionReducerMap<SiteContextState> = {
  languages: fromLanguages.reducer,
  currencies: fromCurrencies.reducer
};

export const getSiteContextState: MemoizedSelector<
  any,
  any
> = createFeatureSelector<SiteContextState>('siteContext');
