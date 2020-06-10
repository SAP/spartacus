import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from './auth-redirect.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected router: Router
  ) {}

  // TODO: It should return UrlTree instead of doing manual redirect
  canActivate(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.authRedirectService.reportAuthGuard();
          this.routingService.go({ cxRoute: 'login' });
        }
        return isLoggedIn;
      })
    );
  }
}
