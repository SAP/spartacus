import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { OrgUnitUserGroup } from '../../../../model/user-group.model';
import { EntitiesModel } from '../../../../model/misc.model';
import { ORG_UNIT_USER_GROUP_NORMALIZER } from '../../../../organization';

@Injectable()
export class OccOrgUnitUserGroupListNormalizer
  implements
    Converter<Occ.OrgUnitUserGroupList, EntitiesModel<OrgUnitUserGroup>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrgUnitUserGroupList,
    target?: EntitiesModel<OrgUnitUserGroup>
  ): EntitiesModel<OrgUnitUserGroup> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.orgUnitUserGroups.map(orgUnitUserGroup => ({
          ...this.converter.convert(
            orgUnitUserGroup,
            ORG_UNIT_USER_GROUP_NORMALIZER
          ),
        })),
      };
    }
    return target;
  }
}
