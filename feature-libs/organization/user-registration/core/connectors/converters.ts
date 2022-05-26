import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';

export const ORGANIZATION_USER_REGISTRATION_SERIALIZER = new InjectionToken<
  Converter<OrganizationUserRegistration, any>
>('OrganizationUserRegistrationSerializer');
