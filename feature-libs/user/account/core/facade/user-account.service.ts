import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  OCC_USER_ID_ANONYMOUS,
  StateWithProcess,
  UserIdService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from '../model/user.model';
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
   * If there's no user logged in (i.e. anonymous session), an error is thrown.
   */
  getUser(): Observable<User> {
    return this.store.pipe(select(UserAccountSelectors.getDetails)).pipe(
      take(1),
      map((user) => {
        if (user.uid === OCC_USER_ID_ANONYMOUS) {
          throw new Error('User is not logged in.');
        }
        return user;
      })
    );
  }

  // /**
  //  * Loads the user's details.
  //  */
  // protected load(): void {
  //   this.userIdService.invokeWithUserId((userId) => {
  //     if (userId !== OCC_USER_ID_ANONYMOUS) {
  //       this.store.dispatch(new UserAccountActions.LoadUserAccount(userId));
  //     }
  //   });
  // }
}
