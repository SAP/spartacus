import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutAdapter,
  CheckoutCostCenterAdapter,
  CheckoutDeliveryAdapter,
  CheckoutPaymentAdapter,
  CheckoutReplenishmentOrderAdapter,
  PaymentTypeAdapter,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
} from '@spartacus/checkout/core';
import {
  ORDER_NORMALIZER,
  provideDefaultConfig,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '@spartacus/core';
import {
  OccOrderNormalizer,
  OccReplenishmentOrderFormSerializer,
  OccReplenishmentOrderNormalizer,
} from './adapters/converters/index';
import { defaultOccCheckoutConfig } from './adapters/default-occ-checkout-config';
import { OccCheckoutCostCenterAdapter } from './adapters/occ-checkout-cost-center.adapter';
import { OccCheckoutDeliveryAdapter } from './adapters/occ-checkout-delivery.adapter';
import { OccCheckoutPaymentTypeAdapter } from './adapters/occ-checkout-payment-type.adapter';
import { OccCheckoutPaymentAdapter } from './adapters/occ-checkout-payment.adapter';
import { OccCheckoutReplenishmentOrderAdapter } from './adapters/occ-checkout-replenishment-order.adapter';
import { OccCheckoutAdapter } from './adapters/occ-checkout.adapter';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCheckoutConfig),
    OccOrderNormalizer,
    OccReplenishmentOrderFormSerializer,
    OccReplenishmentOrderNormalizer,
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
