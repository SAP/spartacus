/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  NavigationCancel,
  NavigationCancellationCode,
  NavigationEnd,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise, startWith, take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
import { SiteContextUrlSerializer } from '../../../site-context/services/site-context-url-serializer';
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
  protected siteContextUrlSerializer = inject(SiteContextUrlSerializer);
  protected subscription: Subscription;

  /**
   * Normal navigations produce [NavigationEnd, NavigationEnd] pairs — saved in localStorage
   * Guard UrlTree redirects produce [NavigationCancel, NavigationEnd] pairs — skipped
   * The [NavigationCancel, NavigationEnd] pair must be caught to prevent
   * guard-driven redirects (post-logout navigation to '/') from
   * overwriting the saved redirect URL
   */
  protected init() {
    this.subscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            (event instanceof NavigationCancel &&
              event.code === NavigationCancellationCode.Redirect)
        ),
        startWith(null),
        pairwise(),
        filter(
          ([prev, curr]) =>
            curr instanceof NavigationEnd && !(prev instanceof NavigationCancel)
        )
      )
      .subscribe(([, curr]) => {
        this.setRedirectUrl((curr as NavigationEnd).urlAfterRedirects);
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
   * Save the url as the redirect url, unless it's a part of the user login flow.
   */
  setRedirectUrl(url: string): void {
    if (!this.authFlowRoutesService.isAuthFlow(url)) {
      // Remove site-context params from the redirect URL to avoid using outdated values (e.g., language) after authentication.
      // Without these params in the Redirect URL, up-to-date site-context values will be applied implicitly on redirect.
      this.authRedirectStorageService.setRedirectUrl(
        this.getUrlWithoutSiteContextParams(url)
      );
    }
  }

  /**
   * Sets the redirect URL to undefined.
   */
  protected clearRedirectUrl(): void {
    this.authRedirectStorageService.setRedirectUrl(undefined);
  }

  /**
   * For a given URL, removes the prefix with site-context params (e.g., baseSite, language, currency)
   *
   * @example
   * Supposing the configured site-context URL params are [baseSite, language, currency],
   * and given the url '/electronics-spa/en/USD/product/123',
   * it returns '/product/123'.
   */
  protected getUrlWithoutSiteContextParams(url: string): string {
    const { url: urlWithoutSiteContextParams } =
      this.siteContextUrlSerializer.urlExtractContextParameters(url);
    return urlWithoutSiteContextParams;
  }
}
