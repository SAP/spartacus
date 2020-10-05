import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { StateModule } from '../../state/state.module';
import { AUTH_FEATURE } from './auth-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { provideDefaultConfigFactory } from '../../config/config-providers';

export function authStoreConfigFactory(): StateConfig {
  // if we want to reuse AUTH_FEATURE const in config, we have to use factory instead of plain object
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          'auth.userToken.token.access_token': StorageSyncType.LOCAL_STORAGE,
          'auth.userToken.token.token_type': StorageSyncType.LOCAL_STORAGE,
          'auth.userToken.token.expires_in': StorageSyncType.LOCAL_STORAGE,
          'auth.userToken.token.expiration_time': StorageSyncType.LOCAL_STORAGE,
          'auth.userToken.token.scope': StorageSyncType.LOCAL_STORAGE,
          'auth.userToken.token.userId': StorageSyncType.LOCAL_STORAGE,
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
  ],
  providers: [
    provideDefaultConfigFactory(authStoreConfigFactory),
    reducerProvider,
  ],
})
export class AuthStoreModule {}
