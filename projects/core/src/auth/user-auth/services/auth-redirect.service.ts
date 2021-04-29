import { Injectable, OnDestroy } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoutingService } from '../../../routing/facade/routing.service';
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
    protected authRedirectStorageService: AuthRedirectStorageService
  ) {
    // SPIKE TODO REMOVE:
    window['authRedirectService'] = this;

    this.init();
  }

  private sub: Subscription;

  /**
   * Array of candidates for being the redirect URL.
   */
  private redirectUrlCandidates: string[] = [];

  // IDEA:
  // remember the last URL before entering a page with NotAuthGuard
  //
  // CONCERN:
  // if we observe NavigationStart, we get the url that we attempted to visit just before a page with NotAuthGuard
  // but when we enter a page with NotAuthGuard (i.e. login), the last recorded NavigationStart, is i.e. /login
  // so we need to record last two NavigationStart, so we can exclude the last recorded /login navigation
  //
  // CONCERN 2:
  // when you open /login and then /register and then back to /login, you should ignore all of them,
  // but take the url which you visited before all of them
  //
  // IMPLEMENTATION IDEA:
  // save the redirect URL only in reportNotAuthGuard
  // save last NavigationStart url that was not called together with reportNotAuthGuard
  // when NavigationEnd happens, clear the structure to store only the navigation URL

  protected init() {
    this.sub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.redirectUrlCandidates.push(event.url);
        console.log(this.redirectUrlCandidates); // spike todo remove
      }

      if (event instanceof NavigationEnd) {
        // leave only the last URL, when navigation ends (the current resolved URL):
        this.redirectUrlCandidates = this.redirectUrlCandidates.slice(-1);
        console.log(this.redirectUrlCandidates); // spike todo remove
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
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
        this.authRedirectStorageService.setRedirectUrl(undefined);
      });
  }

  /**
   * @deprecated since 4.0, the method is not needed anymore
   */
  reportAuthGuard() {}
  /**
   * Saves url of a page that was accessed before entering a page only for not auth users.
   */
  reportNotAuthGuard() {
    this.ignoreCurrentNavigationUrl();
    this.setRedirectUrl();
  }

  /**
   * Removes the the current navigation URL from the candidates
   * of being redirect URL.
   */
  private ignoreCurrentNavigationUrl() {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation?.finalUrl) {
      return;
    }
    const currentNavigationUrl = this.router.serializeUrl(navigation.finalUrl);
    this.redirectUrlCandidates = this.redirectUrlCandidates.filter(
      (url) => url !== currentNavigationUrl
    );
  }

  /**
   * Sets the last candidate as the redirect url.
   */
  private setRedirectUrl() {
    const [lastRedirectUrlCandidate] = this.redirectUrlCandidates.slice(-1);

    // there might be no last candidate URL especially when it's the initial navigation (i.e. on page refresh)
    if (lastRedirectUrlCandidate) {
      this.authRedirectStorageService.setRedirectUrl(lastRedirectUrlCandidate);
    }
  }
}
