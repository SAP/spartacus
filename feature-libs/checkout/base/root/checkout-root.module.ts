import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CART_BASE_FEATURE,
  ORDER_ENTRIES_CONTEXT,
} from '@spartacus/cart/base/root';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultCheckoutConfig } from './config/default-checkout-config';
import { defaultCheckoutRoutingConfig } from './config/default-checkout-routing-config';
import { CheckoutEventModule } from './events/checkout-event.module';
import { CHECKOUT_CORE_FEATURE, CHECKOUT_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';
import { OrderConfirmationOrderEntriesContextToken } from './tokens/index';

export const CHECKOUT_BASE_CMS_COMPONENTS: string[] = [
  'CheckoutOrchestrator',
  'CheckoutOrderSummary',
  'CheckoutProgress',
  'CheckoutProgressMobileBottom',
  'CheckoutProgressMobileTop',
  'CheckoutDeliveryMode',
  'CheckoutPaymentDetails',
  'CheckoutPlaceOrder',
  'CheckoutReviewOrder',
  'CheckoutDeliveryAddress',
  'GuestCheckoutLoginComponent',
];

export function defaultCheckoutComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: CHECKOUT_BASE_CMS_COMPONENTS,
        // TODO:#checkout - remove ORDER_FEATURE once we move the order placing functionality to the order lib
        dependencies: [CART_BASE_FEATURE],
      },
      // by default core is bundled together with components
      [CHECKOUT_CORE_FEATURE]: CHECKOUT_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [
    CheckoutEventModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'orderConfirmation',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
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
