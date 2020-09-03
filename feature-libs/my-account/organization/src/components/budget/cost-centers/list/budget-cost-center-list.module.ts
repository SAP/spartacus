import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationSubListModule } from '../../../shared/organization-sub-list/organization-sub-list.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';

@NgModule({
  imports: [CommonModule, OrganizationSubListModule],
  declarations: [BudgetCostCenterListComponent],
})
export class BudgetCostCenterListModule {}
