import { NgModule } from '@angular/core';
import { OrganizationListModule } from '../../shared/organization-list/organization-list.module';
import { BudgetListComponent } from './budget-list.component';

@NgModule({
  imports: [OrganizationListModule],
  declarations: [BudgetListComponent],
})
export class BudgetListModule {}
