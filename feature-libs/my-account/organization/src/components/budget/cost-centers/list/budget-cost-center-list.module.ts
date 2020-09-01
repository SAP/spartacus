import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OrganizationCardListModule } from '../../../shared/organization-card-list/organization-card-list.module';
import { BudgetCostCenterListComponent } from './budget-cost-center-list.component';

@NgModule({
  imports: [CommonModule, I18nModule, OrganizationCardListModule],
  declarations: [BudgetCostCenterListComponent],
})
export class BudgetCostCenterListModule {}
