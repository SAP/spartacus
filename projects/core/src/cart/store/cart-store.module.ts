import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducerToken, reducerProvider } from './reducers/index';
import { metaReducers } from './reducers/index';
import { effects } from './effects/index';
import { CART_FEATURE } from './cart-state';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { ConfigModule } from '../../config';

export function cartStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${CART_FEATURE}.active.value.content.guid`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(CART_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(cartStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class CartStoreModule {}
