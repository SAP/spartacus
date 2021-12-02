import { NgModule } from '@angular/core';
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
          'CheckoutCostCenterComponent',
          'CheckoutPaymentType',
          'CheckoutReviewOrder',
          'CheckoutShippingAddress',
          'CheckoutPaymentDetails',
          'CheckoutDeliveryMode',
        ],
      },
      // by default core is bundled together with components
      [CHECKOUT_B2B_CORE_FEATURE]: CHECKOUT_B2B_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutB2BEventModule],
  providers: [
    provideDefaultConfig(defaultCheckoutB2BRoutingConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutB2BRootModule {}
