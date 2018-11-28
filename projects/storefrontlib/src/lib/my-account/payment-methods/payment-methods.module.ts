import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodsComponent } from './components/payment-methods.component';
import { CardModule } from '../../ui/components/card/card.module';
import { PaymentMethodsService } from './services/payment-methods.service';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';

@NgModule({
  imports: [CommonModule, CardModule, SpinnerModule],
  providers: [PaymentMethodsService],
  declarations: [PaymentMethodsComponent],
  exports: [PaymentMethodsComponent]
})
export class PaymentMethodsModule {}
