import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganizationModule } from '@spartacus/core';
import { OrganizationListModule } from '../../shared/list/organization-list.module';
import { CostCenterListComponent } from './cost-center-list.component';

@NgModule({
  imports: [CommonModule, OrganizationModule, OrganizationListModule],
  declarations: [CostCenterListComponent],
})
export class CostCenterListModule {}
