import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { User } from '../../../model/misc.model';
import { UserRegisterFormData } from '../../model/user.model';

export const USER_NORMALIZER = new InjectionToken<Converter<any, User>>(
  'UserNormalizer'
);

export const USER_REGISTER_FORM_SERIALIZER = new InjectionToken<
  Converter<UserRegisterFormData, any>
>('UserRegisterFormSerializer');
