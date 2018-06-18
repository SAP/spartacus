import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderHistoryControlsComponent } from './order-history/order-history-controls/order-history-controls.component';
import { OrderHistoryPageComponent } from './order-history/container/order-history-page.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    OrderHistoryPageComponent,
    OrderHistoryControlsComponent,
    OrderDetailsComponent
  ],
  exports: [
    OrderHistoryPageComponent,
    OrderHistoryControlsComponent,
    OrderDetailsComponent
  ]
})
export class OrderModule {}
