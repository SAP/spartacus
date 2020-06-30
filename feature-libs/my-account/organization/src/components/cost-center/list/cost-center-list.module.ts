import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CostCenterListComponent } from './cost-center-list.component';
import {
  TableModule,
  SplitViewModule,
  IconModule,
  OutletRefModule,
} from '@spartacus/storefront';
import { OrganizationModule } from '@spartacus/core';

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
  ],
  declarations: [CostCenterListComponent],
})
export class CostCenterListModule {}
