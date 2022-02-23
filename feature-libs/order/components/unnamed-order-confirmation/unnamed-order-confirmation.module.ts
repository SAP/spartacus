import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import {
  OrderDetailShippingComponent,
  OrderDetailsService,
  OrderOverviewModule,
} from '@spartacus/order/components';
import {
  OrderConfirmationOrderEntriesContextToken,
  UnnamedFacade,
} from '@spartacus/order/root';
import {
  CardModule,
  FormErrorsModule,
  OutletModule,
  PromotionsModule,
  PwaModule,
} from '@spartacus/storefront';
import { OrderConfirmationGuard } from '../guards/order-confirmation.guard';
import { OrderConfirmationOrderEntriesContext } from '../page-context/order-confirmation-order-entries.context';
import { UnnamedGuestRegisterFormComponent } from './unnamed-guest-register-form/unnamed-guest-register-form.component';
import { UnnamedOrderConfirmationItemsComponent } from './unnamed-order-confirmation-items/unnamed-order-confirmation-items.component';
import { UnnamedOrderConfirmationThankYouMessageComponent } from './unnamed-order-confirmation-thank-you-message/unnamed-order-confirmation-thank-you-message.component';
import { UnnamedOrderConfirmationTotalsComponent } from './unnamed-order-confirmation-totals/unnamed-order-confirmation-totals.component';

const orderConfirmationComponents = [
  UnnamedOrderConfirmationItemsComponent,
  UnnamedOrderConfirmationThankYouMessageComponent,
  UnnamedOrderConfirmationTotalsComponent,
  UnnamedGuestRegisterFormComponent,
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
          component: UnnamedOrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },
        ReplenishmentConfirmationMessageComponent: {
          component: UnnamedOrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationItemsComponent: {
          component: UnnamedOrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationTotalsComponent: {
          component: UnnamedOrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationOverviewComponent: {
          component: OrderDetailShippingComponent,
          providers: [
            {
              provide: OrderDetailsService,
              useExisting: UnnamedFacade,
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
export class UnnamedOrderConfirmationModule {}
