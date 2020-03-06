import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BUnitNode } from '../../../../model/org-unit.model';

@Injectable()
export class OccOrgUnitNodeListNormalizer
  implements Converter<Occ.B2BUnitNodeList, B2BUnitNode[]> {
  constructor() {}

  convert(source: Occ.B2BUnitNodeList, target?: B2BUnitNode[]): B2BUnitNode[] {
    if (target === undefined) {
      target = [...(source.unitNodes as any)];
    }
    return target;
  }
}
