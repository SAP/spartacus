import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultCheckoutConfig } from './config/default-checkout-config';
import { defaultCheckoutRoutingConfig } from './config/default-checkout-routing-config';
import { CHECKOUT_CORE_FEATURE, CHECKOUT_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';

export function defaultCheckoutComponentsConfig() {
  const config = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: [
          'CheckoutOrchestrator',
          'CheckoutOrderSummary',
          'CheckoutProgress',
          'CheckoutProgressMobileBottom',
          'CheckoutProgressMobileTop',
          'CheckoutCostCenterComponent',
          'CheckoutDeliveryMode',
          'CheckoutPaymentDetails',
          'CheckoutPaymentType',
          'CheckoutPlaceOrder',
          'CheckoutReviewOrder',
          'CheckoutScheduleReplenishmentOrder',
          'CheckoutShippingAddress',
          'GuestCheckoutLoginComponent',
          'OrderConfirmationThankMessageComponent',
          'OrderConfirmationItemsComponent',
          'OrderConfirmationTotalsComponent',
          'OrderConfirmationOverviewComponent',
          'ReplenishmentConfirmationMessageComponent',
          'ReplenishmentConfirmationOverviewComponent',
          'ReplenishmentConfirmationItemsComponent',
          'ReplenishmentConfirmationTotalsComponent',
        ],
      },
      // by default core is bundled together with components
      [CHECKOUT_CORE_FEATURE]: CHECKOUT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultCheckoutRoutingConfig),
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutRootModule {}
