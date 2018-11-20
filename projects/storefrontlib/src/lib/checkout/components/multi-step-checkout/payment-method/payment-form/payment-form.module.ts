import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BootstrapModule } from '../../../../../bootstrap.module';
import { CardModule } from '../../../../../ui/components/card/card.module';

import { PaymentFormComponent } from './payment-form.component';
import { BillingAddressFormComponent } from './../billing-address-form/billing-address-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    BootstrapModule,
    CardModule
  ],
  declarations: [PaymentFormComponent, BillingAddressFormComponent],
  entryComponents: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormModule {}
