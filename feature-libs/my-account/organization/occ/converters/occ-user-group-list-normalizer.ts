import { Injectable } from '@angular/core';
import { UserGroup } from '@spartacus/my-account/organization/core';
import {
  Converter,
  Occ,
  EntitiesModel,
  ConverterService,
} from '@spartacus/core';
import { USER_GROUP_NORMALIZER } from '@spartacus/my-account/organization/core';

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
