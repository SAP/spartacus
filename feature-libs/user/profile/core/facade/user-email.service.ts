import { Injectable } from '@angular/core';
import { CommandService, CommandStrategy } from '@spartacus/core';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { UserProfileConnector } from '../connectors/user-profile.connector';
import { UserProfileService } from './user-profile.service';

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
  }>(
    (payload) =>
      this.userProfileService.get().pipe(
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.userProfileConnector.updateEmail(
            user!.uid!,
            payload.password,
            payload.newUid
          )
        )
      ),
    {
      strategy: CommandStrategy.Queue,
    }
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
