import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitAddressDetailsComponent } from './unit-address-details.component';
import { RouterModule } from '@angular/router';
import {
  ConfirmModalModule,
  IconModule,
  OutletRefModule,
  SplitViewModule,
} from '@spartacus/storefront';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    ConfirmModalModule,
    FormsModule,
    SplitViewModule,
    RouterModule,
    OutletRefModule,
    IconModule,
    ConfirmModalModule,
  ],
  declarations: [UnitAddressDetailsComponent],
  exports: [UnitAddressDetailsComponent],
  entryComponents: [UnitAddressDetailsComponent],
})
export class UnitAddressDetailsModule {}
