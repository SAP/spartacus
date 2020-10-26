import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AsmAuthStorageService,
  AuthActions,
  AuthService,
  AuthStorageService,
  AuthToken,
  BasicAuthService,
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
  TokenTarget,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { CdcAuthActions } from '../store/actions';

/**
 * Overrides AuthService to hook CDC modifications and custom OAuth flow used by CDC extension.
 */
@Injectable({
  providedIn: 'root',
})
export class CdcAuthService extends AuthService {
  constructor(
    protected winRef: WindowRef,
    protected store: Store,
    protected authStorageService: AuthStorageService,
    protected userIdService: UserIdService,
    protected basicAuthService: BasicAuthService,
    protected globalMessageService: GlobalMessageService
  ) {
    super(basicAuthService);
  }

  /**
   * Loads a new user token using custom oauth flow
   *
   * @param UID
   * @param UIDSignature
   * @param signatureTimestamp
   * @param idToken
   * @param baseSite
   */
  public authorizeWithCustomCdcFlow(
    UID: string,
    UIDSignature: string,
    signatureTimestamp: string,
    idToken: string,
    baseSite: string
  ): void {
    this.store.dispatch(
      new CdcAuthActions.LoadCdcUserToken({
        UID: UID,
        UIDSignature: UIDSignature,
        signatureTimestamp: signatureTimestamp,
        idToken: idToken,
        baseSite: baseSite,
      })
    );
  }

  /**
   * Transform and store the token received from custom flow to library format and login user.
   *
   * @param token
   */
  public loginWithToken(
    token: Partial<AuthToken> & { expires_in?: number }
  ): void {
    let tokenTarget: TokenTarget;
    let currentToken: AuthToken;
    if ('getTokenTarget' in this.authStorageService) {
      (this.authStorageService as AsmAuthStorageService)
        .getToken()
        .subscribe((tok) => (currentToken = tok))
        .unsubscribe();
      (this.authStorageService as AsmAuthStorageService)
        .getTokenTarget()
        .subscribe((tokTarget) => (tokenTarget = tokTarget))
        .unsubscribe();
      if (
        Boolean(currentToken?.access_token) &&
        tokenTarget === TokenTarget.CSAgent
      ) {
        this.globalMessageService.add(
          {
            key: 'asm.auth.agentLoggedInError',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
        return;
      }
    }

    // Code mostly based on auth lib we use and the way it handles token properties
    this.authStorageService.setItem('access_token', token.access_token);

    if (token.granted_scopes && Array.isArray(token.granted_scopes)) {
      this.authStorageService.setItem(
        'granted_scopes',
        JSON.stringify(token.granted_scopes)
      );
    }

    this.authStorageService.setItem('access_token_stored_at', '' + Date.now());

    if (token.expires_in) {
      const expiresInMilliseconds = token.expires_in * 1000;
      const now = new Date();
      const expiresAt = now.getTime() + expiresInMilliseconds;
      this.authStorageService.setItem('expires_at', '' + expiresAt);
    }

    if (token.refresh_token) {
      this.authStorageService.setItem('refresh_token', token.refresh_token);
    }

    // OCC specific code
    this.userIdService.setUserId(OCC_USER_ID_CURRENT);

    this.store.dispatch(new AuthActions.Login());
  }

  /**
   * @override
   *
   * Logout a customer in storefront and CDC.
   *
   * @returns promise which resolves after completing logout
   */
  public logout(): Promise<any> {
    return Promise.all([
      super.logout(),
      // trigger logout from CDC
      this.logoutFromCdc(),
    ]);
  }

  /**
   * Logout user from CDC
   */
  protected logoutFromCdc(): void {
    this.winRef.nativeWindow?.['gigya']?.accounts?.logout();
  }
}
