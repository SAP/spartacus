import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { metaReducers, reducerToken, reducerProvider } from './reducers/index';
import { effects } from './effects/index';
import { CHECKOUT_FEATURE } from './checkout-state';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(CHECKOUT_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  providers: [reducerProvider]
})
export class CheckoutStoreModule {}
