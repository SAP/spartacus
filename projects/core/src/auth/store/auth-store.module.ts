import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../config/config.module';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { StateModule } from '../../state/state.module';
import { AUTH_FEATURE } from './auth-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

export function authStoreConfigFactory(): StateConfig {
  // if we want to reuse AUTH_FEATURE const in config, we have to use factory instead of plain object
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          'auth.userToken.token': StorageSyncType.LOCAL_STORAGE,
          'auth.openIdToken.value': StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(AUTH_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(authStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class AuthStoreModule {}
