import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MaterialModule } from '../../../../../material.module';
import { PaymentFormComponent } from './payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PaymentFormComponent],
  entryComponents: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormModule {}
