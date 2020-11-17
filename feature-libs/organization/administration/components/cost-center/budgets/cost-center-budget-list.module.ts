import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ListModule } from '../../shared/list/list.module';
import { OrganizationSubListModule } from '../../shared/organization-sub-list/organization-sub-list.module';
import { CostCenterAssignedBudgetListComponent } from './assigned/cost-center-assigned-budget-list.component';
import { CostCenterBudgetListComponent } from './cost-center-budget-list.component';

@NgModule({
  imports: [
    ListModule,
    I18nModule,
    RouterModule,
    OrganizationSubListModule,
  ],
  declarations: [
    CostCenterAssignedBudgetListComponent,
    CostCenterBudgetListComponent,
  ],
})
export class CostCenterBudgetListModule {}
