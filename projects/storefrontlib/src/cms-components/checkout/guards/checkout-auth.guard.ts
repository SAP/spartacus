import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  AuthRedirectService,
  AuthService,
  RoutingService,
  UserToken,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserToken().pipe(
      map((token: UserToken) => {
        if (!token.access_token) {
          this.routingService.go({ cxRoute: 'login' }, { forced: true });
          this.authRedirectService.reportAuthGuard();
        }
        return !!token.access_token;
      })
    );
  }
}
