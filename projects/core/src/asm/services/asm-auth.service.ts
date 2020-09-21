import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthToken } from '../../auth';
import { StateWithClientAuth } from '../../auth/client-auth/store/client-auth-state';
import { CxOAuthService } from '../../auth/user-auth/facade/cx-oauth-service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { AuthRedirectService } from '../../auth/user-auth/guards/auth-redirect.service';
import { BasicAuthService } from '../../auth/user-auth/services/basic-auth.service';
import { AuthActions } from '../../auth/user-auth/store/actions/index';
import { OCC_USER_ID_CURRENT } from '../../occ/utils/occ-constants';
import { UserService } from '../../user/facade/user.service';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AsmAuthService extends BasicAuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected cxOAuthService: CxOAuthService,
    protected authStorageService: AsmAuthStorageService,
    protected authRedirectService: AuthRedirectService,
    protected userService: UserService
  ) {
    super(
      store,
      userIdService,
      cxOAuthService,
      authStorageService,
      authRedirectService
    );
  }

  public authorize(userId: string, password: string): void {
    let tokenTarget;
    let token;
    this.authStorageService
      .getToken()
      .subscribe((tok) => (token = tok))
      .unsubscribe();
    this.authStorageService
      .getTokenTarget()
      .subscribe((tokTarget) => (tokenTarget = tokTarget))
      .unsubscribe();
    if (Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent) {
      // TODO: Show the warning that you cannot login when you are already logged in
    } else {
      super.authorize(userId, password);
    }
  }

  /**
   * Logout a storefront customer
   */
  public logout(): Promise<any> {
    let isEmulated;
    this.userIdService
      .isEmulated()
      .subscribe((emulated) => (isEmulated = emulated))
      .unsubscribe();
    if (isEmulated) {
      return new Promise((resolve) => {
        this.authStorageService.clearEmulatedUserToken();
        this.userIdService.clearUserId();
        this.store.dispatch(new AuthActions.Logout());
        // TODO: We should redirect to logout or home page?
        resolve();
      });
    } else {
      return super.logout();
    }
  }

  public isUserLoggedIn(): Observable<boolean> {
    return combineLatest([
      this.authStorageService.getToken(),
      this.userIdService.isEmulated(),
      this.authStorageService.getTokenTarget(),
    ]).pipe(
      map(
        ([token, isEmulated, tokenTarget]) =>
          (tokenTarget === TokenTarget.User && Boolean(token?.access_token)) ||
          (tokenTarget === TokenTarget.CSAgent &&
            Boolean(token?.access_token) &&
            isEmulated)
      )
    );
  }

  initImplicit() {
    setTimeout(() => {
      let tokenTarget;
      this.authStorageService
        .getTokenTarget()
        .subscribe((target) => {
          tokenTarget = target;
        })
        .unsubscribe();

      const prevToken = this.authStorageService.getItem('access_token');
      // Get customerId and token to immediately start emulation session
      let userToken: AuthToken;
      let customerId: string;
      this.authStorageService
        .getToken()
        .subscribe((token) => (userToken = token))
        .unsubscribe();
      this.userService
        .get()
        .subscribe((user) => (customerId = user?.customerId))
        .unsubscribe();

      this.cxOAuthService.tryLogin().then((result) => {
        const token = this.authStorageService.getItem('access_token');
        // We get the result in the code flow even if we did not logged in that why we also need to check if we have access_token
        if (result && token !== prevToken) {
          if (tokenTarget === TokenTarget.User) {
            this.userIdService.setUserId(OCC_USER_ID_CURRENT);
            this.store.dispatch(new AuthActions.Login());
            // TODO: Can we do it better? With the first redirect like with context? Why it only works if it is with this big timeout
            setTimeout(() => {
              this.authRedirectService.redirect();
            }, 10);
          } else {
            if (userToken && Boolean(customerId)) {
              this.userIdService.setUserId(customerId);
              this.authStorageService.setEmulatedUserToken(userToken);
            }
          }
        }
      });
    });
  }
}
