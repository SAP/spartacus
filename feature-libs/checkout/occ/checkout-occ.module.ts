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
import { provideDefaultConfig } from '@spartacus/core';
import { OccReplenishmentOrderFormSerializer } from './adapters/converters/index';
import { OccCheckoutCostCenterAdapter } from './adapters/occ-checkout-cost-center.adapter';
import { OccCheckoutDeliveryAdapter } from './adapters/occ-checkout-delivery.adapter';
import { OccCheckoutPaymentTypeAdapter } from './adapters/occ-checkout-payment-type.adapter';
import { OccCheckoutPaymentAdapter } from './adapters/occ-checkout-payment.adapter';
import { OccCheckoutReplenishmentOrderAdapter } from './adapters/occ-checkout-replenishment-order.adapter';
import { OccCheckoutAdapter } from './adapters/occ-checkout.adapter';
import { defaultOccCheckoutConfig } from './config/default-occ-checkout-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccCheckoutConfig),
    OccReplenishmentOrderFormSerializer,
    {
      provide: CheckoutAdapter,
      useClass: OccCheckoutAdapter,
    },
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
      provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
      useExisting: OccReplenishmentOrderFormSerializer,
      multi: true,
    },
  ],
})
export class CheckoutOccModule {}
