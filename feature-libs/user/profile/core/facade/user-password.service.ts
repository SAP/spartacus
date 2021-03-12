import { Injectable } from '@angular/core';
import {
  CommandService,
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
} from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
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
        this.userAccountConnector
          // tslint:disable-next-line:no-non-null-assertion
          .updatePassword(user.uid!, payload.oldPassword, payload.newPassword)
      )
    )
  );

  protected resetCommand = this.command.create<{
    token: string;
    password: string;
  }>((payload) =>
    this.userAccountConnector
      .resetPassword(payload.token, payload.password)
      .pipe(
        tap(() => {
          this.globalMessage.add(
            { key: 'forgottenPassword.passwordResetSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        }),
        catchError((error) => {
          if (error?.error?.errors) {
            error.error.errors.forEach((err: any) => {
              if (err.message) {
                this.globalMessage.add(
                  { raw: err.message },
                  GlobalMessageType.MSG_TYPE_ERROR
                );
              }
            });
          }
          return throwError(normalizeHttpError(error));
        })
      )
  );

  protected requestForgotPasswordEmailCommand = this.command.create<{
    email: string;
  }>((payload) =>
    this.userProfileConnector.requestForgotPasswordEmail(payload.email).pipe(
      tap(() => {
        this.globalMessage.add(
          { key: 'forgottenPassword.passwordResetEmailSent' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      })
    )
  );

  constructor(
    protected userProfileService: UserProfileService,
    protected userAccountConnector: UserProfileConnector,
    protected globalMessage: GlobalMessageService,
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
