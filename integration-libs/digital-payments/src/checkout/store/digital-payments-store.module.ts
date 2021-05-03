import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DIGITAL_PAYMENTS_FEATURE } from './digital-payments-state';
import { reducerProvider, reducerToken } from './reducers/index';
import { effects } from './effects/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(DIGITAL_PAYMENTS_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class DigitalPaymentsStoreModule {}
