import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StateWithUser, UserActions, UserIdService } from '@spartacus/core';
import { UPDATE_EMAIL_PROCESS_ID } from '../store/user-profile.state';
import { getCallState } from './utils';

@Injectable({ providedIn: 'root' })
export class UserEmailService {
  updateEmailCallState = getCallState(
    this.store,
    UPDATE_EMAIL_PROCESS_ID,
    () => {
      this.store.dispatch(new UserActions.ResetUpdateEmailAction());
    }
  );

  constructor(
    protected store: Store<StateWithUser>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Updates the user's email.
   */
  update(password: string, newUid: string): void {
    this.userIdService
      .takeUserId(true)
      .subscribe((uid) =>
        this.store.dispatch(
          new UserActions.UpdateEmailAction({ uid, password, newUid })
        )
      );
  }
}
