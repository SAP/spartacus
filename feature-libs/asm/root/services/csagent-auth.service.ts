/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthService,
  AuthToken,
  FeatureConfigService,
  OAuthLibWrapperService,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';

import { UserProfileFacade } from '@spartacus/user/profile/root';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsmAuthStorageService, TokenTarget } from './asm-auth-storage.service';
import { UserAccountFacade } from '@spartacus/user/account/root';

/**
 * Auth service for CS agent. Useful to login/logout agent, start emulation
 * or get information about the status of emulation.
 */
@Injectable({
  providedIn: 'root',
})
export class CsAgentAuthService {
  constructor(
    authService: AuthService,
    authStorageService: AsmAuthStorageService,
    userIdService: UserIdService,
    oAuthLibWrapperService: OAuthLibWrapperService,
    store: Store,
    // Consider delete it in 7.0
    _userProfileFacade: UserProfileFacade,
    userAccountFacade: UserAccountFacade
  );
  /**
   * @deprecated since 7.0
   */
  constructor(
    authService: AuthService,
    authStorageService: AsmAuthStorageService,
    userIdService: UserIdService,
    oAuthLibWrapperService: OAuthLibWrapperService,
    store: Store,
    userProfileFacade: UserProfileFacade,
    userAccountFacade: UserAccountFacade,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfig: FeatureConfigService
  );
  constructor(
    protected authService: AuthService,
    protected authStorageService: AsmAuthStorageService,
    protected userIdService: UserIdService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected store: Store,
    protected userProfileFacade: UserProfileFacade,
    protected userAccountFacade: UserAccountFacade,
    @Optional() protected featureConfig?: FeatureConfigService
  ) {}

  /**
   * Loads access token for a customer support agent.
   * @param userId
   * @param password
   */
  async authorizeCustomerSupportAgent(
    userId: string,
    password: string
  ): Promise<void> {
    let userToken: AuthToken | undefined;
    // Start emulation for currently logged in user
    let customerId: string | undefined;
    if (this.featureConfig?.isLevel('6.4')) {
      this.userAccountFacade
        .get()
        .subscribe((user) => (customerId = user?.customerId))
        .unsubscribe();
    }

    this.authStorageService
      .getToken()
      .subscribe((token) => (userToken = token))
      .unsubscribe();

    this.authStorageService.switchTokenTargetToCSAgent();
    try {
      await this.oAuthLibWrapperService.authorizeWithPasswordFlow(
        userId,
        password
      );
      this.store.dispatch(new AuthActions.Logout());

      if (customerId !== undefined && userToken !== undefined) {
        // OCC specific user id handling. Customize when implementing different backend
        this.userIdService.setUserId(customerId);
        this.authStorageService.setEmulatedUserToken(userToken);
        this.store.dispatch(new AuthActions.Login());
      } else {
        // When we can't get the customerId just end all current sessions
        this.userIdService.setUserId(OCC_USER_ID_ANONYMOUS);
        this.authStorageService.clearEmulatedUserToken();
      }
    } catch {
      this.authStorageService.switchTokenTargetToUser();
    }
  }

  /**
   * Starts an ASM customer emulation session.
   * A customer emulation session is stopped by calling logout().
   * @param customerId
   */
  public startCustomerEmulationSession(customerId: string): void {
    this.authStorageService.clearEmulatedUserToken();

    // OCC specific user id handling. Customize when implementing different backend
    this.store.dispatch(new AuthActions.Logout());
    this.userIdService.setUserId(customerId);
    this.store.dispatch(new AuthActions.Login());
  }

  /**
   * Check if CS agent is currently logged in.
   *
   * @returns observable emitting true when CS agent is logged in or false when not.
   */
  public isCustomerSupportAgentLoggedIn(): Observable<boolean> {
    return combineLatest([
      this.authStorageService.getToken(),
      this.authStorageService.getTokenTarget(),
    ]).pipe(
      map(([token, tokenTarget]) =>
        Boolean(token?.access_token && tokenTarget === TokenTarget.CSAgent)
      )
    );
  }

  /**
   * Utility function to determine if customer is emulated.
   *
   * @returns observable emitting true when there is active emulation session or false when not.
   */
  public isCustomerEmulated(): Observable<boolean> {
    return this.userIdService.isEmulated();
  }

  /**
   * Returns the customer support agent's token loading status
   */
  public getCustomerSupportAgentTokenLoading(): Observable<boolean> {
    // TODO(#8248): Create new loading state outside of store
    return of(false);
  }

  /**
   * Logout a customer support agent.
   */
  async logoutCustomerSupportAgent(): Promise<void> {
    const emulatedToken = this.authStorageService.getEmulatedUserToken();

    let isCustomerEmulated;
    this.userIdService
      .isEmulated()
      .subscribe((emulated) => (isCustomerEmulated = emulated))
      .unsubscribe();

    await this.oAuthLibWrapperService.revokeAndLogout();

    this.store.dispatch({ type: '[Auth] Logout Customer Support Agent' });
    this.authStorageService.setTokenTarget(TokenTarget.User);

    if (isCustomerEmulated && emulatedToken) {
      this.store.dispatch(new AuthActions.Logout());
      this.authStorageService.setToken(emulatedToken);
      this.userIdService.setUserId(OCC_USER_ID_CURRENT);
      this.authStorageService.clearEmulatedUserToken();
      this.store.dispatch(new AuthActions.Login());
    } else {
      this.authService.logout();
    }
  }
}
