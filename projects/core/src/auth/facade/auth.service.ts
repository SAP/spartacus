import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClientToken, UserToken } from '../models/token-types.model';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { ClientTokenState, StateWithAuth } from '../store/auth-state';
import { getClientTokenState } from '../store/selectors/client-token.selectors';
import { getUserToken } from '../store/selectors/user-token.selectors';
import {
  LoadUserToken,
  RefreshUserToken,
  LoadUserTokenSuccess
} from '../store/actions/user-token.action';
import { LoadClientToken } from '../store/actions/client-token.action';
import { Login, Logout } from '../store/actions/login-logout.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userToken$: Observable<UserToken> = this.store.pipe(
    select(getUserToken)
  );

  constructor(private store: Store<StateWithAuth>) {}

  readonly clientToken$: Observable<ClientToken> = this.store.pipe(
    select(getClientTokenState),
    tap((state: ClientTokenState) => {
      if (!state.loading && Object.keys(state.token).length === 0) {
        this.loadClientToken();
      }
    }),
    filter((state: ClientTokenState) => Object.keys(state.token).length !== 0),
    map((state: ClientTokenState) => state.token)
  );

  authorize(userId: string, password: string) {
    this.store.dispatch(
      new LoadUserToken({
        userId: userId,
        password: password
      })
    );
  }

  refreshUserToken(token: UserToken) {
    this.store.dispatch(
      new RefreshUserToken({
        userId: token.userId,
        refreshToken: token.refresh_token
      })
    );
  }

  authorizeWithToken(token: UserToken) {
    this.store.dispatch(new LoadUserTokenSuccess(token));
  }

  login() {
    this.store.dispatch(new Login());
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  loadClientToken() {
    this.store.dispatch(new LoadClientToken());
  }

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
