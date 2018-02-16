import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Store } from '@ngrx/store';
import * as fromStore from './../store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromStore.UserState>) {}

  canActivate(): Observable<boolean> {
    let isTokenValid;

    this.store
      .select(fromStore.getUserToken)
      .subscribe(token => (isTokenValid = token.access_token !== undefined));

    return of(isTokenValid);
  }
}
