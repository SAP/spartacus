import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../config/config.module';
import {
  COST_CENTERS_NORMALIZER,
  COST_CENTER_NORMALIZER,
  COST_CENTER_SERIALIZER,
} from '../../../cost-center/connectors/cost-center/converters';
import { OccCostCenterListNormalizer } from './converters/occ-cost-center-list-normalizer';
import { OccCostCenterNormalizer } from './converters/occ-cost-center-normalizer';
import { OccCostCenterSerializer } from './converters/occ-cost-center-serializer';
import { defaultOccCostCentersConfig } from './default-occ-cost-centers-config';

@NgModule({
  imports: [CommonModule, ConfigModule.withConfig(defaultOccCostCentersConfig)],
  providers: [
    {
      provide: COST_CENTERS_NORMALIZER,
      useExisting: OccCostCenterListNormalizer,
      multi: true,
    },
    {
      provide: COST_CENTER_NORMALIZER,
      useExisting: OccCostCenterNormalizer,
      multi: true,
    },
    {
      provide: COST_CENTER_SERIALIZER,
      useExisting: OccCostCenterSerializer,
      multi: true,
    },
  ],
})
export class CostCenterOccModule {}
