import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, OrganizationModule, UrlModule } from '@spartacus/core';
import { OrganizationListModule } from '../../shared/list/organization-list.module';
import { TableDataLinkModule } from '../../shared/table-data/td-link.module';
import { BudgetListComponent } from './budget-list.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationModule,
    RouterModule,

    UrlModule,
    I18nModule,

    TableDataLinkModule,

    OrganizationListModule,
  ],
  declarations: [BudgetListComponent],
})
export class BudgetListModule {}
