import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';

import { OrderDetailsPageLayoutComponent } from './order-details-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [OrderDetailsPageLayoutComponent],
  exports: [OrderDetailsPageLayoutComponent]
})
export class OrderDetailsPageLayoutModule {}
