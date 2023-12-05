import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { PickupOptionState } from '../../pickup-option-state';
export declare function getPickupReducers(): ActionReducerMap<PickupOptionState>;
export declare const pickupOptionReducersToken: InjectionToken<ActionReducerMap<PickupOptionState>>;
export declare const pickupOptionReducersProvider: Provider;
export declare const pickupOptionMetaReducers: MetaReducer<any>[];
