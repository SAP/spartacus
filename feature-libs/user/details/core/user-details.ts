import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  StateWithProcess,
  StateWithUser,
  User,
  UserActions,
  UserIdService,
  UsersSelectors,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
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
      select(UsersSelectors.getDetails),
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
    this.userIdService
      .takeUserId(true)
      .subscribe((userId) =>
        this.store.dispatch(new UserActions.LoadUserDetails(userId))
      );
  }

  /**
   * Remove user account, that's also called close user's account.
   */
  remove(): void {
    this.userIdService
      .takeUserId(true)
      .subscribe((userId) =>
        this.store.dispatch(new UserActions.RemoveUser(userId))
      );
  }
}
