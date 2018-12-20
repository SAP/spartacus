import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducerToken, reducerProvider } from './reducers/index';
import { metaReducers } from './reducers/index';
import { effects } from './effects/index';
import { CART_FEATURE } from './cart-state';
import { CartOccModule } from './../occ/cart-occ.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CartOccModule,
    StoreModule.forFeature(CART_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider]
})
export class CartStoreModule {}
