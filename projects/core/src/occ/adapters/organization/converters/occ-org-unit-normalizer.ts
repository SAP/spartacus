import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BUnitNode } from 'projects/core/src/model';

@Injectable()
export class OccOrgUnitNormalizer
  implements Converter<Occ.B2BUnitNode, B2BUnitNode> {
  // constructor(private converter: ConverterService) {}
  constructor() {}

  convert(source: Occ.OrgUnit, target?: B2BUnitNode): B2BUnitNode {
    if (target === undefined) {
      target = { ...(source as any) };
    }

    return target;
  }
}
