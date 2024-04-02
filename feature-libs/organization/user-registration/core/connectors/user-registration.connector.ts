/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { UserRegistrationAdapter } from './user-registration.adapter';

@Injectable()
export class UserRegistrationConnector {
  constructor(protected adapter: UserRegistrationAdapter) {}

  registerUser(
    userData: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration> {
    return this.adapter.registerUser(userData);
  }
}
