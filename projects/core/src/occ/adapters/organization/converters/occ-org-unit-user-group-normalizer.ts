import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import { Converter } from '../../../../util/converter.service';
import { OrgUnitUserGroup } from '../../../../model/org-unit-user-group.model';

@Injectable()
export class OccOrgUnitUserGroupNormalizer
  implements Converter<Occ.OrgUnitUserGroup, OrgUnitUserGroup> {
  constructor() {}

  convert(
    source: Occ.OrgUnitUserGroup,
    target?: OrgUnitUserGroup
  ): OrgUnitUserGroup {
    if (target === undefined) {
      target = {
        ...(source as any),
      };
    }
    return target;
  }
}
