/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  AuthConfig,
  OAuthEvent,
  OAuthService,
  TokenResponse,
} from 'angular-oauth2-oidc';
import { firstValueFrom, Observable, ReplaySubject, Subscription } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ConfigInitializerService } from '../../../config/config-initializer';
import { FeatureToggles } from '../../../features-config';
import { FederatedLoginService } from '../../../federated-login';
import { SemanticPathService } from '../../../routing/configurable-routes/url-translation/semantic-path.service';
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
  private featureToggles = inject(FeatureToggles);
  events$: Observable<OAuthEvent> = this.oAuthService.events;

  protected semanticPathService = inject(SemanticPathService);
  protected federatedLoginService = inject(FederatedLoginService);
  protected federatedLoginParamsSub: Subscription | undefined;

  protected subscription: Subscription | undefined;
  protected configInitializerService = inject(ConfigInitializerService);

  protected initialized = new ReplaySubject<void>(1);

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
    if (this.featureToggles.asyncAuthConfigInitializer) {
      this.subscription?.unsubscribe();
      this.subscription = this.configInitializerService
        .getStable('authentication')
        .pipe(map(() => this.generateCustomerLoginConfig()))
        .subscribe((dynamicConfig) => this.applyConfiguration(dynamicConfig));
    } else {
      this.applyConfiguration(this.generateCustomerLoginConfig());
    }

    // reconfigure after getting language
    this.federatedLoginService.detectContext();
    if (this.federatedLoginService.enabled) {
      this.federatedLoginParamsSub?.unsubscribe();
      this.federatedLoginParamsSub = this.augmentForSharedLoginPage(
        this.generateCustomerLoginConfig()
      ).subscribe((updatedConfig) => this.applyConfiguration(updatedConfig));
    }
  }

  protected generateCustomerLoginConfig() {
    const config = this.generateBaseConfig();
    const isSSR = !this.winRef.isBrowser();

    let redirectUri = this.authConfigService.getOAuthLibConfig()?.redirectUri;
    if (redirectUri === null || redirectUri === undefined) {
      if (isSSR) {
        redirectUri = '';
      } else if (this.federatedLoginService.isLoginDomain) {
        redirectUri = this.federatedLoginService.origin;
      } else {
        redirectUri = this.winRef.nativeWindow?.location.origin;
      }
    }

    config.redirectUri = redirectUri;

    return config;
  }

  protected generateBaseConfig() {
    const isSSR = !this.winRef.isBrowser();

    return {
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
        (!isSSR ? this.winRef.nativeWindow?.location.origin : ''),
      ...this.authConfigService.getOAuthLibConfig(),
    };
  }

  /** Applies an AuthConfig to the internal oAuth service */
  protected applyConfiguration(config: AuthConfig) {
    this.oAuthService.configure(config);
    if (this.featureToggles.asyncAuthConfigInitializer) {
      this.initialized.next();
    }
  }

  /** Enhances the provided configuration with Shared Login Page details */
  protected augmentForSharedLoginPage(
    baseConfig: AuthConfig
  ): Observable<AuthConfig> {
    // augment login URL with Share Login context params
    return this.federatedLoginService.getParameters().pipe(
      map((parameterString) => ({
        ...baseConfig,
        loginUrl:
          baseConfig.loginUrl +
          (baseConfig.loginUrl?.includes('?') ? '&' : '?') +
          parameterString,
      }))
    );
  }

  protected changeClientWhenInitialize(clientId: string) {
    const config = this.generateBaseConfig();

    config.clientId = clientId;

    this.applyConfiguration(config);
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
    if (this.featureToggles.asyncAuthConfigInitializer) {
      return firstValueFrom(this.initialized).then(() =>
        this.oAuthService.fetchTokenUsingPasswordFlow(userId, password)
      );
    } else {
      return this.oAuthService.fetchTokenUsingPasswordFlow(userId, password);
    }
  }

  /**
   * Refresh access_token.
   */
  refreshToken(): void {
    if (this.featureToggles.asyncAuthConfigInitializer) {
      this.initialized
        .pipe(take(1))
        .subscribe(() => this.oAuthService.refreshToken());
    } else {
      this.oAuthService.refreshToken();
    }
  }

  /**
   * Revoke access tokens and clear tokens in lib state.
   */
  revokeAndLogout(): Promise<void> {
    const revokeTokenAndLogout = () =>
      this.oAuthService.revokeTokenAndLogout(true).catch(() => {
        // when there would be some kind of error during revocation we can't do anything else, so at least we logout user.
        this.oAuthService.logOut(true);
      });

    if (this.featureToggles.asyncAuthConfigInitializer) {
      return firstValueFrom(this.initialized).then(revokeTokenAndLogout);
    } else {
      return revokeTokenAndLogout();
    }
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
    if (
      !this.featureToggles.authorizationCodeFlowByDefault ||
      this.federatedLoginService.enabled
    ) {
      this.winRef.localStorage?.setItem(OAUTH_REDIRECT_FLOW_KEY, 'true');
    }

    if (
      this.federatedLoginService.enabled &&
      this.federatedLoginService.isLoginDomain
    ) {
      // redirect to the origin site login so that PKCE is available to the origin
      const originLoginUrl =
        this.federatedLoginService.origin +
        (this.semanticPathService.get('login') ?? '');
      this.winRef.location.href = originLoginUrl;
      return undefined;
    }

    if (this.featureToggles.asyncAuthConfigInitializer) {
      this.initialized
        .pipe(take(1))
        .subscribe(() => this.oAuthService.initLoginFlow());
      return undefined;
    } else {
      return this.oAuthService.initLoginFlow();
    }
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
    return new Promise((resolve, reject) => {
      // We use the 'token_received' event to check if we have returned
      // from the auth server.
      let tokenReceivedEvent: OAuthEvent | undefined;
      const subscription = this.events$
        .pipe(
          filter((event) => event.type === 'token_received'),
          take(1)
        )
        .subscribe((event) => (tokenReceivedEvent = event));

      const tryLogin = () =>
        this.oAuthService
          .tryLogin({
            // We don't load discovery document, because it doesn't contain revoke endpoint information
            disableOAuth2StateCheck: true,
          })
          .then((result) => {
            if (!tokenReceivedEvent) {
              this.winRef.localStorage?.removeItem(OAUTH_REDIRECT_FLOW_KEY);
            }
            resolve({
              result: result,
              tokenReceived: !!tokenReceivedEvent,
            });
          })
          .catch((error) => {
            this.winRef.localStorage?.removeItem(OAUTH_REDIRECT_FLOW_KEY);
            reject(error);
          })
          .finally(() => {
            subscription.unsubscribe();
          });

      if (this.featureToggles.asyncAuthConfigInitializer) {
        firstValueFrom(this.initialized).then(tryLogin);
      } else {
        tryLogin();
      }
    });
  }

  public refreshAuthConfig() {
    this.initialize();
  }

  public changeAuthConfigClientId(clientId: string) {
    this.changeClientWhenInitialize(clientId);
  }
}
