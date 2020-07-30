import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthService } from '../facade/auth.service';
import { AuthRedirectService } from './auth-redirect.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected authService: AuthService,
    private authRedirectService: AuthRedirectService
  ) {}

  // TODO: It should return UrlTree instead of doing manual redirect
  canActivate(): Observable<boolean> {
    this.authRedirectService.reportNotAuthGuard();

    // redirect, if user is already logged in:
    return this.authService.isUserLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.routingService.go({ cxRoute: 'home' });
        }
        return !isLoggedIn;
      })
    );
  }
}
