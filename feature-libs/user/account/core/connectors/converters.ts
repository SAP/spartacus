import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { User } from '../model/user.model';

export const USER_NORMALIZER = new InjectionToken<Converter<any, User>>(
  'UserNormalizer'
);

export const USER_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserSerializer'
);
