import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { AddressFormComponent } from './address-form.component';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [AddressFormComponent, SuggestedAddressDialogComponent],
  entryComponents: [SuggestedAddressDialogComponent],
  exports: [AddressFormComponent]
})
export class AddressFormModule {}
