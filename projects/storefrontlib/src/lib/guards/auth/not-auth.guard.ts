import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService, RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  static GUARD_NAME = 'NotAuthGuard';

  constructor(
    private auth: AuthService,
    private routingService: RoutingService
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.userToken$.pipe(
      map(token => {
        if (token.access_token) {
          this.routingService.go(['/']);
        }
        return !token.access_token;
      })
    );
  }
}
