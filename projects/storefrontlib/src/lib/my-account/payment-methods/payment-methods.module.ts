import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodsComponent } from './container/payment-methods.component';
import { CardModule } from '../../ui/components/card/card.module';

@NgModule({
  imports: [CommonModule, CardModule],
  declarations: [PaymentMethodsComponent],
  exports: [PaymentMethodsComponent]
})
export class PaymentMethodsModule {}
