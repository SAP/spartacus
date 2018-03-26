import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from '../config.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { MultiStepCheckoutModule } from './components/multi-step-checkout/multi-step-checkout.module';

@NgModule({
  imports: [
    CommonModule,
    MultiStepCheckoutModule,
    StoreModule.forFeature('checkout', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [MultiStepCheckoutModule]
})
export class CheckoutModule {
  static forRoot(config: any): any {
    return {
      ngModule: CheckoutModule,
      providers: [
        {
          provide: ConfigService,
          useExisting: config
        }
      ]
    };
  }
}
