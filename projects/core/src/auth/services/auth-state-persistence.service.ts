import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthActions, AuthSelectors, StateWithAuth } from '../store';

// TODO: Should we declare basic parameters like in UserToken or keep everything custom?
export interface SyncedAuthState {
  userId: string;
  [token_param: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStatePersistenceService {
  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithAuth>,
    protected userIdService: UserIdService
  ) {}

  public sync() {
    this.statePersistenceService.syncWithStorage({
      key: 'auth',
      state$: this.getAuthState(),
      onRead: (state) => this.onRead(state),
    });
  }

  protected getAuthState(): Observable<SyncedAuthState> {
    return combineLatest([
      this.store.pipe(
        select(AuthSelectors.getUserToken),
        filter((state) => !!state),
        map((state) => {
          return {
            ...state,
          };
        })
      ),
      this.userIdService.getUserId(),
    ]).pipe(map(([token, userId]) => ({ ...token, userId })));
  }

  protected onRead(state: SyncedAuthState) {
    if (state) {
      const tokenData = Object.fromEntries(
        Object.entries(state).filter(([key]) => {
          // userId used only for userIdService
          return key !== 'userId';
        })
      );
      this.store.dispatch(
        new AuthActions.SetUserTokenData({
          ...tokenData,
        })
      );
      this.userIdService.setUserId(state.userId);
    }
  }
}
