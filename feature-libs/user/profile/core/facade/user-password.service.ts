import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateWithProcess,
  StateWithUser,
  UPDATE_PASSWORD_PROCESS_ID,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { LoadStatus } from './status';

@Injectable({ providedIn: 'root' })
export class UserPasswordService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Updates the password for the user
   * @param oldPassword the current password that will be changed
   * @param newPassword the new password
   */
  update(oldPassword: string, newPassword: string): void {
    this.userIdService
      .takeUserId(true)
      .subscribe((userId) =>
        this.store.dispatch(
          new UserActions.UpdatePassword({ userId, oldPassword, newPassword })
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
   * @param token
   * @param password
   */
  reset(token: string, password: string): void {
    this.store.dispatch(new UserActions.ResetPassword({ token, password }));
  }

  /**
   * Returns the process for the given load status.
   */
  getProcess(state: LoadStatus): Observable<boolean> {
    if (state === LoadStatus.SUCCESS) {
      return this.store.pipe(
        select(
          ProcessSelectors.getProcessSuccessFactory(UPDATE_PASSWORD_PROCESS_ID)
        )
      );
    }

    if (state === LoadStatus.ERROR) {
      return this.store.pipe(
        select(
          ProcessSelectors.getProcessErrorFactory(UPDATE_PASSWORD_PROCESS_ID)
        )
      );
    }

    return this.store.pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(UPDATE_PASSWORD_PROCESS_ID)
      )
    );
  }

  /**
   * Resets the update user's email processing state.
   */
  resetProcess(): void {
    this.store.dispatch(new UserActions.UpdatePasswordReset());
  }
}
