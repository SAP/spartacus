import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';

@NgModule({
  imports: [
    I18nModule,
    RouterModule,
    SubListModule,
    CommonModule,
    FeaturesConfigModule,
  ],
  declarations: [UnitCostCenterListComponent],
})
export class UnitCostCenterListModule {}
