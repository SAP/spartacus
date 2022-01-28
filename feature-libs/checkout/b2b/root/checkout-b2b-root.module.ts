import { NgModule } from '@angular/core';
import { CART_BASE_FEATURE } from '@spartacus/cart/base/root';
import {
  CheckoutRootModule,
  CHECKOUT_BASE_CMS_COMPONENTS,
  CHECKOUT_FEATURE,
} from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { defaultCheckoutB2BRoutingConfig } from './config/default-checkout-b2b-routing-config';
import { CheckoutB2BEventModule } from './events/checkout-b2b-event.module';
import {
  CHECKOUT_B2B_CORE_FEATURE,
  CHECKOUT_B2B_FEATURE,
} from './feature-name';

export const CHECKOUT_B2B_CMS_COMPONENTS: string[] = [
  /**
   *  TODO:#9574 - we should be able to remove the spread of `CHECKOUT_BASE_CMS_COMPONENTS`.
   * Re-test the B2B checkout flow after doing it.
   */
  ...CHECKOUT_BASE_CMS_COMPONENTS,
  'CheckoutCostCenterComponent',
  'CheckoutPaymentType',
];

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_B2B_FEATURE]: {
        cmsComponents: CHECKOUT_B2B_CMS_COMPONENTS,
        // TODO:#checkout - remove ORDER_FEATURE once we move the order placing functionality to the order lib
        dependencies: [CART_BASE_FEATURE, ORDER_FEATURE],
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
