import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitAddressCreateComponent } from './unit-address-create.component';
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
  declarations: [UnitAddressCreateComponent],
  exports: [UnitAddressCreateComponent],
  entryComponents: [UnitAddressCreateComponent],
})
export class UnitAddressCreateModule {}
