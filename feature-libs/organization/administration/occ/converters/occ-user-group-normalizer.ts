import { Injectable } from '@angular/core';
import { Converter, Occ } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccUserGroupNormalizer
  implements Converter<Occ.OrgUnitUserGroup, UserGroup>
{
  constructor() {}

  convert(source: Occ.OrgUnitUserGroup, target?: UserGroup): UserGroup {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    return target;
  }
}
