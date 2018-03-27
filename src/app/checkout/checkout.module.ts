import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { effects, reducers } from './store';
import { metaReducers } from './store/reducers';

import * as fromServices from './services';

import { MultiStepCheckoutModule } from './components/multi-step-checkout/multi-step-checkout.module';

@NgModule({
  imports: [
    CommonModule,
    MultiStepCheckoutModule,
    StoreModule.forFeature('checkout', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  exports: [MultiStepCheckoutModule],
  providers: [...fromServices.services]
})
export class CheckoutModule {}
