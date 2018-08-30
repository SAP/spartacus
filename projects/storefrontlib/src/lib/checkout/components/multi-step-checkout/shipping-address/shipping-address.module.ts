import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material.module';
import { RouterModule } from '@angular/router';

import { AddressFormModule } from './address-form/address-form.module';
import { CardModule } from '../../../../ui/components/card/card.module';
import { ShippingAddressComponent } from './shipping-address.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AddressFormModule,
    CardModule
  ],
  declarations: [ShippingAddressComponent],
  entryComponents: [ShippingAddressComponent],
  exports: [ShippingAddressComponent]
})
export class ShippingAddressModule {}
