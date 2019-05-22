import { Injectable } from '@angular/core';

import { RoutingService } from '../../routing/facade/routing.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectService {
  constructor(private routing: RoutingService) {}

  private lastNavigationCancelledByAuthGuard: {
    url: string;
    navigationId: number;
  };

  private redirectUrl: string;

  private authUrls = new Set<string>();

  redirect() {
    debugger; //spike remove
    if (this.redirectUrl === undefined) {
      this.routing.go('/');
    } else {
      this.routing.goByUrl(this.redirectUrl);
    }
    this.redirectUrl = undefined;
    this.lastNavigationCancelledByAuthGuard = undefined;
  }

  // spike todo add docs
  reportAuthGuardedUrl(url: string, navigationId: number) {
    this.lastNavigationCancelledByAuthGuard = { url, navigationId };
    this.redirectUrl = url;
  }

  // spike todo add docs
  reportNavigationToAuthUrl(
    lastActivatedUrl: string,
    authUrl: string,
    currentNavigationId: number
  ) {
    this.authUrls.add(authUrl);

    // don't save redirect url if you've already come from auth page (i.e. come from login to register)
    if (!this.isAuthUrl(lastActivatedUrl)) {
      // We compare the navigation id to find out if the url from AuthGuard is more recent than the lastActivatedUrl.
      // It's because the url blocked by the AuthGuard doesn't can't be the activated url (it was cancelled).
      //
      // If the url from AuthGuard isn't the most recent, just use the last activated url:
      if (
        !this.lastNavigationCancelledByAuthGuard ||
        this.lastNavigationCancelledByAuthGuard.navigationId <
          currentNavigationId - 1
      ) {
        this.redirectUrl = lastActivatedUrl;
        this.lastNavigationCancelledByAuthGuard = undefined; // redirect url is already overwritten, so it's not needed anymore
      }
    }
  }

  protected isAuthUrl(url: string): boolean {
    return this.authUrls.has(url);
  }
}
