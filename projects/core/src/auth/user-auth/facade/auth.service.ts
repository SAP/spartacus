import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { RoutingService } from '../../../routing/facade/routing.service';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthRedirectService } from '../services/auth-redirect.service';
import { AuthStorageService } from '../services/auth-storage.service';
import { OAuthLibWrapperService } from '../services/oauth-lib-wrapper.service';
import { AuthActions } from '../store/actions/index';
import { UserIdService } from './user-id.service';
import { GlobalMessageService } from '../../../global-message/facade/global-message.service';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';

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
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
  ) {}

  /**
   * Check params in url and if there is an code/token then try to login with those.
   */
  async checkOAuthParamsInUrl(): Promise<void> {
    try {
      const result = await this.oAuthLibWrapperService.tryLogin();
      const token = this.authStorageService.getItem('access_token');
      // We get the result in the code flow even if we did not logged in that why we also need to check if we have access_token
      if (result && token) {
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);
        this.store.dispatch(new AuthActions.Login());
        this.authRedirectService.redirect();
      }
    } catch {}
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
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Revokes tokens and clears state for logged user (tokens, userId).
   * To perform logout it is best to use `logout` method. Use this method with caution.
   * @param showGlobalMsg show a successful global message upon sign out.
   */
  coreLogout(showGlobalMsg = true): Promise<void> {
    this.setLogoutProgress(true);
    this.userIdService.clearUserId();
    return new Promise((resolve) => {
      this.oAuthLibWrapperService.revokeAndLogout().finally(() => {
        this.store.dispatch(new AuthActions.Logout());
        if (showGlobalMsg) {
          this.globalMessageService.add(
            { key: 'authMessages.signedOutSuccessfully' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        }
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
