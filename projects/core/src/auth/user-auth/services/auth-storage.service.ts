import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';

/**
 * Storage service for AuthToken. Used as a storage for angular-oauth2-oidc library.
 */
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

  protected _token: AuthToken = {} as AuthToken;

  protected _token$: BehaviorSubject<AuthToken> = new BehaviorSubject<AuthToken>(
    {} as AuthToken
  );

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

  /* Async API for spartacus use */

  /**
   * Returns complete token (all fields).
   *
   * @return observable emitting AuthToken
   */
  getToken(): Observable<AuthToken> {
    return this._token$.asObservable();
  }

  /**
   * Set current value of token.
   *
   * @param token
   */
  setToken(token: AuthToken): void {
    this._token = token;
    this._token$.next(token);
  }

  /* Sync API for OAuth lib use */

  /**
   * Get parameter from the token (eg. access_token)
   *
   * @param key
   */
  getItem(key: string): any {
    return this.decode(key, this._token?.[key]);
  }

  /**
   * Removes parameter from the token (eg. access_token)
   *
   * @param key
   */
  removeItem(key: string): void {
    const val = {...this._token$.value};
    delete val[key];
    this.setToken({
      ...val,
    });
  }

  /**
   * Sets parameter of the token (eg. access_token)
   *
   * @param key
   * @param data
   */
  setItem(key: string, data: any): void {
    if (key) {
      this.setToken({
        ...this._token$.value,
        [key]: this.encode(key, data),
      });
    }
  }
}
