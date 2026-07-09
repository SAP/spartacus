/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthMultisiteIsolationService,
  AuthRedirectService,
  AuthService,
  AuthToken,
  GlobalMessageService,
  GlobalMessageType,
  OAuthLibWrapperService,
  OCC_USER_ID_ANONYMOUS,
  RoutingService,
  StateWithClientAuth,
  UserIdService,
} from '@spartacus/core';
import {
  combineLatest,
  firstValueFrom,
  from,
  lastValueFrom,
  Observable,
  of,
} from 'rxjs';
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
    protected routingService: RoutingService,
    protected authMultisiteIsolationService?: AuthMultisiteIsolationService
  ) {
    super(
      store,
      userIdService,
      oAuthLibWrapperService,
      authStorageService,
      authRedirectService,
      routingService,
      authMultisiteIsolationService
    );
  }

  /**
   * After being redirected back from the authorization server, processes the OAuth
   * callback. When using the ASM client (agent login flow triggered by early login /
   * route guard), the token is set as a CS Agent token and the agent is considered
   * logged in without requiring a second "Sign In as Agent" click.
   */
  override async checkOAuthParamsInUrl(): Promise<void> {
    const isUsingASMClient = await firstValueFrom(this.isUsingASMClient());
    if (!isUsingASMClient) {
      await super.checkOAuthParamsInUrl();
      return;
    }

    try {
      const loginResult = await this.oAuthLibWrapperService.tryLogin();
      const token = this.authStorageService.getItem('access_token');

      if (loginResult.result && token && loginResult.tokenReceived) {
        this.authStorageService.switchTokenTargetToCSAgent();
        this.userIdService.setUserId(OCC_USER_ID_ANONYMOUS);
        this.store.dispatch(new AuthActions.Login());
        this.authRedirectService.redirect();
      }
    } catch {}
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
   *
   * When a CS Agent is already logged in but not emulating a customer, guards
   * that check `isUserLoggedIn()` (e.g. CheckoutAuthGuard) may still route the
   * user through /login. In that case, redirect to the homepage instead of
   * showing "Cannot login as user" — the CS Agent is authenticated and should
   * proceed from the home page (they can emulate a customer via the ASM banner).
   */
  loginWithRedirect(): boolean {
    if (this.canUserLogin()) {
      super.loginWithRedirect();
      return true;
    } else if (this.isCsAgentActive()) {
      this.routingService.go('/');
      return true;
    } else {
      this.warnAboutLoggedCSAgent();
      return false;
    }
  }

  /**
   * True when there is an active CS Agent session (token present + tokenTarget=CSAgent).
   */
  protected isCsAgentActive(): boolean {
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
    return Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent;
  }

  /**
   * Revokes tokens and clears state for logged user (tokens, userId).
   * To perform logout it is best to use `logout` method. Use this method with caution.
   */
  coreLogout(): Promise<any> {
    return lastValueFrom(
      this.userIdService.isEmulated().pipe(
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
    );
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
