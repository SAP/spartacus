import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutModule,
  I18nModule,
  ConfigModule,
  CmsConfig,
} from '@spartacus/core';
import { PwaModule } from './../../cms-structure/pwa/pwa.module';
import { CardModule } from '../../shared/components/card/card.module';
import { CartSharedModule } from '../checkout/cart/cart-shared/cart-shared.module';
import { OrderConfirmationItemsComponent } from './components/order-confirmation-items/order-confirmation-items.component';
// tslint:disable-next-line
import { OrderConfirmationThankYouMessageComponent } from './components/order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationOverviewComponent } from './components/order-confirmation-overview/order-confirmation-overview.component';
import { OrderConfirmationTotalsComponent } from './components/order-confirmation-totals/order-confirmation-totals.component';

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
          selector: 'cx-order-confirmation-thank-you-message',
        },
        OrderConfirmationItemsComponent: {
          selector: 'cx-order-confirmation-items',
        },
        OrderConfirmationTotalsComponent: {
          selector: 'cx-order-confirmation-totals',
        },
        OrderConfirmationOverviewComponent: {
          selector: 'cx-order-confirmation-overview',
        },
      },
    }),
  ],
  declarations: [
    OrderConfirmationItemsComponent,
    OrderConfirmationOverviewComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
  ],
  exports: [
    OrderConfirmationItemsComponent,
    OrderConfirmationOverviewComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
  ],
  entryComponents: [
    OrderConfirmationItemsComponent,
    OrderConfirmationOverviewComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
  ],
})
export class OrderConfirmationModule {}
