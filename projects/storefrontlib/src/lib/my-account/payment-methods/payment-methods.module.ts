import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodsComponent } from './container/payment-methods.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PaymentMethodsComponent],
  exports: [PaymentMethodsComponent]
})
export class PaymentMethodsModule {}
