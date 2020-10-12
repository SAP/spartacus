import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';

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

  protected _token$ = new BehaviorSubject<AuthToken>({} as AuthToken);

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
  getToken(): Observable<AuthToken> {
    return this._token$.asObservable();
  }

  setToken(token: AuthToken): void {
    this._token$.next(token);
  }

  /** Sync API for oAuth lib use */
  getItem(key: string): any {
    return this.decode(key, this.getToken()[key]);
  }

  removeItem(key: string): void {
    const val = { ...this._token$.value };
    delete val[key];
    this._token$.next({
      ...val,
    });
  }

  setItem(key: string, data: any): void {
    this._token$.next({
      ...this._token$.value,
      [key]: this.encode(key, data),
    });
  }
}
