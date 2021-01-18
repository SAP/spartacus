import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateWithProcess,
  StateWithUser,
  UPDATE_EMAIL_PROCESS_ID,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserEmailService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
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

  /**
   * Returns the update user's email success flag
   */
  getUpdateEmailResultSuccess(): Observable<boolean> {
    return this.store.pipe(
      select(ProcessSelectors.getProcessSuccessFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email error flag
   */
  getUpdateEmailResultError(): Observable<boolean> {
    return this.store.pipe(
      select(ProcessSelectors.getProcessErrorFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Returns the update user's email loading flag
   */
  getUpdateEmailResultLoading(): Observable<boolean> {
    return this.store.pipe(
      select(ProcessSelectors.getProcessLoadingFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }

  /**
   * Resets the update user's email processing state
   */
  resetUpdateEmailResultState(): void {
    this.store.dispatch(new UserActions.ResetUpdateEmailAction());
  }
}
