/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { UserRegistrationAdapter } from './user-registration.adapter';

@Injectable()
export class UserRegistrationConnector {
  protected adapter = inject(UserRegistrationAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  registerUser(
    userData: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration> {
    return this.adapter.registerUser(userData);
  }
}
