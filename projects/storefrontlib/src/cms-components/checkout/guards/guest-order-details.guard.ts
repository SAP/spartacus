import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
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
export class GuestOrderDetailsGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    private authRedirectService: AuthRedirectService,
    protected routingService: RoutingService
  ) {}

  // For GH-6480, re-directs to homepage when guest user hits order details endpoint
  canActivate(): Observable<boolean> {
    this.authRedirectService.reportNotAuthGuard();

    return this.authService.getUserToken().pipe(
      map((token: UserToken) => {
        if (!token.access_token) {
          this.routingService.go({ cxRoute: 'home' });
        }
        return !token.access_token;
      })
    );
  }
}
