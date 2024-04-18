import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthRedirectService } from '@spartacus/core';
import { LoginGuard } from '@spartacus/storefront';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OppsLoginGuard extends LoginGuard {
  protected authRedirectService = inject(AuthRedirectService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    let redirectUrl = decodeURIComponent(route.queryParams['redirectUrl']);
    if (redirectUrl) {
      this.authRedirectService.setRedirectUrl(redirectUrl);
    }
    return this.authService.isUserLoggedIn().pipe(
      switchMap((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          this.authRedirectService.redirect();
        }
        return super.canActivate(route, state);
      })
    );
  }
}

// example url:
// http://localhost:4200/apparel-uk-spa/en/GBP/login?redirectUrl=/product/300649633/the-lodown-rasta-uni
// user: opps@tester.com Password123.
