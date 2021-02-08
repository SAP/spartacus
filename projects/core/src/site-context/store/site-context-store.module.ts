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
import { SITE_CONTEXT_FEATURE } from './state';
import { provideDefaultConfigFactory } from '../../config/config-providers';

export function siteContextStoreConfigFactory(): StateConfig {
  // if we want to reuse SITE_CONTEXT_FEATURE const in config, we have to use factory instead of plain object
  const config: StateConfig = {
    state: {
      ssrTransfer: {
        keys: { [SITE_CONTEXT_FEATURE]: StateTransferType.TRANSFER_STATE },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(SITE_CONTEXT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    provideDefaultConfigFactory(siteContextStoreConfigFactory),
    reducerProvider,
  ],
})
export class SiteContextStoreModule {}
