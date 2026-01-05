/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { reducerProvider, reducerToken } from './reducers/index';
import { SITE_THEME_FEATURE } from './state';
import { provideDefaultConfigFactory } from '../../config/config-providers';

export function siteThemeStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      ssrTransfer: {
        keys: { [SITE_THEME_FEATURE]: StateTransferType.TRANSFER_STATE },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SITE_THEME_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    provideDefaultConfigFactory(siteThemeStoreConfigFactory),
    reducerProvider,
  ],
})
export class SiteThemeStoreModule {}
