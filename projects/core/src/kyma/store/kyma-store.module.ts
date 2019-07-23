import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../config/config.module';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { StateModule } from '../../state/state.module';
import { effects } from './effects/index';
import { KYMA_FEATURE } from './kyma-state';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

export function kymaStoreConfigFactory(): StateConfig {
  // if we want to reuse KYMA_FEATURE const in config, we have to use factory instead of plain object
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          'kyma.openIdToken.value': StorageSyncType.LOCAL_STORAGE,
        },
        excludeKeys: {
          'kyma.openIdToken.value.refresh_token': StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(KYMA_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(kymaStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class KymaStoreModule {}
