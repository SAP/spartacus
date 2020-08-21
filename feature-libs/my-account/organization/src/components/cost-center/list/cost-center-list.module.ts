import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationModule, UrlModule } from '@spartacus/core';
import { OutletRefModule } from '@spartacus/storefront';
import { OrganizationListModule } from '../../shared/list/organization-list.module';
import { CostCenterListComponent } from './cost-center-list.component';

@NgModule({
  imports: [
    CommonModule,
    OrganizationModule,
    OrganizationListModule,
    RouterModule,
    OutletRefModule,
    UrlModule,
  ],
  declarations: [CostCenterListComponent],
})
export class CostCenterListModule {}
