import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderHistoryControlsComponent } from './order-history/order-history-controls/order-history-controls.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderHistoryControlsComponent, OrderDetailsComponent],
  exports: [OrderHistoryControlsComponent, OrderDetailsComponent]
})
export class OrderModule {}
