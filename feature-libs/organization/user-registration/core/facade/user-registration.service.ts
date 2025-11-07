/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Command, CommandService } from '@spartacus/core';
import {
  UserRegistrationFacade,
  OrganizationUserRegistration,
} from '@spartacus/organization/user-registration/root';
import { Observable } from 'rxjs';
import { UserRegistrationConnector } from '../connectors/user-registration.connector';

@Injectable()
export class UserRegistrationService implements UserRegistrationFacade {
  protected userRegistrationConnector = inject(UserRegistrationConnector);
  protected command = inject(CommandService);

  protected registerOrganizationUserCommand: Command<
    {
      userData: OrganizationUserRegistration;
    },
    OrganizationUserRegistration
  > = this.command.create((payload) =>
    this.userRegistrationConnector.registerUser(payload.userData)
  );

  /**
   * Register a new org user.
   *
   * @param userData
   */
  registerUser(
    userData: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration> {
    return this.registerOrganizationUserCommand.execute({ userData });
  }
}
