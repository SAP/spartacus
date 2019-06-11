import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutModule,
  I18nModule,
  ConfigModule,
  CmsConfig,
  AuthGuard,
} from '@spartacus/core';
import { PwaModule } from './../../cms-structure/pwa/pwa.module';
import { CardModule } from '../../shared/components/card/card.module';
import { CartSharedModule } from '../cart/cart-shared/cart-shared.module';
import { OrderConfirmationItemsComponent } from './components/order-confirmation-items/order-confirmation-items.component';
// tslint:disable-next-line
import { OrderConfirmationThankYouMessageComponent } from './components/order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationOverviewComponent } from './components/order-confirmation-overview/order-confirmation-overview.component';
import { OrderConfirmationTotalsComponent } from './components/order-confirmation-totals/order-confirmation-totals.component';
import { OrderConfirmationGuard } from './guards/index';

const orderConfirmationComponents = [
  OrderConfirmationItemsComponent,
  OrderConfirmationOverviewComponent,
  OrderConfirmationThankYouMessageComponent,
  OrderConfirmationTotalsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CartSharedModule,
    CardModule,
    PwaModule,
    CheckoutModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        OrderConfirmationThankMessageComponent: {
          component: OrderConfirmationThankYouMessageComponent,
          guards: [AuthGuard, OrderConfirmationGuard],
        },
        OrderConfirmationItemsComponent: {
          component: OrderConfirmationItemsComponent,
          guards: [AuthGuard, OrderConfirmationGuard],
        },
        OrderConfirmationTotalsComponent: {
          component: OrderConfirmationTotalsComponent,
          guards: [AuthGuard, OrderConfirmationGuard],
        },
        OrderConfirmationOverviewComponent: {
          component: OrderConfirmationOverviewComponent,
          guards: [AuthGuard, OrderConfirmationGuard],
        },
      },
    }),
  ],
  declarations: [...orderConfirmationComponents],
  exports: [...orderConfirmationComponents],
  entryComponents: [...orderConfirmationComponents],
})
export class OrderConfirmationModule {}
