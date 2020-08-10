import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { COST_CENTER_NORMALIZER } from '../../../../connectors/cost-center/converters';
import { EntitiesModel } from '../../../../../../../../../projects/core/src/model/misc.model';
import { CostCenter } from '../../../../model/org-unit.model';

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
