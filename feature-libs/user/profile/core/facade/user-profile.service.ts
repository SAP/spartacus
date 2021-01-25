import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  StateUtils,
  StateWithProcess,
} from '@spartacus/core';
import { User, UserAccountService } from '@spartacus/user/account/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Title } from '../model/user-profile.model';
import { UserProfileActions, UserProfileSelectors } from '../store/index';
import {
  CLOSE_USER_PROCESS_ID,
  StateWithUserProfile,
  UPDATE_USER_PROFILE_PROCESS_ID,
} from '../store/user-profile.state';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(
    protected store: Store<StateWithUserProfile | StateWithProcess<User>>,
    protected userAccountService: UserAccountService
  ) {}

  getUser(): Observable<User> {
    return this.userAccountService.getUser();
  }

  /**
   * Updates the user's details.
   *
   * @param details User details to be updated.
   */
  update(details: User): Observable<StateUtils.LoaderState<User>> {
    this.getUser()
      .pipe(
        tap((user) =>
          this.store.dispatch(
            new UserProfileActions.UpdateUserProfile({ uid: user.uid, details })
          )
        )
      )
      .subscribe();

    return this.process(UPDATE_USER_PROFILE_PROCESS_ID);
  }

  /**
   * Closes the user account.
   */
  close(): Observable<StateUtils.LoaderState<User>> {
    return this.getUser().pipe(
      tap((user) =>
        this.store.dispatch(new UserProfileActions.RemoveUser(user.uid))
      ),
      switchMap(() => this.process(CLOSE_USER_PROCESS_ID))
    );
  }

  /**
   * Returns titles that can be used for the user profiles.
   */
  getTitles(): Observable<Title[]> {
    return this.store.pipe(
      select(UserProfileSelectors.getAllTitles),
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
    this.store.dispatch(new UserProfileActions.LoadTitles());
  }

  private process(processId): Observable<StateUtils.LoaderState<User>> {
    return this.store.pipe(
      select(ProcessSelectors.getProcessStateFactory(processId))
    );
  }
}
