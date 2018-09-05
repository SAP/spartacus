import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountModule } from '../../../my-account/my-account.module';

import { OrderHistoryPageLayoutComponent } from './order-history-page-layout.component';

@NgModule({
  imports: [CommonModule, MyAccountModule],
  declarations: [OrderHistoryPageLayoutComponent],
  exports: [OrderHistoryPageLayoutComponent]
})
export class OrderHistoryPageLayoutModule {}
