/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Currency } from '../../../model/misc.model';
import {
  CurrenciesState,
  CurrencyEntities,
  SiteContextState,
  StateWithSiteContext,
} from '../state';
import { getSiteContextState } from './site-context.selector';

const currenciesEntitiesSelector = (state: CurrenciesState) => state.entities;
const activeCurrencySelector = (state: CurrenciesState) => state.activeCurrency;

export const getCurrenciesState: MemoizedSelector<
  StateWithSiteContext,
  CurrenciesState
> = createSelector(
  getSiteContextState,
  (state: SiteContextState) => state.currencies
);

export const getCurrenciesEntities: MemoizedSelector<
  StateWithSiteContext,
  CurrencyEntities | null
> = createSelector(getCurrenciesState, currenciesEntitiesSelector);

export const getActiveCurrency: MemoizedSelector<
  StateWithSiteContext,
  string | null
> = createSelector(getCurrenciesState, activeCurrencySelector);

export const getAllCurrencies: MemoizedSelector<
  StateWithSiteContext,
  Currency[] | null
> = createSelector(getCurrenciesEntities, (entities) => {
  return entities
    ? Object.keys(entities).map((isocode) => entities[isocode])
    : null;
});
