import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromRouting from '../../routing/store';
import * as fromStore from './../store';

@Injectable()
export class AuthGuard implements CanActivate {
  static GUARD_NAME = 'AuthGuard';

  constructor(
    private store: Store<fromStore.AuthState>,
    private router: Router
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getUserToken),
      map(token => {
        if (!token.access_token) {
          this.router.navigate(['/login']);
          this.store.dispatch(new fromRouting.SaveRedirectUrl(state.url));
        }
        return !!token.access_token;
      })
    );
  }
}
