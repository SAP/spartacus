import { Injectable } from '@angular/core';
import { Occ } from '../../../occ-models/occ.models';
import {
  Converter,
  ConverterService,
} from '../../../../util/converter.service';
import { UserGroup } from '../../../../model/user-group.model';
import { EntitiesModel } from '../../../../model/misc.model';
import { USER_GROUP_NORMALIZER } from '../../../../organization';

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
