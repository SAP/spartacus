/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { BUNDLE_DATA, BundlesState } from '../bundle-state';
import { availableEntriesReducer } from './available-entries.reducer';
import { selectedProductsReducer } from './selected-products.reducer';

export function getReducers(): ActionReducerMap<BundlesState, any> {
  return {
    availableEntries: StateUtils.loaderReducer<any, any>(
      BUNDLE_DATA,
      availableEntriesReducer
    ),
    selectedProducts: StateUtils.loaderReducer<any, any>(
      BUNDLE_DATA,
      selectedProductsReducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<BundlesState>> =
  new InjectionToken<ActionReducerMap<BundlesState>>('BundleReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export const metaReducers: MetaReducer<any>[] = [];
