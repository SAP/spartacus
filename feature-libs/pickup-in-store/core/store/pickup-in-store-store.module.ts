/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects } from './effects/index';
import { PICKUP_LOCATIONS_FEATURE } from './pickup-location-state';
import { PICKUP_OPTION_FEATURE } from './pickup-option-state';
import {
  pickupLocationsMetaReducers,
  pickupLocationsReducersProvider,
  pickupLocationsReducersToken,
  pickupOptionMetaReducers,
  pickupOptionReducersProvider,
  pickupOptionReducersToken,
  stockMetaReducers,
  stockReducersProvider,
  stockReducersToken,
} from './reducers/index';
import { STOCK_FEATURE } from './stock-state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      PICKUP_LOCATIONS_FEATURE,
      pickupLocationsReducersToken,
      {
        metaReducers: pickupLocationsMetaReducers,
      }
    ),
    StoreModule.forFeature(PICKUP_OPTION_FEATURE, pickupOptionReducersToken, {
      metaReducers: pickupOptionMetaReducers,
    }),
    StoreModule.forFeature(STOCK_FEATURE, stockReducersToken, {
      metaReducers: stockMetaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    pickupLocationsReducersProvider,
    pickupOptionReducersProvider,
    stockReducersProvider,
  ],
})
export class PickupInStoreStoreModule {}
