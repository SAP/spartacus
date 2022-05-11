import { Injectable } from '@angular/core';
import { Command, CommandService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UserRegistrationConnector } from '../connectors/user-registration.connector';
import { OrganizationUserRegistration } from '../model';
import { UserRegistrationFacade } from '../../root/facade/user-registration.facade';

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
