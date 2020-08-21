import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { OrganizationListModule } from '../../../shared/list/organization-list.module';
import { TableDataLinkModule } from '../../../shared/table-data/td-link.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    SplitViewModule,
    I18nModule,
    RouterModule,
    OutletRefModule,
    IconModule,
    TableModule,

    TableDataLinkModule,

    OrganizationListModule,
  ],
  declarations: [BudgetCostCenterListComponent],
  exports: [BudgetCostCenterListComponent],
})
export class BudgetCostCenterListModule {}
