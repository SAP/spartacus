import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutAdapter } from '../../../checkout/connectors/checkout/checkout.adapter';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { CheckoutCostCenterAdapter } from '../../../checkout/connectors/cost-center/checkout-cost-center.adapter';
import { CheckoutDeliveryAdapter } from '../../../checkout/connectors/delivery/checkout-delivery.adapter';
import {
  CheckoutReplenishmentOrderAdapter,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '../../../checkout/connectors/index';
import { PaymentTypeAdapter } from '../../../checkout/connectors/payment-type/payment-type.adapter';
import { CheckoutPaymentAdapter } from '../../../checkout/connectors/payment/checkout-payment.adapter';
import { provideDefaultConfig } from '../../../config/config-providers';
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
