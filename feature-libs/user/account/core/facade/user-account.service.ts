import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  OCC_USER_ID_ANONYMOUS,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { UserAccountAction } from '../store/actions/index';
import { UserAccountSelectors } from '../store/selectors/index';
import { StateWithUser } from '../store/user-account.state';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Returns the current user.
   *
   * Loads the user if it's not yet loaded.
   */
  get(): Observable<User> {
    return this.store.pipe(
      select(UserAccountSelectors.getDetails),
      tap((details) => {
        if (Object.keys(details).length === 0) {
          this.load();
        }
      })
    );
  }

  /**
   * Loads the user's details.
   */
  protected load(): void {
    this.userIdService.invokeWithUserId((userId) => {
      if (userId !== OCC_USER_ID_ANONYMOUS) {
        this.store.dispatch(new UserAccountAction.LoadUserAccount(userId));
      }
    });
  }
}
