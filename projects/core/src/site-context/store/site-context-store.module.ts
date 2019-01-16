import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { SITE_CONTEXT_FEATURE } from './state';
import { ConfigModule } from '../../config/config.module';
import { StateConfig } from '../../state/config/state-config';

const siteContextSsrTransferConfig: StateConfig = {
  state: { ssrTransfer: { keys: { [SITE_CONTEXT_FEATURE]: true } } }
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(SITE_CONTEXT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(siteContextSsrTransferConfig)
  ],
  providers: [reducerProvider]
})
export class SiteContextStoreModule {}
