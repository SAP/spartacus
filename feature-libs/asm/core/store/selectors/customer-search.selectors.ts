/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { CustomerSearchPage } from '@spartacus/asm/root';
import { StateUtils } from '@spartacus/core';
import { AsmState, StateWithAsm } from '../asm-state';
import { getAsmState } from './feature.selector';

export const getCustomerSearchResultsLoaderState: MemoizedSelector<
  StateWithAsm,
  StateUtils.LoaderState<CustomerSearchPage>
> = createSelector(
  getAsmState,
  (state: AsmState) => state.customerSearchResult
);

export const getCustomerSearchResults: MemoizedSelector<
  StateWithAsm,
  CustomerSearchPage
> = createSelector(
  getCustomerSearchResultsLoaderState,
  (state: StateUtils.LoaderState<CustomerSearchPage>) =>
    StateUtils.loaderValueSelector(state)
);

export const getCustomerSearchResultsLoading: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(
  getCustomerSearchResultsLoaderState,
  (state: StateUtils.LoaderState<CustomerSearchPage>) =>
    StateUtils.loaderLoadingSelector(state)
);

export const getCustomerListCustomersSearchResultsLoaderState: MemoizedSelector<
  StateWithAsm,
  StateUtils.LoaderState<CustomerSearchPage>
> = createSelector(
  getAsmState,
  (state: AsmState) => state.customerListCustomersSearchResult
);

export const getCustomerListCustomersSearchResults: MemoizedSelector<
  StateWithAsm,
  CustomerSearchPage
> = createSelector(
  getCustomerListCustomersSearchResultsLoaderState,
  (state: StateUtils.LoaderState<CustomerSearchPage>) =>
    StateUtils.loaderValueSelector(state)
);

export const getCustomerListCustomersSearchResultsLoading: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(
  getCustomerListCustomersSearchResultsLoaderState,
  (state: StateUtils.LoaderState<CustomerSearchPage>) =>
    StateUtils.loaderLoadingSelector(state)
);

export const getCustomerListCustomersSearchResultsError: MemoizedSelector<
  StateWithAsm,
  boolean
> = createSelector(
  getCustomerListCustomersSearchResultsLoaderState,
  (state: StateUtils.LoaderState<CustomerSearchPage>) =>
    StateUtils.loaderErrorSelector(state)
);
