import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { UserGroup } from '../../../../model/user-group.model';

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
