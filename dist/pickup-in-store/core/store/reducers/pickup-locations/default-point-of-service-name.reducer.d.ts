import { PickupLocationsState } from '../../pickup-location-state';
export declare const defaultPointOfServiceInitialState: PickupLocationsState['defaultPointOfService'];
export declare const defaultPointOfServiceReducer: import("@ngrx/store").ActionReducer<Required<{
    name: string;
    displayName: string;
}> | null, import("@ngrx/store").Action>;
