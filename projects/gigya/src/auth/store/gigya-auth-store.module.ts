import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  StateConfig,
  StorageSyncType,
  StateModule,
  AUTH_FEATURE,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { reducerToken } from './reducers';
import { metaReducers, reducerProvider } from './reducers/index';
import { GigyaUserTokenEffects } from './effects';

export function authStoreConfigFactory(): StateConfig {
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
    EffectsModule.forFeature([GigyaUserTokenEffects]),
  ],
  providers: [
    provideDefaultConfigFactory(authStoreConfigFactory),
    reducerProvider,
  ],
})
export class GigyaAuthStoreModule {}
