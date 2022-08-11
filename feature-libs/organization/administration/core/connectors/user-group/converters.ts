import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel } from '@spartacus/core';
import { UserGroup } from '../../model/user-group.model';

export const USER_GROUP_NORMALIZER = new InjectionToken<
  Converter<any, UserGroup>
>('UserGroupNormalizer');

export const USER_GROUP_SERIALIZER = new InjectionToken<
  Converter<UserGroup, any>
>('UserGroupSerializer');

export const USER_GROUPS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<UserGroup>>
>('UserGroupListNormalizer');
