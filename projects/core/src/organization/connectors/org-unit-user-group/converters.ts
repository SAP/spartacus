import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { EntitiesModel, OrgUnitUserGroup } from '../../../model';

export const ORG_UNIT_USER_GROUP_NORMALIZER = new InjectionToken<
  Converter<any, OrgUnitUserGroup>
>('OrgUnitUserGroupNormalizer');
export const ORG_UNIT_USER_GROUPS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<OrgUnitUserGroup>>
>('OrgUnitUserGroupListNormalizer');
