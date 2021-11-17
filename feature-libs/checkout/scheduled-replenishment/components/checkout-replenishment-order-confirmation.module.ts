import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OrderConfirmationGuard,
  OrderConfirmationItemsComponent,
  OrderConfirmationModule,
  OrderConfirmationOverviewComponent,
  OrderConfirmationTotalsComponent,
} from '@spartacus/checkout/base/components';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  CardModule,
  CartSharedModule,
  FormErrorsModule,
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
    CartSharedModule,
    CardModule,
    PwaModule,
    PromotionsModule,
    I18nModule,
    ReactiveFormsModule,
    FeaturesConfigModule,
    FormErrorsModule,
    OrderConfirmationModule,
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
          component: OrderConfirmationOverviewComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationItemsComponent: {
          component: OrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationTotalsComponent: {
          component: OrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
  ],
  declarations: [...orderConfirmationComponents],
  exports: [...orderConfirmationComponents],
})
export class CheckoutScheduledReplenishmentOrderConfirmationModule {}
