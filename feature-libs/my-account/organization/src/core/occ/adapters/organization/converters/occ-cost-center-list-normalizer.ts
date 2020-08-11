import { Injectable } from '@angular/core';
import { COST_CENTER_NORMALIZER } from '../../../../connectors/cost-center/converters';
import {
  Converter,
  Occ,
  EntitiesModel,
  CostCenter,
  ConverterService,
} from '@spartacus/core';

@Injectable()
export class OccCostCenterListNormalizer
  implements Converter<Occ.CostCentersList, EntitiesModel<CostCenter>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.CostCentersList,
    target?: EntitiesModel<CostCenter>
  ): EntitiesModel<CostCenter> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.costCenters.map((costCenter) => ({
          ...this.converter.convert(costCenter, COST_CENTER_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
