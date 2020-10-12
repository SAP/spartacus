import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsmActions } from '../../asm/store/actions/index';
import { StateWithAsm } from '../../asm/store/asm-state';
import { AsmSelectors } from '../../asm/store/selectors';
import { UserToken } from '../models/token-types.model';
import { AuthActions } from '../store/actions/index';
import { StateWithAuth } from '../store/auth-state';
import { AuthSelectors } from '../store/selectors/index';

const nonStringifiedKeys = [
  'access_token',
  'refresh_token',
  'expires_at',
  'access_token_stored_at',
];

enum TokenTarget {
  CSAgent = 'CSAgent',
  User = 'User',
  Emulated = 'Emulated',
}

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService extends OAuthStorage {
  protected _tokenTarget: TokenTarget = TokenTarget.User;
  protected stream$: Observable<UserToken>;

  constructor(protected store: Store<StateWithAuth | StateWithAsm>) {
    super();
    this.switchToUser();
  }

  switchToCSAgent() {
    this.stream$ = this.store.pipe(
      select(AsmSelectors.getCustomerSupportAgentToken)
    );
    this._tokenTarget = TokenTarget.CSAgent;
  }

  switchToEmulated() {
    this.stream$ = this.store.pipe(select(AuthSelectors.getUserToken));
    this._tokenTarget = TokenTarget.Emulated;
  }

  copyCSAgentTokenForUser() {
    let token;
    this.store
      .pipe(select(AsmSelectors.getCustomerSupportAgentToken))
      .pipe(take(1))
      .subscribe((tok) => (token = tok));
    this.store.dispatch(new AuthActions.SetUserTokenData({ ...token }));
  }

  switchToUser() {
    this.stream$ = this.store.pipe(select(AuthSelectors.getUserToken));
    this._tokenTarget = TokenTarget.User;
  }

  getToken() {
    let token;
    this.stream$.pipe(take(1)).subscribe((tok) => (token = tok));
    return token;
  }

  getItem(key: string): string {
    if (nonStringifiedKeys.includes(key)) {
      return this.getToken()[key];
    }
    return JSON.stringify(this.getToken()[key]);
  }

  removeItem(key: string): void {
    if (this._tokenTarget !== TokenTarget.User) {
      this.store.dispatch(
        new AsmActions.SetCSAgentTokenData({
          [key]: undefined,
        })
      );
    }
    if (this._tokenTarget !== TokenTarget.CSAgent) {
      this.store.dispatch(
        new AuthActions.SetUserTokenData({ [key]: undefined })
      );
    }
  }

  setItem(key: string, data: string): void {
    let normalizedData;
    if (nonStringifiedKeys.includes(key)) {
      normalizedData = data;
    } else {
      try {
        normalizedData = JSON.parse(data);
      } catch {
        normalizedData = data;
      }
    }
    if (this._tokenTarget !== TokenTarget.User) {
      this.store.dispatch(
        new AsmActions.SetCSAgentTokenData({
          [key]: normalizedData,
        })
      );
    }
    if (this._tokenTarget !== TokenTarget.CSAgent) {
      this.store.dispatch(
        new AuthActions.SetUserTokenData({
          [key]: normalizedData,
        })
      );
    }
  }
}
