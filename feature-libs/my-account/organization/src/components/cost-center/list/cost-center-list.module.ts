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
import { CostCenterGuard } from '../cost-center.guard';

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
  providers: [CostCenterGuard],
  declarations: [CostCenterListComponent],
})
export class CostCenterListModule {}
