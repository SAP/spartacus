/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { StoreEntities } from '@spartacus/storefinder/root';

export const STORE_FINDER_FEATURE = 'stores';
export const STORE_FINDER_DATA = '[StoreFinder] Store Finder Data';

export interface StateWithStoreFinder {
  [STORE_FINDER_FEATURE]: StoresState;
}

export interface StoresState {
  findStores: StateUtils.LoaderState<FindStoresState>;
  viewAllStores: StateUtils.LoaderState<ViewAllStoresState>;
}

export interface FindStoresState {
  findStoresEntities: StoreEntities;
  findStoreEntityById: StoreEntities;
}

export interface ViewAllStoresState {
  viewAllStoresEntities: StoreEntities;
}
