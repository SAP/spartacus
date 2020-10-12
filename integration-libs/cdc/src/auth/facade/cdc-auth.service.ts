import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AuthActions,
  AuthService,
  AuthStorageService,
  AuthToken,
  BasicAuthService,
  OCC_USER_ID_CURRENT,
  UserIdService,
  WindowRef,
} from '@spartacus/core';
import { CdcAuthActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class CdcAuthService extends AuthService {
  constructor(
    protected winRef: WindowRef,
    protected store: Store,
    protected authStorageService: AuthStorageService,
    protected userIdService: UserIdService,
    protected basicAuthService: BasicAuthService
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

  // TODO: Consider consequences with ASM
  public loginWithToken(token: Partial<AuthToken>): void {
    // Code mostly based on auth lib we use and the way it handles token properties
    this.authStorageService.setItem('access_token', token.access_token);

    if (token.granted_scopes && Array.isArray(token.granted_scopes)) {
      this.authStorageService.setItem(
        'granted_scopes',
        JSON.stringify(token.granted_scopes)
      );
    }

    this.authStorageService.setItem('access_token_stored_at', '' + Date.now());

    const date = new Date();
    date.setSeconds(date.getSeconds() + token.expires_in);
    token.expiration_time = date.toJSON();

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
   * Logout a storefront customer
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
