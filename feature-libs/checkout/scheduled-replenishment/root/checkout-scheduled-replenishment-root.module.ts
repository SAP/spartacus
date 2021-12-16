import { NgModule } from '@angular/core';
import { CHECKOUT_B2B_FEATURE } from '@spartacus/checkout/b2b/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultCheckoutScheduledReplenishmentRoutingConfig } from './config/default-checkout-scheduled-replenishment-routing-config';
import { CheckoutScheduledReplenishmentEventModule } from './events/checkout-scheduled-replenishment-event.module';
import {
  CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
} from './feature-name';

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE]: {
        cmsComponents: [
          // scheduled replenishment cms components
          'CheckoutScheduleReplenishmentOrder',
          'ReplenishmentConfirmationMessageComponent',
          'ReplenishmentConfirmationOverviewComponent',
          'ReplenishmentConfirmationItemsComponent',
          'ReplenishmentConfirmationTotalsComponent',

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
      [CHECKOUT_B2B_FEATURE]: CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
      // by default core is bundled together with components
      [CHECKOUT_SCHEDULED_REPLENISHMENT_CORE_FEATURE]:
        CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutScheduledReplenishmentEventModule],
  providers: [
    provideDefaultConfig(defaultCheckoutScheduledReplenishmentRoutingConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutScheduledReplenishmentRootModule {}
