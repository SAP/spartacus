import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutAdapter } from '../../../checkout/connectors/checkout/checkout.adapter';
import { OccCheckoutAdapter } from './occ-checkout.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
  ],
})
export class CheckoutOccModule {}
