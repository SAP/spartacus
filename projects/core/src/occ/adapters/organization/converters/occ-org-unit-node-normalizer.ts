import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BUnitNode } from '../../../../model/org-unit.model';

@Injectable()
export class OccOrgUnitNodeNormalizer
  implements Converter<Occ.B2BUnitNode, B2BUnitNode> {
  constructor() {}

  convert(source: Occ.B2BUnitNode, target?: B2BUnitNode): B2BUnitNode {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
