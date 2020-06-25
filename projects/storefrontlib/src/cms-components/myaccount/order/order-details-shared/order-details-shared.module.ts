import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { OrderHeadlineComponent } from './order-headline/order-headline.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';

const moduleComponents = [OrderHeadlineComponent, OrderTotalsComponent];

@NgModule({
  imports: [CartSharedModule, CommonModule, I18nModule],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  entryComponents: [...moduleComponents],
})
export class OrderDetailsSharedModule {}
