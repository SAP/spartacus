import { NgModule } from '@angular/core';
import { UnitAddressDetailsModule } from './details/unit-address-details.module';
import { UnitAddressListModule } from './list/unit-address-list.module';
import { UnitAddressFormModule } from './form/unit-address-form.module';

@NgModule({
  imports: [
    UnitAddressListModule,
    UnitAddressDetailsModule,
    UnitAddressFormModule,
  ],
})
export class UnitAddressModule {}
