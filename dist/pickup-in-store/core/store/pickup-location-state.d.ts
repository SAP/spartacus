import { PointOfService } from '@spartacus/core';
import { AugmentedPointOfService, PointOfServiceNames } from '@spartacus/pickup-in-store/root';
export declare const PICKUP_LOCATIONS_FEATURE = "pickup-locations";
export interface StateWithPickupLocations {
    [PICKUP_LOCATIONS_FEATURE]: PickupLocationsState;
}
export interface PickupLocationsState {
    defaultPointOfService: PointOfServiceNames | null;
    intendedPickupLocations: IntendedPickupLocationsState;
    storeDetails: Record<string, PointOfService>;
}
export type IntendedPickupLocationsState = {
    [productCode: string]: AugmentedPointOfService;
};
