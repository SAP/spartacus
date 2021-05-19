import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import { LoginFlowRoutesService } from './login-flow-routes.service';

/**
 * Responsible for saving last accessed page (or attempted) before login and for redirecting to that page after login.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthRedirectService implements OnDestroy {
  /**
   * This service is responsible for redirecting to the last page before authorization. "The last page" can be:
   * 1. Just the previously opened page; or
   * 2. The page that we just tried to open, but AuthGuard cancelled it
   *
   * For example:
   * 1. The user opens the product page, then clicks /login link and signs in
   *    -> Then we should redirect to the product page; or
   * 2. The user opens the product page, then he clicks /my-account link,
   *    but is automatically redirected to the login page by the AuthGuard, and he signs in
   *    -> Then we should redirect to the my-account page, not the product page
   */
  constructor(
    protected routing: RoutingService,
    protected router: Router,
    protected authRedirectStorageService: AuthRedirectStorageService,
    protected loginFlowRoutesService: LoginFlowRoutesService
  ) {
    this.init();
  }

  protected subscription: Subscription;

  protected init() {
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.debug(event); // SPIKE TODO remove
        const { url } = event;
        if (!this.isIgnoredUrl(url)) {
          this.setRedirectUrl(url);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  /**
   * Redirect to saved url (homepage if nothing is saved).
   */
  redirect() {
    this.authRedirectStorageService
      .getRedirectUrl()
      .pipe(take(1))
      .subscribe((redirectUrl) => {
        if (redirectUrl === undefined) {
          this.routing.go('/');
        } else {
          this.routing.goByUrl(redirectUrl);
        }
        this.setRedirectUrl(undefined);
      });
  }

  // SPIKE TODO: deprecate those guys
  reportAuthGuard() {}

  reportNotAuthGuard() {}

  protected isIgnoredUrl(url: string): boolean {
    return this.loginFlowRoutesService.isLoginFlow(url);
  }

  protected setRedirectUrl(url: string | undefined): void {
    this.authRedirectStorageService.setRedirectUrl(url);
  }
}
