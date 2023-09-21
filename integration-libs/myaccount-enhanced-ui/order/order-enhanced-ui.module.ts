import { NgModule } from '@angular/core';
import { OrderDetailsEnhancedUIModule } from './order-details/order-details-enhanced-ui.module';
import { OrderHistoryEnhancedUIModule } from './order-history/order-history-enhanced-ui.module';

@NgModule({
  imports: [OrderDetailsEnhancedUIModule, OrderHistoryEnhancedUIModule],
})
export class OrderEnhancedUIModule {}
