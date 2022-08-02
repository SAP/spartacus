import { PointOfService } from '@spartacus/core';

export const PICKUP_LOCATIONS_FEATURE = 'pickup-locations';
export type PickupOption = 'delivery' | 'pickup';
export type AugmentedPointOfService = PointOfService & {
  pickupOption: PickupOption;
};

export interface StateWithPickupLocations {
  [PICKUP_LOCATIONS_FEATURE]: PickupLocationsState;
}

export interface PickupLocationsState {
  intendedPickupLocations: IntendedPickupLocationsState;
}

export type IntendedPickupLocationsState = {
  [productCode: string]: AugmentedPointOfService;
};
