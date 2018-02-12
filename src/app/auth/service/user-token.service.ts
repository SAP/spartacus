import { Injectable } from '@angular/core';
import { OccUserService } from '../../newocc/user/user.service';

import { Observable } from 'rxjs/Observable';
import { UserToken, Y_USER_TOKEN } from './../token-types';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserTokenService {
  constructor(private userService: OccUserService) {}

  loadToken(username: string, password: string): Observable<any> {
    return this.userService
      .loadToken(username, password)
      .pipe(tap((token: UserToken) => this.storeToken(username, token)))
      .catch(err => Observable.throw(err));
  }

  storeToken(username: string, token: UserToken): UserToken {
    token.username = username;
    this.setInSessionStorage(token);

    return token;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getToken(): UserToken {
    return this.getFromSessionStorage();
  }

  private setInSessionStorage(token: UserToken): void {
    sessionStorage.setItem(Y_USER_TOKEN, JSON.stringify(token));
  }

  private getFromSessionStorage(): UserToken {
    const jsonToken = sessionStorage.getItem(Y_USER_TOKEN);
    return JSON.parse(jsonToken);
  }
}
