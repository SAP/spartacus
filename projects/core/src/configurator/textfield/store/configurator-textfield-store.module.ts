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
import { CONFIGURATION_TEXTFIELD_FEATURE } from './configuration-textfield-state';
import { configuratorTextfieldEffects } from './effects/index';
import {
  configuratorTextfieldReducerProvider,
  configuratorTextfieldReducerToken,
} from './reducers/index';

export function configuratorTextfieldStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${CONFIGURATION_TEXTFIELD_FEATURE}.value.content.configId`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(
      CONFIGURATION_TEXTFIELD_FEATURE,
      configuratorTextfieldReducerToken
    ),
    EffectsModule.forFeature(configuratorTextfieldEffects),
    ConfigModule.withConfigFactory(configuratorTextfieldStoreConfigFactory),
  ],
  providers: [configuratorTextfieldReducerProvider],
})
export class ConfiguratorTextfieldStoreModule {}
