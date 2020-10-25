import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../auth/user-auth/facade/auth.service';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { OAuthLibWrapperService } from '../../auth/user-auth/services/oauth-lib-wrapper.service';
import { AuthActions } from '../../auth/user-auth/store/actions';
import {
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
} from '../../occ/utils/occ-constants';
import { UserService } from '../../user/facade/user.service';
import {
  AsmAuthStorageService,
  TokenTarget,
} from '../services/asm-auth-storage.service';
import { AsmActions } from '../store/actions';
import { StateWithAsm } from '../store/asm-state';

/**
 * Auth service for CS agent. Useful to login/logout agent, start emulation
 * or get information about the status of emulation.
 */
@Injectable({
  providedIn: 'root',
})
export class CsAgentAuthService {
  constructor(
    protected authService: AuthService,
    protected authStorageService: AsmAuthStorageService,
    protected userIdService: UserIdService,
    protected oAuthLibWrapperService: OAuthLibWrapperService,
    protected store: Store<StateWithAsm>,
    protected userService: UserService
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
    let userToken;
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
      // Start emulation for currently logged in user
      let customerId: string;
      this.userService
        .get()
        .subscribe((user) => (customerId = user?.customerId))
        .unsubscribe();
      this.store.dispatch(new AuthActions.Logout());

      if (Boolean(customerId)) {
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

    this.store.dispatch(new AsmActions.LogoutCustomerSupportAgent());
    this.authStorageService.setTokenTarget(TokenTarget.User);

    if (isCustomerEmulated && emulatedToken) {
      this.store.dispatch(new AuthActions.Logout());
      this.authStorageService.setToken(emulatedToken);
      this.userIdService.setUserId(OCC_USER_ID_CURRENT);
      this.authStorageService.clearEmulatedUserToken();
      this.store.dispatch(new AuthActions.Login());
    } else {
      this.authService.initLogout();
    }
  }
}
