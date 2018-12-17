import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodsComponent } from './components/payment-methods.component';
import { CardModule } from '../../ui/components/card/card.module';
import { SpinnerModule } from '../../ui/components/spinner/spinner.module';
import { UserService } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, CardModule, SpinnerModule],
  providers: [UserService],
  declarations: [PaymentMethodsComponent],
  exports: [PaymentMethodsComponent]
})
export class PaymentMethodsModule {}
