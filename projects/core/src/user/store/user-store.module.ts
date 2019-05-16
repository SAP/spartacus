import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../config';
import { StateConfig, StorageSyncType } from '../../state';
import { StateModule } from '../../state/state.module';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { USER_FEATURE } from './user-state';

export function userStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          'user.account.details': StorageSyncType.LOCAL_STORAGE,
        },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StateModule,
    StoreModule.forFeature(USER_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    RouterModule,
    ConfigModule.withConfigFactory(userStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class UserStoreModule {}
