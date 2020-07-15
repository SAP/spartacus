import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitAddressDetailsComponent } from './unit-address-details.component';
import { FakeTabsModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, FakeTabsModule],
  declarations: [UnitAddressDetailsComponent],
  exports: [UnitAddressDetailsComponent],
  entryComponents: [UnitAddressDetailsComponent],
})
export class UnitAddressDetailsModule {}
