import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoaderState } from '../../state/utils/loader/loader-state';
import {
  ClientToken,
  OpenIdToken,
  UserToken,
} from '../models/token-types.model';
import { LoadClientToken } from '../store/actions/client-token.action';
import { Logout } from '../store/actions/login-logout.action';
import { LoadOpenIdToken } from '../store/actions/open-id-token.action';
import {
  LoadUserToken,
  LoadUserTokenSuccess,
  RefreshUserToken,
} from '../store/actions/user-token.action';
import { StateWithAuth } from '../store/auth-state';
import { getClientTokenState } from '../store/selectors/client-token.selectors';
import { getOpenIdTokenValue } from '../store/selectors/open-id-token.selectors';
import { getUserToken } from '../store/selectors/user-token.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected store: Store<StateWithAuth>) {}

  /**
   * Loads a new user token
   * @param userId
   * @param password
   */
  authorize(userId: string, password: string): void {
    this.store.dispatch(
      new LoadUserToken({
        userId: userId,
        password: password,
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
        refreshToken: token.refresh_token,
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
        if (this.isClientTokenLoaded(state)) {
          return true;
        } else {
          if (!state.loading) {
            this.store.dispatch(new LoadClientToken());
          }
          return false;
        }
      }),
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
      filter((state: LoaderState<ClientToken>) =>
        this.isClientTokenLoaded(state)
      ),
      map((state: LoaderState<ClientToken>) => state.value)
    );
  }

  /**
   * Authorizes using the Kyma OAuth client with scope `openid`.
   *
   * @param username a username
   * @param password a password
   */
  authorizeOpenId(username: string, password: string): void {
    this.store.dispatch(new LoadOpenIdToken({ username, password }));
  }

  /**
   * Returns the `OpenIdToken`, which was previously retrieved using `authorizeOpenId` method.
   */
  getOpenIdToken(): Observable<OpenIdToken> {
    return this.store.pipe(select(getOpenIdTokenValue));
  }

  protected isClientTokenLoaded(state: LoaderState<ClientToken>): boolean {
    return (state.success || state.error) && !state.loading;
  }
}
