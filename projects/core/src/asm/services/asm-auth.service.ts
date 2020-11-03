import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { StateWithClientAuth } from '../../auth/client-auth/store/client-auth-state';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { AuthToken } from '../../auth/user-auth/models/auth-token.model';
import { AuthRedirectService } from '../../auth/user-auth/services/auth-redirect.service';
import { OAuthLibWrapperService } from '../../auth/user-auth/services/oauth-lib-wrapper.service';
import { AuthActions } from '../../auth/user-auth/store/actions/index';
import {
  GlobalMessageService,
  GlobalMessageType,
} from '../../global-message/index';
import { RoutingService } from '../../routing/facade/routing.service';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';

/**
 * Version of AuthService that is working for both user na CS agent.
 * Overrides AuthService when ASM module is enabled.
 */
@Injectable({
  providedIn: 'root',
})
export class AsmAuthService extends AuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected userIdService: UserIdService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected authStorageService: AsmAuthStorageService,
    protected authRedirectService: AuthRedirectService,
    protected globalMessageService: GlobalMessageService,
    protected routingService: RoutingService
  ) {
    super(
      store,
      userIdService,
      oAuthLibWrapperService,
      authStorageService,
      authRedirectService,
      routingService
    );
  }

  protected canUserLogin(): boolean {
    let tokenTarget: TokenTarget;
    let token: AuthToken;

    this.authStorageService
      .getToken()
      .subscribe((tok) => (token = tok))
      .unsubscribe();
    this.authStorageService
      .getTokenTarget()
      .subscribe((tokTarget) => (tokenTarget = tokTarget))
      .unsubscribe();
    return !(
      Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent
    );
  }

  protected warnAboutLoggedCSAgent(): void {
    this.globalMessageService.add(
      {
        key: 'asm.auth.agentLoggedInError',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  /**
   * Loads a new user token with Resource Owner Password Flow when CS agent is not logged in.
   * @param userId
   * @param password
   */
  public async loginWithCredentials(
    userId: string,
    password: string
  ): Promise<void> {
    if (this.canUserLogin()) {
      await super.loginWithCredentials(userId, password);
    } else {
      this.warnAboutLoggedCSAgent();
    }
  }

  /**
   * Initialize Implicit/Authorization Code flow by redirecting to OAuth server when CS agent is not logged in.
   */
  public loginWithRedirect(): boolean {
    if (this.canUserLogin()) {
      super.loginWithRedirect();
      return true;
    } else {
      this.warnAboutLoggedCSAgent();
      return false;
    }
  }

  /**
   * Logout a storefront customer.
   */
  public internalLogout(): Promise<any> {
    return this.userIdService
      .isEmulated()
      .pipe(
        take(1),
        switchMap((isEmulated) => {
          if (isEmulated) {
            this.authStorageService.clearEmulatedUserToken();
            this.userIdService.clearUserId();
            this.store.dispatch(new AuthActions.Logout());
            return of(true);
          } else {
            return from(super.internalLogout());
          }
        })
      )
      .toPromise();
  }

  /**
   * Returns `true` if user is logged in or being emulated.
   */
  public isUserLoggedIn(): Observable<boolean> {
    return combineLatest([
      this.authStorageService.getToken(),
      this.userIdService.isEmulated(),
      this.authStorageService.getTokenTarget(),
    ]).pipe(
      map(
        ([token, isEmulated, tokenTarget]) =>
          Boolean(token?.access_token) &&
          (tokenTarget === TokenTarget.User ||
            (tokenTarget === TokenTarget.CSAgent && isEmulated))
      )
    );
  }
}
