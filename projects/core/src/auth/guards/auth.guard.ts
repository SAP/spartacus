import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RoutingService } from '../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { UserToken } from '../models/token-types.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  static GUARD_NAME = 'AuthGuard';

  constructor(
    protected routingService: RoutingService,
    protected authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserToken().pipe(
      map((token: UserToken) => {
        if (!token.access_token) {
          this.routingService.go({ cxRoute: 'login' });
        }
        return !!token.access_token;
      })
    );
  }
}
