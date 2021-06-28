import { Injectable, Optional } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Title, User } from '../../model/misc.model';
import { StateWithProcess } from '../../process/store/process-state';
import { UserActions } from '../store/actions/index';
import { UsersSelectors } from '../store/selectors/index';
import { StateWithUser, USER_FEATURE } from '../store/user-state';
import {
  UserAccountFacadeTransitionalToken,
  UserProfileFacadeTransitionalToken,
  UserRegisterFacadeTransitionalToken,
} from '../user-transitional-tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    // TODO: Remove transitional tokens in 4.0 with #11607
    @Optional()
    protected userAccountFacade?: UserAccountFacadeTransitionalToken,
    @Optional()
    protected userProfileFacade?: UserProfileFacadeTransitionalToken,
    @Optional()
    protected userRegisterFacade?: UserRegisterFacadeTransitionalToken
  ) {}

  /**
   * Returns a user.
   *
   * @deprecated since 3.2, use `UserAccountFacade.get()` from `@spartacus/user` package.
   */
  get(): Observable<User> {
    if (this.userAccountFacade) {
      return this.userAccountFacade.get();
    }
    // Throw error here
  }

  /**
   * Register a new user from guest.
   *
   * @param guid
   * @param password
   */
  registerGuest(guid: string, password: string): void {
    if (this.userRegisterFacade) {
      this.userRegisterFacade.registerGuest(guid, password);
    } else {
      this.store.dispatch(new UserActions.RegisterGuest({ guid, password }));
    }
  }

  /**
   * Returns titles.
   *
   * @deprecated since 3.2, use `UserProfileFacade.getTitles()` from `@spartacus/user` package.
   */
  getTitles(): Observable<Title[]> {
    if (this.userProfileFacade) {
      return this.userProfileFacade.getTitles();
    }
    return this.store.pipe(
      // workaround for using lazy loaded user/account library
      filter((state) => state[USER_FEATURE]),
      select(UsersSelectors.getAllTitles),
      tap((titles: Title[]) => {
        if (Object.keys(titles).length === 0) {
          this.loadTitles();
        }
      })
    );
  }

  /**
   * Retrieves titles.
   *
   * @deprecated since 3.2, use `UserProfileFacade.getTitles()` from `@spartacus/user` package.
   */
  loadTitles(): void {
    this.store.dispatch(new UserActions.LoadTitles());
  }
}
