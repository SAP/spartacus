import { InjectionToken } from '@angular/core';
import { Title, User, UserSignUp } from '../../../model/misc.model';
import { Converter } from '../../../util/converter.service';

/**
 * @deprecated since 3.2, moved to `@spartacus/user`
 */
export const USER_NORMALIZER = new InjectionToken<Converter<any, User>>(
  'UserNormalizer'
);

/**
 * @deprecated since 3.2, moved to `@spartacus/user`
 */
export const USER_SERIALIZER = new InjectionToken<Converter<User, any>>(
  'UserSerializer'
);

/**
 * @deprecated since 3.2, moved to `@spartacus/user`
 */
export const USER_SIGN_UP_SERIALIZER = new InjectionToken<
  Converter<UserSignUp, any>
>('UserSignUpSerializer');

/**
 * @deprecated since 3.2, moved to `@spartacus/user`
 */
export const TITLE_NORMALIZER = new InjectionToken<Converter<any, Title>>(
  'TitleNormalizer'
);
