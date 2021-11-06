import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { CheckoutConnector } from './connectors/checkout/checkout.connector';
import { CheckoutDeliveryAddressConnector } from './connectors/delivery-address/checkout-delivery-address.connector';
import { CheckoutDeliveryModesConnector } from './connectors/delivery-modes/checkout-delivery-modes.connector';
import { CheckoutPaymentConnector } from './connectors/payment/checkout-payment.connector';
import { facadeProviders } from './facade/facade-providers';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';

@NgModule({
  providers: [
    ...facadeProviders,
    CheckoutDeliveryAddressConnector,
    CheckoutDeliveryModesConnector,
    CheckoutPaymentConnector,
    CheckoutConnector,
    CheckoutPageMetaResolver,
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageMetaResolver,
      multi: true,
    },
  ],
})
export class CheckoutCoreModule {}
