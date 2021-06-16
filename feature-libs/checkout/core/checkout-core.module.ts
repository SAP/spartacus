import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { CheckoutConnector } from './connectors/checkout/checkout.connector';
import { CheckoutCostCenterConnector } from './connectors/cost-center/checkout-cost-center.connector';
import { CheckoutDeliveryConnector } from './connectors/delivery/checkout-delivery.connector';
import { PaymentTypeConnector } from './connectors/payment-type/payment-type.connector';
import { CheckoutPaymentConnector } from './connectors/payment/checkout-payment.connector';
import { CheckoutReplenishmentOrderConnector } from './connectors/replenishment-order/checkout-replenishment-order.connector';
import { CheckoutEventBuilder } from './events/checkout-event.builder';
import { CheckoutEventModule } from './events/checkout-event.module';
import { facadeProviders } from './facade/facade-providers';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';
import { CheckoutStoreModule } from './store/checkout-store.module';

@NgModule({
  imports: [CheckoutStoreModule, CheckoutEventModule],
  providers: [
    ...facadeProviders,
    CheckoutDeliveryConnector,
    CheckoutCostCenterConnector,
    CheckoutConnector,
    CheckoutPaymentConnector,
    PaymentTypeConnector,
    CheckoutReplenishmentOrderConnector,
    CheckoutEventBuilder,
    CheckoutPageMetaResolver,
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageMetaResolver,
      multi: true,
    },
  ],
})
export class CheckoutCoreModule {}
