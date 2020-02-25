import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../config/config.module';
import { StateConfig, StorageSyncType } from '../../state/config/state-config';
import { StateModule } from '../../state/state.module';
import { CART_FEATURE } from './cart-state';
import { CartEntryEffects } from './effects/cart-entry.effect';
import { CartVoucherEffects } from './effects/cart-voucher.effect';
import { CartEffects } from './effects/cart.effect';
import { WishListEffects } from './effects/wish-list.effect';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

const effects: any[] = [
  CartEffects,
  CartEntryEffects,
  CartVoucherEffects,
  WishListEffects,
];

export function cartStoreConfigFactory(): StateConfig {
  const config: StateConfig = {
    state: {
      storageSync: {
        keys: {
          [`${CART_FEATURE}.active.value.content.guid`]: StorageSyncType.LOCAL_STORAGE,
          [`${CART_FEATURE}.active.value.content.code`]: StorageSyncType.LOCAL_STORAGE,
          [`${CART_FEATURE}.active.value.content.user`]: StorageSyncType.LOCAL_STORAGE,
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
    StoreModule.forFeature(CART_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(cartStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class CartStoreModule {}
