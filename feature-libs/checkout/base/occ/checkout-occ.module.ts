import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutAdapter,
  CheckoutDeliveryAddressAdapter,
  CheckoutDeliveryModesAdapter,
  CheckoutPaymentAdapter,
  CHECKOUT_NORMALIZER,
} from '@spartacus/checkout/base/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OccCheckoutNormalizer } from './adapters/converters/occ-checkout-normalizer';
import { OccCheckoutDeliveryAddressAdapter } from './adapters/occ-checkout-delivery-address.adapter';
import { OccCheckoutDeliveryModesAdapter } from './adapters/occ-checkout-delivery-modes.adapter';
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
      provide: CheckoutDeliveryAddressAdapter,
      useClass: OccCheckoutDeliveryAddressAdapter,
    },
    {
      provide: CheckoutDeliveryModesAdapter,
      useClass: OccCheckoutDeliveryModesAdapter,
    },
    {
      provide: CheckoutPaymentAdapter,
      useClass: OccCheckoutPaymentAdapter,
    },
    {
      provide: CHECKOUT_NORMALIZER,
      useExisting: OccCheckoutNormalizer,
      multi: true,
    },
  ],
})
export class CheckoutOccModule {}
