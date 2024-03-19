/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  StateConfig,
  StateTransferType,
} from '../../state/config/state-config';
import { effects } from './effects/index';
import { BUNDDLE_FEATURE } from './bundle-state';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { provideDefaultConfigFactory } from '../../config/config-providers';

export function bundleStoreConfigFactory(): StateConfig {
  // if we want to reuse PRODUCT_FEATURE const in config, we have to use factory instead of plain object
  const config: StateConfig = {
    state: {
      ssrTransfer: {
        keys: { [BUNDDLE_FEATURE]: StateTransferType.TRANSFER_STATE },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(BUNDDLE_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    provideDefaultConfigFactory(bundleStoreConfigFactory),
    reducerProvider,
  ],
})
export class ProductStoreModule {}
