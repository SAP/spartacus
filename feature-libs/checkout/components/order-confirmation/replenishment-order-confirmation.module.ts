import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CheckoutFacade,
  OrderConfirmationOrderEntriesContextToken,
} from '@spartacus/checkout/root';
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
  PromotionsModule,
  PwaModule,
} from '@spartacus/storefront';
import { OrderConfirmationItemsComponent } from './components/order-confirmation-items/order-confirmation-items.component';
import { OrderConfirmationThankYouMessageComponent } from './components/order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './components/order-confirmation-totals/order-confirmation-totals.component';
import { OrderConfirmationGuard } from './guards/order-confirmation.guard';
import { OrderConfirmationOrderEntriesContext } from './order-entries-context/order-confirmation-order-entries-context';

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
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReplenishmentConfirmationMessageComponent: {
          component: OrderConfirmationThankYouMessageComponent,
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
          component: OrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationTotalsComponent: {
          component: OrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
    {
      provide: OrderConfirmationOrderEntriesContextToken,
      useExisting: OrderConfirmationOrderEntriesContext,
    },
  ],
})
export class ReplenishmentOrderConfirmationModule {}
