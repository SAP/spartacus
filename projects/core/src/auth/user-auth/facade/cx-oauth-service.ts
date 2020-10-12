import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { StateWithClientAuth } from '../../client-auth/store/client-auth-state';
import { AuthConfig } from '../config/auth-config';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthStorageService } from './auth-storage.service';

// TODO: Rethink the name
@Injectable({
  providedIn: 'root',
})
export class CxOAuthService {
  constructor(
    protected store: Store<StateWithClientAuth>,
    protected oAuthService: OAuthService,
    protected authStorageService: AuthStorageService,
    protected config: AuthConfig,
    protected authConfigService: AuthConfigService
  ) {
    this.oAuthService.configure({
      tokenEndpoint: this.authConfigService.getTokenEndpoint(),
      loginUrl: this.authConfigService.getLoginEndpoint(),
      clientId: this.config.authentication.client_id,
      dummyClientSecret: this.config.authentication.client_secret,
      scope: '', // Add openid to get id_token in case of password flow
      customTokenParameters: ['token_type', ''], // Add id_token to store id_token in case of password flow
      strictDiscoveryDocumentValidation: false,
      skipIssuerCheck: true,
      disablePKCE: true,
      responseType: 'code',
      oidc: false,
      clearHashAfterLogin: true,
      revocationEndpoint: this.authConfigService.getRevokeEndpoint(),
      redirectUri: window.location.origin,
      issuer: this.config.authentication.baseUrl + '/authorizationserver',
    });
  }

  authorizeWithPasswordFlow(
    userId: string,
    password: string
  ): Promise<TokenResponse> {
    return this.oAuthService.fetchTokenUsingPasswordFlow(userId, password);
  }

  refreshToken(): void {
    this.oAuthService.refreshToken();
  }

  revokeAndLogout(): Promise<any> {
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

  logout(): void {
    this.oAuthService.logOut();
  }

  // TODO: Play more with id token stuff
  getIdToken(): string {
    return this.oAuthService.getIdToken();
  }

  initLoginFlow() {
    return this.oAuthService.initLoginFlow();
  }

  // TODO: We don't load discovery document, because it doesn't contain revoke endpoint information
  tryLogin() {
    return this.oAuthService.tryLogin({
      disableOAuth2StateCheck: true,
    });
  }
}
