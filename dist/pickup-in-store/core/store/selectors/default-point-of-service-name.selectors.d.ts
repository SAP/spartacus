import { MemoizedSelector } from '@ngrx/store';
import { PickupLocationsState, StateWithPickupLocations } from '../pickup-location-state';
export declare const getPreferredStore: MemoizedSelector<StateWithPickupLocations, PickupLocationsState['defaultPointOfService']>;
