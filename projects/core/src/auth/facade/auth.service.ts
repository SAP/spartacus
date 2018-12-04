import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import { ClientToken, UserToken } from '../models/token-types.model';
import { ClientTokenState, StateWithAuth } from '../store/auth-state';
import { LoadClientToken } from '../store/actions/client-token.action';
import { Login, Logout } from '../store/actions/login-logout.action';
import {
  LoadUserToken,
  RefreshUserToken,
  LoadUserTokenSuccess
} from '../store/actions/user-token.action';
import { getClientTokenState } from '../store/selectors/client-token.selectors';
import { getUserToken } from '../store/selectors/user-token.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<StateWithAuth>) {}

  /**
   * Loads a new user token
   * @param userId
   * @param password
   */
  authorize(userId: string, password: string) {
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
  authorizeWithToken(token: UserToken) {
    this.store.dispatch(new LoadUserTokenSuccess(token));
  }

  /**
   * Login
   */
  login() {
    this.store.dispatch(new Login());
  }

  /**
   * Logout
   */
  logout() {
    this.store.dispatch(new Logout());
  }

  /**
   * Loads a new client token
   */
  loadClientToken() {
    this.store.dispatch(new LoadClientToken());
  }

  /**
   * Returns the client token
   */
  getClientToken(): Observable<ClientToken> {
    return this.store.pipe(
      select(getClientTokenState),
      tap((state: ClientTokenState) => {
        if (!state.loading && Object.keys(state.token).length === 0) {
          this.loadClientToken();
        }
      }),
      filter(
        (state: ClientTokenState) => Object.keys(state.token).length !== 0
      ),
      map((state: ClientTokenState) => state.token)
    );
  }

  /**
   * Refreshes the client token
   */
  refreshClientToken(): Observable<ClientToken> {
    return this.store.pipe(
      select(getClientTokenState),
      tap((state: ClientTokenState) => {
        const token = state.token;
        if (token.access_token && !state.loading) {
          this.loadClientToken();
        }
      }),
      filter((state: ClientTokenState) => state.loaded),
      map((state: ClientTokenState) => state.token)
    );
  }
}
