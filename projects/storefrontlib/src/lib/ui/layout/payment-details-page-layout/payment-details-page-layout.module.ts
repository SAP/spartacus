import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDetailsPageLayoutComponent } from './payment-details-page-layout.component';
import { PaymentMethodsModule } from '../../../my-account/payment-methods/payment-methods.module';

@NgModule({
  imports: [CommonModule, PaymentMethodsModule],
  declarations: [PaymentDetailsPageLayoutComponent],
  exports: [PaymentDetailsPageLayoutComponent]
})
export class PaymentDetailsPageLayoutModule {}
