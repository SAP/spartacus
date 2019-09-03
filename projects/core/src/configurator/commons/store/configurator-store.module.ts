import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../../config/config.module';
import {
  StateConfig,
  StorageSyncType,
} from '../../../state/config/state-config';
import { StateModule } from '../../../state/state.module';
import { CONFIGURATION_FEATURE } from './configuration-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

export function configuratorStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${CONFIGURATION_FEATURE}.active.value.content.guid`]: StorageSyncType.LOCAL_STORAGE,
          [`${CONFIGURATION_FEATURE}.active.value.content.code`]: StorageSyncType.LOCAL_STORAGE,
        },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule,
    StoreModule.forFeature(CONFIGURATION_FEATURE, reducerToken, {
      metaReducers,
    }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(configuratorStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class ConfiguratorStoreModule {}
