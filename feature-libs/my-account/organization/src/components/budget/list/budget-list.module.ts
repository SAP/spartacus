import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { BudgetListComponent } from './budget-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // shared
    TableModule,
    SplitViewModule,
    IconModule,
    UrlModule,
    I18nModule,
    OutletRefModule,

    PaginationModule,
    NgSelectModule,
    FormsModule,
  ],
  declarations: [BudgetListComponent],
})
export class BudgetListModule {}
