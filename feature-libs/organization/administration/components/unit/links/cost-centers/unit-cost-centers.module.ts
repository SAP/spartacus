import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ExplainDisableInfoModule } from '../../../shared/detail/explain-disable-info/explain-disable-info.module';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';

@NgModule({
  imports: [
    I18nModule,
    RouterModule,
    SubListModule,
    CommonModule,
    ExplainDisableInfoModule,
  ],
  declarations: [UnitCostCenterListComponent],
})
export class UnitCostCenterListModule {}
