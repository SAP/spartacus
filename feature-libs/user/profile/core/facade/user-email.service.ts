import { Injectable } from '@angular/core';
import { CommandService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';

@Injectable()
export class UserEmailService implements UserEmailFacade {
  constructor(
    protected userProfileService: UserProfileService,
    protected userProfileConnector: UserProfileConnector,
    protected command: CommandService
  ) {}

  protected updateCommand = this.command.create<{
    password: string;
    newUid: string;
  }>((payload) =>
    this.userProfileService
      .get()
      .pipe(
        switchMap(({ uid }) =>
          this.userProfileConnector.updateEmail(uid, payload.password, payload.newUid)
        )
      )
  );

  /**
   * Updates the user's email.
   *
   * @param password to users password to confirm the users
   * @param newUid the new proposed email address.
   */
  update(password: string, newUid: string): Observable<unknown> {
    return this.updateCommand.execute({ password, newUid });
  }
}
