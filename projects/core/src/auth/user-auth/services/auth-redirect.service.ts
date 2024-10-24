/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, merge } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthFlowRoutesService } from './auth-flow-routes.service';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import { EventService } from '../../../event';
import { CurrencySetEvent, LanguageSetEvent } from '../../../site-context';

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
    protected authFlowRoutesService: AuthFlowRoutesService,
    protected eventService: EventService,
    protected location: Location
  ) {
    this.init();
  }

  protected subscription: Subscription;

  protected init() {
    this.subscription = merge(
      this.router.events,
      this.eventService.get(LanguageSetEvent),
      this.eventService.get(CurrencySetEvent)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setRedirectUrl(event.urlAfterRedirects);
      }
      if (
        event instanceof LanguageSetEvent ||
        event instanceof CurrencySetEvent
      ) {
        this.setRedirectUrl(this.location.path());
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
