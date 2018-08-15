import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from './../../user/store';
import * as fromAuthStore from './../store';

@Injectable()
export class NotAuthGuard implements CanActivate {
  static GUARD_NAME = 'NotAuthGuard';

  constructor(
    private store: Store<fromStore.UserState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuthStore.getUserToken).pipe(
      map(token => {
        if (token.access_token) {
          this.router.navigate(['/']);
        }
        return !token.access_token;
      })
    );
  }
}
