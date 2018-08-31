import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { RouterModule } from '@angular/router';

import { PaymentFormModule } from './payment-form/payment-form.module';
import { CardModule } from '../../../../ui/components/card/card.module';
import { PaymentMethodComponent } from './payment-method.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PaymentFormModule,
    CardModule
  ],
  declarations: [PaymentMethodComponent],
  entryComponents: [PaymentMethodComponent],
  exports: [PaymentMethodComponent]
})
export class PaymentMethodModule {}
