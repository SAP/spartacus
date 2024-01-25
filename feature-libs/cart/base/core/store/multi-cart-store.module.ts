/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { effects } from './effects/index';
import { MultiCartEffectsService } from './effects/multi-cart-effect.service';
import { MULTI_CART_FEATURE } from './multi-cart-state';
import {
  multiCartMetaReducers,
  multiCartReducerProvider,
  multiCartReducerToken,
} from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
      metaReducers: multiCartMetaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [multiCartReducerProvider, MultiCartEffectsService],
})
export class MultiCartStoreModule {}
