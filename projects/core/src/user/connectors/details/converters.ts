import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { User } from '../../../model/misc.model';

export const USER_NORMALIZER = new InjectionToken<Converter<any, User>>(
  'UserNormalizer'
);

export const USER_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserSerializer'
);
