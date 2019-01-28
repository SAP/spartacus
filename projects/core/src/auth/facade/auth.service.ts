import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { tap, filter, map, take } from 'rxjs/operators';

import { ClientToken, UserToken } from '../models/token-types.model';
import { StateWithAuth } from '../store/auth-state';
import { LoadClientToken } from '../store/actions/client-token.action';
import { Login, Logout } from '../store/actions/login-logout.action';
import {
  LoadUserToken,
  RefreshUserToken,
  LoadUserTokenSuccess
} from '../store/actions/user-token.action';
import { getClientTokenState } from '../store/selectors/client-token.selectors';
import { getUserToken } from '../store/selectors/user-token.selectors';
import { LoaderState } from 'projects/core/src/state/utils/loader/loader-state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Debug
  clientTokenState: Observable<LoaderState<ClientToken>>;

  constructor(private store: Store<StateWithAuth>) {
    // Debug
    this.clientTokenState = this.store.pipe(select(getClientTokenState));
    // Debug
    this.clientTokenState.subscribe(value => {
      console.log('clientTokenState value emitted: ', value);
    });
  }

  /**
   * Loads a new user token
   * @param userId
   * @param password
   */
  authorize(userId: string, password: string): void {
    this.store.dispatch(
      new LoadUserToken({
        userId: userId,
        password: password
      })
    );
  }

  /**
   * Returns the user's token
   */
  getUserToken(): Observable<UserToken> {
    return this.store.pipe(select(getUserToken));
  }

  /**
   * Refreshes the user token
   * @param token a user token to refresh
   */
  refreshUserToken(token: UserToken): void {
    this.store.dispatch(
      new RefreshUserToken({
        userId: token.userId,
        refreshToken: token.refresh_token
      })
    );
  }

  /**
   * Store the provided token
   */
  authorizeWithToken(token: UserToken): void {
    this.store.dispatch(new LoadUserTokenSuccess(token));
  }

  /**
   * Login
   */
  login(): void {
    this.store.dispatch(new Login());
  }

  /**
   * Logout
   */
  logout(): void {
    this.store.dispatch(new Logout());
  }

  /**
   * Loads a new client token
   */
  loadClientToken(): void {
    this.store.dispatch(new LoadClientToken());
  }

  /**
   * Returns the client token
   */
  getClientToken(): Observable<ClientToken> {
    return this.store.pipe(
      select(getClientTokenState),
      tap((state: LoaderState<ClientToken>) => {
        if (!state.success && !state.loading) {
          this.loadClientToken();
        }
      }),
      filter((state: LoaderState<ClientToken>) => {
        return (state.success || state.error) && !state.loading;
      }),
      map((state: LoaderState<ClientToken>) => state.value)
    );
  }

  /**
   * Refreshes the client token
   */
  refreshClientToken(): Observable<ClientToken> {
    // Todo
    return of({} as ClientToken);
  }
}
