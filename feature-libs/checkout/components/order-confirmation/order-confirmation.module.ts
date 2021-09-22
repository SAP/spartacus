import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  OrderOverviewModule,
  PromotionsModule,
  PwaModule,
} from '@spartacus/storefront';
import { GuestRegisterFormComponent } from './components/guest-register-form/guest-register-form.component';
import { OrderConfirmationItemsComponent } from './components/order-confirmation-items/order-confirmation-items.component';
import { OrderConfirmationOverviewComponent } from './components/order-confirmation-overview/order-confirmation-overview.component';
// eslint-disable-next-line
import { OrderConfirmationThankYouMessageComponent } from './components/order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './components/order-confirmation-totals/order-confirmation-totals.component';
import { OrderConfirmationGuard } from './guards/order-confirmation.guard';

const orderConfirmationComponents = [
  OrderConfirmationItemsComponent,
  OrderConfirmationOverviewComponent,
  OrderConfirmationThankYouMessageComponent,
  OrderConfirmationTotalsComponent,
  GuestRegisterFormComponent,
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
    OrderOverviewModule,
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
        OrderConfirmationOverviewComponent: {
          component: OrderConfirmationOverviewComponent,
          guards: [OrderConfirmationGuard],
        },
      },
    }),
  ],
  declarations: [...orderConfirmationComponents],
  exports: [...orderConfirmationComponents],
})
export class OrderConfirmationModule {}
