import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../config/config.module';
import { COST_CENTERS_NORMALIZER } from '../../../organization/connectors/cost-center/converters';
import { CostCenterAdapter } from '../../../organization/connectors/cost-center/cost-center.adapter';
import { OccCostCenterListNormalizer } from './converters/occ-cost-center-list-normalizer';
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
    {
      provide: COST_CENTERS_NORMALIZER,
      useClass: OccCostCenterListNormalizer,
      multi: true,
    },
  ],
})
export class OrganizationOccModule {}
