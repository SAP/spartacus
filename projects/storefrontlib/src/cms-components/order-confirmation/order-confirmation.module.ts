import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { CardModule } from '../../shared/components/card/card.module';
import { CartSharedModule } from '../cart/cart-shared/cart-shared.module';
import { PwaModule } from './../../cms-structure/pwa/pwa.module';
import { OrderConfirmationItemsComponent } from './components/order-confirmation-items/order-confirmation-items.component';
import { OrderConfirmationOverviewComponent } from './components/order-confirmation-overview/order-confirmation-overview.component';
// tslint:disable-next-line
import { OrderConfirmationThankYouMessageComponent } from './components/order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './components/order-confirmation-totals/order-confirmation-totals.component';
import { OrderConfirmationGuard } from './guards/order-confirmation.guard';

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
