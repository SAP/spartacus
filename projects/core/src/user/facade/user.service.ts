import { Injectable, Optional } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Title, User, UserSignUp } from '../../model/misc.model';
import { OCC_USER_ID_ANONYMOUS } from '../../occ/utils/occ-constants';
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
    return this.store.pipe(
      // workaround for using lazy loaded user/account library
      filter((state) => state[USER_FEATURE]),
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
   *
   * @deprecated since 3.2, use `UserAccountFacade.get()` from `@spartacus/user` package.
   */
  load(): void {
    this.userIdService.invokeWithUserId((userId) => {
      if (userId !== OCC_USER_ID_ANONYMOUS) {
        this.store.dispatch(new UserActions.LoadUserDetails(userId));
      }
    });
  }

  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   *
   * @deprecated since 3.2, use `UserRegisterFacade.register()` from `@spartacus/user` package.
   */
  register(userRegisterFormData: UserSignUp): void {
    this.store.dispatch(new UserActions.RegisterUser(userRegisterFormData));
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
