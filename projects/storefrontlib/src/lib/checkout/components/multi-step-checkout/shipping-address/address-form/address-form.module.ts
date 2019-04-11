import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { I18nModule } from '@spartacus/core';
import { AddressFormComponent } from './address-form.component';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
    I18nModule,
  ],
  declarations: [AddressFormComponent, SuggestedAddressDialogComponent],
  entryComponents: [SuggestedAddressDialogComponent],
  exports: [AddressFormComponent],
})
export class AddressFormModule {}
