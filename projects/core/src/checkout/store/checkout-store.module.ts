import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CHECKOUT_FEATURE } from './checkout-state';
import { effects } from './effects/index';
import { reducerProvider, reducerToken } from './reducers/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CHECKOUT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class CheckoutStoreModule {}
