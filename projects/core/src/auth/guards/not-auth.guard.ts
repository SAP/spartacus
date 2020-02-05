import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutingService } from '../../routing/facade/routing.service';
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

  canActivate(): Observable<boolean> {
    this.authRedirectService.reportNotAuthGuard();

    // redirect, if user is already logged in:
    return this.authService.isUserLoggedIn().pipe(
      map((loggedIn: boolean) => {
        if (loggedIn) {
          this.routingService.go({ cxRoute: 'home' });
        }
        return !loggedIn;
      })
    );
  }
}
