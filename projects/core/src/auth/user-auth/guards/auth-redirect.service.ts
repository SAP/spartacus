import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '../../../routing/facade/routing.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectService {
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
  constructor(private routing: RoutingService, private router: Router) {}

  private redirectUrl: string;
  private ignoredUrls = new Set<string>();
  private lastAuthGuardNavigation: {
    url: string;
    navigationId: number;
  };

  redirect() {
    if (this.redirectUrl === undefined) {
      this.routing.go('/');
    } else {
      this.routing.goByUrl(this.redirectUrl);
    }
    this.redirectUrl = undefined;
    this.lastAuthGuardNavigation = undefined;
  }

  reportAuthGuard() {
    const { url, navigationId } = this.getCurrentNavigation();
    this.lastAuthGuardNavigation = { url, navigationId };
    this.redirectUrl = url;
  }

  reportNotAuthGuard() {
    const { url, initialUrl, navigationId } = this.getCurrentNavigation();

    this.ignoredUrls.add(url);

    // Don't save redirect url if you've already come from page with NotAuthGuard (i.e. user has come from login to register)
    if (!this.ignoredUrls.has(initialUrl)) {
      // We compare the navigation id to find out if the url cancelled by AuthGuard (i.e. my-account) is more recent
      // than the last opened page
      if (
        !this.lastAuthGuardNavigation ||
        this.lastAuthGuardNavigation.navigationId < navigationId - 1
      ) {
        this.redirectUrl = initialUrl;
        this.lastAuthGuardNavigation = undefined;
      }
    }
  }

  private getCurrentNavigation(): {
    navigationId: number;
    url: string;
    initialUrl: string;
  } {
    const initialUrl = this.router.url;
    const navigation = this.router.getCurrentNavigation();
    const url = this.router.serializeUrl(navigation.finalUrl);
    return {
      navigationId: navigation.id,
      url,
      initialUrl,
    };
  }
}
