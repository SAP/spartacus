import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { Title, UserSignUp } from '../../../model/misc.model';

export const USER_REGISTER_FORM_SERIALIZER = new InjectionToken<
  Converter<UserSignUp, any>
>('UserRegisterFormSerializer');

export const TITLE_NORMALIZER = new InjectionToken<Converter<any, Title>>(
  'TitleNormalizer'
);
