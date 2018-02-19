import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Store } from '@ngrx/store';
import * as fromStore from './../store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.UserState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromStore.getUserToken).map(token => {
      if (!token.access_token) {
        this.router.navigate(['/']);
      }
      return !!token.access_token;
    });
  }
}
