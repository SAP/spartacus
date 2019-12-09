import { NgModule } from '@angular/core';

import { OrderDetailsModule } from './order-details/order-details.module';
import { OrderHistoryModule } from './order-history/order-history.module';

@NgModule({
  imports: [OrderHistoryModule, OrderDetailsModule],
})
export class OrderModule {}
