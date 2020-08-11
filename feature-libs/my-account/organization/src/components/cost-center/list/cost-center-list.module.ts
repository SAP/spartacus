import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, OrganizationModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletRefModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { CostCenterListComponent } from './cost-center-list.component';

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
  ],
  declarations: [CostCenterListComponent],
})
export class CostCenterListModule {}
