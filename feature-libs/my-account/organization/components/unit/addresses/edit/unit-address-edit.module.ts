import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitAddressEditComponent } from './unit-address-edit.component';
import { UnitAddressFormModule } from '../form/unit-address-form.module';

import {
  IconModule,
  OutletRefModule,
  SplitViewModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    SplitViewModule,
    RouterModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
    UnitAddressFormModule,
    OutletRefModule,
  ],
  declarations: [UnitAddressEditComponent],
  exports: [UnitAddressEditComponent],
  entryComponents: [UnitAddressEditComponent],
})
export class UnitAddressEditModule {}
