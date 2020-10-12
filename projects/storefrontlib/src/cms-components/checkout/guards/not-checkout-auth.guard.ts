import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActiveCartService,
  AuthService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotCheckoutAuthGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected activeCartService: ActiveCartService
  ) {}

  // TODO: Return UrlTree instead of doing manual redirects
  canActivate(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.routingService.go({ cxRoute: 'home' });
        } else if (this.activeCartService.isGuestCart()) {
          this.routingService.go({ cxRoute: 'cart' });
          return false;
        }
        return !isLoggedIn;
      })
    );
  }
}
