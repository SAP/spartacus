/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OAuthEvent, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { WindowRef } from '../../../window/window-ref';
import { OAuthTryLoginResult } from '../models/oauth-try-login-response';
import { OAUTH_REDIRECT_FLOW_KEY } from '../utils/index';
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
        .revokeTokenAndLogout(true)
        .catch(() => {
          // when there would be some kind of error during revocation we can't do anything else, so at least we logout user.
          this.oAuthService.logOut(true);
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
    this.oAuthService.logOut(true);
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
    if (this.winRef.localStorage) {
      this.winRef.localStorage?.setItem(OAUTH_REDIRECT_FLOW_KEY, 'true');
    }

    return this.oAuthService.initLoginFlow();
  }

  /**
   * Tries to login user based on `code` or `token` present in the url.
   *
   * @param result The result returned by `OAuthService.tryLogin()`.
   *
   * @param tokenReceived Whether the event 'token_received' is emitted during `OAuthService.tryLogin()`.
   * We can use this identify that we have returned from an external authorization page to Spartacus).
   * In cases where we don't receive this event, the token has been obtained from storage.
   */
  tryLogin(): Promise<OAuthTryLoginResult> {
    return new Promise((resolve) => {
      // We use the 'token_received' event to check if we have returned
      // from the auth server.
      let tokenReceivedEvent: OAuthEvent | undefined;
      const subscription = this.events$
        .pipe(
          filter((event) => event.type === 'token_received'),
          take(1)
        )
        .subscribe((event) => (tokenReceivedEvent = event));

      this.oAuthService
        .tryLogin({
          // We don't load discovery document, because it doesn't contain revoke endpoint information
          disableOAuth2StateCheck: true,
        })
        .then((result: boolean) => {
          resolve({
            result: result,
            tokenReceived: !!tokenReceivedEvent,
          });
        })
        .finally(() => {
          subscription.unsubscribe();
        });
    });
  }
}
