import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddressFormModule } from './address-form/address-form.module';
import { CardModule } from '../../../../ui/components/card/card.module';
import { ShippingAddressComponent } from './shipping-address.component';
import { SpinnerModule } from './../../../../ui/components/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AddressFormModule,
    CardModule,
    SpinnerModule
  ],
  declarations: [ShippingAddressComponent],
  entryComponents: [ShippingAddressComponent],
  exports: [ShippingAddressComponent]
})
export class ShippingAddressModule {}
