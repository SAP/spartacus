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
import { TableDataLinkModule } from '../../shared/table-data/td-link.module';
import { BudgetListComponent } from './budget-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    OrganizationModule,

    // shared
    TableModule,
    SplitViewModule,
    IconModule,
    UrlModule,
    I18nModule,
    OutletRefModule,

    PaginationModule,

    FormsModule,
    NgSelectModule,

    TableDataLinkModule,
  ],
  declarations: [BudgetListComponent],
})
export class BudgetListModule {}
