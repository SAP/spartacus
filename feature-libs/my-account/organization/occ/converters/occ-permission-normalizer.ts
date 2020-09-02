import { Injectable } from '@angular/core';
import { Converter, Occ, Permission } from '@spartacus/core';

@Injectable()
export class OccPermissionNormalizer
  implements Converter<Occ.Permission, Permission> {
  convert(source: Occ.Permission, target?: Permission): Permission {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
