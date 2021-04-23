import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultCheckoutConfig } from './config/default-checkout-config';
import { interceptors } from './http-interceptors/index';
@NgModule({
  imports: [],
  providers: [
    ...interceptors,
    provideDefaultConfig(defaultCheckoutConfig),
    provideDefaultConfig({
      featureModules: {
        checkout: {
          cmsComponents: [
            'CheckoutOrchestrator',
            'CheckoutOrderSummary',
            'CheckoutProgress',
            'CheckoutProgressMobileBottom',
            'CheckoutProgressMobileTop',
            'CheckoutCostCenterComponent',
            'CheckoutDeliveryMode',
            'CheckoutReturningCustomerRegisterComponent',
            'CheckoutPaymentDetails',
            'CheckoutPaymentType',
            'CheckoutPlaceOrder',
            'CheckoutReviewOrder',
            'CheckoutScheduleReplenishmentOrder',
            'CheckoutShippingAddress',
            'GuestCheckoutLoginComponent',
          ],
        },
      },
    }),
  ],
})
export class CheckoutRootModule {}
