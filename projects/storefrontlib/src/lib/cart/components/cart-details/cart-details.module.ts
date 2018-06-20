import { NgModule } from '@angular/core';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { CartDetailsComponent } from './container/cart-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [CartSharedModule],
  declarations: [CartDetailsComponent, OrderSummaryComponent],
  exports: [CartDetailsComponent, OrderSummaryComponent]
})
export class CartDetailsModule {}
