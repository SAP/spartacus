import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderHistoryControlsComponent } from './order-history/order-history-controls/order-history-controls.component';
import { OrderHistoryPageComponent } from './order-history/container/order-history-page.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FormsModule } from '@angular/forms';
import { yDate } from './../pipes/yDate';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    OrderHistoryPageComponent,
    OrderHistoryControlsComponent,
    OrderDetailsComponent,
    yDate
  ],
  exports: [OrderHistoryPageComponent, OrderDetailsComponent]
})
export class OrderModule {}
