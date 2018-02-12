import { Injectable } from '@angular/core';
import { OccUserService } from '../../newocc/user/user.service';

import { Observable } from 'rxjs/Observable';
import { Token, Y_USER_TOKEN } from './../token-types';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserTokenService {
  constructor(private userService: OccUserService) {}

  loadToken(username: string, password: string): Observable<any> {
    return this.userService
      .loadToken(username, password)
      .pipe(tap((token: Token) => this.storeToken(username, token)))
      .catch(err => Observable.throw(err));
  }

  protected storeToken(username: string, token: Token): void {
    token.username = username;
    this.setInSessionStorage(token);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getToken(): Token {
    return this.getFromSessionStorage();
  }

  private setInSessionStorage(token: Token): void {
    sessionStorage.setItem(Y_USER_TOKEN, JSON.stringify(token));
  }

  private getFromSessionStorage(): Token {
    const jsonToken = sessionStorage.getItem(Y_USER_TOKEN);
    return JSON.parse(jsonToken);
  }
}
