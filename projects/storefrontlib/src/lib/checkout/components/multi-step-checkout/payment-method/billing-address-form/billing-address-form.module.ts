import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { BillingAddressFormComponent } from './billing-address-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule
  ],
  declarations: [BillingAddressFormComponent],
  exports: [BillingAddressFormComponent]
})
export class BillingAddressFormModule {}
