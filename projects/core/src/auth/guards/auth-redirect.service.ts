import { Injectable } from '@angular/core';

import { RoutingService } from '../../routing/facade/routing.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectAfterAuthService {
  constructor(private routing: RoutingService) {}

  private redirectUrl: string;
  private authUrls = new Set<string>();

  redirect() {
    if (this.redirectUrl === undefined) {
      this.routing.go('/');
    } else {
      this.routing.goByUrl(this.redirectUrl);
      this.redirectUrl = undefined;
    }
  }

  reportNavigation(previousUrl: string, authUrl: string) {
    this.authUrls.add(authUrl);

    // don't save redirect url if you've already come from auth page (i.e. come from login to register)
    if (!this.isAuthUrl(previousUrl)) {
      this.redirectUrl = previousUrl;
    }
  }

  protected isAuthUrl(url: string): boolean {
    return this.authUrls.has(url);
  }
}
