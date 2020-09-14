import { NgModule } from '@angular/core';
import { UnitAddressDetailsModule } from './details';
import { UnitAddressListModule } from './list';

@NgModule({
  imports: [UnitAddressListModule, UnitAddressDetailsModule],
})
export class UnitAddressModule {}
