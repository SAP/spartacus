import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { CheckoutConnector } from './connectors/checkout/checkout.connector';
import { CheckoutDeliveryModesConnector } from './connectors/delivery-modes/checkout-delivery-modes.connector';
import { CheckoutDeliveryConnector } from './connectors/delivery/checkout-delivery.connector';
import { CheckoutPaymentConnector } from './connectors/payment/checkout-payment.connector';
import { CheckoutEventModule } from './events/checkout-event.module';
import { facadeProviders } from './facade/facade-providers';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';

@NgModule({
  imports: [CheckoutEventModule],
  providers: [
    ...facadeProviders,
    CheckoutDeliveryConnector,
    CheckoutDeliveryModesConnector,
    CheckoutConnector,
    CheckoutPaymentConnector,
    CheckoutPageMetaResolver,
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageMetaResolver,
      multi: true,
    },
  ],
})
export class CheckoutCoreModule {}
