import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentFormComponent } from './payment-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PaymentFormComponent],
  entryComponents: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormModule {}
