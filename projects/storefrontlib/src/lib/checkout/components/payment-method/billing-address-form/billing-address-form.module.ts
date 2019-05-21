import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { I18nModule } from '@spartacus/core';
import { BillingAddressFormComponent } from './billing-address-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
    I18nModule,
  ],
  declarations: [BillingAddressFormComponent],
  exports: [BillingAddressFormComponent],
})
export class BillingAddressFormModule {}
