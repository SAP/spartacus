import { InjectionToken } from '@angular/core';
import { Converter, B2BUser, EntitiesModel, Occ } from '@spartacus/core';

export const B2B_USER_NORMALIZER = new InjectionToken<Converter<any, B2BUser>>(
  'B2BUserNormalizer'
);

export const B2B_USER_SERIALIZER = new InjectionToken<
  Converter<any, Occ.B2BUser>
>('B2BUserSerializer');

export const B2B_USERS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<B2BUser>>
>('UserListNormalizer');
