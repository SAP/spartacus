import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { UserIdService } from '../facade/user-id.service';
import { AuthActions, AuthSelectors, StateWithAuth } from '../store';

export interface SyncedAuthState {
  userId: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string[];
  expiration_time?: string;
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
    this.store.dispatch(new AuthActions.ClearUserToken());
    this.userIdService.clearUserId();
    if (state) {
      // TODO: There might be the case that we don't have token state here, so then it's pointless to dispatch this action.
      // Also setting userId might be not needed
      // Whole state persistance mechanism might be dropped after oidc library usage
      this.store.dispatch(
        new AuthActions.LoadUserTokenSuccess({
          access_token: state.access_token,
          expires_in: state.expires_in,
          // TODO: don't restore if expired
          expiration_time: state.expiration_time,
          scope: state.scope,
          token_type: state.token_type,
          // TODO: don't pass it
          refresh_token: '',
        })
      );
      this.userIdService.setUserId(state.userId);
    }
  }
}
