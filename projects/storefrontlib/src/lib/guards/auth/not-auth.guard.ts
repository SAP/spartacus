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
    private routingService: RoutingService,
    private authService: AuthService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.userToken$.pipe(
      map(token => {
        if (token.access_token) {
          this.routingService.go(['/']);
        }
        return !token.access_token;
      })
    );
  }
}
