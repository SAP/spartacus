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
import { CheckoutCostCenterService } from './facade/checkout-cost-center.service';
import { CheckoutPaymentService } from './facade/checkout-payment.service';
import { CheckoutService } from './facade/checkout.service';
import { facadeProviders } from './facade/facade-providers';
import { PaymentTypeService } from './facade/payment-type.service';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';
import { ClearCheckoutService } from './services/clear-checkout.service';
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
    CheckoutCostCenterService,
    CheckoutPaymentService,
    CheckoutService,
    PaymentTypeService,
    CheckoutPageMetaResolver,
    ClearCheckoutService,
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageMetaResolver,
      multi: true,
    },
  ],
})
export class CheckoutCoreModule {}
