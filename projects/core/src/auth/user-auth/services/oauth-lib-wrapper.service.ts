import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthEvent, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { WindowRef } from '../../../window/window-ref';
import { AuthConfigService } from './auth-config.service';

/**
 * Wrapper service on the library OAuthService. Normalizes the lib API for services.
 * Use this service when you want to access low level OAuth library methods.
 */
@Injectable({
  providedIn: 'root',
})
export class OAuthLibWrapperService {
  events$: Observable<OAuthEvent> = this.oAuthService.events;

  // TODO: Remove platformId dependency in 4.0
  constructor(
    protected oAuthService: OAuthService,
    protected authConfigService: AuthConfigService,
    @Inject(PLATFORM_ID) protected platformId: Object,
    protected winRef: WindowRef
  ) {
    this.initialize();
  }

  protected initialize() {
    const isSSR = !this.winRef.isBrowser();
    this.oAuthService.configure({
      tokenEndpoint: this.authConfigService.getTokenEndpoint(),
      loginUrl: this.authConfigService.getLoginUrl(),
      clientId: this.authConfigService.getClientId(),
      dummyClientSecret: this.authConfigService.getClientSecret(),
      revocationEndpoint: this.authConfigService.getRevokeEndpoint(),
      logoutUrl: this.authConfigService.getLogoutUrl(),
      userinfoEndpoint: this.authConfigService.getUserinfoEndpoint(),
      issuer:
        this.authConfigService.getOAuthLibConfig()?.issuer ??
        this.authConfigService.getBaseUrl(),
      redirectUri:
        this.authConfigService.getOAuthLibConfig()?.redirectUri ??
        (!isSSR
          ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.winRef.nativeWindow!.location.origin
          : ''),
      ...this.authConfigService.getOAuthLibConfig(),
    });
  }

  /**
   * Authorize with ResourceOwnerPasswordFlow.
   *
   * @param userId
   * @param password
   *
   * @return token response from the lib
   */
  authorizeWithPasswordFlow(
    userId: string,
    password: string
  ): Promise<TokenResponse> {
    return this.oAuthService.fetchTokenUsingPasswordFlow(userId, password);
  }

  /**
   * Refresh access_token.
   */
  refreshToken(): void {
    this.oAuthService.refreshToken();
  }

  /**
   * Revoke access tokens and clear tokens in lib state.
   */
  revokeAndLogout(): Promise<void> {
    return new Promise((resolve) => {
      this.oAuthService
        .revokeTokenAndLogout()
        .catch(() => {
          // when there would be some kind of error during revocation we can't do anything else, so at least we logout user.
          this.oAuthService.logOut();
        })
        .finally(() => {
          resolve();
        });
    });
  }

  /**
   * Clear tokens in library state (no revocation).
   */
  logout(): void {
    this.oAuthService.logOut();
  }

  /**
   * Returns Open Id token. Might be empty, when it was not requested with the `responseType` config.
   *
   * @return id token
   */
  getIdToken(): string {
    return this.oAuthService.getIdToken();
  }

  /**
   * Initialize Implicit Flow or Authorization Code flows with the redirect to OAuth login url.
   */
  initLoginFlow() {
    return this.oAuthService.initLoginFlow();
  }

  /**
   * Tries to login user based on `code` or `token` present in the url.
   */
  tryLogin() {
    return this.oAuthService.tryLogin({
      // We don't load discovery document, because it doesn't contain revoke endpoint information
      disableOAuth2StateCheck: true,
    });
  }
}
