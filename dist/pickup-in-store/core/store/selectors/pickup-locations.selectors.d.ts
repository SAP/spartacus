import { MemoizedSelector } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';
import { AugmentedPointOfService, PickupOption } from '@spartacus/pickup-in-store/root';
import { PickupLocationsState, StateWithPickupLocations } from '../pickup-location-state';
/**
 * Get all the intended pickup locations.
 */
export declare const getIntendedPickupLocations: MemoizedSelector<StateWithPickupLocations, PickupLocationsState['intendedPickupLocations']>;
/**
 * Get the intended pickup location for a given product.
 * @param productCode The product code of the product to get the intended pickup location for.
 * @returns The intended pickup location for the product.
 */
export declare const getIntendedPickupLocationByProductCode: (productCode: string) => MemoizedSelector<StateWithPickupLocations, AugmentedPointOfService | undefined>;
export declare const getPickupOptionByProductCode: (productCode: string) => MemoizedSelector<StateWithPickupLocations, PickupOption>;
export declare const getStoreDetailsByName: (storeName: string) => MemoizedSelector<StateWithPickupLocations, PointOfService>;
