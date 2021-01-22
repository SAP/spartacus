import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { User } from '@spartacus/user/details/core';
import { Observable } from 'rxjs';
import { UserActions } from '../store/actions/index';
import { UserSelectors } from '../store/selectors/index';
import {
  StateWithUserProfile,
  UPDATE_PASSWORD_PROCESS_ID,
} from '../store/user-profile.state';

@Injectable({ providedIn: 'root' })
export class UserPasswordService {
  constructor(
    protected store: Store<StateWithUserProfile | StateWithProcess<User>>,
    protected userIdService: UserIdService
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
  update(
    oldPassword: string,
    newPassword: string
  ): Observable<StateUtils.LoaderState<User>> {
    this.userIdService
      .takeUserId(true)
      .subscribe((userId) =>
        this.store.dispatch(
          new UserActions.UpdatePassword({ userId, oldPassword, newPassword })
        )
      );
    return this.store.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(UPDATE_PASSWORD_PROCESS_ID)
      )
    );
  }

  /*
   * Request an email to reset a forgotten password.
   */
  requestForgotPasswordEmail(email: string): void {
    this.store.dispatch(new UserActions.ForgotPasswordEmailRequest(email));
  }

  /**
   * Reset new password. Part of the forgot password flow.
   *
   * @param token
   * @param password
   */
  reset(token: string, password: string): void {
    this.store.dispatch(new UserActions.ResetPassword({ token, password }));
  }

  /**
   * Return whether user's password is successfully reset
   */
  isPasswordReset(): Observable<boolean> {
    return this.store.pipe(select(UserSelectors.getResetPassword));
  }
}
