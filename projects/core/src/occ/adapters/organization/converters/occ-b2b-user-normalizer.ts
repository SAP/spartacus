import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { B2BUser } from '../../../../model';

@Injectable()
export class OccB2BUserNormalizer implements Converter<Occ.B2BUser, B2BUser> {
  constructor() {}

  convert(source: Occ.B2BUser, target?: B2BUser): B2BUser {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
