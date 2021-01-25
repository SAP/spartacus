import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserProfileActions } from '../store/actions/index';
import { UserProfileSelectors } from '../store/selectors/index';
import {
  StateWithUserProfile,
  UPDATE_PASSWORD_PROCESS_ID,
} from '../store/user-profile.state';
import { UserProfileService } from './user-profile.service';

@Injectable({ providedIn: 'root' })
export class UserPasswordService {
  constructor(
    protected store: Store<StateWithUserProfile | StateWithProcess<User>>,
    protected userProfileService: UserProfileService
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
    this.userProfileService
      .getUser()
      .pipe(
        tap((user) =>
          this.store.dispatch(
            new UserProfileActions.UpdatePassword({
              uid: user.uid,
              oldPassword,
              newPassword,
            })
          )
        )
      )
      .subscribe();

    return this.store.pipe(
      select(
        ProcessSelectors.getProcessStateFactory(UPDATE_PASSWORD_PROCESS_ID)
      )
    );
  }

  /**
   * Reset new password. Part of the forgot password flow.
   *
   * @param token
   * @param password
   */
  reset(token: string, password: string): void {
    this.store.dispatch(
      new UserProfileActions.ResetPassword({ token, password })
    );
  }

  /*
   * Request an email to reset a forgotten password.
   */
  requestForgotPasswordEmail(email: string): void {
    this.store.dispatch(
      new UserProfileActions.ForgotPasswordEmailRequest(email)
    );
  }

  /**
   * Return whether user's password is successfully reset
   */
  isPasswordReset(): Observable<boolean> {
    return this.store.pipe(select(UserProfileSelectors.getResetPassword));
  }
}
