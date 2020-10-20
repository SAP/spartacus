import { Injectable } from '@angular/core';
import { CostCenter } from '../../../../model/org-unit.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';

@Injectable()
export class OccCostCenterSerializer
  implements Converter<CostCenter, Occ.CostCenter> {
  convert(source: CostCenter, target?: Occ.CostCenter): Occ.CostCenter {
    if (target === undefined) {
      target = {
        ...(source as any),
        activeFlag: source.active,
      };
      delete target.active;
    }
    return target;
  }
}
