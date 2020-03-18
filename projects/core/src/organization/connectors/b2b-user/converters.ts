import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { EntitiesModel, B2BUser } from '../../../model';

export const B2B_USER_NORMALIZER = new InjectionToken<Converter<any, B2BUser>>(
  'B2BUserNormalizer'
);
export const B2B_USERS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<B2BUser>>
>('UserListNormalizer');
