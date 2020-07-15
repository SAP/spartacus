import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { UnitEditComponent } from './unit-edit.component';
import { UnitFormModule } from '../unit-form/unit-form.module';
import { FakeTabsModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UnitFormModule, I18nModule, FakeTabsModule],
  declarations: [UnitEditComponent],
  exports: [UnitEditComponent],
  entryComponents: [UnitEditComponent],
})
export class UnitEditModule {}
