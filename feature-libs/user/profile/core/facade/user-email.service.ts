import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
  UserActions,
  UserIdService,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/core';
import { Observable } from 'rxjs';
import { UPDATE_EMAIL_PROCESS_ID } from '../store/user-profile.state';

@Injectable({ providedIn: 'root' })
export class UserEmailService {
  constructor(
    protected store: Store<StateWithProcess<User>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Updates the user's email.
   *
   * The method returns an observable with `LoaderState` information, including the
   * actual user data.
   */
  update(
    password: string,
    newUid: string
  ): Observable<StateUtils.LoaderState<User>> {
    this.userIdService
      .takeUserId(true)
      .subscribe((uid) =>
        this.store.dispatch(
          new UserActions.UpdateEmailAction({ uid, password, newUid })
        )
      );
    return this.store.pipe(
      select(ProcessSelectors.getProcessStateFactory(UPDATE_EMAIL_PROCESS_ID))
    );
  }
}
