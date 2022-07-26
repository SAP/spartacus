import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  PickupLocationsState,
  PICKUP_LOCATIONS_FEATURE,
  StateWithPickupLocations,
} from '../pickup-location-state';
import { StateWithStock, StockState, STOCK_FEATURE } from '../stock-state';

export const getStockState: MemoizedSelector<StateWithStock, StockState> =
  createFeatureSelector<StockState>(STOCK_FEATURE);

export const getPickupLocationsState: MemoizedSelector<
  StateWithPickupLocations,
  PickupLocationsState
> = createFeatureSelector<PickupLocationsState>(PICKUP_LOCATIONS_FEATURE);
