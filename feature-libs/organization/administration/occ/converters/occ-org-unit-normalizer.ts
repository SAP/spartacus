import { Injectable } from '@angular/core';
import { B2BUnit, Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccOrgUnitNormalizer implements Converter<Occ.B2BUnit, B2BUnit> {
  convert(source: Occ.B2BUnit, target?: B2BUnit): B2BUnit {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
