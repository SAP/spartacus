import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CheckoutFacade,
  OrderConfirmationOrderEntriesContextToken,
} from '@spartacus/checkout/base/root';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  OrderDetailShippingComponent,
  OrderDetailsService,
  OrderOverviewModule,
} from '@spartacus/order/components';
import {
  CardModule,
  FormErrorsModule,
  OutletModule,
  PromotionsModule,
  PwaModule,
} from '@spartacus/storefront';
import { OrderConfirmationGuard } from '../guards/order-confirmation.guard';
import { OrderConfirmationOrderEntriesContext } from '../page-context/order-confirmation-order-entries.context';
import { CheckoutGuestRegisterFormComponent } from './checkout-guest-register-form/checkout-guest-register-form.component';
import { CheckoutOrderConfirmationItemsComponent } from './checkout-order-confirmation-items/checkout-order-confirmation-items.component';
import { CheckoutOrderConfirmationThankYouMessageComponent } from './checkout-order-confirmation-thank-you-message/checkout-order-confirmation-thank-you-message.component';
import { CheckoutOrderConfirmationTotalsComponent } from './checkout-order-confirmation-totals/checkout-order-confirmation-totals.component';

const orderConfirmationComponents = [
  CheckoutOrderConfirmationItemsComponent,
  CheckoutOrderConfirmationThankYouMessageComponent,
  CheckoutOrderConfirmationTotalsComponent,
  CheckoutGuestRegisterFormComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    PwaModule,
    PromotionsModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    OrderOverviewModule,
    OutletModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationThankMessageComponent: {
          component: CheckoutOrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationItemsComponent: {
          component: CheckoutOrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationTotalsComponent: {
          component: CheckoutOrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationOverviewComponent: {
          component: OrderDetailShippingComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: CheckoutFacade,
            },
          ],
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
export class CheckoutOrderConfirmationModule {}
