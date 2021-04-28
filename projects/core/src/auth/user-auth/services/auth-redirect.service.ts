import { Injectable, OnDestroy } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
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
    protected authRedirectStorageService: AuthRedirectStorageService
  ) {
    // SPIKE TODO REMOVE:
    window['authRedirectService'] = this;

    this.init();
  }

  // SPIKE OLD:
  // private ignoredUrls = new Set<string>();
  // private lastAuthGuardNavigation: {
  //   url: string;
  //   navigationId: number;
  // };

  // SPIKE NEW:
  private sub: Subscription;
  private redirectUrlCandidates: RouterEvent[] = [];

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
    this.sub = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.redirectUrlCandidates.push(event);
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

        // // SPIKE OLD:
        // this.lastAuthGuardNavigation = undefined;
      });
  }

  /**
   * Saves url of a page that user wanted to access, but wasn't yet logged in.
   */
  reportAuthGuard() {
    // // SPIKE OLD:
    // const { url, navigationId } = this.getCurrentNavigation();
    // this.lastAuthGuardNavigation = { url, navigationId };
    // this.authRedirectStorageService.setRedirectUrl(url);
  }

  /**
   * Saves url of a page that was accessed before entering a page only for not auth users.
   */
  reportNotAuthGuard() {
    // SPIKE NEW:
    // TODO: optimize the structure for storing candidates
    const navigation = this.router.getCurrentNavigation();
    const url = this.router.serializeUrl(navigation.finalUrl);

    this.redirectUrlCandidates = this.redirectUrlCandidates.filter(
      (event) => event.url !== url
    );

    const [lastEvent] = this.redirectUrlCandidates.slice(-1);

    // when visiting /login page from a deep link (or page refresh),
    // there might be no `lastEvent`
    if (lastEvent) {
      this.authRedirectStorageService.setRedirectUrl(lastEvent.url);
    }

    // // SPIKE OLD:
    // const { url, initialUrl, navigationId } = this.getCurrentNavigation();
    // this.ignoredUrls.add(url);
    // // Don't save redirect url if you've already come from page with NotAuthGuard (i.e. user has come from login to register)
    // if (!this.ignoredUrls.has(initialUrl)) {
    //   // We compare the navigation id to find out if the url cancelled by AuthGuard (i.e. my-account) is more recent
    //   // than the last opened page
    //   if (
    //     !this.lastAuthGuardNavigation ||
    //     this.lastAuthGuardNavigation.navigationId < navigationId - 1
    //   ) {
    //     this.authRedirectStorageService.setRedirectUrl(initialUrl);
    //     this.lastAuthGuardNavigation = undefined;
    //   }
    // }
  }

  // // SPIKE OLD:
  // private getCurrentNavigation(): {
  //   navigationId: number;
  //   url: string;
  //   initialUrl: string;
  // } {
  //   const initialUrl = this.router.url;
  //   const navigation = this.router.getCurrentNavigation();
  //   const url = this.router.serializeUrl(navigation.finalUrl);
  //   return {
  //     navigationId: navigation.id,
  //     url,
  //     initialUrl,
  //   };
  // }
}
