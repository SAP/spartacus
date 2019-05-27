import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Title, UserSignUp } from '../../../model/misc.model';

export const USER_SIGN_UP_SERIALIZER = new InjectionToken<
  Converter<UserSignUp, any>
>('UserSignUpSerializer');

export const TITLE_NORMALIZER = new InjectionToken<Converter<any, Title>>(
  'TitleNormalizer'
);
