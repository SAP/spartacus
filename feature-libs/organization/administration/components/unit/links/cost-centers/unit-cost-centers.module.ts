import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';

@NgModule({
  imports: [
    I18nModule,
    RouterModule,
    SubListModule,
    CommonModule,
    DisableInfoModule,
  ],
  declarations: [UnitCostCenterListComponent],
})
export class UnitCostCenterListModule {}
