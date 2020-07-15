import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { UnitAddressCreateComponent } from './unit-address-create.component';
import { UnitAddressFormModule } from '../unit-address-form/unit-address-form.module';

import { FakeTabsModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UnitAddressFormModule, I18nModule, FakeTabsModule],
  declarations: [UnitAddressCreateComponent],
  exports: [UnitAddressCreateComponent],
  entryComponents: [UnitAddressCreateComponent],
})
export class UnitAddressCreateModule {}
