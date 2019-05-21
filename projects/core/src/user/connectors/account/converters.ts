import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { UserRegisterFormData } from '../../model/user.model';
import { Title } from '../../../model/misc.model';

export const USER_REGISTER_FORM_SERIALIZER = new InjectionToken<
  Converter<UserRegisterFormData, any>
>('UserRegisterFormSerializer');

export const TITLE_NORMALIZER = new InjectionToken<Converter<any, Title>>(
  'TitleNormalizer'
);
