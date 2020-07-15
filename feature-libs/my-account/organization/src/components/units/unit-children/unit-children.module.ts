import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitChildrenComponent } from './unit-children.component';
import { FakeTabsModule, Table2Module } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, Table2Module, FakeTabsModule],
  declarations: [UnitChildrenComponent],
  exports: [UnitChildrenComponent],
  entryComponents: [UnitChildrenComponent],
})
export class UnitChildrenModule {}
