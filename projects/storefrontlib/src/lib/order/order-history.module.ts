import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderHistoryControlsComponent } from './order-history/order-history-controls/order-history-controls.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderHistoryControlsComponent],
  exports: [OrderHistoryControlsComponent]
})
export class OrderHistoryModule {}
