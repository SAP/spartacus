import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CheckoutOrderConfirmationItemsComponent,
  CheckoutOrderConfirmationModule,
  CheckoutOrderConfirmationOverviewComponent,
  CheckoutOrderConfirmationTotalsComponent,
  OrderConfirmationGuard,
} from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  CardModule,
  FormErrorsModule,
  OutletModule,
  PromotionsModule,
  PwaModule,
} from '@spartacus/storefront';
import { CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent } from './checkout-order-confirmation-thank-you-message/checkout-order-confirmation-thank-you-message.component';

const orderConfirmationComponents: Type<any>[] = [
  CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    PwaModule,
    PromotionsModule,
    I18nModule,
    ReactiveFormsModule,
    FeaturesConfigModule,
    FormErrorsModule,
    CheckoutOrderConfirmationModule,
    OutletModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationThankMessageComponent: {
          component:
            CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationMessageComponent: {
          component:
            CheckoutScheduledReplenishmentOrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationOverviewComponent: {
          component: CheckoutOrderConfirmationOverviewComponent,
          guards: [OrderConfirmationGuard],
        },
        // TODO:#checkout - do we need to duplicate these components?
        ReplenishmentConfirmationItemsComponent: {
          component: CheckoutOrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationTotalsComponent: {
          component: CheckoutOrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
  ],
  declarations: [...orderConfirmationComponents],
  exports: [...orderConfirmationComponents],
})
export class CheckoutScheduledReplenishmentOrderConfirmationModule {}
