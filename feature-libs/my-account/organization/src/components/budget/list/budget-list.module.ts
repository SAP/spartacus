import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, OrganizationModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
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

    RouterModule,
    UrlModule,
    SplitViewModule,
    OutletRefModule,

    IconModule,

    NgSelectModule,
    FormsModule,
    TableModule,
    PaginationModule,
  ],
  declarations: [BudgetListComponent],
})
export class BudgetListModule {}
