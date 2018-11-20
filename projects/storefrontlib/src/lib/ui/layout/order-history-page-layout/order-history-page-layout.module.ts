import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';

import { OrderHistoryPageLayoutComponent } from './order-history-page-layout.component';
import { OrderModule } from '../../../my-account';

@NgModule({
  imports: [CommonModule, MyAccountModule, OrderModule],
  declarations: [OrderHistoryPageLayoutComponent],
  exports: [OrderHistoryPageLayoutComponent]
})
export class OrderHistoryPageLayoutModule {}
