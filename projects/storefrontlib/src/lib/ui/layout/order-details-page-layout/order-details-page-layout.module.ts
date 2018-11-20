import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';

import { OrderDetailsPageLayoutComponent } from './order-details-page-layout.component';
import { OrderDetailsModule } from '../../../my-account/order/order-details/order-details.module';

@NgModule({
  imports: [CommonModule, MyAccountModule, OrderDetailsModule],
  declarations: [OrderDetailsPageLayoutComponent],
  exports: [OrderDetailsPageLayoutComponent]
})
export class OrderDetailsPageLayoutModule {}
