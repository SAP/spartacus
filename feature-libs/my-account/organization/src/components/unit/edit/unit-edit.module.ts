import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitEditComponent } from './unit-edit.component';
import { UnitFormModule } from '../form/unit-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,

    I18nModule,
    SplitViewModule,
    IconModule,

    UnitFormModule,
    ReactiveFormsModule,
  ],
  declarations: [UnitEditComponent],
  exports: [UnitEditComponent],
  entryComponents: [UnitEditComponent],
})
export class UnitEditModule {}
