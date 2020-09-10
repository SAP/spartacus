import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { COST_CENTER_NORMALIZER } from '../../../../organization/connectors/cost-center/converters';
import { EntitiesModel } from '../../../../model/misc.model';
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
