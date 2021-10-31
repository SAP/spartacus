import { NgModule } from '@angular/core';
import { CheckoutCostCenterConnector } from './connectors/cost-center/checkout-cost-center.connector';
import { CheckoutPaymentTypeConnector } from './connectors/payment-type/checkout-payment-type.connector';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [
    ...facadeProviders,
    CheckoutCostCenterConnector,
    CheckoutPaymentTypeConnector,
  ],
})
export class CheckoutB2BCoreModule {}
