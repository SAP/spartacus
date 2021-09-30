import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { B2BUnitNode } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccOrgUnitNodeNormalizer
  implements Converter<Occ.B2BUnitNode, B2BUnitNode>
{
  convert(source: Occ.B2BUnitNode, target?: B2BUnitNode): B2BUnitNode {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
