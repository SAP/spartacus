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
import { TableDataLinkModule } from '../table-data/td-link.module';
import { OrganizationListComponent } from './organization-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    OutletRefModule,

    SplitViewModule,

    TableModule,
    PaginationModule,

    I18nModule,

    NgSelectModule,
    FormsModule,
    TableDataLinkModule,

    IconModule,
  ],
  declarations: [OrganizationListComponent],
  exports: [OrganizationListComponent],
})
export class OrganizationListModule {}
