import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutAdapter,
  CheckoutCostCenterAdapter,
  CheckoutDeliveryAdapter,
  CheckoutPaymentAdapter,
  CheckoutReplenishmentOrderAdapter,
  ORDER_NORMALIZER,
  PaymentTypeAdapter,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '@spartacus/checkout/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  OccOrderNormalizer,
  OccReplenishmentOrderFormSerializer,
  OccReplenishmentOrderNormalizer,
} from './converters/index';
import { defaultOccCheckoutConfig } from './default-occ-checkout-config';
import { OccCheckoutCostCenterAdapter } from './occ-checkout-cost-center.adapter';
import { OccCheckoutDeliveryAdapter } from './occ-checkout-delivery.adapter';
import { OccCheckoutPaymentTypeAdapter } from './occ-checkout-payment-type.adapter';
import { OccCheckoutPaymentAdapter } from './occ-checkout-payment.adapter';
import { OccCheckoutReplenishmentOrderAdapter } from './occ-checkout-replenishment-order.adapter';
import { OccCheckoutAdapter } from './occ-checkout.adapter';

@NgModule({
  imports: [CommonModule],
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
    {
      provide: CheckoutReplenishmentOrderAdapter,
      useClass: OccCheckoutReplenishmentOrderAdapter,
    },
    {
      provide: REPLENISHMENT_ORDER_NORMALIZER,
      useExisting: OccReplenishmentOrderNormalizer,
      multi: true,
    },
    {
      provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
      useExisting: OccReplenishmentOrderFormSerializer,
      multi: true,
    },
  ],
})
export class CheckoutOccModule {}
