import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { metaReducers } from './reducers/index';
import { AUTH_FEATURE } from './auth-state';
import { StateModule } from '../../state/state.module';
import { StateConfig } from '../../state/config/state-config';
import { ConfigModule } from '../../config/config.module';

export function authStoreConfigFactory(): StateConfig {
  // if we want to reuse AUTH_FEATURE const in config, we have to use factory instead of plain object
  const config = {
    state: {
      storageSync: {
        keys: [{ [AUTH_FEATURE]: ['userToken', 'clientToken'] }]
      }
    }
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
    ConfigModule.withConfigFactory(authStoreConfigFactory)
  ],
  providers: [reducerProvider]
})
export class AuthStoreModule {}
