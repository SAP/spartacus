import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BUnit } from '../../../../model/org-unit.model';

@Injectable()
export class OccOrgUnitNormalizer implements Converter<Occ.B2BUnit, B2BUnit> {
  constructor() {}

  convert(source: Occ.B2BUnit, target?: B2BUnit): B2BUnit {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
