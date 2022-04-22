import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccPermissionNormalizer
  implements Converter<Occ.Permission, Permission>
{
  convert(source: Occ.Permission, target?: Permission): Permission {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
