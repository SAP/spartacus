/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ProductSearchPage, StateUtils } from '@spartacus/core';

export const BUNDLE_FEATURE = 'bundle';
export const BUNDLE_DATA = '[Bundle] Bundle Data';

export interface StateWithBundle {
  [BUNDLE_FEATURE]: BundlesState;
}

export interface AvailableEntriesEntities extends ProductSearchPage {
    cartId?: string;
    userId?: string;
    entryGroupNumber?: number;
}

export type SelectedProductsState = {
  [cartId: string]: {
    [bundleId: number]: {
      [sectionId: number]: Product[];
    };
  };
};

export interface BundlesState {
  availableEntries: StateUtils.LoaderState<AvailableEntriesState>;
  selectedProducts: StateUtils.LoaderState<SelectedProductsState>;
}

export interface AvailableEntriesState {
  availableEntriesEntities: AvailableEntriesEntities;
}
