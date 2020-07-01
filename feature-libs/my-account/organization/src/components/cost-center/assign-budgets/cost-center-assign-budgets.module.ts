import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CxDatePipe, I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { CostCenterAssignBudgetsComponent } from './cost-center-assign-budgets.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    SplitViewModule,
    RouterModule,
    IconModule,
    TableModule,
    OutletRefModule,
  ],
  declarations: [CostCenterAssignBudgetsComponent],
  exports: [CostCenterAssignBudgetsComponent],
  providers: [CxDatePipe],
})
export class CostCenterAssignBudgetsModule {}
