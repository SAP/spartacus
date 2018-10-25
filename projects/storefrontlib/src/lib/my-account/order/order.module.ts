import { NgModule } from '@angular/core';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderDetailsModule } from './order-details/order-details.module';

@NgModule({
  imports: [OrderHistoryModule, OrderDetailsModule],
  declarations: [],
  exports: [OrderHistoryModule, OrderDetailsModule]
})
export class OrderModule {}
