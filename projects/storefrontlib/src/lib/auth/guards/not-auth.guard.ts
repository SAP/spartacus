import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import * as fromStore from './../store';
import { RoutingService } from '../../routing/facade/routing.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  static GUARD_NAME = 'NotAuthGuard';

  constructor(
    private store: Store<fromStore.AuthState>,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getUserToken),
      map(token => {
        if (token.access_token) {
          this.routingService.go(['/']);
        }
        return !token.access_token;
      })
    );
  }
}
