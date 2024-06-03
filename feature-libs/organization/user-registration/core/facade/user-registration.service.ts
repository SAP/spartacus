/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Command, CommandService } from '@spartacus/core';
import {
  UserRegistrationFacade,
  OrganizationUserRegistration,
} from '@spartacus/organization/user-registration/root';
import { Observable } from 'rxjs';
import { UserRegistrationConnector } from '../connectors/user-registration.connector';

@Injectable()
export class UserRegistrationService implements UserRegistrationFacade {
  protected registerOrganizationUserCommand: Command<
    {
      userData: OrganizationUserRegistration;
    },
    OrganizationUserRegistration
  > = this.command.create((payload) =>
    this.userRegistrationConnector.registerUser(payload.userData)
  );

  constructor(
    protected userRegistrationConnector: UserRegistrationConnector,
    protected command: CommandService
  ) {}

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
