import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfigModule } from '../../config/config.module';
import {
  StateConfig,
  StateTransferType,
} from '../../state/config/state-config';
import { ProductOccModule } from '../occ/product-occ.module';
import { effects } from './effects/index';
import { PRODUCT_FEATURE } from './product-state';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';

export function productStoreConfigFactory(): StateConfig {
  // if we want to reuse PRODUCT_FEATURE const in config, we have to use factory instead of plain object
  const config = {
    state: {
      ssrTransfer: {
        keys: { [PRODUCT_FEATURE]: StateTransferType.TRANSFER_STATE },
      },
    },
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductOccModule,
    StoreModule.forFeature(PRODUCT_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(productStoreConfigFactory),
  ],
  providers: [reducerProvider],
})
export class ProductStoreModule {}
