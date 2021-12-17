import { NgModule } from '@angular/core';
import {
  CheckoutRootModule,
  CHECKOUT_FEATURE,
} from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultCheckoutB2BRoutingConfig } from './config/default-checkout-b2b-routing-config';
import { CheckoutB2BEventModule } from './events/checkout-b2b-event.module';
import {
  CHECKOUT_B2B_CORE_FEATURE,
  CHECKOUT_B2B_FEATURE,
} from './feature-name';

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_B2B_FEATURE]: {
        cmsComponents: [
          // b2b cms components
          'CheckoutCostCenterComponent',
          'CheckoutPaymentType',

          // base cms components
          'CheckoutReviewOrder',
          'CheckoutShippingAddress',
          'CheckoutOrchestrator',
          'CheckoutOrderSummary',
          'CheckoutProgress',
          'CheckoutProgressMobileBottom',
          'CheckoutProgressMobileTop',
          'CheckoutDeliveryMode',
          'CheckoutPaymentDetails',
          'CheckoutPlaceOrder',
          'GuestCheckoutLoginComponent',
          'OrderConfirmationThankMessageComponent',
          'OrderConfirmationItemsComponent',
          'OrderConfirmationTotalsComponent',
          'OrderConfirmationOverviewComponent',
        ],
      },
      [CHECKOUT_FEATURE]: CHECKOUT_B2B_FEATURE,
      // by default core is bundled together with components
      [CHECKOUT_B2B_CORE_FEATURE]: CHECKOUT_B2B_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutRootModule, CheckoutB2BEventModule],
  providers: [
    provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutB2BRootModule {}
