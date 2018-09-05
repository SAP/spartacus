import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../material.module';
import { AddressFormComponent } from './address-form.component';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  declarations: [AddressFormComponent, SuggestedAddressDialogComponent],
  entryComponents: [SuggestedAddressDialogComponent],
  exports: [AddressFormComponent]
})
export class AddressFormModule {}
