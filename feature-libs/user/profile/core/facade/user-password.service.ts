import { Injectable } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  normalizeHttpError,
} from '@spartacus/core';
import { ConnectableObservable, Observable, throwError } from 'rxjs';
import {
  catchError,
  publishReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { UserProfileConnector } from '../connectors/user-profile.connector';

@Injectable()
export class UserPasswordService implements UserPasswordFacade {
  constructor(
    protected userProfileService: UserProfileService,
    private userAccountConnector: UserProfileConnector,
    protected globalMessage: GlobalMessageService,
    private userProfileConnector: UserProfileConnector
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
    const update$ = this.userProfileService.get().pipe(
      take(1),
      switchMap((user) =>
        this.userAccountConnector
          // tslint:disable-next-line:no-non-null-assertion
          .updatePassword(user.uid!, oldPassword, newPassword)
          .pipe(catchError((error) => throwError(normalizeHttpError(error))))
      ),
      publishReplay()
    ) as ConnectableObservable<unknown>;
    update$.connect();
    return update$;
  }

  /**
   * Reset new password. Part of the forgot password flow.
   *
   * @param token
   * @param password
   */
  reset(token: string, password: string): Observable<unknown> {
    const resetPassword$ = this.userAccountConnector
      .resetPassword(token, password)
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
        }),
        publishReplay()
      ) as ConnectableObservable<unknown>;
    resetPassword$.connect();
    return resetPassword$;
  }

  /*
   * Request an email to reset a forgotten password.
   */
  requestForgotPasswordEmail(email: string): Observable<unknown> {
    const requestForgotPasswordEmail$ = this.userProfileConnector
      .requestForgotPasswordEmail(email)
      .pipe(
        tap(() => {
          this.globalMessage.add(
            { key: 'forgottenPassword.passwordResetEmailSent' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        }),
        catchError((error) => throwError(normalizeHttpError(error))),
        publishReplay()
      ) as ConnectableObservable<unknown>;
    requestForgotPasswordEmail$.connect();
    return requestForgotPasswordEmail$;
  }
}
