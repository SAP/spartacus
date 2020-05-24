import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../config/config.module';
import { CostCenterAdapter } from '../../../organization/connectors/cost-center/cost-center.adapter';
import { defaultOccOrganizationConfig } from './default-occ-organization-config';
import { OccCostCenterAdapter } from './occ-cost-center.adapter';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccOrganizationConfig),
  ],
  providers: [
    {
      provide: CostCenterAdapter,
      useClass: OccCostCenterAdapter,
    },
  ],
})
export class OrganizationOccModule {}
