import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutAdapter,
  CheckoutDeliveryAdapter,
  CheckoutDeliveryModesAdapter,
  CheckoutPaymentAdapter,
} from '@spartacus/checkout/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OccCheckoutDeliveryModesAdapter } from './adapters/occ-checkout-delivery-modes.adapter';
import { OccCheckoutDeliveryAdapter } from './adapters/occ-checkout-delivery.adapter';
import { OccCheckoutPaymentAdapter } from './adapters/occ-checkout-payment.adapter';
import { OccCheckoutAdapter } from './adapters/occ-checkout.adapter';
import { defaultOccCheckoutConfig } from './config/default-occ-checkout-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCheckoutConfig),
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
    {
      provide: CheckoutDeliveryAdapter,
      useClass: OccCheckoutDeliveryAdapter,
    },
    {
      provide: CheckoutDeliveryModesAdapter,
      useClass: OccCheckoutDeliveryModesAdapter,
    },
    {
      provide: CheckoutPaymentAdapter,
      useClass: OccCheckoutPaymentAdapter,
    },
  ],
})
export class CheckoutOccModule {}
