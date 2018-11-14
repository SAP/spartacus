import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { PRODUCT_FEATURE } from './product-state';

import { metaReducers } from './reducers/index';
import { ProductConverterModule } from './converters/index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(PRODUCT_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects),
    ProductConverterModule
  ],
  providers: [reducerProvider]
})
export class ProductStoreModule {}
