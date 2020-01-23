import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { Permission } from '../../../../model/permission.model';

@Injectable()
export class OccPermissionNormalizer
  implements Converter<Occ.Permission, Permission> {
  constructor() {}

  convert(source: Occ.Permission, target?: Permission): Permission {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
