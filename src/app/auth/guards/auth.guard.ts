import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(): Observable<boolean> {
    let user;

    user = sessionStorage.getItem('user');

    return of(
      Object.keys(user.token.auth).length !== 0 &&
        Object.keys(user.userDetails.details).length !== 0 &&
        user.token.auth.access_token !== undefined
    );
  }
}
