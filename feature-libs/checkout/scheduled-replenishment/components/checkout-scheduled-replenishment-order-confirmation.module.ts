import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CheckoutOrderConfirmationItemsComponent,
  CheckoutOrderConfirmationModule,
  CheckoutOrderConfirmationTotalsComponent,
  OrderConfirmationGuard,
  OrderConfirmationOrderEntriesContext,
} from '@spartacus/checkout/base/components';
import {
  CheckoutFacade,
  OrderConfirmationOrderEntriesContextToken,
} from '@spartacus/checkout/base/root';
import {
  CmsConfig,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  OrderDetailShippingComponent,
  OrderDetailsService,
} from '@spartacus/order/components';
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
          component: OrderDetailShippingComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: CheckoutFacade,
            },
          ],
          guards: [OrderConfirmationGuard],
        },
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
    {
      provide: OrderConfirmationOrderEntriesContextToken,
      useExisting: OrderConfirmationOrderEntriesContext,
    },
  ],
  declarations: [...orderConfirmationComponents],
  exports: [...orderConfirmationComponents],
})
export class CheckoutScheduledReplenishmentOrderConfirmationModule {}
