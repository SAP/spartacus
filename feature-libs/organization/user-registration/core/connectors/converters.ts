/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';

export const ORGANIZATION_USER_REGISTRATION_SERIALIZER = new InjectionToken<
  Converter<OrganizationUserRegistration, any>
>('OrganizationUserRegistrationSerializer');
