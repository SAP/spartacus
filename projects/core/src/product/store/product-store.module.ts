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

const productSsrTransferConfig: StateConfig = {
  state: { ssrTransfer: { keys: { [PRODUCT_FEATURE]: true } } }
};

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductOccModule,
    ProductConverterModule,
    StoreModule.forFeature(PRODUCT_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ConfigModule.withConfig(productSsrTransferConfig)
  ],
  providers: [reducerProvider]
})
export class ProductStoreModule {}
