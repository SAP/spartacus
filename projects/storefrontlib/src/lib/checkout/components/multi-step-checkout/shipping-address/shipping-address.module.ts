import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { RouterModule } from '@angular/router';

import { AddressFormModule } from './address-form/address-form.module';
import { ShippingAddressComponent } from './shipping-address.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, AddressFormModule],
  declarations: [ShippingAddressComponent],
  entryComponents: [ShippingAddressComponent],
  exports: [ShippingAddressComponent]
})
export class ShippingAddressModule {}
