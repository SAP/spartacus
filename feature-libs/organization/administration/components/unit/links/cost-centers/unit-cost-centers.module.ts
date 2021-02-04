import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ExplainDisableMessagesModule } from '../../../shared/detail/explain-disable-messages/explain-disable-messages.module';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';

@NgModule({
  imports: [
    I18nModule,
    RouterModule,
    SubListModule,
    CommonModule,
    ExplainDisableMessagesModule,
  ],
  declarations: [UnitCostCenterListComponent],
})
export class UnitCostCenterListModule {}
