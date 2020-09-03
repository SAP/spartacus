import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationSubListModule } from '../../../shared/organization-sub-list/organization-sub-list.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, OrganizationSubListModule, RouterModule],
  declarations: [BudgetCostCenterListComponent],
})
export class BudgetCostCenterListModule {}
