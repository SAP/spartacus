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
    this.init();
  }

  private subscription: Subscription;

  /**
   * Array of candidates for being the redirect URL.
   */
  private redirectUrlCandidates: string[] = [];

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
   * Initializes the subscription to the NavigationStart Router events. Based on those events,
   * we remember possible redirect URL candidates.
   *
   * During the phase of evaluating guards the candidate being might be abandoned,
   * when some guard calls the method `reportNotAuthGuard()`.
   */
  protected init() {
    if (this.subscription) {
      return; // prevent calling init() twice
    }

    this.subscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.redirectUrlCandidates.push(event.url); // current candidate

        console.log(this.redirectUrlCandidates); // spike todo remove
        debugger;
      }

      if (event instanceof NavigationEnd) {
        // drop the history of old candidates, when navigation ends. Leave only the last one:
        this.redirectUrlCandidates = this.redirectUrlCandidates.slice(-1);
        console.log(this.redirectUrlCandidates); // spike todo remove
        debugger;
      }
    });
  }

  /**
   * @deprecated since 4.0, the method is not needed anymore
   */
  reportAuthGuard() {}

  /**
   * Saves the last redirect URL candidate as the actual redirect URL.
   *
   * It doesn't treat the current navigation URL as a candidate.
   */
  reportNotAuthGuard() {
    this.excludeCurrentNavigationCandidate();
    this.saveRedirectUrl();
  }

  /**
   * Removes the the current navigation URL from the candidates array
   */
  private excludeCurrentNavigationCandidate() {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation?.finalUrl) {
      throw new Error(
        'AuthRedirectService.reportNotAuthGuard method can be called only during the router navigation phase.'
      );
    }
    const currentNavigationUrl = this.router.serializeUrl(navigation.finalUrl);
    this.redirectUrlCandidates = this.redirectUrlCandidates.filter(
      (url) => url !== currentNavigationUrl
    );
  }

  /**
   * Saves the last redirect URL candidate as the actual redirect URL.
   */
  private saveRedirectUrl() {
    const [lastCandidate] = this.redirectUrlCandidates.slice(-1);

    // there might be no last candidate URL, especially when it's the initial navigation
    if (lastCandidate) {
      this.authRedirectStorageService.setRedirectUrl(lastCandidate);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
