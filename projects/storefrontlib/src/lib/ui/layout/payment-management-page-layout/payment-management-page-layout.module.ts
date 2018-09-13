import { NgModule } from '@angular/core';

import { PaymentManagementPageLayoutComponent } from './payment-management-page-layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [PaymentManagementPageLayoutComponent],
  exports: [PaymentManagementPageLayoutComponent]
})
export class PaymentManagementPageLayoutModule {}
