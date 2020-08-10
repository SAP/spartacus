import { Injectable } from '@angular/core';
import { Occ } from '../../../../../../../../../projects/core/src/occ/occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../../../../../../projects/core/src/util/converter.service';
import { UserGroup } from '../../../../model/user-group.model';
import { EntitiesModel } from '../../../../../../../../../projects/core/src/model/misc.model';
import { USER_GROUP_NORMALIZER } from '../../../../../../../../../projects/core/src/organization';

@Injectable()
export class OccUserGroupListNormalizer
  implements Converter<Occ.OrgUnitUserGroupList, EntitiesModel<UserGroup>> {
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrgUnitUserGroupList,
    target?: EntitiesModel<UserGroup>
  ): EntitiesModel<UserGroup> {
    if (target === undefined) {
      target = {
        ...(source as any),
        values: source.orgUnitUserGroups.map((userGroup) => ({
          ...this.converter.convert(userGroup, USER_GROUP_NORMALIZER),
        })),
      };
    }
    return target;
  }
}
