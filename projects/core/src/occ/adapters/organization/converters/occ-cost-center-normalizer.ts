import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { CostCenter } from '../../../../model/cost-center.model';

@Injectable()
export class OccCostCenterNormalizer
  implements Converter<Occ.CostCenter, CostCenter> {
  constructor() {}

  convert(source: Occ.CostCenter, target?: CostCenter): CostCenter {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
