import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationListModule } from '../../shared/organization-list/organization-list.module';
import { AssignBudgetCellComponent } from './assign-cell.component';
import { CostCenterAssignBudgetsComponent } from './assign/cost-center-assign-budgets.component';
import { CostCenterBudgetListComponent } from './list/cost-center-budget-list.component';

@NgModule({
  imports: [OrganizationListModule, I18nModule, RouterModule],
  declarations: [
    CostCenterAssignBudgetsComponent,
    CostCenterBudgetListComponent,
    AssignBudgetCellComponent,
  ],
})
export class CostCenterBudgetsModule {}
