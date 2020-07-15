import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { UnitAddressEditComponent } from './unit-address-edit.component';
import { UnitAddressFormModule } from '../unit-address-form/unit-address-form.module';
import { FakeTabsModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UnitAddressFormModule, I18nModule, FakeTabsModule],
  declarations: [UnitAddressEditComponent],
  exports: [UnitAddressEditComponent],
  entryComponents: [UnitAddressEditComponent],
})
export class UnitAddressEditModule {}
