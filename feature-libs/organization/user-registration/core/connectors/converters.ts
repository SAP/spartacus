import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OrgUserRegistration } from '../model';

export const ORG_USER_REGISTRATION_SERIALIZER = new InjectionToken<
  Converter<OrgUserRegistration, any>
>('OrgUserRegistrationSerializer');
