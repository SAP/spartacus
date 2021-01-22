import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { User } from '@spartacus/user/details/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Title, UserSignUp } from '../model/user-profile.model';
import { UserActions } from '../store/actions/index';
import { UserSelectors } from '../store/selectors/index';
import {
  REGISTER_USER_PROCESS_ID,
  StateWithUserProfile,
} from '../store/user-profile.state';

@Injectable({ providedIn: 'root' })
export class UserRegisterService {
  constructor(
    protected store: Store<StateWithUserProfile | StateWithProcess<User>>
  ) {}

  /**
   * Register a new user.
   *
   * @param submitFormData as UserRegisterFormData
   */
  register(user: UserSignUp): Observable<StateUtils.LoaderState<User>> {
    this.store.dispatch(new UserActions.RegisterUser(user));
    return this.store.pipe(
      select(ProcessSelectors.getProcessStateFactory(REGISTER_USER_PROCESS_ID))
    );
  }

  /**
   * Register a new user from guest.
   */
  registerGuest(guid: string, password: string): void {
    this.store.dispatch(new UserActions.RegisterGuest({ guid, password }));
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.store.pipe(
      select(UserSelectors.getAllTitles),
      tap((titles: Title[]) => {
        if (Object.keys(titles).length === 0) {
          this.loadTitles();
        }
      })
    );
  }

  /**
   * Retrieves titles.
   */
  protected loadTitles(): void {
    this.store.dispatch(new UserActions.LoadTitles());
  }
}
