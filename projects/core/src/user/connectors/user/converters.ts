import { InjectionToken } from '@angular/core';

import { Title, User, UserSignUp } from '../../../model/misc.model';
import { Converter } from '../../../util/converter.service';

export const USER_NORMALIZER = new InjectionToken<Converter<any, User>>(
  'UserNormalizer'
);

export const USER_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserSerializer'
);

export const USER_SIGN_UP_SERIALIZER = new InjectionToken<
  Converter<UserSignUp, any>
>('UserSignUpSerializer');

export const TITLE_NORMALIZER = new InjectionToken<Converter<any, Title>>(
  'TitleNormalizer'
);
