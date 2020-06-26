import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from 'projects/storefrontlib/src/shared/components/card/card.module';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { OrderApprovalDetailsComponent } from './order-approval-details/order-approval-details.component';
import { OrderHeadlineComponent } from './order-headline/order-headline.component';
import { OrderShippingComponent } from './order-shipping/order-shipping.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';

const moduleComponents = [
  OrderHeadlineComponent,
  OrderTotalsComponent,
  OrderApprovalDetailsComponent,
  OrderShippingComponent,
];

@NgModule({
  imports: [CartSharedModule, CardModule, CommonModule, I18nModule],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  entryComponents: [...moduleComponents],
})
export class OrderDetailsSharedModule {}
