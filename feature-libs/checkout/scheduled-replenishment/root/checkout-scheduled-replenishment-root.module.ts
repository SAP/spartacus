import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
} from '.';
import { defaultCheckoutScheduledReplenishmentRoutingConfig } from './config/default-checkout-scheduled-replenishment-routing-config';

export function defaultCheckoutComponentsConfig() {
  const config = {
    featureModules: {
      [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE]: {
        cmsComponents: [
          'CheckoutPlaceOrder',
          'CheckoutScheduleReplenishmentOrder',
          'OrderConfirmationThankMessageComponent',
          'ReplenishmentConfirmationMessageComponent',
          'ReplenishmentConfirmationOverviewComponent',
          'ReplenishmentConfirmationItemsComponent',
          'ReplenishmentConfirmationTotalsComponent',
        ],
      },
      // by default core is bundled together with components
      [CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE]:
        CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig(defaultCheckoutScheduledReplenishmentRoutingConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutScheduledReplenishmentRootModule {}
