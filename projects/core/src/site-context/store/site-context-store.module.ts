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

export function siteContextStoreConfigFactory(): StateConfig {
  const config = {
    state: { ssrTransfer: { keys: { [SITE_CONTEXT_FEATURE]: true } } }
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(SITE_CONTEXT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(siteContextStoreConfigFactory)
  ],
  providers: [reducerProvider]
})
export class SiteContextStoreModule {}
