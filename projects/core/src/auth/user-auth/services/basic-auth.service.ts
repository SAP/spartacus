import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { RoutingService } from '../../../routing/facade/routing.service';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthStorageService } from '../facade/auth-storage.service';
import { CxOAuthService } from '../facade/cx-oauth-service';
import { UserIdService } from '../facade/user-id.service';
import { AuthRedirectService } from '../guards/auth-redirect.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthActions } from '../store/actions/index';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected cxOAuthService: CxOAuthService,
    protected authStorageService: AuthStorageService,
    protected authRedirectService: AuthRedirectService,
    protected routingService: RoutingService
  ) {}

  initOAuthCallback(): void {
    this.cxOAuthService.tryLogin().then((result) => {
      const token = this.authStorageService.getItem('access_token');
      // We get the result in the code flow even if we did not logged in that why we also need to check if we have access_token
      if (result && token) {
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);
        this.store.dispatch(new AuthActions.Login());
        this.authRedirectService.redirect();
      }
    });
  }

  loginWithRedirect(): boolean {
    this.cxOAuthService.initLoginFlow();
    return true;
  }

  /**
   * Loads a new user token
   * @param userId
   * @param password
   */
  public authorize(userId: string, password: string): void {
    this.cxOAuthService
      .authorizeWithPasswordFlow(userId, password)
      .then(() => {
        // OCC specific user id handling. Customize when implementing different backend
        this.userIdService.setUserId(OCC_USER_ID_CURRENT);

        this.store.dispatch(new AuthActions.Login());

        this.authRedirectService.redirect();
      })
      .catch(() => {});
  }

  /**
   * Returns the user's token
   */
  public getToken(): Observable<AuthToken> {
    return this.authStorageService.getToken();
  }

  /**
   * Logout a storefront customer
   */
  public logout(): Promise<any> {
    this.userIdService.clearUserId();
    return new Promise((resolve) => {
      this.cxOAuthService.revokeAndLogout().finally(() => {
        this.store.dispatch(new AuthActions.Logout());
        resolve();
      });
    });
  }

  /**
   * Returns `true` if the user is logged in; and `false` if the user is anonymous.
   */
  public isUserLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(
      map((userToken) => Boolean(userToken?.access_token)),
      distinctUntilChanged()
    );
  }

  /**
   * Initialize logout procedure by redirecting to the `logout` endpoint.
   */
  public initLogout(): void {
    this.routingService.go({ cxRoute: 'logout' });
  }
}
