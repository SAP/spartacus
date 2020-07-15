import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitManageAddressesComponent } from './unit-manage-addresses.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FakeTabsModule, Table2Module } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    NgSelectModule,
    FormsModule,
    Table2Module,
    FakeTabsModule,
  ],
  declarations: [UnitManageAddressesComponent],
  exports: [UnitManageAddressesComponent],
  providers: [],
  entryComponents: [UnitManageAddressesComponent],
})
export class UnitManageAddressesModule {}
