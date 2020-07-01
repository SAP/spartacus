import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CxDatePipe, I18nModule, UrlModule } from '@spartacus/core';
import {
  OutletRefModule,
  IconModule,
  TableModule,
} from '@spartacus/storefront';
import { CostCenterBudgetListComponent } from './cost-center-budgets.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,

    RouterModule,
    OutletRefModule,
    IconModule,
    TableModule,
  ],
  declarations: [CostCenterBudgetListComponent],
  exports: [CostCenterBudgetListComponent],
  providers: [CxDatePipe],
})
export class CostCenterBudgetsModule {}
