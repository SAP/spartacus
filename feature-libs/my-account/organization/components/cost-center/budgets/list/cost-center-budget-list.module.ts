import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  TableModule,
  SplitViewModule,
} from '@spartacus/storefront';
import { CostCenterBudgetListComponent } from './cost-center-budget-list.component';

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
  ],
  declarations: [CostCenterBudgetListComponent],
  exports: [CostCenterBudgetListComponent],
})
export class CostCenterBudgetListModule {}
