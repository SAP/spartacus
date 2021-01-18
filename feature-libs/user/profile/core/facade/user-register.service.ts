import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ProcessSelectors,
  REGISTER_USER_PROCESS_ID,
  StateWithProcess,
  StateWithUser,
  UserActions,
} from '@spartacus/core';
import { LoadStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { UserSignUp } from '../user.model';

@Injectable({ providedIn: 'root' })
export class UserRegisterService {
  constructor(protected store: Store<StateWithUser | StateWithProcess<void>>) {}

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
   * Returns the process for the given load status.
   */
  getProcess(state: LoadStatus): Observable<boolean> {
    if (state === LoadStatus.SUCCESS) {
      return this.store.pipe(
        select(
          ProcessSelectors.getProcessSuccessFactory(REGISTER_USER_PROCESS_ID)
        )
      );
    }

    if (state === LoadStatus.ERROR) {
      return this.store.pipe(
        select(
          ProcessSelectors.getProcessErrorFactory(REGISTER_USER_PROCESS_ID)
        )
      );
    }

    return this.store.pipe(
      select(
        ProcessSelectors.getProcessLoadingFactory(REGISTER_USER_PROCESS_ID)
      )
    );
  }

  /**
   * Resets the update user's email processing state.
   */
  resetProcess(): void {
    this.store.dispatch(new UserActions.ResetUpdateEmailAction());
  }
}
