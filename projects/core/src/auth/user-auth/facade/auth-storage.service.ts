import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserToken } from '../models/user-token.model';

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
  protected _userToken = new BehaviorSubject<UserToken>({} as UserToken);
  protected _csAgentToken = new BehaviorSubject<UserToken>({} as UserToken);

  getUserToken(): Observable<UserToken> {
    return this._userToken.asObservable();
  }

  getCSAgentToken(): Observable<UserToken> {
    return this._csAgentToken.asObservable();
  }

  setUserToken(userToken: UserToken) {
    this._userToken.next(userToken);
  }

  setCSAgentToken(csAgentToken: UserToken) {
    this._userToken.next(csAgentToken);
  }

  constructor() {
    super();
    this.switchToUser();
  }

  switchToCSAgent() {
    this.stream$ = this._csAgentToken.asObservable();
    this._tokenTarget = TokenTarget.CSAgent;
  }

  switchToEmulated() {
    this.stream$ = this._userToken.asObservable();
    this._tokenTarget = TokenTarget.Emulated;
  }

  copyCSAgentTokenForUser() {
    this._userToken.next(this._csAgentToken.value);
  }

  switchToUser() {
    this.stream$ = this._userToken.asObservable();
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
      const val = { ...this._csAgentToken.value };
      delete val[key];
      this._csAgentToken.next({
        ...val,
      });
    }
    if (this._tokenTarget !== TokenTarget.CSAgent) {
      const val = { ...this._userToken.value };
      delete val[key];
      this._userToken.next({
        ...val,
      });
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
      this._csAgentToken.next({
        ...this._csAgentToken.value,
        [key]: normalizedData,
      });
    }
    if (this._tokenTarget !== TokenTarget.CSAgent) {
      this._userToken.next({
        ...this._userToken.value,
        [key]: normalizedData,
      });
    }
  }
}
