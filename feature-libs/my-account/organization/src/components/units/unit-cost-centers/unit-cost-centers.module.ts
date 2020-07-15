import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitCostCentersComponent } from './unit-cost-centers.component';

import { FakeTabsModule, Table2Module } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, Table2Module, FakeTabsModule],
  declarations: [UnitCostCentersComponent],
  exports: [UnitCostCentersComponent],
  entryComponents: [UnitCostCentersComponent],
})
export class UnitCostCentersModule {}
