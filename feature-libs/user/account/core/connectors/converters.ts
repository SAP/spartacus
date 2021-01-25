import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { User } from '../model/user.model';

export const USER_ACCOUNT_NORMALIZER = new InjectionToken<Converter<any, User>>(
  'UserAccountNormalizer'
);

export const USER_ACCOUNT_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserAccountSerializer'
);
