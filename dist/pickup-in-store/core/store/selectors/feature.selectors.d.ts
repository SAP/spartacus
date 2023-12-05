import { MemoizedSelector } from '@ngrx/store';
import { PickupLocationsState, StateWithPickupLocations } from '../pickup-location-state';
import { PickupOptionState, StateWithPickupOption } from '../pickup-option-state';
import { StateWithStock, StockState } from '../stock-state';
export declare const getPickupLocationsState: MemoizedSelector<StateWithPickupLocations, PickupLocationsState>;
export declare const getPickupOptionState: MemoizedSelector<StateWithPickupOption, PickupOptionState>;
export declare const getStockState: MemoizedSelector<StateWithStock, StockState>;
