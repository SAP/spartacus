import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerToken, reducerProvider } from './reducers';
import { effects } from './effects';
import { PRODUCT_FEATURE } from './product-state';

import { metaReducers } from './reducers';
import { ProductConverterModule } from './converters';
import { ProductOccModule } from '../occ/product-occ.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductOccModule,
    ProductConverterModule,
    StoreModule.forFeature(PRODUCT_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider]
})
export class ProductStoreModule {}
