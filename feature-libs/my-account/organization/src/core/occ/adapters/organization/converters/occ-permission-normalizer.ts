import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import { Converter } from '../../../../../../../../../projects/core/src/util/converter.service';
import { Permission } from '../../../../../../../../../projects/core/src/model/permission.model';

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
