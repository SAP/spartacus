import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Title, UserSignUp } from '../model/user-profile.model';
import { UserActions } from '../store/actions/index';
import { UserSelectors } from '../store/selectors/index';
import {
  REGISTER_USER_PROCESS_ID,
  StateWithUserProfile,
} from '../store/user-profile.state';
import { getCallState } from './utils';

@Injectable({ providedIn: 'root' })
export class UserRegisterService {
  constructor(protected store: Store<StateWithUserProfile>) {}

  registerCallState = getCallState(this.store, REGISTER_USER_PROCESS_ID, () => {
    this.store.dispatch(new UserActions.ResetRegisterUserProcess());
  });

  /**
   * Register a new user
   *
   * @param submitFormData as UserRegisterFormData
   */
  register(user: UserSignUp): void {
    this.store.dispatch(new UserActions.RegisterUser(user));
  }

  /**
   * Register a new user from guest
   *
   * @param guid
   * @param password
   */
  registerGuest(guid: string, password: string): void {
    this.store.dispatch(new UserActions.RegisterGuest({ guid, password }));
  }

  /**
   * Returns titles.
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
   * Retrieves titles
   */
  protected loadTitles(): void {
    this.store.dispatch(new UserActions.LoadTitles());
  }
}
