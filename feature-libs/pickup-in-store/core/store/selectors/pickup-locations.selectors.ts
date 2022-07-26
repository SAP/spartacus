import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';
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
export const getIntendedPickupLocationByProductCodeFactory = (
  productCode: string
): MemoizedSelector<StateWithPickupLocations, PointOfService | undefined> =>
  createSelector(
    getIntendedPickupLocations,
    (
      state: PickupLocationsState['intendedPickupLocations']
    ): PointOfService | undefined => state[productCode]
  );
