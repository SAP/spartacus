import { Injectable } from '@angular/core';
import { Occ, Converter, B2BUnitNode } from '@spartacus/core';

@Injectable()
export class OccOrgUnitNodeListNormalizer
  implements Converter<Occ.B2BUnitNodeList, B2BUnitNode[]> {
  convert(source: Occ.B2BUnitNodeList, target?: B2BUnitNode[]): B2BUnitNode[] {
    if (target === undefined) {
      target = [...(source.unitNodes as any)];
    }
    return target;
  }
}
