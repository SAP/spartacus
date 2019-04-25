import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../config/config.module';
import { StateConfig, StateConfigType } from '../../state/config/state-config';
import { effects } from './effects/index';
import { reducerProvider, reducerToken } from './reducers/index';
import { SITE_CONTEXT_FEATURE } from './state';

export function siteContextStoreConfigFactory(): StateConfig {
  // if we want to reuse SITE_CONTEXT_FEATURE const in config, we have to use factory instead of plain object
  const config: StateConfig = {
    state: {
      keys: { [SITE_CONTEXT_FEATURE]: StateConfigType.TRANSFER_STATE },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(SITE_CONTEXT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(siteContextStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class SiteContextStoreModule {}
