import { Injectable } from '@angular/core';
import { B2BUnitNode, Occ, Converter } from '@spartacus/core';

@Injectable()
export class OccOrgUnitNodeNormalizer
  implements Converter<Occ.B2BUnitNode, B2BUnitNode> {
  convert(source: Occ.B2BUnitNode, target?: B2BUnitNode): B2BUnitNode {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
