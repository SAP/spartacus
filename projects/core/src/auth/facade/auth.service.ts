import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

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
   * Returns a client token.  The client token from the store is returned if there is one.
   * Otherwise, an new token is fetched from the backend and saved in the store.
   */
  getClientToken(): Observable<ClientToken> {
    return this.store.pipe(
      select(getClientTokenState),
      filter((state: LoaderState<ClientToken>) => {
        if (this.isTokenLoaded(state)) {
          return true;
        } else {
          if (!state.loading) {
            this.store.dispatch(new LoadClientToken());
          }
          return false;
        }
      }),
      take(1),
      map((state: LoaderState<ClientToken>) => state.value)
    );
  }

  /**
   * Fetches a clientToken from the backend ans saves it in the store where getClientToken can use it.
   * The new clientToken is returned.
   */
  refreshClientToken(): Observable<ClientToken> {
    this.store.dispatch(new LoadClientToken());

    return this.store.pipe(
      select(getClientTokenState),
      filter((state: LoaderState<ClientToken>) => this.isTokenLoaded(state)),
      take(1),
      map((state: LoaderState<ClientToken>) => state.value)
    );
  }

  protected isTokenLoaded(state: LoaderState<ClientToken>): boolean {
    return (state.success || state.error) && !state.loading;
  }
}
