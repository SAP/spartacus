import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthFlowRoutesService } from './auth-flow-routes.service';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';

/**
 * Responsible for saving last accessed page (or attempted) before login and for redirecting to that page after login.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthRedirectService implements OnDestroy {
  /**
   * This service is responsible for remembering the last page before the authentication. "The last page" can be:
   * 1. Just the previously opened page; or
   * 2. The page that we just tried to open, but AuthGuard cancelled it
   *
   * Then, after successful authentication it allows for redirecting to that remembered page via the `redirect()` method.
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
    protected authFlowRoutesService: AuthFlowRoutesService
  ) {
    this.init();
  }

  protected subscription: Subscription;

  protected init() {
    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.setRedirectUrl(event.urlAfterRedirects);
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
        this.clearRedirectUrl();
      });
  }

  /**
   * Saves url of a page that user wanted to access, but wasn't yet logged in.
   *
   * @deprecated since 4.0 - use `saveCurrentNavigationUrl` method instead
   */
  reportAuthGuard(): void {
    this.saveCurrentNavigationUrl();
  }

  /**
   * Saves the url of the current navigation as the redirect url, unless
   * the url is a part of the user login flow.
   */
  saveCurrentNavigationUrl(): void {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation?.finalUrl) {
      return;
    }

    const url = this.router.serializeUrl(navigation.finalUrl);
    this.setRedirectUrl(url);
  }

  /**
   * @deprecated since 4.0 - method not needed anymore. Every visited URL is now
   *                         remembered automatically as redirect URL on NavigationEnd event.
   */
  reportNotAuthGuard() {}

  /**
   * Save the url as the redirect url, unless it's a part of the user login flow.
   */
  setRedirectUrl(url: string): void {
    if (!this.authFlowRoutesService.isAuthFlow(url)) {
      this.authRedirectStorageService.setRedirectUrl(url);
    }
  }

  /**
   * Sets the redirect URL to undefined.
   */
  protected clearRedirectUrl(): void {
    this.authRedirectStorageService.setRedirectUrl(undefined);
  }
}
