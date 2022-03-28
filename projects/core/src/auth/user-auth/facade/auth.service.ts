import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OAuthEvent } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { RoutingService } from '../../../routing/facade/routing.service';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { OAuthLibWrapperService } from '../services/oauth-lib-wrapper.service';
import { AuthActions } from '../store/actions/index';
import { UserIdService } from './user-id.service';

/**
 * Auth service for normal user authentication.
 * Use to check auth status, login/logout with different OAuth flows.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Indicates whether the access token is being refreshed
   */
  refreshInProgress$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Indicates whether the logout is being performed
   */
  logoutInProgress$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected authStorageService: AuthStorageService,
    protected authRedirectService: AuthRedirectService,
    protected routingService: RoutingService
  ) {}

  /**
   * Check params in url and if there is an code/token then try to login with those.
   */
  async checkOAuthParamsInUrl(): Promise<void> {
    // We use the 'token_received' event to check if we have returned
    // from the auth server.
    let tokenReceivedEvent: OAuthEvent | undefined;
    const subscription = this.oAuthLibWrapperService.events$
      .pipe(
        filter((event) => event.type === 'token_received'),
        take(1)
      )
      .subscribe((event) => (tokenReceivedEvent = event));

    // The method `oAuthLibWrapperService.tryLogin()` obtains the token either from the URL params
    // or from the storage. To distinguish those 2 cases, we observe the event `token_received`.
    //
    // The event 'token_received' is emitted, when the method `oAuthLibWrapperService.tryLogin()`
    // can derive the token from the URL params (which means we've just returned from
    // an external authorization page to Spartacus).
    //
    // But the event 'token_received' is not emitted when the method `oAuthLibWrapperService.tryLogin()`
    // can obtain the token from the storage (e.g. on refresh of the Spartacus page).
    try {
      const result = await this.oAuthLibWrapperService.tryLogin();

      const token = this.authStorageService.getItem('access_token');

      // We get the result in the code flow even if we did not logged in that why we also need to check if we have access_token
      if (result && token) {
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);
        this.store.dispatch(new AuthActions.Login());

        // Only redirect if we have received a token,
        // otherwise we are not returning from authentication server.
        if (tokenReceivedEvent) {
          this.authRedirectService.redirect();
        }
      }
    } catch {}

    subscription.unsubscribe();
  }

  /**
   * Initialize Implicit/Authorization Code flow by redirecting to OAuth server.
   */
  loginWithRedirect(): boolean {
    this.oAuthLibWrapperService.initLoginFlow();
    return true;
  }

  /**
   * Loads a new user token with Resource Owner Password Flow.
   * @param userId
   * @param password
   */
  async loginWithCredentials(userId: string, password: string): Promise<void> {
    try {
      await this.oAuthLibWrapperService.authorizeWithPasswordFlow(
        userId,
        password
      );
      // OCC specific user id handling. Customize when implementing different backend
      this.userIdService.setUserId(OCC_USER_ID_CURRENT);

      this.store.dispatch(new AuthActions.Login());

      this.authRedirectService.redirect();
    } catch {}
  }

  /**
   * Revokes tokens and clears state for logged user (tokens, userId).
   * To perform logout it is best to use `logout` method. Use this method with caution.
   */
  coreLogout(): Promise<void> {
    this.setLogoutProgress(true);
    this.userIdService.clearUserId();
    return new Promise((resolve) => {
      this.oAuthLibWrapperService.revokeAndLogout().finally(() => {
        this.store.dispatch(new AuthActions.Logout());
        resolve();
      });
    });
  }

  /**
   * Returns `true` if the user is logged in; and `false` if the user is anonymous.
   */
  isUserLoggedIn(): Observable<boolean> {
    return this.authStorageService.getToken().pipe(
      map((userToken) => Boolean(userToken?.access_token)),
      distinctUntilChanged()
    );
  }

  /**
   * Logout a storefront customer. It will initialize logout procedure by redirecting to the `logout` endpoint.
   */
  logout(): void {
    this.routingService.go({ cxRoute: 'logout' });
  }

  /**
   * Start or stop the refresh process
   */
  setRefreshProgress(progress: boolean): void {
    (this.refreshInProgress$ as BehaviorSubject<boolean>).next(progress);
  }

  /**
   * Start or stop the logout process
   */
  setLogoutProgress(progress: boolean): void {
    (this.logoutInProgress$ as BehaviorSubject<boolean>).next(progress);
  }
}
