import { Injectable } from '@angular/core';
import { CommandService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';

@Injectable()
export class UserPasswordService implements UserPasswordFacade {
  protected updateCommand = this.command.create<{
    oldPassword: string;
    newPassword: string;
  }>((payload) =>
    this.userProfileService.get().pipe(
      take(1),
      switchMap((user) =>
        this.userProfileConnector
          // tslint:disable-next-line:no-non-null-assertion
          .updatePassword(user!.uid!, payload.oldPassword, payload.newPassword)
      )
    )
  );

  protected resetCommand = this.command.create<{
    token: string;
    password: string;
  }>((payload) =>
    this.userProfileConnector.resetPassword(payload.token, payload.password)
  );

  protected requestForgotPasswordEmailCommand = this.command.create<{
    email: string;
  }>((payload) =>
    this.userProfileConnector.requestForgotPasswordEmail(payload.email)
  );

  constructor(
    protected userProfileService: UserProfileService,
    protected userProfileConnector: UserProfileConnector,
    protected command: CommandService
  ) {}

  /**
   * Updates the password for the user
   *
   * The method returns an observable with `LoaderState` information, including the
   * actual user data.
   *
   * @param oldPassword the current password that will be changed
   * @param newPassword the new password
   */
  update(oldPassword: string, newPassword: string): Observable<unknown> {
    return this.updateCommand.execute({ oldPassword, newPassword });
  }

  /**
   * Reset new password. Part of the forgot password flow.
   *
   * @param token
   * @param password
   */
  reset(token: string, password: string): Observable<unknown> {
    return this.resetCommand.execute({ token, password });
  }

  /*
   * Request an email to reset a forgotten password.
   */
  requestForgotPasswordEmail(email: string): Observable<unknown> {
    return this.requestForgotPasswordEmailCommand.execute({ email });
  }
}
