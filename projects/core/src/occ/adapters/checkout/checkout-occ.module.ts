import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutAdapter } from '../../../checkout/connectors/checkout/checkout.adapter';
import { OccCheckoutAdapter } from './occ-checkout.adapter';
import { OccOrderNormalizer } from './converters/occ-order-normalizer';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { CheckoutDeliveryAdapter } from '../../../checkout/connectors/delivery/checkout-delivery.adapter';
import { OccCheckoutDeliveryAdapter } from './occ-checkout-delivery.adapter';
import { CheckoutPaymentAdapter } from '../../../checkout/connectors/payment/checkout-payment.adapter';
import { OccCheckoutPaymentAdapter } from './occ-checkout-payment.adapter';
import { PaymentTypeAdapter } from '../../../checkout/connectors/payment-type/payment-type.adapter';
import { OccCheckoutPaymentTypeAdapter } from './occ-checkout-payment-type.adapter';
import { provideDefaultConfig } from '../../../config/config-providers';
import { defaultOccCheckoutConfig } from './default-occ-checkout-config';
import { CheckoutCostCenterAdapter } from '../../../checkout/connectors/cost-center/checkout-cost-center.adapter';
import { OccCheckoutCostCenterAdapter } from './occ-checkout-cost-center.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    provideDefaultConfig(defaultOccCheckoutConfig),
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
    { provide: ORDER_NORMALIZER, useExisting: OccOrderNormalizer, multi: true },
    {
      provide: CheckoutDeliveryAdapter,
      useClass: OccCheckoutDeliveryAdapter,
    },
    {
      provide: CheckoutPaymentAdapter,
      useClass: OccCheckoutPaymentAdapter,
    },
    {
      provide: PaymentTypeAdapter,
      useClass: OccCheckoutPaymentTypeAdapter,
    },
    {
      provide: CheckoutCostCenterAdapter,
      useClass: OccCheckoutCostCenterAdapter,
    },
  ],
})
export class CheckoutOccModule {}
