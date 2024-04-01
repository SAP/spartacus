/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BUNDLE_FEATURE } from './bundle-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(BUNDLE_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class BundleStoreModule {}
