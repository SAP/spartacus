import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import * as fromAuthStore from '../store';
import { UserToken, ClientToken } from '../models/token-types.model';
import { ClientTokenState } from '../store/reducers/client-token.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<fromAuthStore.AuthState>) {}

  /**
   * Loads the user token
   *
   * @param userId username
   * @param password password
   */
  authorize(userId: string, password: string): void {
    this.store.dispatch(
      new fromAuthStore.LoadUserToken({
        userId: userId,
        password: password
      })
    );
  }

  /**
   * Returns the user token
   */
  getUserToken(): Observable<UserToken> {
    return this.store.pipe(select(fromAuthStore.getUserToken));
  }

  /**
   * Refreshes the user token
   * @param token a user token to refresh
   */
  refreshUserToken(token: UserToken): void {
    this.store.dispatch(
      new fromAuthStore.RefreshUserToken({
        userId: token.userId,
        refreshToken: token.refresh_token
      })
    );
  }

  /**
   * Saves the provided user token
   * @param token to save
   */
  authorizeWithToken(token: UserToken): void {
    this.store.dispatch(new fromAuthStore.LoadUserTokenSuccess(token));
  }

  /**
   * Login with the previously retrieved token
   */
  login(): void {
    this.store.dispatch(new fromAuthStore.Login());
  }

  /**
   * Log out
   */
  logout(): void {
    this.store.dispatch(new fromAuthStore.Logout());
  }

  /**
   * Loads the client token
   */
  loadClientToken(): void {
    this.store.dispatch(new fromAuthStore.LoadClientToken());
  }

  /**
   * Returns the client token
   */
  getClientToken(): Observable<ClientToken> {
    return this.store.pipe(
      select(fromAuthStore.getClientTokenState),
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
      select(fromAuthStore.getClientTokenState),
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
