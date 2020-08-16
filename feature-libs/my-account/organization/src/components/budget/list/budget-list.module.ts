import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, OrganizationModule } from '@spartacus/core';
import { OrganizationListModule } from '../../shared/list/organization-list.module';
import { TableDataLinkModule } from '../../shared/table-data/td-link.module';
import { BudgetListComponent } from './budget-list.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationModule,
    OrganizationListModule,
    I18nModule,
    TableDataLinkModule,
  ],
  declarations: [BudgetListComponent],
})
export class BudgetListModule {}
