import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewAddressComponent } from './add-new-address.component';
import { MaterialModule } from '../../../material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [AddNewAddressComponent],
  exports: [AddNewAddressComponent]
})
export class AddNewAddressModule {}
