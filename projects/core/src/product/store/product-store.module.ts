import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider, metaReducers } from './reducers/index';
import { effects } from './effects/index';
import { PRODUCT_FEATURE } from './product-state';

import { ProductConverterModule } from './converters/index';
import { ProductOccModule } from '../occ/product-occ.module';
import { ConfigModule } from '../../config/config.module';
import { StateConfig } from '../../state/config/state-config';

export function productStoreConfigFactory(): StateConfig {
  const config = {
    state: { ssrTransfer: { keys: { [PRODUCT_FEATURE]: true } } }
  };
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductOccModule,
    ProductConverterModule,
    StoreModule.forFeature(PRODUCT_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfigFactory(productStoreConfigFactory)
  ],
  providers: [reducerProvider]
})
export class ProductStoreModule {}
