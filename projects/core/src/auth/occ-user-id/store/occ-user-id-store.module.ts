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
import { OccUserIdEffect } from './effects/index';
import { AUTH_OCC_USER_ID_FEATURE } from './occ-user-id-state';
import { reducerProvider, reducerToken } from './reducers/index';

export function occUserIdStoreConfigFactory(): StateConfig {
  // if we want to reuse AUTH_OCC_USER_ID_FEATURE const in config, we have to use factory instead of plain object
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${AUTH_OCC_USER_ID_FEATURE}.occUserId`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(AUTH_OCC_USER_ID_FEATURE, reducerToken),
    EffectsModule.forFeature([OccUserIdEffect]),
    ConfigModule.withConfigFactory(occUserIdStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class OccUserIdStoreModule {}
