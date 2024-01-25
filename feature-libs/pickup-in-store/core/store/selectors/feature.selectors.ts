/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createFeatureSelector, MemoizedSelector } from '@ngrx/store';
import {
  PickupLocationsState,
  PICKUP_LOCATIONS_FEATURE,
  StateWithPickupLocations,
} from '../pickup-location-state';
import {
  PickupOptionState,
  PICKUP_OPTION_FEATURE,
  StateWithPickupOption,
} from '../pickup-option-state';
import { StateWithStock, StockState, STOCK_FEATURE } from '../stock-state';

export const getPickupLocationsState: MemoizedSelector<
  StateWithPickupLocations,
  PickupLocationsState
> = createFeatureSelector<PickupLocationsState>(PICKUP_LOCATIONS_FEATURE);

export const getPickupOptionState: MemoizedSelector<
  StateWithPickupOption,
  PickupOptionState
> = createFeatureSelector<PickupOptionState>(PICKUP_OPTION_FEATURE);

export const getStockState: MemoizedSelector<StateWithStock, StockState> =
  createFeatureSelector<StockState>(STOCK_FEATURE);
