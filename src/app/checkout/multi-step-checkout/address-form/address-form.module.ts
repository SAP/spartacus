import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [AddressFormComponent],
  exports: [AddressFormComponent]
})
export class AddressFormModule {}
