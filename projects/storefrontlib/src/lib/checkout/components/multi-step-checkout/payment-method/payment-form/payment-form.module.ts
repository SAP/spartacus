import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../../../bootstrap.module';
import { CardModule } from '../../../../../ui/components/card/card.module';

import { PaymentFormComponent } from './payment-form.component';
import { BillingAddressFormModule } from '../billing-address-form/billing-address-form.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    BootstrapModule,
    CardModule,
    BillingAddressFormModule
  ],
  declarations: [PaymentFormComponent],
  entryComponents: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormModule {}
