import { createSelector, MemoizedSelector } from '@ngrx/store';
import {
  AugmentedPointOfService,
  PickupLocationsState,
  PickupOption,
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
    getIntendedPickupLocationByProductCodeFactory(productCode),
    (_getIntendedPickupLocationByProductCodeFactory) =>
      _getIntendedPickupLocationByProductCodeFactory?.pickupOption ?? 'delivery'
  );
