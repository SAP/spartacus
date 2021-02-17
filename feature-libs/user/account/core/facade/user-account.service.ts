import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StateWithProcess, UserIdService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { UserAccountActions } from '../store/actions/index';
import { UserAccountSelectors } from '../store/selectors/index';
import { StateWithUserAccount } from '../store/user-account.state';

@Injectable()
export class UserAccountService implements UserAccountFacade {
  constructor(
    protected store: Store<StateWithUserAccount | StateWithProcess<void>>,
    protected userIdService: UserIdService
  ) {}

  /**
   * Returns the current user.
   */
  get(): Observable<User> {
    return this.store.pipe(select(UserAccountSelectors.getDetails)).pipe(
      tap((user) => {
        if (Object.keys(user).length === 0) {
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
      .takeUserId()
      .subscribe((userId) =>
        this.store.dispatch(new UserAccountActions.LoadUserAccount(userId))
      );
  }
}
