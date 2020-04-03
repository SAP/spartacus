import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { EntitiesModel } from '../../../model/misc.model';
import { OrgUnitUserGroup } from '../../../model/user-group.model';

export const USER_GROUP_NORMALIZER = new InjectionToken<
  Converter<any, OrgUnitUserGroup>
>('OrgUnitUserGroupNormalizer');
export const USER_GROUPS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<OrgUnitUserGroup>>
>('OrgUnitUserGroupListNormalizer');
