import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CHECKOUT_B2B_CORE_FEATURE, CHECKOUT_B2B_FEATURE } from '.';
import { defaultCheckoutB2BRoutingConfig } from './config/default-checkout-b2b-routing-config';

export function defaultCheckoutComponentsConfig() {
  const config = {
    featureModules: {
      [CHECKOUT_B2B_FEATURE]: {
        cmsComponents: [
          'CheckoutCostCenterComponent',
          'CheckoutPaymentType',
          'CheckoutReviewOrder',
          'CheckoutShippingAddress',
        ],
      },
      // by default core is bundled together with components
      [CHECKOUT_B2B_CORE_FEATURE]: CHECKOUT_B2B_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutB2BRootModule {}
