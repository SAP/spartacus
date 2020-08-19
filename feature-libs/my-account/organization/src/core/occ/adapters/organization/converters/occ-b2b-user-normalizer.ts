import { Injectable } from '@angular/core';
import { B2BUser, Converter, Occ } from '@spartacus/core';

@Injectable()
export class OccB2BUserNormalizer implements Converter<Occ.B2BUser, B2BUser> {
  constructor() {}

  convert(source: Occ.B2BUser, target?: B2BUser): B2BUser {
    if (target === undefined) {
      target = {
        ...(source as any),
        email: source?.uid,
      };
    }
    return target;
  }
}
