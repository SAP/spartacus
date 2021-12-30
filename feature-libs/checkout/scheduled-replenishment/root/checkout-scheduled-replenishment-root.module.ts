import { NgModule } from '@angular/core';
import { CART_FEATURE } from '@spartacus/cart/main/root';
import {
  CheckoutB2BRootModule,
  CHECKOUT_B2B_CMS_COMPONENTS,
  CHECKOUT_B2B_FEATURE,
} from '@spartacus/checkout/b2b/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { defaultCheckoutScheduledReplenishmentRoutingConfig } from './config/default-checkout-scheduled-replenishment-routing-config';
import { CheckoutScheduledReplenishmentEventModule } from './events/checkout-scheduled-replenishment-event.module';
import {
  CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
} from './feature-name';

export const CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS: string[] = [
  ...CHECKOUT_B2B_CMS_COMPONENTS,
  'CheckoutScheduleReplenishmentOrder',
  'ReplenishmentConfirmationMessageComponent',
  'ReplenishmentConfirmationOverviewComponent',
  'ReplenishmentConfirmationItemsComponent',
  'ReplenishmentConfirmationTotalsComponent',
];

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE]: {
        cmsComponents: CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS,
        // TODO:#checkout - remove ORDER_FEATURE once we move the order placing functionality to the order lib
        dependencies: [CART_FEATURE, ORDER_FEATURE],
      },
      [CHECKOUT_B2B_FEATURE]: CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      // by default core is bundled together with components
      [CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE]:
        CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutB2BRootModule, CheckoutScheduledReplenishmentEventModule],
  providers: [
    provideDefaultConfig(defaultCheckoutScheduledReplenishmentRoutingConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutScheduledReplenishmentRootModule {}
