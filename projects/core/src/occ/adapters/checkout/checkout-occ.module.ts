import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutAdapter } from '../../../checkout/connectors/checkout/checkout.adapter';
import { OccCheckoutAdapter } from './occ-checkout.adapter';
import { OccOrderNormalizer } from './converters/occ-order-normalizer';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
    { provide: ORDER_NORMALIZER, useClass: OccOrderNormalizer, multi: true },
  ],
})
export class CheckoutOccModule {}
