import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OrderConfirmationOrderDetailsContextToken,
  OrderConfirmationOrderEntriesContextToken,
} from '@spartacus/checkout/root';
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
import { GuestRegisterFormComponent } from './components/guest-register-form/guest-register-form.component';
import { OrderConfirmationItemsComponent } from './components/order-confirmation-items/order-confirmation-items.component';
// eslint-disable-next-line
import { OrderConfirmationThankYouMessageComponent } from './components/order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './components/order-confirmation-totals/order-confirmation-totals.component';
import { OrderConfirmationGuard } from './guards/order-confirmation.guard';
import { OrderConfirmationOrderDetailsContext } from './page-context/order-confirmation-order-details.context';
import { OrderConfirmationOrderEntriesContext } from './page-context/order-confirmation-order-entries.context';

const orderConfirmationComponents = [
  OrderConfirmationItemsComponent,
  OrderConfirmationThankYouMessageComponent,
  OrderConfirmationTotalsComponent,
  GuestRegisterFormComponent,
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
    OutletModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationThankMessageComponent: {
          component: OrderConfirmationThankYouMessageComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationItemsComponent: {
          component: OrderConfirmationItemsComponent,
          guards: [OrderConfirmationGuard],
        },
        OrderConfirmationTotalsComponent: {
          component: OrderConfirmationTotalsComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
    {
      provide: OrderConfirmationOrderEntriesContextToken,
      useExisting: OrderConfirmationOrderEntriesContext,
    },
    {
      provide: OrderConfirmationOrderDetailsContextToken,
      useExisting: OrderConfirmationOrderDetailsContext,
    },
  ],
  declarations: [...orderConfirmationComponents],
  exports: [...orderConfirmationComponents],
})
export class OrderConfirmationModule {}
