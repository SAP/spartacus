import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Currency } from '../../../occ/occ-models/occ.models';
import {
  StateWithSiteContext,
  CurrenciesState,
  CurrencyEntities,
  SiteContextState
} from '../state';
import { getSiteContextState } from './site-context.selector';
import { loaderValueSelector } from '../../../store-entities/loader.selectors';

const currenciesEntitiesSelector = (state: CurrenciesState) => state.entities;
const activeCurrencySelector = (state: CurrenciesState) => state.activeCurrency;

export const getCurrenciesState: MemoizedSelector<
  StateWithSiteContext,
  CurrenciesState
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => loaderValueSelector(state.currencies)
);

export const getCurrenciesEntities: MemoizedSelector<
  StateWithSiteContext,
  CurrencyEntities
> = createSelector(
  getCurrenciesState,
  currenciesEntitiesSelector
);

export const getActiveCurrency: MemoizedSelector<
  StateWithSiteContext,
  string
> = createSelector(
  getCurrenciesState,
  activeCurrencySelector
);

export const getAllCurrencies: MemoizedSelector<
  StateWithSiteContext,
  Currency[]
> = createSelector(
  getCurrenciesEntities,
  entities => {
    return entities
      ? Object.keys(entities).map(isocode => entities[isocode])
      : null;
  }
);
