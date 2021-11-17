import { Injectable } from '@angular/core';
import {
  Converter,
  ConverterService,
  EntitiesModel,
  Occ,
} from '@spartacus/core';
import {
  UserGroup,
  USER_GROUP_NORMALIZER,
} from '@spartacus/organization/administration/core';

@Injectable({
  providedIn: 'root',
})
export class OccUserGroupListNormalizer
  implements Converter<Occ.OrgUnitUserGroupList, EntitiesModel<UserGroup>>
{
  constructor(private converter: ConverterService) {}

  convert(
    source: Occ.OrgUnitUserGroupList,
    target?: EntitiesModel<UserGroup>
  ): EntitiesModel<UserGroup> {
    if (target === undefined) {
      target = { ...(source as any) };
    }
    target.values = source.orgUnitUserGroups.map((userGroup) => ({
      ...this.converter.convert(userGroup, USER_GROUP_NORMALIZER),
    }));
    return target;
  }
}
