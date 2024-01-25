/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from '../model/user-registration.model';
import { ORGANIZATION_USER_REGISTRATION_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: UserRegistrationFacade,
      feature: ORGANIZATION_USER_REGISTRATION_FEATURE,
      methods: ['registerUser'],
    }),
})
export abstract class UserRegistrationFacade {
  /**
   * Register a new organization user.
   *
   * @param user as OrganizationUserRegistration
   */
  abstract registerUser(
    user: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration>;
}
