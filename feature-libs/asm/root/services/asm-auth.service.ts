import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthRedirectService,
  AuthService,
  AuthToken,
  GlobalMessageService,
  GlobalMessageType,
  OAuthLibWrapperService,
  RoutingService,
  StateWithClientAuth,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
    let tokenTarget: TokenTarget | undefined;
    let token: AuthToken | undefined;

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
  async loginWithCredentials(userId: string, password: string): Promise<void> {
    if (this.canUserLogin()) {
      await super.loginWithCredentials(userId, password);
    } else {
      this.warnAboutLoggedCSAgent();
    }
  }

  /**
   * Initialize Implicit/Authorization Code flow by redirecting to OAuth server when CS agent is not logged in.
   */
  loginWithRedirect(): boolean {
    if (this.canUserLogin()) {
      super.loginWithRedirect();
      return true;
    } else {
      this.warnAboutLoggedCSAgent();
      return false;
    }
  }

  /**
   * Revokes tokens and clears state for logged user (tokens, userId).
   * To perform logout it is best to use `logout` method. Use this method with caution.
   */
  coreLogout(): Promise<any> {
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
            return from(super.coreLogout());
          }
        })
      )
      .toPromise();
  }

  /**
   * Returns `true` if user is logged in or being emulated.
   */
  isUserLoggedIn(): Observable<boolean> {
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
