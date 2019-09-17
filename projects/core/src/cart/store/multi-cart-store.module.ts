import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { MULTI_CART_FEATURE } from './multi-cart-state';
import {
  multiCartReducerProvider,
  multiCartReducerToken,
  multiCartMetaReducers,
} from './reducers/index';
import { ConfigModule } from '../../config/config.module';
import { StorageSyncType, StateConfig } from '../../state/config/state-config';

export function multiCartStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${MULTI_CART_FEATURE}.active`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
      metaReducers: multiCartMetaReducers,
    }),
    ConfigModule.withConfigFactory(multiCartStoreConfigFactory),
  ],
  providers: [multiCartReducerProvider],
})
export class MultiCartStoreModule {}
