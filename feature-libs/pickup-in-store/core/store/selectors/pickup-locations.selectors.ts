/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';
import {
  AugmentedPointOfService,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import {
  PickupLocationsState,
  StateWithPickupLocations,
} from '../pickup-location-state';
import { getPickupLocationsState } from './feature.selectors';

/**
 * Get all the intended pickup locations.
 */
export const getIntendedPickupLocations: MemoizedSelector<
  StateWithPickupLocations,
  PickupLocationsState['intendedPickupLocations']
> = createSelector(
  getPickupLocationsState,
  (state: PickupLocationsState) => state.intendedPickupLocations
);

/**
 * Get the intended pickup location for a given product.
 * @param productCode The product code of the product to get the intended pickup location for.
 * @returns The intended pickup location for the product.
 */
export const getIntendedPickupLocationByProductCode = (
  productCode: string
): MemoizedSelector<
  StateWithPickupLocations,
  AugmentedPointOfService | undefined
> =>
  createSelector(
    getIntendedPickupLocations,
    (
      state: PickupLocationsState['intendedPickupLocations']
    ): AugmentedPointOfService | undefined => state[productCode]
  );

export const getPickupOptionByProductCode = (
  productCode: string
): MemoizedSelector<StateWithPickupLocations, PickupOption> =>
  createSelector(
    getIntendedPickupLocationByProductCode(productCode),
    (_getIntendedPickupLocationByProductCode) =>
      _getIntendedPickupLocationByProductCode?.pickupOption ?? 'delivery'
  );

export const getStoreDetailsByName = (
  storeName: string
): MemoizedSelector<StateWithPickupLocations, PointOfService> =>
  createSelector(
    getPickupLocationsState,
    (state: PickupLocationsState) => state.storeDetails[storeName]
  );
