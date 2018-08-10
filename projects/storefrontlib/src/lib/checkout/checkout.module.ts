import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store';
import { effects } from './store/effects/index';
import { metaReducers } from './store/reducers';

import { services } from './services/index';

import { MultiStepCheckoutModule } from './components/multi-step-checkout/multi-step-checkout.module';
import { OrderConfirmationModule } from './components/order-confirmation/order-confirmation.module';

@NgModule({
  imports: [
    CommonModule,
    MultiStepCheckoutModule,
    StoreModule.forFeature('checkout', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [MultiStepCheckoutModule, OrderConfirmationModule],
  providers: [...services]
})
export class CheckoutModule {}
