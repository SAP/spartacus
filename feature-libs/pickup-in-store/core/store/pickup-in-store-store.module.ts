/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { effects } from './effects/index';
import { PICKUP_LOCATIONS_FEATURE } from './pickup-location-state';
import {
  pickupLocationsMetaReducers,
  pickupLocationsReducersProvider,
  pickupLocationsReducersToken,
  stockMetaReducers,
  stockReducersProvider,
  stockReducersToken,
} from './reducers/index';
import { STOCK_FEATURE } from './stock-state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(STOCK_FEATURE, stockReducersToken, {
      metaReducers: stockMetaReducers,
    }),
    StoreModule.forFeature(
      PICKUP_LOCATIONS_FEATURE,
      pickupLocationsReducersToken,
      {
        metaReducers: pickupLocationsMetaReducers,
      }
    ),
    EffectsModule.forFeature(effects),
  ],
  providers: [stockReducersProvider, pickupLocationsReducersProvider],
})
export class PickupInStoreStoreModule {}
