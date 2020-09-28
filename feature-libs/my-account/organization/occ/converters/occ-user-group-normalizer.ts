import { Injectable } from '@angular/core';
import { UserGroup } from '@spartacus/my-account/organization/core';
import { Converter, Occ } from '@spartacus/core';

@Injectable()
export class OccUserGroupNormalizer
  implements Converter<Occ.OrgUnitUserGroup, UserGroup> {
  constructor() {}

  convert(source: Occ.OrgUnitUserGroup, target?: UserGroup): UserGroup {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
