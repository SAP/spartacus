import { Injectable } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserToken } from '../models/user-token.model';

const nonStringifiedKeys = [
  'access_token',
  'refresh_token',
  'expires_at',
  'access_token_stored_at',
];

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService extends OAuthStorage {
  protected _userToken = new BehaviorSubject<UserToken>({} as UserToken);

  getUserToken(): Observable<UserToken> {
    return this._userToken.asObservable();
  }

  setUserToken(userToken: UserToken) {
    this._userToken.next(userToken);
  }

  constructor() {
    super();
  }

  getItem(key: string): string {
    if (nonStringifiedKeys.includes(key)) {
      return this.getUserToken()[key];
    }
    return JSON.stringify(this.getUserToken()[key]);
  }

  removeItem(key: string): void {
    const val = { ...this._userToken.value };
    delete val[key];
    this._userToken.next({
      ...val,
    });
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
    this._userToken.next({
      ...this._userToken.value,
      [key]: normalizedData,
    });
  }
}
