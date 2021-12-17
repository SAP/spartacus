import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/storefront';
import { defaultCheckoutConfig } from './config/default-checkout-config';
import { defaultCheckoutRoutingConfig } from './config/default-checkout-routing-config';
import { CHECKOUT_CORE_FEATURE, CHECKOUT_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';
import { OrderConfirmationOrderEntriesContext } from './pages/order-confirmation-order-entries-context';

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
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'orderConfirmation',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContext,
          },
        },
      },
    ]),
  ],
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultCheckoutRoutingConfig),
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfigFactory(defaultCheckoutComponentsConfig),
  ],
})
export class CheckoutRootModule {}
