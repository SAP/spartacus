import { Injectable } from '@angular/core';
import { B2BUser, Converter, Occ } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class OccB2BUserNormalizer implements Converter<Occ.B2BUser, B2BUser> {
  constructor() {}

  convert(source: Occ.B2BUser, target?: B2BUser): B2BUser {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.email = source?.uid;

    return target;
  }
}
