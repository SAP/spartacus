import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import { UserRegisterFormData } from '../../model/user.model';

export const USER_REGISTER_FORM_SERIALIZER = new InjectionToken<
  Converter<UserRegisterFormData, any>
>('UserRegisterFormSerializer');
