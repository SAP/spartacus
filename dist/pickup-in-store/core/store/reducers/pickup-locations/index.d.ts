import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { PickupLocationsState } from '../../pickup-location-state';
export declare function getReducers(): ActionReducerMap<PickupLocationsState>;
export declare const pickupLocationsReducersToken: InjectionToken<ActionReducerMap<PickupLocationsState>>;
export declare const pickupLocationsReducersProvider: Provider;
export declare const pickupLocationsMetaReducers: MetaReducer<any>[];
