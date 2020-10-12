import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserToken } from '../models/user-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService extends OAuthStorage {
  /**
   * Extracted keys that are not `JSON.stringify` from reading the angular-oauth2-oidc source code
   */
  protected static readonly nonStringifiedOAuthLibKeys = [
    'PKCE_verifier',
    'access_token',
    'refresh_token',
    'expires_at',
    'access_token_stored_at',
    'id_token',
    'id_token_expires_at',
    'id_token_stored_at',
    'session_state',
    'nonce',
  ];

  protected _userToken$ = new BehaviorSubject<UserToken>({} as UserToken);

  protected decode(key: string, value: any) {
    if (AuthStorageService.nonStringifiedOAuthLibKeys.includes(key)) {
      return value;
    }
    return JSON.stringify(value);
  }

  protected encode(key: string, value: any) {
    if (AuthStorageService.nonStringifiedOAuthLibKeys.includes(key)) {
      return value;
    } else {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  }

  /** Async API for spartacus use */
  getUserToken(): Observable<UserToken> {
    return this._userToken$.asObservable();
  }

  setUserToken(userToken: UserToken): void {
    this._userToken$.next(userToken);
  }

  /** Sync API for oAuth lib use */
  getItem(key: string): any {
    return this.decode(key, this.getUserToken()[key]);
  }

  removeItem(key: string): void {
    const val = { ...this._userToken$.value };
    delete val[key];
    this._userToken$.next({
      ...val,
    });
  }

  setItem(key: string, data: any): void {
    this._userToken$.next({
      ...this._userToken$.value,
      [key]: this.encode(key, data),
    });
  }
}
