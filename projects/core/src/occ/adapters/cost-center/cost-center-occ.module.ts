import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../config/config.module';
import { COST_CENTERS_NORMALIZER } from '../../../cost-center/connectors/cost-center/converters';
import { OccCostCenterListNormalizer } from './converters/occ-cost-center-list-normalizer';
import { defaultOccCostCentersConfig } from './default-occ-cost-centers-config';

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultOccCostCentersConfig)],
  providers: [
    {
      provide: COST_CENTERS_NORMALIZER,
      useClass: OccCostCenterListNormalizer,
      multi: true,
    },
  ],
})
export class CostCenterOccModule {}
