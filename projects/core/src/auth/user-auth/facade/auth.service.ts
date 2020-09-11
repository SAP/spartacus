import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OCC_USER_ID_CURRENT } from '../../../occ/utils/occ-constants';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthRedirectService } from '../guards/auth-redirect.service';
import { AuthToken } from '../models/auth-token.model';
import { AuthActions } from '../store/actions/index';
import { AuthStorageService } from './auth-storage.service';
import { CxOAuthService } from './cx-oauth-service';
import { UserIdService } from './user-id.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected cxOAuthService: CxOAuthService,
    protected authStorageService: AuthStorageService,
    protected authRedirectService: AuthRedirectService
  ) {
    this.initImplicit();
  }

  initImplicit() {
    setTimeout(() => {
      const token = this.authStorageService.getItem('access_token');
      this.cxOAuthService.tryLogin().then((result) => {
        // We get the result in the code flow even if we did not logged in that why we also need to check if we have access_token
        if (result && token) {
          this.userIdService.setUserId(OCC_USER_ID_CURRENT);
          this.store.dispatch(new AuthActions.Login());
          // TODO: Can we do it better? With the first redirect like with context? Why it only works if it is with this big timeout
          setTimeout(() => {
            this.authRedirectService.redirect();
          }, 10);
        }
      });
    });
  }

  loginWithImplicitFlow() {
    // TODO: Extend in AsmAuthService and prevent login when csa ent in progress
    this.authRedirectService.setCurrentUrlAsRedirectUrl();
    this.cxOAuthService.initLoginFlow();
  }

  /**
   * Loads a new user token
   * @param userId
   * @param password
   */
  public authorize(userId: string, password: string): void {
    this.cxOAuthService.authorizeWithPasswordFlow(userId, password).then(() => {
      // OCC specific user id handling. Customize when implementing different backend
      this.userIdService.setUserId(OCC_USER_ID_CURRENT);

      this.store.dispatch(new AuthActions.Login());
    });
  }

  /**
   * This function provides the userId the OCC calls should use, depending
   * on whether there is an active storefront session or not.
   *
   * It returns the userId of the current storefront user or 'anonymous'
   * in the case there are no signed in user in the storefront.
   *
   * The user id of a regular customer session is 'current'.  In the case of an
   * asm customer emulation session, the userId will be the customerId.
   */
  public getOccUserId(): Observable<string> {
    return this.userIdService.getUserId();
  }

  /**
   * Calls provided callback with current user id.
   *
   * @param cb callback function to invoke
   */
  public invokeWithUserId(cb: (userId: string) => any): Subscription {
    return this.getOccUserId()
      .pipe(take(1))
      .subscribe((id) => cb(id));
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
        // TODO: we should redirect to `logout` page
        resolve();
      });
    });
  }

  /**
   * Returns `true` if the user is logged in; and `false` if the user is anonymous.
   */
  public isUserLoggedIn(): Observable<boolean> {
    return this.getToken().pipe(
      map((userToken) => Boolean(userToken?.access_token))
    );
  }
}
