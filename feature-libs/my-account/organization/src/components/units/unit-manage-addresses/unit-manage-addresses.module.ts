import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitManageAddressesComponent } from './unit-manage-addresses.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import {
  ConfirmModalModule,
  IconModule,
  OutletRefModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    TableModule,
    NgSelectModule,
    FormsModule,
    SplitViewModule,
    RouterModule,
    OutletRefModule,
    IconModule,
    ConfirmModalModule,
  ],
  declarations: [UnitManageAddressesComponent],
  exports: [UnitManageAddressesComponent],
  providers: [],
  entryComponents: [UnitManageAddressesComponent],
})
export class UnitManageAddressesModule {}
